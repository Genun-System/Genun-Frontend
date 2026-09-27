import Header from "../components/Header";
import Footer from "../components/Footer";
import { Typography } from "../components/MaterialTailwind";
import Button from "../components/Button";

const ContactPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-black">
            <Header />
            <main className="flex-1 py-20 px-6 md:px-10 lg:px-[91px]">
                <div className="max-w-4xl mx-auto">
                    <Typography className="font-crimsonText font-semibold text-[48px] leading-[72px] text-white mb-8 text-center">
                        Contact Us
                    </Typography>
                    
                    <Typography className="text-white/80 text-lg text-center mb-16">
                        Get in touch with our team to learn more about Genun's blockchain solutions.
                    </Typography>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white/10 rounded-lg p-8">
                            <Typography className="text-white font-semibold text-2xl mb-6">
                                Send us a message
                            </Typography>
                            
                            <form className="space-y-6">
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder="Your Name"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="email" 
                                        placeholder="Your Email"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder="Subject"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <textarea 
                                        rows={5}
                                        placeholder="Your Message"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-primary resize-none"
                                    ></textarea>
                                </div>
                                <Button variant="filled" className="w-full bg-primary hover:bg-primary/90">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                        
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="bg-white/10 rounded-lg p-6">
                                <Typography className="text-white font-semibold text-xl mb-4">
                                    📧 Email
                                </Typography>
                                <Typography className="text-white/80">
                                    support@genun.com
                                </Typography>
                            </div>
                            
                            <div className="bg-white/10 rounded-lg p-6">
                                <Typography className="text-white font-semibold text-xl mb-4">
                                    📞 Phone
                                </Typography>
                                <Typography className="text-white/80">
                                    +1 (555) 123-4567
                                </Typography>
                            </div>
                            
                            <div className="bg-white/10 rounded-lg p-6">
                                <Typography className="text-white font-semibold text-xl mb-4">
                                    📍 Address
                                </Typography>
                                <Typography className="text-white/80">
                                    123 Blockchain Street<br />
                                    Tech City, TC 12345<br />
                                    United States
                                </Typography>
                            </div>
                            
                            <div className="bg-white/10 rounded-lg p-6">
                                <Typography className="text-white font-semibold text-xl mb-4">
                                    🕒 Business Hours
                                </Typography>
                                <Typography className="text-white/80">
                                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                                    Saturday: 10:00 AM - 4:00 PM<br />
                                    Sunday: Closed
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

export default ContactPage;