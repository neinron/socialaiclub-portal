import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Button from './components/ui/Button';
import Footer from './layout/Footer';
import CTASection from './components/sections/CTASection';
import HeadingSection from './components/ui/HeadingSection';
import Logo from './components/ui/Logo';
import LanguageToggle from './components/ui/LanguageToggle';
import ThemeToggle from './components/ui/ThemeToggle';
import { useLocale } from './i18n/LocaleContext';

export default function App() {
 const {locale}=useLocale();
 const reducedMotion = useReducedMotion();
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const menuButtonRef = useRef(null);
 useEffect(() => {
  if (!mobileMenuOpen) return;
  const onKeyDown = event => { if (event.key === 'Escape') { setMobileMenuOpen(false); menuButtonRef.current?.focus(); } };
  const desktop = window.matchMedia('(min-width: 768px)');
  const onResize = () => { if (desktop.matches) setMobileMenuOpen(false); };
  document.addEventListener('keydown', onKeyDown);
  desktop.addEventListener('change', onResize);
  return () => { document.removeEventListener('keydown', onKeyDown); desktop.removeEventListener('change', onResize); };
 }, [mobileMenuOpen]);
 const de=locale==='de';
 const clubs=[{city:'Munich',name:'TUM Social AI Club',url:'https://tum-socialaiclub.de/'},{city:'Cologne',name:'Cologne Social AI Club',url:'https://cologne-socialaiclub.de/'}];
 return <div className="min-h-screen flex flex-col">
  <header className="sticky top-0 z-50 w-full px-4 pt-4 md:pt-6">
   {mobileMenuOpen && <button type="button" aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-10 md:hidden"/>}
   <nav aria-label="Main navigation" className="relative z-20 navbar-surface mx-auto flex h-[66px] max-w-screen-2xl items-center justify-between gap-4 rounded-[24px] border border-[var(--border-default)] bg-[var(--bg-surface-glass)] pl-5 pr-4 md:pr-2 backdrop-blur-md shadow-lg">
    <a href="/" aria-label="Social AI Club home" className="grid min-w-0 flex-1 max-w-[244px] grid-cols-[500fr_140fr_4042.62fr] items-center">
     <div className="col-start-1 min-w-0"><Logo iconOnly fullWidth className="w-full"/></div>
     <div className="col-start-3 min-w-0">
      <img src="/assets/logos/social-ai-club-wordmark-dark.svg" alt="Social AI Club" className="hero-logo-light w-full h-auto"/>
      <img src="/assets/logos/social-ai-club-wordmark-light.svg" alt="Social AI Club" className="hero-logo-dark w-full h-auto"/>
     </div>
    </a>
    <Button href="https://tum-socialaiclub.de/contact" variant="primary" className="hidden md:inline-flex">{de?'Kontakt':'Contact us'}</Button>
    <button ref={menuButtonRef} type="button" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} aria-controls="mobile-chapter-menu" onClick={() => setMobileMenuOpen(open => !open)} className="ui-text-accent-hover md:hidden text-[var(--text-primary)] active:text-[var(--text-accent)] transition-colors p-1 relative w-8 h-8 shrink-0 flex items-center justify-center">
     {mobileMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
    </button>
   </nav>
   <AnimatePresence>{mobileMenuOpen && <motion.nav id="mobile-chapter-menu" aria-label="Chapter navigation" data-mobile-menu style={{overscrollBehavior: 'contain'}} initial={{opacity:0,y:-10,scale:0.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-10,scale:0.98}} transition={{duration:reducedMotion?0:0.2}} className="absolute top-full left-4 right-4 z-20 mt-2 p-4 flex flex-col items-center gap-2 rounded-[24px] shadow-xl border border-[var(--border-default)] backdrop-blur-md md:hidden overflow-y-auto max-h-[calc(100vh-120px)] bg-[var(--bg-surface-glass)]">
    {clubs.map(club => <a key={club.city} href={club.url} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="navbar-page-link relative w-full text-center pt-[14px] pb-[13px] rounded-xl text-[16px] leading-[1.2em] font-bold font-body transition-all duration-200 text-[var(--text-primary)] ui-hover-overlay active:bg-[var(--hover-overlay)]">{club.name}</a>)}
    <div className="w-full mt-2 mb-2"><Button href="https://tum-socialaiclub.de/contact" variant="primary" className="w-full application-start-pulse" onClick={() => setMobileMenuOpen(false)}>{de?'Kontakt':'Contact us'}</Button></div>
    <div className="flex items-center justify-between w-full">
     <LanguageToggle />
     <ThemeToggle />
    </div>
   </motion.nav>}</AnimatePresence>
  </header>
  <main className="flex-1 flex flex-col items-center justify-center gap-12 md:gap-16 px-4 py-16 md:py-24">
   <section className="w-full max-w-5xl" aria-labelledby="chapters-heading">
    <HeadingSection as="h1" badge={de ? 'Unsere Chapters' : 'Our chapters'} title={<span id="chapters-heading">{de ? 'Finde deinen Social AI Club' : 'Find your Social AI Club'}</span>} className="!pt-0"/>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
    {clubs.map(club=><section key={club.city} className="bg-[var(--bg-surface-glass)] backdrop-blur-md rounded-[24px] p-8 md:p-10 border border-[var(--border-default)] shadow-lg flex flex-col items-start gap-6">
     <div className="flex h-36 w-full items-center">
      <img src={`/assets/logos/${club.city === 'Munich' ? 'tum' : 'cgn'}-stacked-text-dark.svg`} alt={club.name} className="hero-logo-light max-h-full max-w-full w-auto"/>
      <img src={`/assets/logos/${club.city === 'Munich' ? 'tum' : 'cgn'}-stacked-text-light.svg`} alt={club.name} className="hero-logo-dark max-h-full max-w-full w-auto"/>
     </div>
     <div className="flex-1"><h2 className="sr-only">{club.name}</h2><p className="text-[var(--text-secondary)] font-medium mb-3">{club.city}, Germany</p>
      {club.city === 'Munich' && <p className="text-[var(--text-secondary)] leading-relaxed">{de ? 'Unser Gründungs-Chapter, gestartet 2025. Mit über 50 Mitgliedern und mehr als neun umgesetzten Projekten verbindet er Studierende für künstliche Intelligenz und Social Entrepreneurship in München.' : 'Our founding chapter, launched in 2025. With over 50 members and more than nine projects built, it connects students around artificial intelligence and social entrepreneurship in Munich.'}</p>}
      {club.city === 'Cologne' && <p className="text-[var(--text-secondary)] leading-relaxed">{de ? 'Das zweite Chapter im Social AI Network, gestartet im Sommer 2026. Mit einem starken Start baut es eine neue Community für Studierende in Köln auf.' : 'The second chapter in the Social AI Network, launched in summer 2026. Off to a strong start, it is building a new community for students in Cologne.'}</p>}
     </div>
     <Button href={club.url} variant="primary" className="mt-4 application-start-pulse">{de?'Zur Website':'Visit website'}</Button>
    </section>)}
    </div>
   </section>
   <CTASection
    heading={de ? 'Du findest, dass an deiner Universität oder in deiner Stadt ein Social AI Club fehlt?' : 'You think your university or city is missing a Social AI Club?'}
    text={de ? 'Dann schreib uns. Wir freuen uns, von dir und deiner Idee für einen neuen Club zu hören.' : 'Write to us. We’d love to hear from you and learn about your idea for a new club.'}
    buttons={[{label: 'Contact us', href: 'https://tum-socialaiclub.de/contact', variant: 'primary'}]}
   />
  </main>
  <Footer/>
 </div>;
}
