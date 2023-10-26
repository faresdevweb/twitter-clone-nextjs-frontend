import { useCookies } from "react-cookie";
import jwt from 'jsonwebtoken';
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store";

export const useNotifications = () => {

    const [ cookie ] = useCookies(['token']);
    const { isAuthenticated } = useAuthStore();
    const [notifications, setNotifications] = useState<[]>([]);

    useEffect(() => {
        if(isAuthenticated){
            getNotifications();
        }
    }, [])

    const getNotifications = async () => {
        try {
            const response = await fetch('http://192.168.1.25:4000/notifications', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${cookie.token}`,
                }
            })
            if(response.ok){
                const data = await response.json();
                setNotifications(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        notifications
    };
}