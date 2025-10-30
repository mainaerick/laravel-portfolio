import React from 'react';
import Navbar from '@/Components/NavBar';
import HeroSection from '@/Components/Sections/HeroSection';
import AboutSection from '@/Components/Sections/AboutSection';
import ProjectsSection from '@/Components/Sections/ProjectsSection';
import ContactSection from '@/Components/Sections/ContactSection';
import Footer from '@/Components/Sections/Footer';
import { About, Skill, Social } from '@/lib/models';

interface Props{
    about:About
    socials:Social[]
    skills:Skill[]
}
function Portfolio({about,socials,skills}:Props) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar  activeSection={'home'}/>
            <HeroSection about={about} socialLinks={socials}/>
            <AboutSection  about={about} skills={skills}/>
            <ProjectsSection />
            <ContactSection />
            <Footer />
        </div>
    );
}

export default Portfolio;
