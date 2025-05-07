"use client";
import React from 'react'
import { Button } from '@/Components/ui/button'
import Services from '@/AppComponent/Services'
import { useRouter } from 'next/navigation'
const page = () => {
    const router = useRouter();
  return (
    <div>
     <Services/>
    </div>
  )
}

export default page