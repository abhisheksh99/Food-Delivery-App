import React from 'react';
import Header from '@/components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='container mx-auto flex-1 py-10 px-10'>
        {children}
      </div>
    </div>
  )
}

export default Layout;