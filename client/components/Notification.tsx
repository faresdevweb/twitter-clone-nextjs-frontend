import React from 'react'
import Image from 'next/image'
import logo from "/public/logo.png"

type NotificationProps = {
    content: string
}

const Notification: React.FC<NotificationProps> = ({ content }) => {
  return (
    <div className="flex items-center border-2 rounded-full p-3 mb-5 relative border-gray-300 xs:w-[320px] sm:w-[380px] md:w-[550px] mx-auto">
        <Image src={logo} width={35} className='mr-2' alt='logo twitter'/>
        <p className='text-lg p-2'> {content} </p>
    </div>
  )
}

export default Notification