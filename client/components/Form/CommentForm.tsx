import { Button, TextArea } from '../Input';
import { usePost, useComment } from '@/hooks';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

type CommentFormProps = {
    profileImage: string;
    postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ profileImage, postId }) => {
    const { addPosts } = usePost();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { commentPost } = useComment();
  
    const onSubmit = async (data: any) => {
      console.log(data);
      if(data.body.trim !== '') {
        await commentPost(data.body, postId);
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

export default CommentForm