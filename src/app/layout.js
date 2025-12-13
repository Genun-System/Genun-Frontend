import "./globals.css";
import { crimsonText, oxygen, dmSans, inter, oxygenMono } from "./fonts";
import '@rainbow-me/rainbowkit/styles.css';
import Providers from "./providers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalSetup from "./components/ModalSetup";
import dynamic from 'next/dynamic';

// Dynamically import Web3 components with SSR disabled
const WalletConnectionFallback = dynamic(
  () => import("./components/WalletConnectionFallback"),
  { ssr: false }
);

const NetworkStatus = dynamic(
  () => import("./components/NetworkStatus"),
  { ssr: false }
);


export const metadata = {
  title: "PoOs",
  description: "A solution to product ingenuity  in the supply chain",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en"
      className={`${crimsonText.variable} ${oxygen.variable} ${dmSans.variable} ${inter.variable} ${oxygenMono.variable}`}
    >
      <body className={`bg-black`} id="root">
        <ModalSetup />
        <Providers>
          <WalletConnectionFallback>
            {children}
          </WalletConnectionFallback>
          <NetworkStatus />
        </Providers>
        <ToastContainer/>
      </body>
    </html>
  );
}

