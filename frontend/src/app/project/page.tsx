'use client';
import Projectboard from '@/AppComponent/Projectboard'
import Sider2 from '@/AppComponent/Sider2'
import React from 'react'

const page = () => {


    return (
        <div className='flex flex-row'>
            <div className='xs:hidden sm:hidden md:block w-[20%]'>
                <Sider2 />

            </div>
            <div className='w-[90%]'>



                <Projectboard />
            </div>

        </div>

    )
}

export default page
