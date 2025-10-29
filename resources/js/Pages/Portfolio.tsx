import React from 'react';
import Navbar from '@/Components/NavBar';
import HeroSection from '@/Components/HeroSection';
import AboutSection from '@/Components/AboutSection';
import ProjectsSection from '@/Components/ProjectsSection';
import ContactSection from '@/Components/ContactSection';

function Portfolio() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar  activeSection={'home'}/>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
            {/*<Footer />*/}
        </div>
    );
}

export default Portfolio;
