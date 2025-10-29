import React from 'react';
import Navbar from '@/Components/NavBar';
import HeroSection from '@/Components/Sections/HeroSection';
import AboutSection from '@/Components/Sections/AboutSection';
import ProjectsSection from '@/Components/Sections/ProjectsSection';
import ContactSection from '@/Components/Sections/ContactSection';
import Footer from '@/Components/Sections/Footer';

function Portfolio() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar  activeSection={'home'}/>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
            <Footer />
        </div>
    );
}

export default Portfolio;
