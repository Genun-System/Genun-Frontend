import Header from "../components/Header";
import Footer from "../components/Footer";
import { Typography } from "../components/MaterialTailwind";

const AboutPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-black">
            <Header />
            <main className="flex-1 py-20 px-6 md:px-10 lg:px-[91px]">
                <div className="max-w-4xl mx-auto">
                    <Typography className="font-crimsonText font-semibold text-[48px] leading-[72px] text-white mb-8 text-center">
                        About Genun
                    </Typography>
                    
                    <div className="space-y-8 text-white/80">
                        <Typography className="text-lg leading-relaxed">
                            Genun is a revolutionary blockchain-based platform that provides authenticity 
                            verification for products across diverse industries. Our mission is to combat 
                            counterfeiting and ensure product originality through cutting-edge technology.
                        </Typography>
                        
                        <Typography className="text-lg leading-relaxed">
                            Using advanced blockchain technology and smart contracts, we create immutable 
                            records of product authenticity that cannot be tampered with or forged. 
                            Each product gets a unique digital identity that can be verified by consumers, 
                            retailers, and supply chain partners.
                        </Typography>
                        
                        <div className="grid md:grid-cols-2 gap-8 mt-12">
                            <div className="bg-white/10 rounded-lg p-6">
                                <Typography className="text-white font-semibold text-xl mb-4">
                                    Our Vision
                                </Typography>
                                <Typography className="text-white/80">
                                    To create a world where every product's authenticity can be instantly 
                                    verified, eliminating counterfeiting and building consumer trust.
                                </Typography>
                            </div>
                            
                            <div className="bg-white/10 rounded-lg p-6">
                                <Typography className="text-white font-semibold text-xl mb-4">
                                    Our Mission
                                </Typography>
                                <Typography className="text-white/80">
                                    To empower manufacturers with blockchain technology to protect their 
                                    brands and provide consumers with confidence in their purchases.
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;