import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchlistButton";
import { checkWatchlistStatus } from "@/lib/actions/watchlist.actions";
import {
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
} from "@/lib/constats";

const StockDetailsPage = async ({ params }: StockDetailsPageProps) => {
  const { symbol } = await params;
  const isInWatchlist = await checkWatchlistStatus(symbol);

  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  // Fetch basic stock info for the company name
  let companyName = symbol;
  try {
    const token =
      process.env.FINNHUB_API_KEY ?? process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
    if (token) {
      const profileRes = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol.toUpperCase()}&token=${token}`,
        { next: { revalidate: 3600 } }
      );
      if (profileRes.ok) {
        const profile = await profileRes.json();
        companyName = profile?.name || symbol;
      }
    }
  } catch (error) {
    console.error("Error fetching company name:", error);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-100">
            {symbol.toUpperCase()}
          </h1>
          <p className="text-gray-400 mt-1">{companyName}</p>
        </div>
        <div className="flex-shrink-0">
          <WatchlistButton
            symbol={symbol.toUpperCase()}
            company={companyName}
            isInWatchlist={isInWatchlist}
            type="button"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {/* Symbol Info Widget */}
        <div className="w-full">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}symbol-info.js`}
            config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
            height={170}
          />
        </div>

        {/* Main Chart */}
        <div className="w-full">
          <TradingViewWidget
            title="Price Chart"
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
            height={600}
          />
        </div>

        {/* Technical Analysis and Company Profile */}
        <div className="grid md:grid-cols-2 gap-6">
          <TradingViewWidget
            title="Technical Analysis"
            scriptUrl={`${scriptUrl}technical-analysis.js`}
            config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
            height={400}
          />
          <TradingViewWidget
            title="Company Profile"
            scriptUrl={`${scriptUrl}symbol-profile.js`}
            config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
            height={440}
          />
        </div>

        {/* Company Financials */}
        <div className="w-full">
          <TradingViewWidget
            title="Fundamental Data"
            scriptUrl={`${scriptUrl}financials.js`}
            config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
            height={464}
          />
        </div>
      </div>
    </div>
  );
};

export default StockDetailsPage;
