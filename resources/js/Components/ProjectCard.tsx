"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
    project: {
        id: number
        title: string
        description: string
        image: string
        tags: string[]
        github: string
    }
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative h-full rounded-xl overflow-hidden border border-neon-purple/20 bg-gradient-to-br from-neon-purple/5 to-neon-blue/5 backdrop-blur-sm hover:border-neon-purple/40 transition-all duration-300"
        >
            {/* Image container */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-neon-purple/10 to-neon-blue/10">
                <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="flex gap-3">
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-neon-purple/30 hover:bg-neon-purple/20 bg-transparent"
                            asChild
                        >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                Code
                            </a>
                        </Button>
                        <Button
                            size="sm"
                            className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-purple/80 hover:to-neon-blue/80 text-white border-0"
                            asChild
                        >
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-neon-purple transition-colors">
                    {project.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple"
                        >
              {tag}
            </span>
                    ))}
                </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
        </motion.div>
    )
}
