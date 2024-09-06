import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/authOptions';
import { postFetch } from '@/dataFetch/postFetch';
import Posts from '@/components/post/Posts';

export default async function App() {
	const session:CustomSession | null = await getServerSession(authOptions)
	const posts:apiResponsePost<PostType> = await postFetch(session?.user?.token!)

    return (
		<div>
			<Posts data={posts} />
		</div>
    );
}