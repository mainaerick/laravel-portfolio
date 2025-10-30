import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail,Twitter, ExternalLink } from "lucide-react"
import { About, Social } from '@/lib/models';

interface Props{
    socialLinks:Social[]
    about:About
}
export default function HeroSection({socialLinks,about}:Props) {
    // const socialLinks = [
    //     { icon: Github, href: "#", label: "GitHub" },
    //     { icon: Linkedin, href: "#", label: "LinkedIn" },
    //     { icon: Mail, href: "#", label: "Email" },
    // ]

    console.log(socialLinks)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants:any = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    }
    const iconMap: Record<string, any> = {
        github: Github,
        linkedin: Linkedin,
        externallink: ExternalLink,
        email: Mail,
        twitter:Twitter
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Gradient background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-neon-purple/20 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-neon-blue/20 rounded-full blur-3xl opacity-20" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto text-center"
            >
                <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-sm font-medium">
            Welcome to my portfolio
          </span>
                </motion.div>

                <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-neon-purple via-foreground to-neon-blue bg-clip-text text-transparent">
            {about.title}
          </span>
                    <br />
                    <span className="text-foreground">{about.subtitle}</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg sm:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                    {about.bio}
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-purple/80 hover:to-neon-blue/80 text-white border-0 text-base"
                    >
                        View My Work
                        <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-neon-purple/30 hover:bg-neon-purple/10 text-base bg-transparent"
                    >
                        Download Resume
                    </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-6 justify-center">
                    {socialLinks.map((social) => {
                        const Icon = iconMap[social.provider.toLowerCase()];
                        return (
                            <motion.a
                                key={social.label}
                                href={social.url}
                                whileHover={{ scale: 1.2, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/20 transition-colors"
                            >
                                <Icon/>
                            </motion.a>
                        )
                    })}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-neon-purple/30 rounded-full flex items-start justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="w-1 h-2 bg-neon-purple rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    )
}
