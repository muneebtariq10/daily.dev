"use client";
import React from 'react'
import Link from 'next/link'
import UserAvatar from '../common/UserAvatar'
import { ArrowBigUp, Flame, Search } from 'lucide-react'
import { useSession } from "next-auth/react";
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';
import AddPost from '../post/AddPost';

export default function SidebarLinks() {
    const { data } = useSession();
    const user = data?.user as CustomUser;

    return (
        <div>
            <Link href="/" className='flex space-x-4 items-center py-4'>
                <UserAvatar image={user?.image ?? undefined} />
                <p>Feed</p>
            </Link>
            <p className="my-2 font-bold text-muted-foreground">Discover</p>
            <ul>
                <li>
                    <Link href="/popular" className="flex space-x-3 items-center mb-4">
                        <Flame className="w-5 h-5" />
                        <p>Popular</p>
                    </Link>
                    <Link href="/search" className="flex space-x-3 items-center mb-4">
                        <Search className="w-5 h-5" />
                        <p>Search</p>
                    </Link>
                    <Link href="/most-voted" className="flex space-x-3 items-center mb-4">
                        <ArrowBigUp className="w-5 h-5" />
                        <p>Most Voted</p>
                    </Link>
                </li>
            </ul>

            <p className="my-2 font-bold text-muted-foreground">Contribute</p>
            <ul>
                <li>
                    <AddPost />
                </li>
            </ul>
        </div>
    )
}
