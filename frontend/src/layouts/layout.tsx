import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
  showHero: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showHero =false }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      {showHero && <Hero />}
      <div className='container mx-auto flex-1 py-10 px-6'>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout;