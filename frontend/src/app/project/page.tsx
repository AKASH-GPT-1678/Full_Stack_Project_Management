'use client';
import Projectboard from '@/AppComponent/Projectboard'
import Sider2 from '@/AppComponent/Sider2'
import React, { use, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { Initials } from '@/AppComponent/redux';

const page = () => {
   

    return (
        <div className='flex flex-row'>
            <Sider2 />
            <Projectboard />
        
        </div>

    )
}

export default page
