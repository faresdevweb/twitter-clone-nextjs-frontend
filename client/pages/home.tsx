import TweetForm from '@/components/Form/TweetForm';
import Layout from '@/components/Layout';
import Tweet from '@/components/Tweet';
import { usePost, useCurrentUser, useLike, useRepost, usePagination } from '@/hooks'
import { usePostStore } from '@/store';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RotatingLines } from 'react-loader-spinner';

const home = () => {

  
  const { user, loading } = useCurrentUser();
  const { posts } = usePostStore();
  const { isAuthenticated } = usePost();
  const { loadMorePosts, hasMoreTweets } = usePagination();
  const { handleLikePost } = useLike();
  const { handleRepostPost } = useRepost();

  if (loading || !isAuthenticated) return <h1 className='text-center text-4xl'>Loading ... </h1>

  return (
    <Layout>
      <div className='w-full xs:h-[100%] sm:h-[100%] sm:w-[100%] sm:mx-auto md:max-w-[700px] md:mx-auto md:col-span-2'>
        <TweetForm
          profileImage={user.profileImage}
        />
        <div className='p-5 mt-3 xs:mb-[20%]'>
          <InfiniteScroll
            dataLength={posts.length}
            next={loadMorePosts}
            hasMore={hasMoreTweets}
            loader={
              <div className='flex justify-center'>
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="50"
                  visible={true}
                />
              </div>
            }
          >
            {posts.map((post: any, index: number) => (
              <Tweet
                key={index}
                userId={post.user?.id || post.userId}
                username={post.user?.username}
                content={post.body}
                likes={post.likedIds.length}
                comments={post.comments?.length}
                repost={post.Retweet?.length}
                image={post.user?.profileImage || user.profileImage}
                handleLike={() => handleLikePost(post.id, user.id)}
                handleRetweet={() => handleRepostPost(post.id, user.id)}
                tweetId={post.id}

              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  )
}

export default home