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