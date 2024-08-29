"use client";
import React, { useState } from 'react';
import { TabsContent } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function Login() {
    const [authState, setAuthState] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

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
                        <form>
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
                                    placeholder="**********"
                                    onChange={(e) => setAuthState({...authState, password: e.target.value})}
                                />
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