import Button from '@/components/Input/Button'
import Input from '@/components/Input/Input'
import { useAuth } from '@/hooks';
import { useForm } from 'react-hook-form';

const RegisterForm = () => {

  const { registerUser } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = (data: any) => {
    console.log(data);
    if(data.username.trim() !== "" && data.email.trim() !== "" && data.password.trim() !== "") {
      registerUser(data);
      reset();
    }
  }

    
  return (
    <>
      <form 
        className='flex flex-col gap-4 w-[500px] mx-auto border border-green-500 p-5 mt-5' 
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label='Username'
          placeholder='Enter username'
          variant='text'
          {...register('username', { required: true })}
        />
        <Input
          label='Email'
          placeholder='Enter Email'
          variant='text'
          {...register('email', { required: true })}
        />
        <Input
          label='Password'
          placeholder='Enter password'
          variant='password'
          {...register('password', { required: true })}
        />

        <Button
          label='Submit'
          type='submit'
          variant='primary'
        />
      </form>
    </>
  )
}

export default RegisterForm