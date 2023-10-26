import { useState } from 'react'
import { Tweet } from '../components'
import { ProfileInputTabs } from './Input'
import { useLike, useRepost } from '@/hooks'

type ProfileTabsProps = {
    data: any
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ data }) => {

    const [currentTab, setCurrentTab] = useState<string>('posts');
    const { handleLikePost, handleLikeComment } = useLike();
    const { handleRepostPost, handleRepostComment } = useRepost();
    
  return (
    <div>
      <ProfileInputTabs
        setCurrentTab={setCurrentTab}
      />
      <div className='p-5 mt-3 xs:h-[100%] xs:mb-[15%] '>
          {currentTab === 'posts' && data.posts.map((post: any) => (
              <Tweet key={post.id} 
                username={data.username}
                content={post.body}
                likes={post.likedIds.length}
                repost={post.Retweet.length}
                comments={post.Retweet.length}
                image={data.profileImage}
                tweetId={post.id}
                handleLike={() => { handleLikePost(post.id, data.id) }}
                handleRetweet={() => { handleRepostPost(post.id, data.id) }}
              />
              ))}
          {currentTab === 'comments' && data.comments.map((comment: any) => (
              <Tweet 
                key={comment.id}
                username={data.username}
                content={comment.body}
                likes={comment.likedIds.length}
                repost={comment.Retweet.length}
                comments={comment.Retweet.length}
                image={data.profileImage}
                tweetId={comment.id}
                handleLike={() => { handleLikeComment(comment.id, data.id) }}
                handleRetweet={() => { handleRepostComment(comment.id, data.id) }}
              />
              ))}
          {currentTab === 'likes' && data.likedPost.map((like: any) => (
              <Tweet 
                key={like.id}
                username={data.username}
                content={like.body}
                likes={like.likedIds.length}
                repost={like.Retweet.length}
                comments={like.Retweet.length} 
                image={data.profileImage}
                tweetId={like.id}
                handleLike={() => { handleLikePost(like.id, data.id) }}
                handleRetweet={() => { handleRepostPost(like.id, data.id) }}
              />
              ))}
          {currentTab === 'repost' && data.retweetedPosts.map((repost: any) => (
              <Tweet 
                key={repost.id} 
                username={data.username}
                content={repost.body}
                likes={repost.likedIds.length}
                repost={repost.Retweet.length}
                comments={repost.Retweet.length}
                image={data.profileImage}
                tweetId={repost.id}
                handleLike={() => { handleLikePost(repost.id, data.id) }}
                handleRetweet={() => { handleRepostPost(repost.id, data.id) }}
              />
              ))}
      </div>
    </div>
  )
}

export default ProfileTabs
