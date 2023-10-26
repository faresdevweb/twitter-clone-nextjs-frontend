import { useAuth, useModal } from '@/hooks';
import { Layout, ProfileTabs } from '@/components';
import { useRouter } from 'next/router';
import { EditProfileButton } from '@/components/Input';
import Modal from '@mui/material/Modal';
import { EditProfileForm } from '@/components/Form';
import { UserHero, UserProfileInfo } from '@/components/user';


const profile = (props: any) => {

  const { data } = props;  

  const router = useRouter();
  const { userId }: any = router.query;
  const { open, handleOpen, handleClose } = useModal();
  const { isAuthenticated } = useAuth();

  if(!isAuthenticated) return <h1 className='text-center text-4xl'>Loading ... </h1>

  return (
    <Layout>
      <div className="w-full xs:h-[100%] sm:h-[100%] sm:w-[100%] sm:mx-auto md:max-w-[700px] md:mx-auto md:col-span-2">          
        <UserHero
          coverImage={data.coverImage}
          profileImage={data.profileImage}
        />
        <UserProfileInfo
          username={data.username}
          followers={data.followers}
          following={data.following}
          bio={data.bio}
        />
        <EditProfileButton
          handleOpen={handleOpen}
          userId={userId}
        />
        <ProfileTabs
          data={data}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='bg-white max-w-[1200px] mx-auto mt-5 rounded-lg p-5'>
          <div className="flex flex-col gap-4 justify-start">
            <h2 className='text-left text-2xl'>Edit Profile</h2>
            <EditProfileForm />
          </div>
        </div>
      </Modal>
    </Layout>
  )
}

export default profile

export async function getStaticPaths({}) {
  const res = await fetch('http://192.168.1.25:4000/user');

  const data = await res.json();  

  const paths = data.map((user: any) => ({
    params: { userId: user.id.toString() },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }: { params: any }) {
  
  const res = await fetch(`http://192.168.1.25:4000/user/${params.userId}/profile`);
  
  const data = await res.json(); 
  return {
    props: { data },
    revalidate: 1,
  }
}


// <div className="">
            //   <Image
            //     src={data.profileImage}
            //     width={100}
            //     height={100}
            //     alt='Profile user'
            //     className="rounded-full p-1 border mb-[20px]"
            //   />
            // </div>