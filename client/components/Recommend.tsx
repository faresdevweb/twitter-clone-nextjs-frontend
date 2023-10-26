import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useFollow } from '@/hooks'

type RecommendProps = {
    user: any
}

const Recommend: React.FC<RecommendProps> = ({ user }) => {

    const { follow } = useFollow();

    return (
        <div className='border-2 flex justify-around items-center p-5 w-[90%] mx-auto rounded-full mb-5'>
            <Image 
                src={user.profileImage} 
                width={45} 
                height={45} 
                className='rounded-full' 
                alt='image'
            />
            <Link href={`/profile/${user.id}`}>
                <p className='font-bold text-xl'>{user.username}</p>
            </Link>
            <button 
                className='bg-black text-white rounded-full font-bold px-3 py-1 hover:opacity-50 duration-200'
                onClick={() => follow(user.id)}
            >Follow</button>
        </div>
      )
}

export default Recommend;