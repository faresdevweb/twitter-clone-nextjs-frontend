import { useAuthStore } from "@/store";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { usePostStore } from "@/store";

const LIMIT = 10;

export const usePagination = () => {

    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMoreTweets, setHasMoreTweets] = useState<boolean>(true);
    const [cookie] = useCookies(['token']);
    const { isAuthenticated } = useAuthStore();
    const { setPosts, posts } = usePostStore();

    useEffect(() => {
        if(isAuthenticated){
          getAllPosts();
        }
      }, [isAuthenticated])

    const getAllPosts = async () => {
        try {
            const response = await fetch(`http://192.168.1.25:4000/message?page=${page}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${cookie.token}`,
                }
            });
            if(response.ok){
              const data = await response.json();
              setPosts(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loadMorePosts = async () => {
        setPage(page + 1);
        setLoading(true);
        const response = await fetch(`http://192.168.1.25:4000/message?page=${page}`);
        const newPosts = await response.json();
        setPosts([...posts, ...newPosts]);
        setLoading(false);
        if (newPosts.length < LIMIT) { // Assurez-vous de définir LIMIT correctement
            setHasMoreTweets(false);
        }
    
    }

    return { loadMorePosts, hasMoreTweets };
}