import { motion } from "framer-motion"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-neon-purple/20 bg-background/50 backdrop-blur-sm"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent mb-2">
                            erick.main Portfolio
                        </h3>
                        <p className="text-sm text-foreground/60">Crafted with passion and modern web technologies.</p>
                    </div>

                    {/*<div className="text-center text-sm text-foreground/60">*/}
                    {/*    <p>© {currentYear} All rights reserved.</p>*/}
                    {/*    <p className="mt-2">*/}
                    {/*        Designed & built with <span className="text-neon-purple">React</span>,{" "}*/}
                    {/*        <span className="text-neon-blue">TypeScript</span>, and{" "}*/}
                    {/*        <span className="text-neon-purple">Tailwind CSS</span>*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                </div>
            </div>
        </motion.footer>
    )
}
