import { motion } from "framer-motion"

interface SkillBadgeProps {
    skill: string
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border border-neon-purple/30 text-sm font-medium text-foreground hover:border-neon-purple/60 transition-colors cursor-default"
        >
            {skill}
        </motion.div>
    )
}
