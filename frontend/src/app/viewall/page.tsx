"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react'

const ViewAll = () => {
    const searchParams = useSearchParams();


    React.useEffect(() => {
        const name = searchParams.get('category');
        if (name) {
          console.log('Name from query:', name);
        }
        alert(name);
    } , [searchParams])
  return (
    <div>
      
    </div>
  )
}

export default ViewAll
