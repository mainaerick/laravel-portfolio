import {
    FaReact,
    FaNodeJs,
    FaJs,
    FaHtml5,
    FaCss3Alt,
    FaLaravel,
    FaPython,
    FaPhp, FaJava
} from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiFirebase } from "react-icons/si";
import { Code2 } from "lucide-react";

export const SkillIcon: Record<string, JSX.Element> = {
    react: <FaReact className="text-[#61DBFB]" />,
    nodejs: <FaNodeJs className="text-[#3C873A]" />,
    javascript: <FaJs className="text-[#F7DF1E]" />,
    typescript: <SiTypescript className="text-[#3178C6]" />,
    html: <FaHtml5 className="text-[#E34F26]" />,
    css: <FaCss3Alt className="text-[#1572B6]" />,
    tailwind: <SiTailwindcss className="text-[#38BDF8]" />,
    laravel: <FaLaravel className="text-[#FF2D20]" />,
    firebase: <SiFirebase className="text-[#FFCA28]" />,
    python: <FaPython className="text-[#3776AB]" />,
    php: <FaPhp className="text-[#777BB4]" />,
    java: <FaJava className="text-[#777BB4]" />,
    default: <Code2 className="text-neon-purple" />,
};
