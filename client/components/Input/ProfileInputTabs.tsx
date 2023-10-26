import { Dispatch, SetStateAction } from "react"

interface ProfileInputTabsProps {
  setCurrentTab: Dispatch<SetStateAction<string>>;
}

const ProfileInputTabs: React.FC<ProfileInputTabsProps> = ({ setCurrentTab }) => {
  return (
    <div className='flex items-center gap-4 justify-around mt-5 p-2'>
        <p 
          className={`border border-blue-500 xs:w-[120px] 
          cursor-pointer md:w-[200px] text-center p-2`}
          onClick={() => setCurrentTab('posts')}
        >
            Post
        </p>
        <p 
          className={`border border-blue-500 xs:w-[120px] 
          cursor-pointer md:w-[200px] text-center p-2`}
          onClick={() => setCurrentTab('comments')}
        >
            Comments
        </p>
        <p 
          className={`border border-blue-500 xs:w-[120px] 
          cursor-pointer md:w-[200px] text-center p-2`}
          onClick={() => setCurrentTab('likes')}
        >
            Likes
        </p>
        <p 
          className={`border border-blue-500 xs:w-[120px] 
          cursor-pointer md:w-[200px] text-center p-2`}
          onClick={() => setCurrentTab('repost')}
        >
            Repost
        </p>
      </div>
  )
}

export default ProfileInputTabs