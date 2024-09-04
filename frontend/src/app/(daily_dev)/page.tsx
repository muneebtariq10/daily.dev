import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';

export default async function App() {
    const session = await getServerSession(authOptions)

    return (
		<div>
			<h1>Hi,</h1>
		</div>
    );
}