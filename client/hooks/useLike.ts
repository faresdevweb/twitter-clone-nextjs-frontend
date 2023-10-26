import { useCookies } from 'react-cookie'
import { usePostStore, useSinglePostStore } from '@/store';

export const useLike = () => {
    const [ cookies ] = useCookies(['token']);
    const { addLike } = usePostStore();
    const { likeComment } = useSinglePostStore();


    const handleLikePost = async (itemId: string, userId: string) => {
        try {
            const response = await fetch(`http://192.168.1.25:4000/message/${itemId}/like/Post`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies.token}`
                }
            })
            if(response.ok){
                const data = await response.json();
                console.log(data);  
                addLike(itemId, userId);
            } else {
                console.log(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLikeComment = async (itemId: string, userId: string) => {
        try {
            const response = await fetch(`http://192.168.1.25:4000/message/${itemId}/like/Comment`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies.token}`
                }
            })

            
            if(response.ok){
                const data = await response.json();
                likeComment(itemId, userId);
            }
             else {
                console.log(await response.text())
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {handleLikePost, handleLikeComment}
}