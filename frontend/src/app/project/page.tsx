'use client';
import Projectboard from '@/AppComponent/Projectboard'
import Sider2 from '@/AppComponent/Sider2'
import React from 'react'

const page = () => {
   

    return (
        <div className='flex flex-row'>
            <div className='xs:hidden sm:hidden md:block'>
                 <Sider2 />

            </div>
           
            <Projectboard />
        
        </div>

    )
}

export default page
