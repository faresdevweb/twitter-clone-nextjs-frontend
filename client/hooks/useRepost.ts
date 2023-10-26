import { useCookies } from "react-cookie"
import { usePostStore, useSinglePostStore } from "@/store";

export const useRepost = () => {
    const [ cookies ] = useCookies(['token']);
    const { addRepost } = usePostStore();
    const { repostComment } = useSinglePostStore();

    const handleRepostPost = async (itemId: string, userId: string) => {
        try {
            const response = await fetch(`http://192.168.1.25:4000/message/${itemId}/retweet/Post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.token}`
                }
            })
            
            if(response.ok){
                addRepost(itemId, userId);
            } else {
                console.log(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRepostComment = async (itemId: string, userId: string) => {
        try {
            const response = await fetch(`http://192.168.1.25:4000/message/${itemId}/retweet/Comment`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies.token}`
                }
            })

            if(response.ok){
                repostComment(itemId, userId);
            } else {
                console.log(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    return { handleRepostPost, handleRepostComment }
}