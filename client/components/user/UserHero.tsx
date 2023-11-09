import Image from "next/image";

interface UserHeroProps {
  coverImage: string;
  profileImage: string;
}

const UserHero: React.FC<UserHeroProps> = ({ coverImage, profileImage }) => {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        <Image
          src={coverImage}
          fill
          sizes="100%"
          alt="Cover Image"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute bottom-2 left-4">
          <Image
            src={profileImage}
            width={50}
            height={50}
            alt="Profile image"
            className="rounded-full w-[80px]"
          />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
