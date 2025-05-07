"use client";
import React from 'react'
import { Button } from '@/Components/ui/button'
import Inventory from '@/AppComponent/Inventory'
import Documents from '@/AppComponent/Documents'
const Page = () => {
    const [active, setactive] = React.useState("Documents");


    return (
        <div>
            <div className='bg-white h-full'>
            <div className='flex justify-center gap-1  text-white mt-3'>
                       <Button className={`w-[160px] ml-2 h-[60px] bg-black cursor-pointer`} onClick={()=>setactive("Documents")}>Documents</Button>
                       <Button className={` w-[160px] h-[60px] bg-black cursor-pointer`} onClick={()=>setactive("Inventory")}>Inventory</Button>
             
            </div>

            </div>
            {active === "Inventory" && <Inventory/>}
            {active === "Documents" && <Documents/>}
            
        </div>
    )
}

export default Page
