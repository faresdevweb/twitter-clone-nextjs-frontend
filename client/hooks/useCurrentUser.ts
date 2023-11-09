import { useCookies } from "react-cookie";
import { useUserStore } from "@/store"
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services";
import { User } from "@/interfaces/User.interface";
import { useEffect } from "react";


export const useCurrentUser = () => {
    const { setUser, user } = useUserStore();
    const [cookie] = useCookies(['token']);

    const { data, isSuccess } = useQuery<User, Error>({
      queryKey: ['user'],
      queryFn: () => getCurrentUser(cookie.token),
    });    

    useEffect(() => {
      if (isSuccess && data) {
        setUser(data);
      }
    }, [data, isSuccess, setUser])
  
    return { user }
  }
  