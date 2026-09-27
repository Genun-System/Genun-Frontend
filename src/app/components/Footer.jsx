"use client"

import Link from "next/link";
import { Typography } from "./MaterialTailwind";
import Image from "next/image";
import TwitterIcon from "../assets/images/twitter.webp";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-black border-t-2 border-primary/30 mt-auto overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black to-gray-900/30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5"></div>
                
                {/* Floating particles */}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center mb-6 group">
                            <img 
                                src="/Logo1.svg" 
                                alt="Genun Logo" 
                                className="h-12 w-auto group-hover:scale-110 transition-transform duration-300" 
                            />
                        </Link>
                        <Typography className="text-white/80 mb-6 max-w-md leading-relaxed text-lg">
                            Genun provides authenticity and verification to products created by manufacturers 
                            from diverse sectors using cutting-edge blockchain technology.
                        </Typography>
                        
                        {/* Social Links */}
                        <div className="flex space-x-6">
                            {/* X (Twitter) with custom image */}
                            <a 
                                href="#" 
                                className="text-white/60 hover:text-blue-400 transition-all duration-300 hover:scale-125 transform"
                            >
                                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors duration-300">
                                    <Image 
                                        src={TwitterIcon}
                                        alt="X (Twitter)"
                                        width={20}
                                        height={20}
                                        className="object-contain"
                                    />
                                </div>
                            </a>

                            {/* Other social icons */}
                            {[
                                { 
                                    name: "LinkedIn",
                                    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                                    color: "hover:text-blue-600"
                                }
                            ].map((social, index) => (
                                <a 
                                    key={index}
                                    href="#" 
                                    className={`text-white/60 ${social.color} transition-all duration-300 hover:scale-125 transform`}
                                >
                                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors duration-300">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={social.path}/>
                                        </svg>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-primary">
                            Quick Links
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Brands", href: "/brands" },
                                { name: "About Us", href: "/about" },
                                { name: "Services", href: "/services" },
                                { name: "Contact", href: "/contact" }
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link 
                                        href={link.href} 
                                        className="text-white/70 hover:text-primary transition-all duration-300 hover:translate-x-2 transform inline-block group"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-primary/50 rounded-full group-hover:bg-primary transition-colors duration-300"></span>
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold text-xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">
                            Services
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Product Verification", href: "/product-verification" },
                                { name: "Manufacturer Portal", href: "/manufacturer-portal" },
                                { name: "Blockchain Auth", href: "/blockchain-authentication" },
                                { name: "Supply Chain", href: "/supply-chain" }
                            ].map((service, index) => (
                                <li key={index}>
                                    <Link 
                                        href={service.href} 
                                        className="text-white/70 hover:text-purple-400 transition-all duration-300 hover:translate-x-2 transform inline-block group"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-purple-400/50 rounded-full group-hover:bg-purple-400 transition-colors duration-300"></span>
                                            {service.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <Typography className="text-white/60 text-sm">
                            © {currentYear} Genun. All rights reserved. Powered by blockchain technology.
                        </Typography>
                        <div className="flex flex-wrap gap-6">
                            {[
                                { name: "Privacy Policy", href: "/privacy" },
                                { name: "Terms of Service", href: "/terms" },
                                { name: "Security", href: "/security" }
                            ].map((legal, index) => (
                                <Link 
                                    key={index}
                                    href={legal.href} 
                                    className="text-white/60 hover:text-white text-sm transition-colors duration-300 hover:underline"
                                >
                                    {legal.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    
                    {/* Additional branding */}
                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <Typography className="text-white/40 text-xs">
                            🔐 Securing authenticity through blockchain innovation 🚀
                        </Typography>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;