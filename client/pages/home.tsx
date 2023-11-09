import { useRef } from "react";
import TweetForm from "@/components/Form/TweetForm";
import Layout from "@/components/Layout";
import Tweet from "@/components/Tweet";
import {
  usePost,
  useCurrentUser,
  useLike,
  useRepost,
  usePagination,
} from "@/hooks";
import { RotatingLines } from "react-loader-spinner";
import { useCookies } from "react-cookie";

const Home = () => {
  const loader = useRef(null);
  const [cookies] = useCookies(["token"]);
  const { data, isFetchingNextPage } = usePagination(loader);
  const { user } = useCurrentUser();
  const { isAuthenticated } = usePost();
  const { like } = useLike();
  const { repost } = useRepost();

  if (!isAuthenticated)
    return <h1 className="text-center text-4xl">Loading ... </h1>;

  return (
    <Layout>
      <div className="w-full xs:h-[100%] sm:h-[100%] sm:mx-auto md:mx-auto md:col-span-2">
        {user ? <TweetForm profileImage={user.profileImage} /> : <></>}
        <div className="xs:mb-[20%]">
          {data?.pages?.map((page, index) => (
            <div key={index} className="w-full">
              {page?.map((post: any, index: number) => (
                <Tweet
                  key={index}
                  userId={post?.user?.id || post.userId}
                  username={post.user?.username}
                  content={post.body}
                  likes={post.likedIds?.length}
                  comments={post.comments?.length}
                  repost={post.repostedIds?.length}
                  image={post.user?.profileImage || user.profileImage}
                  handleLike={() =>
                    like({ postId: post.id, jwt: cookies.token })
                  }
                  handleRetweet={() => repost(post.id, cookies.token)}
                  tweetId={post.id}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-center" ref={loader}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={isFetchingNextPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
