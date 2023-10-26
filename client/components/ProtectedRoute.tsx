import { useAuth } from "@/hooks/useAuth"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/auth";
import { useCookies } from "react-cookie";

type ProtectedRouteProps = {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

    const router = useRouter();

    const { setAuthenticated } = useAuthStore();
    const  [cookies] = useCookies(['token']);
    const { isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                const response = await fetch(`http://192.168.1.25:4000/auth/verify-token`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${cookies.token}`,
                    },
                });
                if (response.ok) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Token verification failed:', error);
                setIsLoading(false);
            }
        };
        
        if (cookies.token) {
            checkTokenValidity();
        } else {
            setAuthenticated(false);
            setIsLoading(false);
        }
    }, [cookies.token]);
    
    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                router.push('/home');
            } else {
                router.push('/');
            }
        }
    }, [isAuthenticated]);

    if(!isAuthenticated) return <h1 className='text-center text-4xl'>Loading ... </h1>

  return (
    <>
        {children}
    </>
  )
}

export default ProtectedRoute