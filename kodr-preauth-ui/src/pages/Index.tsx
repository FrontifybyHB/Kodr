import { useState, useEffect } from 'react';
import { PageTransition } from '@/components/ui/motion-wrapper';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { BuildSkillsSection } from '@/components/BuildSkillsSection';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { DemoModal } from '@/components/DemoModal';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signup');

  const handleSignInClick = () => {
    setAuthMode('signin');
    setIsAuthModalOpen(true);
  };

  const handleTryKodrClick = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleDemoClick = () => {
    setIsDemoModalOpen(true);
  };

  // Listen for demo events from BuildSkillsSection
  useEffect(() => {
    const handleOpenDemo = () => setIsDemoModalOpen(true);
    window.addEventListener('openDemo', handleOpenDemo);
    return () => window.removeEventListener('openDemo', handleOpenDemo);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header onSignInClick={handleSignInClick} />
        
        <main>
          <Hero 
            onTryKodrClick={handleTryKodrClick}
            onDemoClick={handleDemoClick}
          />
          <Features />
          <HowItWorks />
          <BuildSkillsSection />
        </main>

        <Footer />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authMode}
        />

        <DemoModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
        />
      </div>
    </PageTransition>
  );
};

export default Index;