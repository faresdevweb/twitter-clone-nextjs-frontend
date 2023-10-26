import React from 'react'
import { useFollow } from '@/hooks'

type FollowButtonProps = {
  userId: string
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId }) => {
  const { follow } = useFollow()

  return (
    <div 
      className='p-3 border-2 border text-center border-gray-500 text-bold cursor-pointer rounded-lg hover:bg-gray-500 hover:text-white transition-all w-[150px] ml-5'
      onClick={() => follow(userId)}
    >Follow</div>
  )
}

export default FollowButton