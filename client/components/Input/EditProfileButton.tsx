import Button from './Button'
import { useCurrentUser } from '@/hooks';
import { FollowButton } from '@/components/Input';

type EditProfileButtonProps = {
    handleOpen: () => void;
    userId: string;
}

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ handleOpen, userId }) => {

    const { user } = useCurrentUser();

  return (
    <div>
        {
        user && user.id === userId ? 
        (
          <div className='p-5'>
            <Button label='Edit profile' onClick={handleOpen} />
          </div>
        ) : 
        (
          <>
            <FollowButton
              userId={userId}
            />
          </>
        )
      }
    </div>
  )
}

export default EditProfileButton