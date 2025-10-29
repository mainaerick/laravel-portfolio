import React from 'react';
import Navbar from '@/Components/NavBar';
import HeroSection from '@/Components/HeroSection';

function Portfolio() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar  activeSection={'home'}/>
            <HeroSection />
            {/*<AboutSection />*/}
            {/*<ProjectsSection projects={projects} />*/}
            {/*<ContactSection />*/}
            {/*<Footer />*/}
        </div>
    );
}

export default Portfolio;
