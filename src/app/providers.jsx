'use client';
import { ThemeProvider } from "./components/MaterialTailwind"
import '@rainbow-me/rainbowkit/styles.css';
import ClientOnlyProviders from './components/ClientOnlyProviders';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ClientOnlyProviders>
        {children}
      </ClientOnlyProviders>
    </ThemeProvider>
  );
}

