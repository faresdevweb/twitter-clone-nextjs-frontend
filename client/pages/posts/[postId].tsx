import { Layout, Tweet } from "@/components";
import { CommentForm } from "@/components/Form";
import { useCurrentUser, useRepost, useLike, usePost } from "@/hooks";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getComments, getPostById } from "@/services";

const Comments = (props: any) => {
  const { data } = props;
  const [cookies] = useCookies(["token"]);

  const { data: postData } = useQuery({
    queryKey: ["postId", data?.id],
    queryFn: () => getPostById(data?.id, cookies.token),
  });

  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(data?.id, cookies.token),
  });

  console.log(comments);

  const { user } = useCurrentUser();
  const { like, likeComments } = useLike();
  const { repost, repostComments } = useRepost();
  const { isAuthenticated } = usePost();

  if (!isAuthenticated)
    return <h1 className="text-center text-4xl">Loading ... </h1>;

  return (
    <Layout>
      <div className="w-full xs:h-[100%] sm:h-[100%] sm:w-[100%] sm:mx-auto md:max-w-[700px] md:mx-auto md:col-span-2">
        {postData ? (
          <div className="mt-5">
            <Tweet
              username={postData?.user.username}
              content={postData?.body}
              likes={postData?.likedIds?.length}
              repost={postData?.repostedIds?.length}
              comments={postData?.comments?.length}
              image={postData?.user.profileImage}
              tweetId={postData?.id}
              handleLike={() => {
                like({
                  postId: postData?.id,
                  jwt: cookies.token,
                });
              }}
              handleRetweet={() => {
                repost(postData?.id, cookies.token);
              }}
            />
          </div>
        ) : (
          <></>
        )}
        {user && postData ? (
          <CommentForm profileImage={user.profileImage} postId={data.id} />
        ) : (
          <></>
        )}
        <div className="p-5 mt-3 xs:mb-[20%]">
          {comments ? (
            comments.map((comment: any) => (
              <Tweet
                key={comment.id}
                username={comment.user?.username}
                content={comment.body}
                likes={comment.likedIds?.length}
                repost={comment.repostedIds?.length}
                image={comment?.user?.profileImage}
                tweetId={comment.id}
                handleLike={() => {
                  likeComments({
                    commentId: comment.id,
                    jwt: cookies.token,
                  });
                }}
                handleRetweet={() => {
                  repostComments({ commentId: comment.id, jwt: cookies.token });
                }}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Comments;

export async function getStaticPaths({}) {
  const res = await fetch("http://192.168.1.23:4000/posts/all");

  const data = await res.json();

  const paths = data.map((post: any) => ({
    params: { postId: post.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(
    `http://192.168.1.23:4000/posts/get-single-post/${params.postId}`
  );
  const data = await res.json();

  console.log(data);

  return {
    props: {
      data,
    },
    revalidate: 1,
  };
}
