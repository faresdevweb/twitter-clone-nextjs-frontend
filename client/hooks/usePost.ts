import { useEffect } from 'react';
import { useAuthStore, usePostStore } from '@/store';
import { useCookies } from 'react-cookie';

export const usePost = () => {

    const { isAuthenticated } = useAuthStore();
    const [ cookie ] = useCookies(['token']);
    const { addPost, setPosts } = usePostStore();

    
    const addPosts = async (message: string) => {
        try {
            const response = await fetch('http://192.168.1.25:4000/message/createPost', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookie.token}`,
                },
                body: JSON.stringify({ body: message })
            })
            if(response.ok){
                const data = await response.json();
                
                addPost(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        isAuthenticated,
        addPosts
    };
}