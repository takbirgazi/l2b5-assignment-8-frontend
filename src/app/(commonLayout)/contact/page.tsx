import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import ContactForm from "@/components/modules/contact/ContactForm"

export default function ContactPage() {

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Have questions or need help? Reach out to us and we’ll respond as quickly as possible.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Contact Information */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Mail className="w-6 h-6 text-primary" />
                                <div>
                                    <h4 className="font-semibold">Email</h4>
                                    <p className="text-muted-foreground">takbirgazibd@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Phone className="w-6 h-6 text-primary" />
                                <div>
                                    <h4 className="font-semibold">Phone</h4>
                                    <p className="text-muted-foreground">+8801811947182</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <MapPin className="w-6 h-6 text-primary" />
                                <div>
                                    <h4 className="font-semibold">Address</h4>
                                    <p className="text-muted-foreground">Khulna, Bangladesh</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Optional Google Map */}
                    <div className="rounded-xl overflow-hidden shadow-lg h-64">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d58836.22898376818!2d89.51578550781251!3d22.829708736793847!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff9071cb47152f%3A0xf04b212290718952!2sKhulna!5e0!3m2!1sen!2sbd!4v1755786567057!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Form */}
                <Card className="p-6">
                    <ContactForm />
                </Card>
            </div>
        </section>
    )
};