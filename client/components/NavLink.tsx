import React from 'react'
import Link from 'next/link'

type NavLinkProps = {
    href: string;
    logo: React.ReactNode;
    label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, logo }) => {
  return (
    <Link href={href}>
        <div className="hover:bg-gray-400 hover:opacity-50 rounded-full p-3 cursor-pointer sm:mb-8 md:flex md:items-center md:gap-2 ">
            <div className='lg:mr-3'>
              {logo}
            </div>
            <div className=''>
              <p className='xs:hidden xl:block'>{label}</p>
            </div>
        </div>
    </Link>
  )
}

export default NavLink