import { useCookies } from 'react-cookie'
import { likePost } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '@/interfaces/Post.interface';
import { likeComment } from '@/services';

export const useLike = () => {
    const queryClient = useQueryClient();
    const [ cookies ] = useCookies(['token']);

    const user: any = queryClient.getQueryData(['user'])

    const { mutate: like } = 
    useMutation<Post, Error, { postId: string, jwt: string }, { previousPost: Post | undefined }>({
        mutationFn: ({ postId, jwt }) => likePost(postId, jwt),
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ['posts','postId', variables.postId] });
            
            const previousPost = queryClient.getQueryData<Post>(["posts",'postId', variables.postId]);
            
            queryClient.setQueryData<Post>(["posts",'postId', variables.postId], (oldPost) => {
                if (!oldPost) return oldPost;
                const alreadyLiked = oldPost.likedIds.includes(user.id);
                return {
                  ...oldPost,
                  likedIds: alreadyLiked
                    ? oldPost.likedIds.filter((id: string) => id !== user.id)
                    : [...oldPost.likedIds, user.id],
                };
            });
        
            return { previousPost };
        },
        onError: (err, variables, context) => {
          if (context?.previousPost) {
            queryClient.setQueryData(['posts','postId', variables.postId], context.previousPost);
          }
        },
        onSettled: (data, error, variables) => {
          queryClient.invalidateQueries({ queryKey: ['posts','postId', variables.postId] });
            queryClient.cancelQueries({ queryKey: ['posts','postId', variables.postId] });
        },
      });

      const { mutate: likeComments } = useMutation<Post, Error, { commentId: string, jwt: string }, { previousComments: any }>({
        mutationFn: ({ commentId, jwt }) => likeComment(commentId, jwt),
        onMutate: async (variables) => {
          await queryClient.cancelQueries({ queryKey: ['comments'] });
      
          const previousComments = queryClient.getQueryData<Post[]>(['comments']);
      
          queryClient.setQueryData<Post[]>(['comments'], (oldComments) => {
            if (!oldComments) return oldComments;
            return oldComments.map((comment) => {
              if (comment.id === variables.commentId) {
                const alreadyLiked = comment.likedIds.includes(user.id);
                return {
                  ...comment,
                  likedIds: alreadyLiked ? comment.likedIds.filter((id) => id !== user.id) : [...comment.likedIds, user.id],
                };
              }
              return comment;
            });
          });
      
          return { previousComments };
        },
        onError: (context: any) => {
          if (context?.previousComments) {
            queryClient.setQueryData(['comments'], context.previousComments);
          }
        },
        onSettled: (data, error, variables) => {
          queryClient.invalidateQueries({ queryKey: ['comments'] });
        },
      });
      
   

    return { like, likeComments }
}