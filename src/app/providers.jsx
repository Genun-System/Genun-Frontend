'use client';
import dynamic from "next/dynamic";
import { ThemeProvider } from "./components/MaterialTailwind"
import '@rainbow-me/rainbowkit/styles.css';

// Disable SSR completely for Web3 components
const ClientOnlyProviders = dynamic(
  () => import('./components/ClientOnlyProviders'),
  { ssr: false }
);

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ClientOnlyProviders>
        {children}
      </ClientOnlyProviders>
    </ThemeProvider>
  );
}

