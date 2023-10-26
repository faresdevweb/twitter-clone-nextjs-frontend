
export interface Post {
    Retweet: [],
    body: string,
    createdAt: Date,
    id: string,
    image: string | null,
    likedIds: string[],
    updatedAt: Date,
    userId: string,
    username: string,
}