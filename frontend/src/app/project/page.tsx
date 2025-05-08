'use client';
import Projectboard from '@/AppComponent/Projectboard'
import Sider2 from '@/AppComponent/Sider2'
import React from 'react'

const page = () => {
   

    return (
        <div className='flex flex-row'>
            <Sider2 />
            <Projectboard />
        
        </div>

    )
}

export default page
