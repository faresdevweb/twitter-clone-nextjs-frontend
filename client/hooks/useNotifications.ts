import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/services";

export const useNotifications = () => {

    const [ cookie ] = useCookies(['token']);
    
    const { data } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => getNotifications(cookie.token),
    })

    return {
        data
    };
}