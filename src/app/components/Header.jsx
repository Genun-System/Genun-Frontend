"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ConnectButton } from "./Ranbowkit";
import { useStellarWallet } from "../stellar/StellarWalletProvider";
import Link from "next/link";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { isConnected, address } = useStellarWallet();

    const navItems = [
        { name: "Brands", href: "/brands" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Contact Us", href: "/contact" }
    ];

    const getHeaderButton = () => {
        if (pathname === "/get-started") {
            return {
                text: "Connect Wallet",
                action: () => { window.location.href = "/connect-wallet"; }
            };
        }
        if (pathname === "/connect-wallet" || pathname === "/login") {
            return {
                text: "Dashboard",
                action: () => { window.location.href = "/dashboard/manufacturer"; }
            };
        }
        return {
            text: "Get Started",
            action: () => { window.location.href = "/get-started"; }
        };
    };

    const headerButton = getHeaderButton();

    return (
        <header className="w-full bg-black/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
            <div className="flex flex-row w-full justify-between items-center py-4 px-6 md:px-10 lg:px-[91px]">
                <Link href="/" className="flex-shrink-0">
                    <img src="/genun.svg" alt="genun-logo" className="h-12 w-auto" />
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-white/80 hover:text-white transition-colors duration-300 font-medium relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <ConnectButton />
                    <button
                        onClick={headerButton.action}
                        className="px-6 py-2 text-white rounded-lg transition-all duration-300 hover:scale-105 font-medium"
                        style={{ backgroundColor: "#00AFFF" }}
                    >
                        {headerButton.text}
                    </button>
                </div>

                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t border-white/10 px-6 py-4 space-y-4">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className="block text-white/80" onClick={() => setIsMenuOpen(false)}>
                            {item.name}
                        </Link>
                    ))}
                    <ConnectButton />
                    {isConnected && address ? (
                        <p className="text-xs text-gray-400 break-all">{address}</p>
                    ) : null}
                </div>
            )}
        </header>
    );
};

export default Header;
