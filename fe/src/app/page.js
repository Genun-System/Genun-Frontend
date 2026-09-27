"use client"

import Typed from 'typed.js';
import { useRef, useEffect } from "react";
import Security from "./assets/images/security.png";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Landing() {
  const el = useRef(null);

  useEffect(() => {
    if (el.current) {
      const typed = new Typed(el.current, {
        strings: ['Be Unique', 'Be Original', 'Be Authentic'],
        typeSpeed: 100,
        showCursor: false,
        loop: true,
        backSpeed: 50,
        backDelay: 2000
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section with Shield */}
      <div className="pt-20 px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto min-h-[80vh]">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h1 className="text-6xl font-bold text-white mb-4">
              We want you to be the best you
            </h1>
            <div 
              ref={el} 
              className="text-4xl font-bold mb-8"
              style={{color: '#00AFFF'}}
            />
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Revolutionizing product authenticity through blockchain technology. 
              Protect your brand, build consumer trust.
            </p>

            <div className="flex gap-4">
              <button 
                onClick={() => {
                  console.log("Get Started clicked - navigating to /get-started");
                  window.location.href = "/get-started";
                }}
                className="px-8 py-4 text-white rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer font-medium hover:shadow-lg hover:shadow-blue-400/25"
                style={{backgroundColor: '#00AFFF'}}
              >
                Get Started
              </button>
              <button 
                onClick={() => {
                  console.log("Watch Demo clicked - navigating to /contact");
                  window.location.href = "/contact";
                }}
                className="px-8 py-4 border-2 border-white/30 text-white rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer font-medium"
              >
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Column - Shield Image with More Space */}
          <div className="flex justify-center lg:justify-end pl-12">
            <div className="relative p-12">
              <div className="relative border-2 border-dashed border-blue-400/30 rounded-full p-12 hover:border-blue-400/60 transition-all duration-500">
                <Image
                  src={Security}
                  alt="security-genun"
                  className="transform hover:scale-110 transition-transform duration-700 ease-out max-w-full h-auto"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="py-32 mt-20">
        <h2 className="text-5xl font-bold text-white text-center mb-16">
          How Genun Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto px-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{backgroundColor: '#00AFFF'}}>
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Manufacturer Registration</h3>
            <p className="text-gray-300">Companies register their products on our secure blockchain platform</p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-purple-500">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Blockchain Verification</h3>
            <p className="text-gray-300">Each product gets a unique, immutable digital identity</p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-green-500">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Consumer Verification</h3>
            <p className="text-gray-300">Customers scan QR codes to instantly verify authenticity</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-5xl font-bold text-white text-center mb-16">
          Why Choose Genun?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-500 group hover:transform hover:scale-105">
            <div className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center" style={{backgroundColor: '#00AFFF'}}>
              <span className="text-white text-2xl">🔒</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Unbreakable Security</h3>
            <p className="text-gray-300">Military-grade blockchain encryption ensures your product data remains tamper-proof and secure.</p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-500 group hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-purple-500 mb-6 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
            <p className="text-gray-300">Instant verification in under 2 seconds. Your customers get immediate authenticity confirmation.</p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-500 group hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-green-500 mb-6 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Real-time Analytics</h3>
            <p className="text-gray-300">Track verification patterns, identify counterfeit attempts, and gain valuable market insights.</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-white text-center mb-16">
            Trusted by Industry Leaders
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">10K+</div>
              <div className="text-gray-300">Products Protected</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">500+</div>
              <div className="text-gray-300">Manufacturers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">50+</div>
              <div className="text-gray-300">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-white text-center mb-16">
            Industry Applications
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">👕</span>
              </div>
              <h3 className="text-xl font-bold text-white">Fashion & Luxury</h3>
              <p className="text-gray-400 text-sm">Protect high-end brands from counterfeiting</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">💊</span>
              </div>
              <h3 className="text-xl font-bold text-white">Pharmaceuticals</h3>
              <p className="text-gray-400 text-sm">Ensure medication authenticity and safety</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-white">Electronics</h3>
              <p className="text-gray-400 text-sm">Verify genuine electronic components</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🍷</span>
              </div>
              <h3 className="text-xl font-bold text-white">Food & Beverage</h3>
              <p className="text-gray-400 text-sm">Track origin and authenticity of products</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-5xl font-bold text-white mb-6">
          Ready to Protect Your Brand?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of manufacturers who trust Genun to secure their products and build customer confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => {
              console.log("Start Free Trial clicked - navigating to /get-started");
              window.location.href = "/get-started";
            }}
            className="px-10 py-4 text-white rounded-lg text-lg transition-all duration-300 hover:scale-105 cursor-pointer font-medium hover:shadow-lg hover:shadow-blue-400/25"
            style={{backgroundColor: '#00AFFF'}}
          >
            Start Free Trial
          </button>
          <button 
            onClick={() => {
              console.log("Schedule Demo clicked - navigating to /contact");
              window.location.href = "/contact";
            }}
            className="px-10 py-4 border-2 border-white/30 text-white rounded-lg hover:bg-white/10 text-lg transition-all duration-300 cursor-pointer font-medium"
          >
            Schedule Demo
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}