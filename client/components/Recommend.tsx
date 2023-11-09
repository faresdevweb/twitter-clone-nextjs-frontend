import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useFollow } from "@/hooks";

type RecommendProps = {
  user: any;
};

const Recommend: React.FC<RecommendProps> = ({ user }) => {
  const { follow } = useFollow();

  return (
    <div className="border rounded-md flex flex-row items-center gap-4 p-3 mt-1 w-[90%] mx-auto border-gray-500 max-w-[320px]">
      <Image
        src={user.profileImage}
        width={45}
        height={45}
        className="rounded-full"
        alt="image"
      />
      <div className="flex-1">
        <Link href={`/profile/${user.id}`}>
          <a className="font-bold text-xl">{user.username}</a>{" "}
        </Link>
      </div>
      <button
        className="bg-black text-white rounded-full font-bold px-3 py-1 hover:opacity-50 duration-200"
        onClick={() => follow(user.id)}
      >
        Follow
      </button>
    </div>
  );
};

export default Recommend;
