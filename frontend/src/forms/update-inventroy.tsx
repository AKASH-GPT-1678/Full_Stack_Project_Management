
"use client";
import React from 'react'
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { useSelector } from 'react-redux';
import { Initials } from '../redux/redux';

export const UpdateInventory = () => {
    const [inventory, setInventory] = React.useState("");

    const token = useSelector((state: { User: Initials }) => state.User.token);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    const productid = useSelector((state: { User: Initials }) => state.User.productid);
    const Collectinput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setInventory(value);


    }

    async function setInventoryy(productid: string) {

        const response = await fetch(`${Key_Url}api/inventory/${productid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                quantity: inventory
            })


        })
        const data = await response.json();
        console.log(data);
        if (data.message = "Budget set sucessfully") {
            window.location.reload();
        }
        return data;
    };
    return (
        <div className='flex flex-col w-[250px] rounded-2xl p-5 border-2 border-black bg-linear-to-r from-cyan-300 to-amber-200'>
            <Label htmlFor='terms' className='text-2xl mb-2 font-serif font-bold'>Set Inventory</Label>
            <form className=' flex flex-col gap-5 mt-2' onSubmit={(e) => {
                setInventoryy(productid);

                e.preventDefault();

            }
            }>



                <Input type="text" placeholder='Enter your Inventory' onChange={Collectinput} className='h-10' />

                <Button type='submit' className='bg-gray-600 text-white cursor-pointer' >Submit</Button>
            </form>
        </div>
    )

};