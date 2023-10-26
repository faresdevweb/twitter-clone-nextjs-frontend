import { create } from "zustand";

type Comment = {
    id: string;
    username: string;
    body: string;
    likedIds?: string[];
    Retweet?: string[];
};

type CommentStore = {
    specificTweet: null | {
        id: string;
        username: string;
        body: string;
        user: any;
        likedIds?: string[];
        Retweet?: string[];

        comments: Comment[];
    };
    setSpecificTweet: (tweet: CommentStore['specificTweet']) => void;
    addComment: (comment: Comment) => void;
    likeComment: (commentId: string, userId: string) => void;
    repostComment: (commentId: string, userId: string) => void;
};

export const useSinglePostStore = create<CommentStore>((set) => ({
    specificTweet: null,

    setSpecificTweet: (tweet) => set({ specificTweet: tweet }),

    addComment: (comment) => set((state) => {
        if (state.specificTweet) {
            return {
                specificTweet: {
                    ...state.specificTweet,
                    comments: [...state.specificTweet.comments, comment],
                },
            };
        }
        return state;
    }),

    likeComment: (commentId, userId) => set((state) => {
        if (state.specificTweet) {
            return {
                specificTweet: {
                    ...state.specificTweet,
                    comments: state.specificTweet.comments.map((comment) => {
                        if (comment.id === commentId) {
                            const alreadyLiked = comment.likedIds?.includes(userId) || false;
                            if (alreadyLiked) {
                                return {
                                    ...comment,
                                    likedIds: comment.likedIds?.filter((id) => id !== userId),
                                };
                            } else {
                                return {
                                    ...comment,
                                    likedIds: [...(comment.likedIds || []), userId],
                                };
                            }
                        }
                        return comment;
                    }),
                },
            };
        }
        return state;
    }),

    repostComment: (commentId, userId) => set((state) => {
        if (state.specificTweet) {
            return {
                specificTweet: {
                    ...state.specificTweet,
                    comments: state.specificTweet.comments.map((comment) => {
                        if (comment.id === commentId) {
                            const alreadyReposted = comment.Retweet?.includes(userId) || false;
                            if (alreadyReposted) {
                                return {
                                    ...comment,
                                    Retweet: comment.Retweet?.filter((id) => id !== userId),
                                };
                            } else {
                                return {
                                    ...comment,
                                    Retweet: [...(comment.Retweet || []), userId],
                                };
                            }
                        }
                        return comment;
                    }),
                },
            };
        }
        return state;
    }),
}));
