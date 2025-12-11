import "./globals.css";
import { crimsonText, oxygen, dmSans, inter, oxygenMono } from "./fonts";
import '@rainbow-me/rainbowkit/styles.css';
import Providers from "./providers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const metadata = {
  title: "PoOs",
  description: "A solution to product ingenuity  in the supply chain",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en"
      className={`${crimsonText.variable} ${oxygen.variable} ${dmSans.variable} ${inter.variable} ${oxygenMono.variable}`}
    >
      <body className={`bg-background`}>
        <Providers>
          {children}
        </Providers>
        <ToastContainer/>
      </body>
    </html>
  );
}

