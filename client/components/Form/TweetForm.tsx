import Image from 'next/image';
import { Button, TextArea } from '../Input';
import { usePost } from '@/hooks';
import { useForm } from 'react-hook-form';

type TweetFormProps = {
  profileImage: string;
}

const TweetForm: React.FC<TweetFormProps> = ({ profileImage }) => {

  const { addPosts } = usePost();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    if(data.body.trim !== '') {
      await addPosts(data.body);
      reset();
    };
    
  }

    return (
        <div className="flex justify-between w-full sm:w-auto mb-4 sm:mb-0">
          <div className='h-fit px-2 w-[20%]'>
              <Image
                src={profileImage}
                width={45}
                height={45}
                className="rounded-full mt-5"
                alt='Profile user'
              />
          </div>
          <form className='w-[80%] p-5 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full'>
                <TextArea
                  placeholder="What's happening?"
                  className='w-[100%]'
                  {...register('body', { required: true })}
                />
            </div>
            <div className='mt-5'>
                <Button
                    type='submit'
                    label='Tweet'
                />
            </div>
          </form>
        </div>
      );
}

export default TweetForm