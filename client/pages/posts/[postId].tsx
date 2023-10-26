import { useEffect } from 'react'
import { Layout, Tweet } from '@/components'
import { CommentForm } from '@/components/Form'
import { useCurrentUser, useRepost, useLike, usePost, usePagination } from '@/hooks'
import { usePostStore, useSinglePostStore } from '@/store'

const Comments = (props: any) => {

  const { data } = props;  
  const { user, loading } = useCurrentUser();
  const { posts } = usePostStore();
  const { handleLikePost, handleLikeComment } = useLike();
  const { handleRepostPost, handleRepostComment } = useRepost();
  const { isAuthenticated } = usePost();

  const { setSpecificTweet, specificTweet } = useSinglePostStore();

  
  useEffect(() => {
    const specificTweet: any = posts.find(post => post.id === data.id);
    setSpecificTweet(specificTweet);
    console.log(specificTweet);
    
  }, [data.id, posts]);
  

  

  if (loading || !isAuthenticated) return <h1 className='text-center text-4xl'>Loading ... </h1>

  return (
    <Layout>
      <div className='w-full xs:h-[100%] sm:h-[100%] sm:w-[100%] sm:mx-auto md:max-w-[700px] md:mx-auto md:col-span-2'> 
          {
            specificTweet ? 
            (
              <div className="mt-5">
                <Tweet
                  username={specificTweet?.user.username}
                  content={specificTweet?.body}
                  likes={specificTweet?.likedIds?.length}
                  repost={specificTweet?.Retweet?.length}
                  comments={specificTweet?.Retweet?.length}
                  image={specificTweet?.user.profileImage}
                  tweetId={specificTweet?.id}
                  handleLike={() => { handleLikePost(specificTweet?.id, user.id) }}
                  handleRetweet={() => { handleRepostPost(specificTweet?.id, user.id) }}
                />
              </div>
            ) : 
            (
              <></>
            )
          }
          <CommentForm
            profileImage={user.profileImage}
            postId={data.id}
          />
        <div className="p-5 mt-3 xs:mb-[20%]">
          {
            specificTweet ? specificTweet.comments.map((comment: any) => (
              <Tweet
                key={comment.id}
                username={comment.user?.username}
                content={comment.body}
                likes={comment.likedIds.length}
                repost={comment.Retweet.length}
                image={comment?.user?.profileImage}
                tweetId={comment.id}
                handleLike={() => { handleLikeComment(comment.id, user.id) }}
                handleRetweet={() => { handleRepostComment(comment.id, user.id) }}
              />
            )) : (
              <></>
            )
          }
        </div>
      </div>
    </Layout>
  )
}

export default Comments

export async function getStaticPaths({}) {

  const res = await fetch('http://192.168.1.25:4000/message/all')

  const data = await res.json()
  
  const paths = data.map((post: any) => ({
    params: { postId: post.id.toString() },
  }))
  

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }: any) {
  
    const res = await fetch(`http://192.168.1.25:4000/message/get-single-post/${params.postId}`)
    const data = await res.json()

    return {
      props: {
        data
      },
      revalidate: 1
    }
}