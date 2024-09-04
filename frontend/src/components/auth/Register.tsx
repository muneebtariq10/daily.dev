"use client";
import React, { useState } from 'react';
import { TabsContent } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import myAxios from '@/lib/axios.config';
import { REGISTER_URL } from '@/lib/apiEndpoints';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';

export default function Register() {
    const [authState, setAuthState] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        name: [],
        username: [],
        email: [],
        password: [],
        password_confirmation: []
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        myAxios.post(REGISTER_URL, authState)
            .then((res) => {
                setLoading(false)
                const response = res.data

                signIn("credentials", {
                    email: authState.email,
                    password: authState.password,
                    redirect: true,
                    callbackUrl: "/"
                })

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
        <div>
            <TabsContent value="register">
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Don't have an account? Create new here
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={authState.name}
                                    onChange={(e) => setAuthState({...authState, name: e.target.value})}
                                    placeholder="Enter Name..."
                                />
                                <span className="text-red-400">{errors.name?.[0]}</span>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={authState.username}
                                    onChange={(e) => setAuthState({...authState, username: e.target.value})}
                                    placeholder="Enter Username..."
                                />
                                <span className="text-red-400">{errors.username?.[0]}</span>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={authState.email}
                                    onChange={(e) => setAuthState({...authState, email: e.target.value})}
                                    placeholder="Enter Email..."
                                />
                                <span className="text-red-400">{errors.email?.[0]}</span>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={authState.password}
                                    placeholder="**********"
                                    onChange={(e) => setAuthState({...authState, password: e.target.value})}
                                />
                                <span className="text-red-400">{errors.password?.[0]}</span>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={authState.password_confirmation}
                                    placeholder="**********"
                                    onChange={(e) => setAuthState({...authState, password_confirmation: e.target.value})}
                                />
                            </div>
                            <div className="mt-2">
                                <Button className="w-full" disabled={loading}>{loading ? "Processing..." : "Register"}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>
        </div>
    );
}