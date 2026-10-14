import React from 'react';
import Button from './components/ui/Button';
import Footer from './layout/Footer';
import CTASection from './components/sections/CTASection';
import Logo from './components/ui/Logo';
import { useLocale } from './i18n/LocaleContext';

export default function App() {
 const {locale}=useLocale();
 const de=locale==='de';
 const clubs=[{city:'Munich',name:'TUM Social AI Club',url:'https://tum-socialaiclub.de/'},{city:'Cologne',name:'Cologne Social AI Club',url:'https://cologne-socialaiclub.de/'}];
 return <div className="min-h-screen flex flex-col">
  <header className="sticky top-0 z-50 w-full px-4 pt-4 md:pt-6">
   <nav aria-label="Main navigation" className="navbar-surface mx-auto flex h-[66px] max-w-screen-2xl items-center justify-between gap-4 rounded-[24px] border border-[var(--border-default)] bg-[var(--bg-surface-glass)] pl-5 pr-2 backdrop-blur-md shadow-lg">
    <a href="/" aria-label="Social AI Club home" className="grid min-w-0 flex-1 max-w-[244px] grid-cols-[500fr_140fr_4042.62fr] items-center">
     <div className="col-start-1 min-w-0"><Logo iconOnly fullWidth className="w-full"/></div>
     <div className="col-start-3 min-w-0">
      <img src="/assets/logos/social-ai-club-wordmark-dark.svg" alt="Social AI Club" className="hero-logo-light w-full h-auto"/>
      <img src="/assets/logos/social-ai-club-wordmark-light.svg" alt="Social AI Club" className="hero-logo-dark w-full h-auto"/>
     </div>
    </a>
    <Button href="https://tum-socialaiclub.de/contact" variant="primary">{de?'Kontakt':'Contact us'}</Button>
   </nav>
  </header>
  <main className="flex-1 flex flex-col items-center justify-center gap-12 md:gap-16 px-4 py-16 md:py-24">
   <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
    {clubs.map(club=><section key={club.city} className="bg-[var(--bg-surface-glass)] backdrop-blur-md rounded-[24px] p-8 md:p-10 border border-[var(--border-default)] shadow-lg flex flex-col items-start gap-6">
     <div className="flex h-36 w-full items-center">
      <img src={`/assets/logos/${club.city === 'Munich' ? 'tum' : 'cgn'}-stacked-text-dark.svg`} alt={club.name} className="hero-logo-light max-h-full max-w-full w-auto"/>
      <img src={`/assets/logos/${club.city === 'Munich' ? 'tum' : 'cgn'}-stacked-text-light.svg`} alt={club.name} className="hero-logo-dark max-h-full max-w-full w-auto"/>
     </div>
     <div className="flex-1"><h1 className="sr-only">{club.name}</h1><p className="text-[var(--text-secondary)] font-medium mb-3">{club.city}, Germany</p>
      {club.city === 'Munich' && <p className="text-[var(--text-secondary)] leading-relaxed">{de ? 'Unser Gründungs-Chapter, gestartet 2025. Mit über 50 Mitgliedern und mehr als neun umgesetzten Projekten verbindet er Studierende für künstliche Intelligenz und Social Entrepreneurship in München.' : 'Our founding chapter, launched in 2025. With over 50 members and more than nine projects built, it connects students around artificial intelligence and social entrepreneurship in Munich.'}</p>}
      {club.city === 'Cologne' && <p className="text-[var(--text-secondary)] leading-relaxed">{de ? 'Das zweite Chapter im Social AI Network, gestartet im Sommer 2026. Mit einem starken Start baut es eine neue Community für Studierende in Köln auf.' : 'The second chapter in the Social AI Network, launched in summer 2026. Off to a strong start, it is building a new community for students in Cologne.'}</p>}
     </div>
     <Button href={club.url} variant="primary" className="mt-4">{de?'Zur Website':'Visit website'}</Button>
    </section>)}
   </div>
   <CTASection
    heading={de ? 'Du findest, dass an deiner Universität oder in deiner Stadt ein Social AI Club fehlt?' : 'Think your university or city is missing a Social AI Club?'}
    text={de ? 'Dann schreib uns. Wir freuen uns, von dir und deiner Idee für einen neuen Club zu hören.' : 'Write to us. We’d love to hear from you and learn about your idea for a new club.'}
    buttons={[{label: 'Contact us', href: 'https://tum-socialaiclub.de/contact', variant: 'primary'}]}
   />
  </main>
  <Footer/>
 </div>;
}
