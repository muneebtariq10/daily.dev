"use client";
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../ui/dropdown-menu'
import UserAvatar from '../common/UserAvatar'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import myAxios from '@/lib/axios.config';
import { LOGOUT_URL } from '@/lib/apiEndpoints';
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';
import { toast } from 'react-toastify';
import { signOut } from "next-auth/react";

export default function ProfileMenu({ user } : {user:CustomUser}) {
    const [logoutOpen, setLogoutOpen] = useState(false);
    const logoutUser = async () => {
        myAxios.post(LOGOUT_URL, {}, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }).then((res) => {
            signOut({
                callbackUrl: "/login",
                redirect: true
            });
        }).catch((err) => {
            toast.error(err.message);
        })
    }

    return (
        <>
            <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action will expire your session. To access home page you have to login again!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-4">
                        <Button variant="destructive" onClick={logoutUser}>Yes Logout!</Button>
                        <DialogClose asChild>
                            <Button>Cancel</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserAvatar />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLogoutOpen(true)}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
