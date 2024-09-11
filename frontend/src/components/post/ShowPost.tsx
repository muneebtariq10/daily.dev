import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"  
import Image from "next/image"
import AddComment from "../comment/AddComment"

export default function ShowPost({children, post}:{children:React.ReactNode, post:PostType}) {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="w-full lg:min-w-[700px] max-h-screen overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle>Posted by {post.user.name} on {post.created_at}</DialogTitle>
                    </DialogHeader>
                    <div>
                        <h1 className="text-3xl font-bold">{post.title}</h1>
                        <Image src={post.image} width={400} height={400} alt="post image" className="w-full rounded-lg my-2" />
                        <p>{post.description}</p>
                        <AddComment post={post} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}