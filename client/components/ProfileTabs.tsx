import { useState } from "react";
import { Tweet } from "../components";
import { ProfileInputTabs } from "./Input";
import { useLike, useRepost } from "@/hooks";
import { useCookies } from "react-cookie";

type ProfileTabsProps = {
  data: any;
};

const ProfileTabs: React.FC<ProfileTabsProps> = ({ data }) => {
  const [cookies] = useCookies(["token"]);
  const [currentTab, setCurrentTab] = useState<string>("posts");
  const { like, likeComments } = useLike();
  const { repost, repostComments } = useRepost();

  return (
    <div>
      <ProfileInputTabs setCurrentTab={setCurrentTab} />
      <div className="p-5 mt-3 xs:h-[100%] xs:mb-[15%] ">
        {currentTab === "posts" &&
          data.posts.map((post: any) => (
            <Tweet
              key={post.id}
              username={data.username}
              content={post.body}
              likes={post.likedIds.length}
              repost={post.repostedIds.length}
              comments={post.repostedIds.length}
              image={data.user.profileImage}
              tweetId={post.id}
              handleLike={() => {
                like({ postId: post.id, jwt: cookies.token });
              }}
              handleRetweet={() => {
                repost(post.id, cookies.token);
              }}
            />
          ))}
        {currentTab === "comments" &&
          data.comments.map((comment: any) => (
            <Tweet
              key={comment.id}
              username={data.username}
              content={comment.body}
              likes={comment.likedIds.length}
              repost={comment.repostedIds.length}
              comments={comment.repostedIds.length}
              image={data.user.profileImage}
              tweetId={comment.id}
              handleLike={() => {
                likeComments({ commentId: comment.id, jwt: cookies.token });
              }}
              handleRetweet={() => {
                repostComments(comment.id, cookies.token);
              }}
            />
          ))}
        {currentTab === "likes" &&
          data.likedPosts.map((like: any) => (
            <Tweet
              key={like.id}
              username={data.username}
              content={like.body}
              likes={like.likedIds.length}
              repost={like.repostedIds.length}
              comments={like.repostedIds.length}
              image={data.user.profileImage}
              tweetId={like.id}
              handleLike={() => {
                like({ postId: like.id, jwt: cookies.token });
              }}
              handleRetweet={() => {
                repost(like.id, cookies.token);
              }}
            />
          ))}
        {currentTab === "repost" &&
          data.repostedPosts.map((repost: any) => (
            <Tweet
              key={repost.id}
              username={data.username}
              content={repost.body}
              likes={repost.likedIds.length}
              repost={repost.repostedIds.length}
              comments={repost.repostedIds.length}
              image={data.user.profileImage}
              tweetId={repost.id}
              handleLike={() => {
                like({ postId: repost.id, jwt: cookies.token });
              }}
              handleRetweet={() => {
                repost(repost.id, cookies.token);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
