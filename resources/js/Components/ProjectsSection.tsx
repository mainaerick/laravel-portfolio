import { motion } from "framer-motion"
import ProjectCard from '@/Components/ProjectCard';

export default function ProjectsSection() {
    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description:
                "A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
            image: "/ecommerce-platform.jpg",
            tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
            github: "#",
        },
        {
            id: 2,
            title: "Task Management App",
            description:
                "Collaborative task management tool with real-time updates, team workspaces, and advanced filtering capabilities.",
            image: "/task-management-board.png",
            tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
            github: "#",
        },
        {
            id: 3,
            title: "Analytics Dashboard",
            description:
                "Interactive analytics dashboard with real-time data visualization, custom reports, and export functionality.",
            image: "/analytics-dashboard.png",
            tags: ["React", "D3.js", "GraphQL", "Node.js"],
            github: "#",
        },
        {
            id: 4,
            title: "Social Media App",
            description: "Modern social platform with user profiles, feed, messaging, and real-time notifications.",
            image: "/social-media.jpg",
            tags: ["Next.js", "Firebase", "Tailwind", "WebSocket"],
            github: "#",
        },
        {
            id: 5,
            title: "AI Content Generator",
            description:
                "AI-powered content generation tool with multiple templates, batch processing, and content optimization.",
            image: "/ai-content.jpg",
            tags: ["React", "OpenAI", "Node.js", "MongoDB"],
            github: "#",
        },
        {
            id: 6,
            title: "Design System",
            description: "Comprehensive design system with reusable components, documentation, and Storybook integration.",
            image: "/design-system-abstract.png",
            tags: ["React", "TypeScript", "Storybook", "Tailwind"],
            github: "#",
        },
    ]

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

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl opacity-20" />
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
              Featured Projects
            </span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {projects.map((project) => (
                        <motion.div key={project.id} variants={itemVariants}>
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
