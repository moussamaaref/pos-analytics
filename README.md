# POS Analytics Dashboard

A modern, minimal business intelligence dashboard for Point of Sale (POS) analytics, providing comprehensive sales, stock, and performance insights for managers to enable data-driven decision-making.

## 🎨 Design

**Modern Minimal Design System**
- Clean, light theme with indigo accent colors
- Generous whitespace and refined typography (Inter + JetBrains Mono)
- Subtle purple gradient grid background
- Rounded corners and soft shadows for depth
- Responsive layout optimized for desktop viewing

## 📊 Features

### Dashboard Overview
- **Key Performance Indicators (KPIs)**: Real-time metrics for total revenue, sales volume, orders, products sold, active POS locations, and average basket value
- **Sales Evolution**: Monthly revenue trends with interactive area charts
- **Category Analysis**: Donut charts showing sales distribution across product categories
- **Brand Performance**: Horizontal bar charts comparing sales by brand
- **Period Comparison**: Bar charts for period-over-period analysis

### Detailed Analytics
- **POS Performance**: Individual point-of-sale analysis with detailed performance tables
- **Product Analysis**: Hierarchical tree view of products by brand → category → reference
- **Sales Analysis**: Daily, weekly, and monthly sales trends with average basket metrics
- **Stock Management**: Current inventory levels, stock movements, and rotation analysis
- **Commercial Performance**: Objective tracking, progress bars, and PDV rankings
- **Forecasting**: Historical data with 3-month moving average predictions

### Filtering & Export
- Time period filters (Today, Yesterday, Week, Month, Quarter, Year, Custom)
- Geographic filters (Wilayas/Provinces)
- POS location filters
- Brand and category filters
- Export options (Excel, CSV, PDF)

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript 6.0
- **Charts**: Recharts 3.10
- **Utilities**: tailwind-merge, clsx
- **Fonts**: Inter (sans-serif), JetBrains Mono (monospace)

## 🚀 Getting Started

### Prerequisites
- Node.js (recommended version specified in `.mise.toml`)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

The Vite development server runs on port 8443 by default. Access the dashboard at:
```
http://localhost:8443
```

## 📁 Project Structure

```
pos-analytics/
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── background-components.tsx  # Background with gradient grid
│   ├── lib/
│   │   └── utils.ts                        # Utility functions (cn)
│   ├── App.tsx                            # Main application component
│   ├── index.css                          # Global styles and Tailwind import
│   ├── main.tsx                           # React entry point
│   └── vite-env.d.ts                      # Vite type definitions
├── .figma/                               # Figma Make configuration
├── index.html                            # HTML shell
├── package.json                          # Dependencies and scripts
├── tsconfig.json                         # TypeScript configuration
└── vite.config.ts                        # Vite configuration
```

## 🎨 Design System

### Color Palette
- **Background**: #fafafa (light gray)
- **Surface**: #ffffff (white)
- **Border**: #eaeaea (subtle gray)
- **Accent**: #6366f1 (indigo)
- **Text**: #1a1a1a (near black)
- **Text Muted**: #666666 (medium gray)

### Typography
- **Sans-serif**: Inter (300, 400, 500, 600, 700)
- **Monospace**: JetBrains Mono (400, 500, 600)
- **Labels**: 11px with 0.12em letter spacing
- **Body**: 12px and up

### Spacing
- **Cards**: p-6 (24px padding)
- **Sections**: mb-8 (32px margin bottom)
- **Grid gaps**: gap-4 (16px)
- **Button padding**: px-4 py-2

## 📈 Data Architecture

The dashboard uses mock data for demonstration purposes. In production, it would connect to:
- **Database**: PostgreSQL
- **ETL Pipeline**: Data extraction, transformation, and loading
- **Data Warehouse**: Centralized data storage
- **Real-time Updates**: Configurable refresh frequency

## 🔧 Configuration

### Environment Variables
No environment variables are required for the basic setup. For production deployment:
- `PORT`: Server port (default: 8443)
- `FIGMA_PUBLIC_URL`: Public URL for Figma Make deployment

### TypeScript Configuration
- Target: ES2020
- Module: ESNext
- Strict mode enabled
- Path alias: `@/` → `./src`

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run format   # Format code with oxfmt
```

## 🌐 Deployment

The project is configured for Figma Make deployment. For other platforms:
- **Vercel**: Deploy directly from GitHub
- **Netlify**: Connect repository and build with `npm run build`
- **Docker**: Create a Dockerfile for containerized deployment

## 🤝 Contributing

This is a demonstration project. For production use, consider:
- Adding real data connections
- Implementing authentication
- Adding error boundaries
- Writing comprehensive tests
- Adding internationalization (i18n)

## 📄 License

This project is for demonstration purposes.

## 👤 Author

Created for POS Analytics business intelligence needs.

---

**Built with React, Vite, Tailwind CSS, and Recharts**
