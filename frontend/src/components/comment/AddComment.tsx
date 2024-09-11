import React, { useState } from "react"
import { Button } from "../ui/button"
import UserAvatar from "../common/UserAvatar"
import { Textarea } from "../ui/textarea"

export default function AddComment({post}:{post:PostType}) {
    const [showBox, setShowBox] = useState(true)
    return (
        <div className="my-4">
            {
                showBox
                    ?
                    <div className="border rounded-xl flex justify-between items-center p-3" onClick={() => setShowBox(false)}>
                        <div className="flex space-x-4 items-center">
                            <UserAvatar image={post.user.image} />
                            <p className="text-muted-foreground text-sm">Share your thoughts...</p>
                        </div>
                        <Button variant="outline">Post</Button>
                    </div>
                    :
                    <div>
                        <form>
                            <div className="mb-4">
                                <Textarea placeholder="Type your thoughts..."></Textarea>
                            </div>
                            <div className="mb-2 flex justify-end">
                                <Button>Post Comment</Button>
                            </div>
                        </form>
                        
                    </div>
            }
        </div>
    )
}
