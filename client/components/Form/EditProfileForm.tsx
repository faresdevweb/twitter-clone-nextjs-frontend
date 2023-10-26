import React from 'react'
import { useProfile } from '@/hooks'
import { Button, Input, TextArea } from '../Input'
import { useForm } from 'react-hook-form'

const EditProfileForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { editProfile } = useProfile();

    const onSubmit = (data: any) => {
        console.log(data);
        editProfile(data);
    }

  return (
    <form className='flex flex-col justify-start p-5' onSubmit={handleSubmit(onSubmit)}>
        <div className='place-items-start p-2 mt-5 w-3/4'>
            <Input
                label='Username'
                placeholder='Change username'
                type='text'
                {...register('username')}
            />
        </div>
        <div className='place-items-start p-2 mt-5 w-3/4'>
            <TextArea
                label='Bio'
                placeholder='Edit your bio'
                {...register('bio')}
            />
        </div>
        <div className='place-items-start p-2 mt-5 w-3/4'>
            <Input
                label='Profile image'
                placeholder='Change profile image'
                type='file'
                {...register('profileImage')}
            />
        </div>
        <div className='place-items-start p-2 mt-5 w-3/4'>
            <Input
                label='Cover image'
                placeholder='Change cover image'
                type='file'
                {...register('coverImage')}
            />
        </div>
        <div className='place-items-start p-2 mt-5'>
            <Button
                label='Save'
                variant='primary'
            />
        </div>
    </form>
  )
}

export default EditProfileForm