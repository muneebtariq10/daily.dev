"use client"
import React, { useEffect } from "react"
import { useImmer } from "use-immer"
import PostCard from "./PostCard"
import { LaraEcho } from "@/lib/echo.config"
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions"

export default function Posts({ data, user }: { data: apiResponsePost<PostType>, user:CustomUser }) {
    const [posts, setPosts] = useImmer<apiResponsePost<PostType>>(data)

    useEffect(() => {
        // const pvt_lara_echo = pvtLaraEcho(user.token!);
        // pvt_lara_echo.private(`App.Models.User.${user.id}`).listen("PostEvent", (event:any) => {
        //     console.log("post", event);
        // });

        // return () => {
        //     pvt_lara_echo.leave(`App.Models.User.${user.id}`)
        // }
        LaraEcho.channel("post-broadcast")
            .listen("PostBroadcastEvent", (event:any) => {
                console.log("post", event)
                const post:PostType = event.post
                setPosts((prevState) => {
                    prevState.data = [post, ...prevState.data]
                })
            })
            .listen("CommentCountEvent", (event:any) => {
                setPosts((prevState) => {
                    const index = prevState.data.findIndex((item) => item.id === event.post_id)
                    if (index !== -1) {
                        prevState.data[index].comment_count += 1
                    }
                })
            })
        
        return () => {
            LaraEcho.leave("post-broadcast")
        }
    }, [])

    return (
        <div className="pt-4 p-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4" style={{height: "90vh"}}>
            {
                posts.data &&
                posts.data.length > 0 &&
                posts.data.map((item, index) => <PostCard post={item} key={index} />)
            }
        </div>
    )
}
