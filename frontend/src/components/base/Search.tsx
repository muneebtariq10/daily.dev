import { SearchIcon } from 'lucide-react'
import React from 'react'

export default function Search() {
    return (
        <div className='relative hidden lg:block'>
            <input
                className='w-full lg:w-[500px] h-12 py-2 outline-none bg-muted rounded-2xl pl-10'
                placeholder='Search here...'
            />
            <SearchIcon className='absolute left-2 top-3 h-6 w-6 ' />
        </div>
    )
}
