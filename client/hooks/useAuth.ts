import { useAuthStore } from "@/store";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { registerUser, loginUser, MutationResponse } from "@/services";
import { User } from "@/interfaces/User.interface";

export const useAuth = () => {

  const router = useRouter();
  const { isAuthenticated, setAuthenticated, logout } = useAuthStore();
  const [ ,setCookie, removeCookie ] = useCookies(['token']);

  const { mutate: signup, isError: isErrorSignUp, error: errorSignUp } = 
  useMutation<MutationResponse, unknown, User>({
    mutationFn: registerUser,
    onSuccess: (data: MutationResponse) => {
      setAuthenticated(true);
      setCookie('token', data.access_token, { path: '/', sameSite: 'lax' });
      router.push('/home');
    },
    onError: (error: any) => {
      console.error(error);
    }
  });
  
  const { mutate: login, isError: isErrorLogin, error: errorLogin } = 
  useMutation<MutationResponse, Error, User>({
    mutationFn: loginUser,
    onSuccess: (data: MutationResponse) => {
      setAuthenticated(true);
      setCookie('token', data.access_token, { path: '/', sameSite: 'lax' });
      router.push('/home');
    },
    onError: (error: any) => {
      console.error(error.message);
    }
  });

 
  const LogOut = () => {
    removeCookie('token');
    logout();
    router.push('/');
  }

  return {
    isAuthenticated,
    router,
    LogOut,
    signup,
    login,
    isErrorSignUp,
    errorSignUp,
    isErrorLogin,
    errorLogin
  };
}
