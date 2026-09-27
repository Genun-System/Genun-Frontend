import Header from "../components/Header";
import Footer from "../components/Footer";
import { Typography } from "../components/MaterialTailwind";

const BrandsPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-black">
            <Header />
            <main className="flex-1 py-20 px-6 md:px-10 lg:px-[91px]">
                <div className="max-w-4xl mx-auto text-center">
                    <Typography className="font-crimsonText font-semibold text-[48px] leading-[72px] text-white mb-8">
                        Trusted Brands
                    </Typography>
                    <Typography className="text-white/80 text-lg mb-12">
                        Discover the brands that trust Genun for product authenticity and verification.
                    </Typography>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                        {/* Brand logos would go here */}
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <div key={item} className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-colors">
                                <div className="h-16 bg-white/20 rounded flex items-center justify-center">
                                    <Typography className="text-white font-semibold">
                                        Brand {item}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BrandsPage;