import { useState } from "react";
import { useProfile } from "@/hooks";
import { Button, Input, TextArea } from "../Input";
import { useForm } from "react-hook-form";
import { ProgressBar } from "react-loader-spinner";

const EditProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { editProfile } = useProfile();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await editProfile(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <form
      className="flex flex-col justify-start p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="place-items-start p-2 mt-5 w-3/4">
        <Input
          label="Username"
          placeholder="Change username"
          type="text"
          {...register("username")}
        />
      </div>
      <div className="place-items-start p-2 mt-5 w-3/4">
        <TextArea
          label="Bio"
          placeholder="Edit your bio"
          {...register("bio")}
        />
      </div>
      <div className="place-items-start p-2 mt-5 w-3/4">
        <Input
          label="Profile image"
          placeholder="Change profile image"
          type="file"
          {...register("profileImage")}
        />
      </div>
      <div className="place-items-start p-2 mt-5 w-3/4">
        <Input
          label="Cover image"
          placeholder="Change cover image"
          type="file"
          {...register("coverImage")}
        />
      </div>
      <div className="place-items-start p-2 mt-5">
        {loading ? (
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        ) : (
          <Button label="Save" variant="primary" />
        )}
      </div>
    </form>
  );
};

export default EditProfileForm;
