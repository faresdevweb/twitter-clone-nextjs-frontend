import { useEffect } from "react";
import { useAuthStore } from "@/store";
import { useRouter } from "next/router";
import { User } from "@/interfaces/User.interface";
import { useCookies } from "react-cookie";
import dotenv from 'dotenv';
dotenv.config();

export const useAuth = () => {

  const router = useRouter();
  const { isAuthenticated, setAuthenticated, logout } = useAuthStore();
  const [ cookies, setCookie, removeCookie ] = useCookies(['token']);

  const registerUser = async (userData: User) => {
    try {
      const response = await fetch(`http://192.168.1.25:4000/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (response.ok) {
        setCookie('token', data.access_token, { path: '/', sameSite: 'lax' });
        setAuthenticated(true);
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Registration failed.' };
    }
  };

  const LogIn = async (userData: User) => {
    try {
      const response = await fetch(`http://192.168.1.25:4000/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (response.ok) {
        setCookie('token', data.access_token, { path: '/', sameSite: 'lax' });
        setAuthenticated(true);
        router.push('/home')
        return { success: true };
      } else {
        console.log(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Login failed.' };
    }
  }

  const LogOut = () => {
    removeCookie('token');
    logout();
    router.push('/');
  }

  return {
    isAuthenticated,
    registerUser,
    router,
    LogOut,
    LogIn
  };
}