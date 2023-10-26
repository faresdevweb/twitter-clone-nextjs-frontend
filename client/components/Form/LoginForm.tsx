import { useAuth } from "@/hooks/useAuth"
import { Input, Button } from "../Input"
import { useForm } from "react-hook-form";

const LoginForm = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { LogIn } = useAuth();

  const onSubmit = (data: any) => {
    if(data.email.trim() != '' || data.password.trim() != ''){
      LogIn(data)
      reset()
    }
  }

  return (
    <form 
      className='flex flex-col gap-4 w-[500px] mx-auto border border-green-500 p-5 mt-5'
      onSubmit={handleSubmit(onSubmit)}
    >
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
  )
}

export default LoginForm