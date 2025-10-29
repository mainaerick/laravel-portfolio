import { motion } from "framer-motion"
import { Mail, Linkedin, Github, Twitter } from "lucide-react"
import ContactForm from '@/Components/ContactForm';

export default function ContactSection() {
    const socialLinks = [
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
    ]

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              Let's Work Together
            </span>
                    </h2>
                    <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                        Have a project in mind? I'd love to hear about it. Get in touch and let's create something amazing.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <ContactForm />
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">Get in Touch</h3>
                            <p className="text-foreground/70 leading-relaxed mb-6">
                                Whether you have a question or just want to say hello, feel free to reach out. I'm always interested in
                                hearing about new projects and opportunities.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-neon-purple/10 border border-neon-purple/30 text-neon-purple mt-1">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                                    <a
                                        href="mailto:hello@example.com"
                                        className="text-foreground/70 hover:text-neon-purple transition-colors"
                                    >
                                        hello@example.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Follow Me</h4>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon
                                    return (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            whileHover={{ scale: 1.1, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="p-3 rounded-lg bg-neon-purple/10 border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/20 hover:border-neon-purple/60 transition-all"
                                            title={social.label}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </motion.a>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
