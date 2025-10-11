# 📈 Signalist App

A modern, full-stack stock market tracking application built with Next.js 15, featuring real-time market data, interactive charts, and personalized watchlists.

![Dashboard Preview](public/assets/images/dashboard-preview.png)

## ✨ Features

- **📊 Real-time Market Data** - Live stock quotes, market overview, and heatmaps powered by TradingView widgets
- **📰 Market News** - Stay updated with the latest financial news from Finnhub API
- **⭐ Watchlist Management** - Create and manage your personalized stock watchlist
- **🔍 Advanced Stock Search** - Search through thousands of stocks with autocomplete
- **🔐 Secure Authentication** - User authentication powered by Better Auth
- **📱 Responsive Design** - Fully responsive UI that works on all devices
- **🎨 Modern UI** - Beautiful, accessible interface built with Radix UI and Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router and Turbopack
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **TradingView Widgets** - Professional-grade financial charts
- **Lucide React** - Beautiful icon library

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **Better Auth** - Modern authentication solution
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling
- **Finnhub API** - Real-time stock market data

### Additional Tools

- **React Hook Form** - Efficient form handling
- **Sonner** - Toast notifications
- **next-themes** - Dark/light mode support
- **CMDK** - Command menu interface

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed on your machine
- MongoDB database (local or cloud-based like MongoDB Atlas)
- Finnhub API key ([Get one for free](https://finnhub.io/register))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/signalist_app.git
   cd signalist_app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory with the following variables:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Finnhub API
   FINNHUB_API_KEY=your_finnhub_api_key
   NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_api_key

   # Better Auth
   BETTER_AUTH_SECRET=your_secret_key_here
   BETTER_AUTH_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
signalist_app/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/             # Sign in page
│   │   └── sign-up/             # Sign up page
│   ├── (root)/                   # Main application routes
│   │   ├── page.tsx             # Home/dashboard page
│   │   ├── stocks/[symbol]/     # Individual stock pages
│   │   └── watchlist/           # User watchlist page
│   ├── api/                      # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   └── health/              # Health check endpoints
│   ├── hooks/                    # Custom React hooks
│   └── types/                    # TypeScript type definitions
├── components/                   # React components
│   ├── forms/                    # Form components
│   ├── ui/                       # UI components (Radix)
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Footer component
│   ├── SearchCommand.tsx        # Stock search command
│   ├── TradingViewWidget.tsx    # TradingView widget wrapper
│   └── WatchlistButton.tsx      # Watchlist toggle button
├── database/                     # Database configuration
│   ├── models/                   # Mongoose models
│   │   └── watchlist.model.ts   # Watchlist schema
│   └── mongoose.ts              # MongoDB connection
├── lib/                          # Utility functions
│   ├── actions/                  # Server actions
│   │   ├── auth.actions.ts      # Authentication logic
│   │   ├── finnhub.actions.ts   # Finnhub API calls
│   │   ├── user.actions.ts      # User management
│   │   └── watchlist.actions.ts # Watchlist operations
│   ├── better-auth/             # Auth configuration
│   │   └── auth.ts              # Better Auth setup
│   ├── constats.ts              # App constants
│   └── utils.ts                 # Helper functions
├── hooks/                        # Additional hooks
│   ├── useDebounce.ts           # Debounce hook
│   └── useTradingViewWidget.tsx # TradingView hook
├── public/                       # Static assets
│   └── assets/                  # Images and icons
└── middleware.ts                # Next.js middleware
```

## 🔑 Environment Variables

| Variable                      | Description                              | Required |
| ----------------------------- | ---------------------------------------- | -------- |
| `MONGODB_URI`                 | MongoDB connection string                | Yes      |
| `FINNHUB_API_KEY`             | Finnhub API key for server-side requests | Yes      |
| `NEXT_PUBLIC_FINNHUB_API_KEY` | Finnhub API key for client-side requests | Yes      |
| `BETTER_AUTH_SECRET`          | Secret key for authentication            | Yes      |
| `BETTER_AUTH_URL`             | Base URL of your application             | Yes      |

## 🎯 Key Features Explained

### Dashboard

The home page displays multiple TradingView widgets including:

- Market Overview - Real-time market indices and trends
- Stock Heatmap - Visual representation of market performance
- Top Stories Timeline - Latest financial news
- Market Quotes - Live stock quotes for major indices

### Stock Search

Powered by Finnhub API, the search feature allows users to:

- Search through thousands of stocks
- View real-time stock information
- Add/remove stocks from watchlist
- Navigate to detailed stock pages

### Watchlist

Users can create personalized watchlists to:

- Track favorite stocks
- View aggregated news for watchlist symbols
- Quick access to stock details
- Persistent storage in MongoDB

### Authentication

Secure user authentication with:

- Email/password sign up and sign in
- Session management
- Protected routes
- User profile management

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Railway
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 📝 Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under ASDEVELOPED License.

## 🙏 Acknowledgments

- [TradingView](https://www.tradingview.com/) for the excellent charting widgets
- [Finnhub](https://finnhub.io/) for providing comprehensive stock market data
- [Better Auth](https://www.better-auth.com/) for the authentication solution
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

Built with ❤️ using Next.js and TypeScript
