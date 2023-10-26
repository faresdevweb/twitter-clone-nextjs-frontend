import {create} from 'zustand';
import { Post } from '@/interfaces/Post.interface';

type PostStore = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  addLike: (postId: string, userId: string) => void;
  addRepost: (postId: string, userId: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts: Post[]) => set({ posts }),
  addPost: (post: any) => set((state: any) => {
    const newState = { posts: [post, ...state.posts] };
    return newState;
  }),
  addLike: (postId: string, userId: string) => set((state: any) => {
    const newState = { 
      posts: state.posts.map((post: any) => {
          if(post.id === postId){
            const alreadyLiked = post.likedIds.includes(userId);
            if(alreadyLiked){
              return {
                ...post,
                likedIds: post.likedIds.filter((id: string) => id !== userId)
              };
            } else {
              return {
                ...post,
                likedIds: [...post.likedIds, userId]
              };
            }
          }
          return post;
        })
    }
    return newState;
  }),
  addRepost: (postId: string, userId: string) => set((state: any) => {
    const newState = { 
      posts: state.posts.map((post: any) => {
          if(post.id === postId){
            const alreadyReposted = post.Retweet.includes(userId);
            if(alreadyReposted){
              return {
                ...post,
                Retweet: post.Retweet.filter((id: string) => id !== userId)
              };
            } else {
              return {
                ...post,
                Retweet: [...post.Retweet, userId]
              };
            }
          }
          return post;
        })
    }
    return newState;
  }),

}));

