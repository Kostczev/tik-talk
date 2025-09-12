import { Profile } from "./profile.interface"

export interface PostCreateDto {
    title: string,
    content: string,
    authorId: number
}

export interface Post {
    id: number,
    title: string,
    content: string,
    author: Profile,
    images: string[],
    createdAt: string,
    updateAd: string,
    comments: PostComment[]
}

export interface PostComment {
    id: number,
    text: string,
    author: Profile,
    postId: number,
    commentId: number
    createdAt: string,
    updateAd: string
}

export interface CommentCreateDto {
    text: string,
    authorId: number,
    postId: number,
    // commentId: number
}