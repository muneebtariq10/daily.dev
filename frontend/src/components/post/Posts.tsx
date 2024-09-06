"use client"
import React, { useState, useEffect } from "react"
import PostCard from "./PostCard"
import { LaraEcho } from "@/lib/echo.config"

export default function Posts({ data }: { data: apiResponsePost<PostType> }) {
    const [posts, setPosts] = useState<apiResponsePost<PostType>>(data)

    useEffect(() => {
        LaraEcho.channel("channel-post")
            .listen("PostEvent", (event:any) => {
                console.log("post", event)
            })
        
        return () => {
            LaraEcho.leave("channel-post")
        }
    }, [])

    return (
        <div className="pt-4 p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {
                posts.data &&
                posts.data.length > 0 &&
                posts.data.map((item, index) => <PostCard post={item} key={index} />)
            }
        </div>
    )
}
