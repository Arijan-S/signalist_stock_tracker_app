import { getUserWatchlist } from "@/lib/actions/watchlist.actions";
import Link from "next/link";
import WatchlistButton from "@/components/WatchlistButton";

const WatchlistPage = async () => {
  const watchlistItems = await getUserWatchlist();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-100">My Watchlist</h1>
        <p className="text-gray-400">{watchlistItems.length} stocks</p>
      </div>

      {watchlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-[#0F0F0F] rounded-lg border border-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 text-gray-600 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.04 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-300 mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-gray-500 text-center mb-6 max-w-md">
            Start building your watchlist by adding stocks you want to track.
            Search for stocks and click the star icon to add them.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Browse Stocks
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {watchlistItems.map((item) => (
            <Link
              key={item.symbol}
              href={`/stocks/${item.symbol}`}
              className="bg-[#0F0F0F] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all hover:shadow-lg group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-100 group-hover:text-yellow-500 transition-colors">
                    {item.symbol}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{item.company}</p>
                </div>
                <WatchlistButton
                  symbol={item.symbol}
                  company={item.company}
                  isInWatchlist={true}
                  type="icon"
                />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <span className="text-xs text-gray-500">
                  Added {new Date(item.addedAt).toLocaleDateString()}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600 group-hover:text-yellow-500 transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
