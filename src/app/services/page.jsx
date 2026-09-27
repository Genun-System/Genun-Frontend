import Header from "../components/Header";
import Footer from "../components/Footer";
import { Typography } from "../components/MaterialTailwind";

const ServicesPage = () => {
    const services = [
        {
            title: "Product Authentication",
            description: "Blockchain-based verification system that creates immutable records of product authenticity.",
            icon: "🔐"
        },
        {
            title: "Supply Chain Tracking",
            description: "End-to-end visibility of products from manufacturing to consumer delivery.",
            icon: "📦"
        },
        {
            title: "QR Code Generation",
            description: "Unique QR codes for each product that link to blockchain verification records.",
            icon: "📱"
        },
        {
            title: "Manufacturer Portal",
            description: "Comprehensive dashboard for manufacturers to manage products and view analytics.",
            icon: "🏭"
        },
        {
            title: "Consumer Verification",
            description: "Easy-to-use interface for consumers to verify product authenticity instantly.",
            icon: "✅"
        },
        {
            title: "Anti-Counterfeiting",
            description: "Advanced protection against counterfeit products using blockchain technology.",
            icon: "🛡️"
        }
    ];

    return (
        <div className="flex min-h-screen flex-col bg-black">
            <Header />
            <main className="flex-1 py-20 px-6 md:px-10 lg:px-[91px]">
                <div className="max-w-6xl mx-auto">
                    <Typography className="font-crimsonText font-semibold text-[48px] leading-[72px] text-white mb-8 text-center">
                        Our Services
                    </Typography>
                    
                    <Typography className="text-white/80 text-lg text-center mb-16 max-w-3xl mx-auto">
                        Comprehensive blockchain solutions for product authenticity, supply chain transparency, 
                        and consumer trust.
                    </Typography>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-colors">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <Typography className="text-white font-semibold text-xl mb-4">
                                    {service.title}
                                </Typography>
                                <Typography className="text-white/80">
                                    {service.description}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ServicesPage;