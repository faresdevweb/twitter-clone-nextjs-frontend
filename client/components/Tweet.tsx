import { AiOutlineLike, AiOutlineRetweet } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type TweetProps = {
  username: string;
  content: string;
  likes: any;
  repost: any;
  comments?: any;
  userId?: string;
  image?: any;
  handleLike: () => void;
  handleRetweet: () => void;
  tweetId?: string;
};

const Tweet: React.FC<TweetProps> = ({
  username,
  content,
  likes,
  repost,
  comments,
  userId,
  image,
  handleLike,
  handleRetweet,
  tweetId,
}) => {
  const router = useRouter();

  return (
    <div className="border-t border-b border-black w-full mx-auto">
      <div className="container-name flex justify-start p-3">
        <div className="flex w-[90%] items-center">
          <Image
            src={image}
            width={45}
            height={45}
            className="rounded-full mr-2"
            alt="Image tweet"
          />
          <Link href={`/profile/${userId}`}>
            <p className="font-bold text-xl"> {username} </p>
          </Link>
        </div>
      </div>
      <div className="p-3 flex justify-end mb-3">
        <p className="w-[90%]"> {content} </p>
      </div>
      <div className="flex justify-around items-center mb-3">
        <button className="flex items-center gap-2" onClick={handleLike}>
          {" "}
          {likes} <AiOutlineLike />
        </button>
        <button className="flex items-center gap-2" onClick={handleRetweet}>
          {" "}
          {repost} <AiOutlineRetweet />
        </button>
        {router.pathname === "/posts/[postId]" ? (
          <></>
        ) : (
          <Link href={`/posts/${tweetId}`}>
            <button className="flex items-center gap-2">
              {" "}
              {comments} Commentaires
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Tweet;
