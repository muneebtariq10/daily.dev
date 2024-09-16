type ImagePreviewResType = {
    url: string;
    title: string;
    siteName: string | undefined;
    description: string | undefined;
    mediaType: string;
    contentType: string | undefined;
    images: string[];
    videos: {};
    favicons: string[];
}

type postStateType = {
    url?: string;
    image?: string;
    title?: string;
    description?: string;
}

type apiResponsePost<T> = {
    data: Array<T> | [];
    path: string;
    per_page: number;
    next_cursor: string;
    next_page_url: string;
    prev_cursor: string;
    prev_page_url: string;
}

type PostType = {
    id: number;
    user_id: number;
    title: string;
    url: string;
    image: string;
    description: string;
    comment_count: number;
    vote_count: number;
    user: UserType;
    created_at: string;
    updated_at: string;
}

type UserType = {
    id?: number;
    name?: string;
    email?: string;
    image?: string;
    username?: string;
}

type CommentType = {
    id?: number;
    user_id?: number;
    post_id?: number;
    comment?: string;
    user: UserType;
    created_at: string;
    updated_at: string;
}