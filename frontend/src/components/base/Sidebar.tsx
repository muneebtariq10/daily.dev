import React from 'react'
import SidebarLinks from './SidebarLinks'

export default function Sidebar() {
    return (
        <div className='w-[260px] border-r p-4 h-full hidden lg:block'>
            <SidebarLinks />
        </div>
    )
}
