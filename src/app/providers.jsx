'use client';
import { ThemeProvider } from "./components/MaterialTailwind"
import { StellarWalletProvider } from "./stellar/StellarWalletProvider";

export default function Providers({ children }) {
  return (
        <ThemeProvider>
          <StellarWalletProvider>
            {children}
          </StellarWalletProvider>
        </ThemeProvider>
  );
}
