import { useAuthStore, usePostStore } from '@/store';
import { useCookies } from 'react-cookie';
import { createPost, MutationResponse } from '@/services';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Post } from '@/interfaces/Post.interface';



export const usePost = () => {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuthStore();
    const [ cookie ] = useCookies(['token']);

    const {mutate: createPosts, isError, error} = 
      useMutation<Post, Error, { message: string, jwt: string }>({
        mutationFn: ({ message, jwt }) => createPost(message, jwt),
        onMutate: variables => {
          const previousPosts = queryClient.getQueryData(["posts"]);
          queryClient.invalidateQueries({ queryKey: ["posts"] });
          queryClient.setQueryData(["posts"], (old: any) => {
            if (!old || !old.pages) return old;
          
            // Accéder à la dernière page de tweets
            const lastPageIndex = old.pages.length - 1;
            const lastPage = old.pages[lastPageIndex];
          
            const newPage = [...lastPage, { message: variables.message }];
            const newPages = [...old.pages];
            newPages[lastPageIndex] = newPage;
          
            return { ...old, pages: newPages };
        });
      
          // Restaurer l'état précédent en cas d'erreur
          return { previousPosts };
        },
        onError: (context: any) => {
          queryClient.setQueryData(["posts"], context.previousPosts);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });


    return {
        isAuthenticated, 
        isError, 
        error, 
        createPosts        
    };
}