
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';



export default function Navbar() {
    const [activeSection, setActiveSection]= useState("hero")
    const sections = [
        { id: "hero", label: "Home" },
        { id: "about", label: "About" },
        { id: "projects", label: "Projects" },
        { id: "contact", label: "Contact" },
    ]

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            setActiveSection(id)        }
    }


    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-neon-purple/20"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent"
                >
                    erick.maina
                </motion.div>

                <div className="hidden md:flex items-center gap-8">
                    {sections.map((section) => (
                        <motion.button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="relative text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                            whileHover={{ scale: 1.05 }}
                        >
                            {section.label}
                            {activeSection === section.id && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-blue"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                <Button
                    onClick={() => scrollToSection("contact")}
                    className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-purple/80 hover:to-neon-blue/80 text-white border-0"
                >
                    Get in Touch
                </Button>
            </div>
        </motion.nav>
    )
}
