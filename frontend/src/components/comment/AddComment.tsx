import React, { useState } from "react"
import { Button } from "../ui/button"
import UserAvatar from "../common/UserAvatar"
import { Textarea } from "../ui/textarea"
import { useSession } from "next-auth/react"
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions"
import myAxios from "@/lib/axios.config"
import { COMMENT_URL } from "@/lib/apiEndPoints"
import { toast } from "react-toastify"

export default function AddComment({post}:{post:PostType}) {
    const [showBox, setShowBox] = useState(true)
    const { data } = useSession()
    const user: CustomUser = data?.user as CustomUser
    const [comment, setComment] = useState("")
    const [errors, setErrors] = useState({
        post_id: [],
        comment: []
    })
    const [loading, setLoading] = useState(false)

    const addComment = (event:React.FormEvent) => {
        event.preventDefault()
        setLoading(true)

        myAxios.post(COMMENT_URL, {
            comment,
            post_id: post.id
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then((res) => {
                const response = res.data
                setLoading(false)
                setComment("")
                console.log(response)
                toast.success(response.message)
            })
            .catch((err) => {
                setLoading(false)
                if (err.response?.status === 422) {
                    setErrors(err.response?.data.errors)
                } else {
                    toast.error("Something went wrong.")
                }
            })
    }

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
                        <form onSubmit={addComment}>
                            <div className="mb-4">
                                <Textarea placeholder="Type your thoughts..." value={comment} onChange={(e) => setComment(e.target.value)} />
                            </div>
                            <div className="mb-2 flex justify-end">
                                <Button disabled={loading}>{loading ? "Processing..." : "Post Comment"}</Button>
                            </div>
                        </form>
                        
                    </div>
            }
        </div>
    )
}
