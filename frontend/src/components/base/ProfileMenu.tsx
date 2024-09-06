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
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import myAxios from '@/lib/axios.config';
import { LOGOUT_URL, UPDATE_PROFILE } from '@/lib/apiEndPoints';
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';
import { toast } from 'react-toastify';
import { signOut, useSession } from "next-auth/react";
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export default function ProfileMenu() {
    const [logoutOpen, setLogoutOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        image: []
    });
    const [image, setImage] = useState<File | null>(null);
    const { data, update } = useSession();
    const user = data?.user as CustomUser
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        console.log(file)
        if (file) {
            setImage(file)
        }
    }

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

    const updateProfile = async (event:React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("image", image ?? "");
        myAxios.post(UPDATE_PROFILE, formData, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }).then((res) => {
            const response = res.data
            update({ image: response.image })
            toast.success("Profile update successfully!")
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            if (err.response?.status === 422) {
                setErrors(err.response?.data.errors)
            } else {
                toast.error("Something went wrong.")
            }
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

            <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>

                    <form>
                        <div className="mb-2">
                            <Label htmlFor="profile">Profile Image</Label>
                            <Input
                                type="file"
                                className="file:text-white"
                                accept="image/png,image/jpg,image/svg,image/gif,image/jpeg,image/webp"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="mb-2">
                            <Button className="w-full" onClick={updateProfile} disabled={loading}>{loading ? "Processing..." : "Update"}</Button>
                        </div>
                    </form>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserAvatar image={user?.image ?? undefined} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setProfileOpen(true)}>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLogoutOpen(true)}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
