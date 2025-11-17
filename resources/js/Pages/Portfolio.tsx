import React from 'react';
import Navbar from '@/Components/NavBar';
import HeroSection from '@/Components/Sections/HeroSection';
import AboutSection from '@/Components/Sections/AboutSection';
import ProjectsSection from '@/Components/Sections/ProjectsSection';
import ContactSection from '@/Components/Sections/ContactSection';
import Footer from '@/Components/Sections/Footer';
import { About, Skill, Social } from '@/lib/models';
import { Project } from '@/Pages/Admin/Projects/lib/models';

interface Props{
    projects:Project[]
    about:About
    socials:Social[]
    skills:Skill[]
}
function Portfolio({projects,about,socials,skills}:Props) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar  />
            <HeroSection about={about} socialLinks={socials}/>
            <AboutSection  about={about} skills={skills}/>
            <ProjectsSection  projects={projects}/>
            <ContactSection socialLinks={socials} />
            <Footer />
        </div>
    );
}

export default Portfolio;
