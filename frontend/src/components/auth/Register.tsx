"use client";
import React, { useState } from 'react';
import { TabsContent } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function Register() {
    const [authState, setAuthState] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const [loading, setLoading] = useState(false);

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
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={authState.name}
                                onChange={(e) => setAuthState({...authState, name: e.target.value})}
                                placeholder="Enter Name..."
                            />
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
                            <Button className="w-full" disabled={loading}>{loading ? "Processing..." : "Login"}</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </div>
    );
}