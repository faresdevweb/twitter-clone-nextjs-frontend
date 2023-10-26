import Image from 'next/image'
import logo from "/public/logo.png"
import NavLink from './NavLink'
import { AiFillHome } from "react-icons/ai"
import { IoNotifications } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"
import { BiLogOut } from "react-icons/bi"
import { useAuth } from '@/hooks/useAuth'
import jwt from "jsonwebtoken"
import { useCookies } from 'react-cookie'

const NavigationSidebar = () => {

  const { LogOut } = useAuth();
  const [cookie] = useCookies();
  const decodedToken: any = jwt.decode(cookie.token);

  /**
   * 
   * 
   */

  return (
    <aside className='border border-gray-300 xs:fixed xs:bottom-0 
    xs:bg-white xs:w-full xs:flex xs:justify-center xs:items-center xs:p-2 sm:h-[10%] 
    md:static md:h-[100%] md:w-[20%] md:block'
    >
      <div className='sm:place-content-start sm:flex sm:flex-col sm:items-center 
        sm:justify-center xl:w-full'>
        <div className='w-fit cursor-pointer xs:hidden sm:hidden md:block'>
          <Image
            src={logo}
            alt="Twitter logo"
            width={75}
            height={75}
            className='hover:opacity-50'
          />
        </div>
          <div className='xs:flex sm:mt-8 gap-4 opacity-100 md:flex-col'>
            <NavLink href='/home' label='Home' logo={<AiFillHome />} />
            <NavLink href='/notifications' label='Notifications' logo={<IoNotifications />} />
            <NavLink href={`/profile/${decodedToken.sub}`}label='Profile' logo={<CgProfile />} />
          <div
            className="hover:bg-gray-400 hover:opacity-50 rounded-full p-3 
              cursor-pointer sm:mb-8 md:flex md:items-center md:gap-2"
            onClick={() => LogOut()}
          >
            <div className='lg:mr-3'>
              <BiLogOut />
            </div>
            <div className=''>
              <p className='xs:hidden xl:block'>Log out</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default NavigationSidebar;

// sm:mt-10 sm:flex-col sm:space-x-0 xl:w-full xl:items-start