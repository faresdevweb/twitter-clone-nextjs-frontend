import { useCookies } from "react-cookie"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "@/services";


export const useComment = () => {

    const [ cookie ] = useCookies(['token']);
    const queryClient = useQueryClient();

    const { mutate: comment } = useMutation({
        mutationFn: ({ postId, content, jwt }: { postId: string; content: string; jwt: string; }) => addComment(postId, content, jwt),
        onMutate: async ({ postId, content, jwt }: { postId: string; content: string; jwt: string; }) => {
            const previousComments = queryClient.getQueryData(['comments']);
            queryClient.invalidateQueries({ queryKey: ['comments'] });
            queryClient.setQueryData(['comments'], (oldComments: any) => {
                if (!oldComments) return oldComments;
                
                const newComment = { content, postId, jwt };
                const newComments = [...oldComments, newComment];
                return newComments;
            });
        },
        onError: ( context: any ) => {
            if (context?.previousComments) {
                queryClient.setQueryData(['comments'], context.previousComments);
            }
        },
        onSettled: ( data, error, postId ) => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
        }
    });

    return {
        comment
    };
}