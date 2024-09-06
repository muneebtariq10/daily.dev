"use client";
import React, { useState } from 'react';
import { TabsContent } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import myAxios from '@/lib/axios.config';
import { CHECK_CREDENTIALS } from '@/lib/apiEndPoints';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';

export default function Login() {
    const [authState, setAuthState] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    
    const [errors, setErrors] = useState({
        email: [],
        password: []
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        myAxios.post(CHECK_CREDENTIALS, authState)
            .then((res) => {
                setLoading(false)
                const response = res.data
                if (response.status === 200) {
                    signIn("credentials", {
                        email: authState.email,
                        password: authState.password,
                        redirect: true,
                        callbackUrl: "/"
                    })
                    toast.success(response.message)
                }
            })
            .catch((err) => {
                setLoading(false)
                if (err.response?.status === 422) {
                    setErrors(err.response?.data.errors)
                } else if (err.response?.status === 401) {
                    toast.error("Invalid Credentials.")
                } else {
                    toast.error("Something went wrong.")
                }
            })
    }

    return (
        <div>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Welcome to Daily.dev
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <form onSubmit={handleSubmit}>
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
                                    placeholder="**********"
                                    onChange={(e) => setAuthState({...authState, password: e.target.value})}
                                />
                                <span className="text-red-400">{errors.password?.[0]}</span>
                            </div>
                            <div className="mt-2">
                                <Button className="w-full" disabled={loading}>{loading ? "Processing..." : "Login"}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>
        </div>
    );
}