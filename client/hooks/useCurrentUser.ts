import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { useUserStore } from "@/store"


export const useCurrentUser = () => {
    const { setUser, user } = useUserStore();
    const [cookie] = useCookies(['token']);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      if (cookie.token) {
        getCurrentUser();
      }
    }, [cookie.token]);
  
    const getCurrentUser = async () => {
      try {
        const response = await fetch('http://192.168.1.25:4000/user/user-info', {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${cookie.token}`,
          }
        })
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    return { user, loading }
  }
  