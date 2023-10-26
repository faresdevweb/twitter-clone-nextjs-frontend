import React from 'react'
import LeftSidebar from './RightSidebar';
import NavigationSidebar from './NavigationSidebar';

type LayoutProps = {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
   /**
    * 
    * flex sm:justify-center xs:flex-col-reverse sm:flex-row h-screen max-w-[1400px] mx-auto
    */
  return (
    <div className='flex sm:justify-center xs:flex-col-reverse sm:flex-row h-screen max-w-[1400px] mx-auto'>
        <NavigationSidebar/>
            {children}
        <LeftSidebar/>
    </div>

  )
}

export default Layout;