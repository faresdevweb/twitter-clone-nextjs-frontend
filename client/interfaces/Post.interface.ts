
export interface Post {
    comments: any;
    user: any;
    map(arg0: (post: any, index: number) => import("react").JSX.Element): import("react").ReactNode;
    repostedIds: [],
    body: string,
    createdAt: Date,
    id: string,
    image: string | null,
    likedIds: string[],
    updatedAt: Date,
    userId: string,
    username: string,
}