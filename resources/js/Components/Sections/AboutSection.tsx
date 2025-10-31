
import { motion } from "framer-motion"
import SkillBadge from '@/Components/SkillBadge';
import { About, Skill } from '@/lib/models';

interface Props{
    about:About
    skills:Skill[]
}
export default function AboutSection({about,skills}:Props) {
    // const skills = [
    //     "React",
    //     "TypeScript",
    //     "Next.js",
    //     "Tailwind CSS",
    //     "Node.js",
    //     "PostgreSQL",
    //     "GraphQL",
    //     "Framer Motion",
    //     "Web Design",
    //     "UI/UX",
    //     "Performance",
    //     "Accessibility",
    // ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    }

    console.log(about)
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              About Me
            </span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-neon-purple/20 bg-gradient-to-br from-neon-purple/10 to-neon-blue/10 backdrop-blur-sm">
                            <img src={`/storage/${about.avatar as string}`||"/developer-profile.jpg"} alt="Profile" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. I
                            specialize in creating beautiful, performant digital experiences that solve real-world problems.
                        </p>

                        <p className="text-lg text-foreground/80 leading-relaxed">
                            {about.long_bio}
                        </p>

                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">Skills & Technologies</h3>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex flex-wrap gap-3"
                            >
                                {skills.map((skill) => (
                                    <motion.div key={skill.id} variants={itemVariants}>
                                        <SkillBadge skill={skill.name} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
