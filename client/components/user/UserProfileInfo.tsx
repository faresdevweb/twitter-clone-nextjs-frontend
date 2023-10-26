import React from 'react'


type UserProfileInfoProps = {
    username: string
    followers: number
    following: number;
    bio: string;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ username, followers, following, bio  }) => {
  return (
    <div className='p-5 flex flex-col gap-4'> 
        <div className="flex flex-col p-2">
            <div className="flex items-center gap-8 mb-3">
              <h2 className='text-xl font-bold'> {username} </h2>          
            </div>
            <div>
                <p>{bio}</p>
            </div>
        </div>
        <div className="flex gap-2 p-2">
            <p className='w-fit hover:underline cursor-pointer'> {followers} followers </p>
            <p className='w-fit hover:underline cursor-pointer'> {following} followed </p>
        </div>
    </div>
  )
}

export default UserProfileInfo