import { useAuth } from "@/hooks/useAuth";
import { Input, Button } from "../Input";
import { useForm } from "react-hook-form";
import { Error } from "@/components";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { login, errorLogin, isErrorLogin } = useAuth() as any;

  console.log(errorLogin?.response?.data.message);

  const onSubmit = (data: any) => {
    if (data.email.trim() != "" || data.password.trim() != "") {
      login(data);
      reset();
    }
  };

  return (
    <>
      {isErrorLogin && <Error text={errorLogin?.response?.data.message} />}
      <form
        className="flex flex-col gap-4 w-[500px] mx-auto border-2 border-gray-500 rounded-lg p-5 mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Email"
          placeholder="Enter Email"
          variant="text"
          {...register("email", { required: true })}
        />
        <Input
          label="Password"
          placeholder="Enter password"
          variant="password"
          {...register("password", { required: true })}
        />

        <Button label="Submit" type="submit" variant="primary" />
      </form>
    </>
  );
};

export default LoginForm;
