import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { BellIcon } from 'lucide-react'
import Search from './Search'
import ProfileMenu from './ProfileMenu'
import MobileSidebar from './MobileSidebar'
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions'

export default function Navbar({ user }: {user:CustomUser}) {
    return (
        <nav className="flex justify-between items-center p-2 border-b">
            <MobileSidebar />

            <Image src="/logo.svg" width={120} height={120} alt="Logo" />

            <Search />

            <div className="flex space-x-3 items-center">
                <Button size="icon" variant="secondary">
                    <BellIcon className="w-5 h-5" />
                </Button>

                <ProfileMenu user={user} />
            </div>
        </nav>
    )
}
