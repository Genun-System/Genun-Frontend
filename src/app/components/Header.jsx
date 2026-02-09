"use client"

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';
import Link from "next/link";
import Image from "next/image";

// Dynamically import the wallet button component to avoid SSR issues
const WalletButton = dynamic(
    () => import('./WalletButton'),
    { ssr: false }
);

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const navItems = [
        { name: "Brands", href: "/brands" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Contact Us", href: "/contact" }
    ];

    // Determine button text and action based on current route
    const getHeaderButton = () => {
        if (pathname === "/get-started") {
            return {
                text: "Connect Wallet",
                action: () => {
                    console.log("Connect Wallet clicked - navigating to /connect-wallet");
                    window.location.href = "/connect-wallet";
                }
            };
        }
        
        if (pathname === "/connect-wallet") {
            return {
                text: "Dashboard",
                action: () => {
                    console.log("Dashboard clicked - navigating to /dashboard/manufacturer");
                    window.location.href = "/dashboard/manufacturer";
                }
            };
        }
        
        if (pathname === "/login") {
            return {
                text: "Dashboard",
                action: () => {
                    console.log("Dashboard clicked - navigating to /dashboard/manufacturer");
                    window.location.href = "/dashboard/manufacturer";
                }
            };
        }
        
        return {
            text: "Get Started",
            action: () => {
                console.log("Get Started clicked - navigating to /get-started");
                window.location.href = "/get-started";
            }
        };
    };

    const headerButton = getHeaderButton();

    return (
        <header className="w-full bg-black/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
            <div className="flex flex-row w-full justify-between items-center py-4 px-6 md:px-10 lg:px-[91px]">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <Image src="/genun.png" alt="genun-logo" width={80} height={80} className="h-16 md:h-20 w-auto hover:scale-105 transition-transform duration-300" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-white/80 hover:text-white transition-colors duration-300 font-medium relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* Dynamic Header Button */}
                <div className="hidden md:block">
                    {isMounted && <WalletButton pathname={pathname} headerButton={headerButton} />}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
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

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10 animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col space-y-4 p-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-white/80 hover:text-white transition-colors duration-300 font-medium py-2 border-b border-white/10 last:border-b-0"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        {isMounted && <WalletButton pathname={pathname} headerButton={headerButton} isMobile onClose={() => setIsMenuOpen(false)} />}
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;