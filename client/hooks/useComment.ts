import { useCookies } from "react-cookie"
import { useSinglePostStore } from "@/store";


export const useComment = () => {

    const [ cookie ] = useCookies(['token']);

    const { addComment } = useSinglePostStore();

    const commentPost = async (message: string, postId: string) => {
        try {
            const response = await fetch(`http://192.168.1.25:4000/message/${postId}/comment`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookie.token}`,
                },
                body: JSON.stringify({ body: message })
            })
            if(response.ok){
                const data = await response.json();
                addComment(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        commentPost
    };
}