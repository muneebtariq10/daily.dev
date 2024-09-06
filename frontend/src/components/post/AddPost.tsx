import React, { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Link as LinkIcon } from 'lucide-react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import Image from 'next/image';
import { isValidUrl } from '@/lib/utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import myAxios from '@/lib/axios.config';
import { POST_URL } from '@/lib/apiEndPoints';
import { useSession } from "next-auth/react"
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';

export default function AddPost() {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [poststate, setPoststate] = useState<postStateType>({
		url: "",
		image: "",
		title: "",
		description: "",
	});
	const [errors, setErrors] = useState({
		url: [],
		title: [],
		description: [],
	});
	const { data } = useSession()
	const user:CustomUser = data?.user as CustomUser

	const loadPreview = async () => {
		if (poststate?.url && isValidUrl(poststate.url!)) {
			setLoading(true);
			axios.post("/api/image-preview", { url: poststate.url })
				.then((res) => {
					setLoading(false)
					const response: ImagePreviewResType = res.data?.data
					const img = response.images.length > 0 ? response.images[0] : "https://images.unsplash.com/photo-1725489892866-19f336aafdc1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					setPoststate({
						...poststate,
						image: img,
						title: response.title,
						description: response.description ?? ""
					})
				})
				.catch((err) => {
					setLoading(false)
					toast.error("Something went wrong while fetching data from URL!")
				})
		}
	}

	const handleSubmit = (event:React.FormEvent) => {
		event.preventDefault()
		setLoading(true)
		myAxios.post(POST_URL, poststate, {
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		})
		.then((res) => {
			const response = res.data
			setLoading(false)
			setOpen(false)
			setPoststate({})
			toast.success("Post added successfully!")
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
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className="flex space-x-3 items-center mb-4" onClick={() => setOpen(true)}>
					<LinkIcon className="w-5 h-5" />
					<p>Submit Article</p>
				</div>
			</DialogTrigger>
			<DialogContent onInteractOutside={(e) => e.preventDefault()} className='overflow-y-scroll max-h-screen'>
				<DialogHeader>
					<DialogTitle>Add Post</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit}>
					{
						poststate.image && <Image
							src={poststate.image}
							width={450}
							height={450}
							alt='image'
							className='object-contain w-full rounded-xl my-2'
						/>
					}
					<div className="mb-4">
						<Label htmlFor='url'>Url</Label>
						<Input
							id='url'
							type='text'
							placeholder='Url here..'
							value={poststate.url}
							onBlur={() => loadPreview()}
							onChange={(e) => setPoststate({...poststate, url: e.target.value})}
						/>
						<span className="text-red-500">{errors.url?.[0]}</span>
					</div>
					<div className="mb-4">
						<Label htmlFor='title'>Title</Label>
						<Input
							id='title'
							type='text'
							placeholder='Title here..'
							value={poststate.title}
							onChange={(e) => setPoststate({...poststate, title: e.target.value})}
						/>
						<span className="text-red-500">{errors.title?.[0]}</span>
					</div>
					<div className="mb-4">
						<Label htmlFor='description'>Description</Label>
						<Textarea
							id='description'
							placeholder='Description here..'
							value={poststate.description}
							rows={10}
							onChange={(e) => setPoststate({...poststate, description: e.target.value})}
						/>
						<span className="text-red-500">{errors.description?.[0]}</span>
					</div>
					<div className="mb-4">
						<Button className='w-full' disabled={loading}>{loading ? "Processing..." : "Submit"}</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>

	)
}
