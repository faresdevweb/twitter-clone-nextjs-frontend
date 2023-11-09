import { useCookies } from "react-cookie"
import { repostPost, repostComment } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/interfaces/Post.interface";

export const useRepost = () => {
    const queryClient = useQueryClient();
    const [ cookies ] = useCookies(['token']);

    const user: any = queryClient.getQueryData(['user']);

    const { mutate: repost } = useMutation({
        mutationFn: (postId: string) => repostPost(postId, cookies.token),
        onMutate: async (postId: string) => {
          // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
          await queryClient.cancelQueries({ queryKey: ['postId', postId] });
      
          // Snapshot the previous value
          const previousPost = queryClient.getQueryData<Post>(['postId', postId]);
      
          // Optimistically update to the new value
          queryClient.setQueryData<Post>(["posts",'postId', postId], (oldPost: any) => {
            if (!oldPost) return oldPost;
            const alreadyReposted = oldPost.repostedIds.includes(user.id);
            return {
              ...oldPost,
              repostedIds: alreadyReposted
                ? oldPost.repostedIds.filter((id: string) => id !== user.id)
                : [...oldPost.repostedIds, user.id],
            };
          });
      
          // Return a context object with the snapshotted value
          return { previousPost };
        },
        onError: (err, postId, context) => {
          // Roll back to the snapshot
          if (context?.previousPost) {
            queryClient.setQueryData(['postId', postId], context.previousPost);
          }
        },
        onSettled: (data, error, postId) => {
          // Invalidate to refetch
          queryClient.invalidateQueries({queryKey: ['postId', postId] });
        },
      });
      

      const { mutate: repostComments } = useMutation<Post, Error, { commentId: string, jwt: string }, { previousComments: any }>({
        mutationFn: ({ commentId, jwt }) => repostComment(commentId, jwt),
        onMutate: async (variables) => {
          await queryClient.cancelQueries({ queryKey: ['comments'] });
      
          const previousComments = queryClient.getQueryData<Post[]>(['comments']);
      
          queryClient.setQueryData<Post[]>(['comments'], (oldComments: any) => {
            if (!oldComments) return oldComments;
            return oldComments.map((comment: any) => {
              if (comment.id === variables.commentId) {
                const alreadyReposted = comment.repostedIds.includes(user.id);
                return {
                  ...comment,
                  repostedIds: alreadyReposted ? comment.repostedIds.filter((id: string) => id !== user.id) : [...comment.repostedIds, user.id],
                };
              }
              return comment;
            });
          });
      
          return { previousComments };
        },
        onError: (err, variables, context) => {
          if (context?.previousComments) {
            queryClient.setQueryData(['comments'], context.previousComments);
          }
        },
        onSettled: (data, error, variables) => {
          queryClient.invalidateQueries({ queryKey: ['comments'] });
        },
      });
      



    return { repost, repostComments }
}