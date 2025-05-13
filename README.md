# Solana Blockchain Explorer

A lightweight, React-based blockchain explorer for the Solana network, built with **Next.js (App Router)** and deployed on **Vercel**. This project is a take-home assignment for Zeus Network.

[🔗 Assignment Description](https://zeusnetwork.notion.site/Take-home-Assignment-Solana-Blockchain-Explorer-Front-end-1abcc3db3084801cbbc5cbb45fc9165a)

---

## ✅ Features

- 🔄 **Latest Blocks List**: Homepage displays paginated list of recent blocks on Solana.
- 📦 **Block Details Page**: View full metadata and transactions of a selected block.
- 🔍 **Transaction Details Page**: Inspect complete details of any transaction.
- 🔎 **Search Feature**: Search by block slot or transaction signature.
- ↕️ **Sorting & Filtering**: Sort and filter block and transaction data by key columns.
- 🚀 **Deployed on Vercel** for fast, SSR-ready performance.

---

## 🛠️ Configuration (Required Before Running)

Before starting development, create a `.env.local` file at the root of the project using the provided `.env.example`:

```bash
cp .env.example .env
````

Then, configure the required Solana RPC endpoint:

```env
CLUSTER_URL=https://api.devnet.solana.com
```

You must set this variable to connect to a valid Solana RPC node.

---

## ⚙️ Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run in development mode

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🏗️ Architecture

This project is built with:

* **Next.js (App Router)** – Modern routing, layouts, and server actions
* **React** – Component-based UI development
* **Material UI (MUI)** – Component-based UI styling framework
* **@solana/kit** – Official Solana SDK (v2) for interacting with the blockchain
* **TypeScript** – Type safety and better DX
* **Server Actions** – Used for most Solana API interactions instead of React Query
* **Gexii** – A custom utility library used internally

---

## 📁 Directory Structure

```
src/
├── actions/               # Server actions for API handling
│   └── search.ts
├── app/                   # App directory with Next.js routing
│   ├── blocks/            # Block list and detail pages
│   ├── transactions/      # Transaction list and detail pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # App-wide layout
│   └── error.tsx          # Global error handling
├── components/            # Reusable UI components
├── constants/             # Constants such as IDL maps
├── hoc/                   # Higher-order components
├── layout/                # Layout and header
├── services/              # Blockchain interaction logic
│   ├── block.ts
│   ├── transaction.ts
│   └── core.ts
├── theme/                 # MUI theme configuration and overrides
├── utils/                 # Utility functions
├── view/                  # Page-specific views and fragments
.env
.env.example
```

---

## 🔧 Build for Production

```bash
pnpm build
pnpm start
```

This compiles the app and starts it in production mode.

---

## 📦 Deployment

This project is deployed on **Vercel** to take advantage of its native Next.js support and fast global CDN.

### To deploy:

1. Push your code to a GitHub repository.
2. Connect the repo to [Vercel](https://vercel.com).
3. Set the `CLUSTER_URL` environment variable in the Vercel dashboard.
4. Vercel will handle build and deployment automatically.

---

## 📄 License

This project is provided for evaluation purposes only as part of a technical assignment.
