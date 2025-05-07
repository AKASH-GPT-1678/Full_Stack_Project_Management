"use client";
import React from 'react'
import { useState } from 'react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { useSelector } from 'react-redux';
import { Initials } from './redux';
import axios from 'axios';

export const Miniform = () => {
    const [budget, setbudget] = useState("");

    const token = useSelector((state: { User: Initials }) => state.User.token);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    const projectid = useSelector((state: { User: Initials }) => state.User.activeProject);
    const Collectinput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setbudget(value);


    }

    async function setBudget(amount: string) {
        console.log(amount)
        const response = await fetch(`${Key_Url}api/setbudget/${projectid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                amount: amount
            })

        })
        const data = await response.json();
        console.log(data);
        if (data.message = "Budget set sucessfully") {
            window.location.reload();
        }
        return data;
    }
    return (
        <div className='flex flex-col w-[250px] rounded-2xl p-5 border-2 border-black bg-linear-to-r from-cyan-300 to-amber-200'>
            <Label htmlFor='terms' className='text-2xl mb-2 font-serif font-bold'>Set Budget</Label>
            <form className=' flex flex-col gap-5 mt-2' onSubmit={(e) => {
                e.preventDefault();
                setBudget(budget);
            }
            }>



                <Input type="text" value={budget} placeholder='Enter your budget' onChange={Collectinput} className='h-10' />

                <Button type='submit' className='bg-gray-600 text-white cursor-pointer' >Submit</Button>
            </form>
        </div>
    )

}
export const UpdateInventory = () => {
    const [inventory, setInventory] = useState("");

    const token = useSelector((state: { User: Initials }) => state.User.token);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    const projectid = useSelector((state: { User: Initials }) => state.User.activeProject);
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


export const SetNotes = () => {
    const [notes, setNotes] = useState("");

    const token = useSelector((state: { User: Initials }) => state.User.token);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    const projectid = useSelector((state: { User: Initials }) => state.User.activeProject);

 

    const saveNotes = async (notes: string) => {
        try {
            const response = await axios.post(`${Key_Url}api/legalnote/${projectid}`, {
                content: notes
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = response.data;
            console.log(data);
            if (data.message === "Note added successfully") {
                window.location.reload();
            }
            return data;
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };
    return (
        <div className='flex flex-col w-[350px] rounded-2xl p-5 border-2 border-black bg-linear-to-r from-cyan-300 to-amber-200 h-[300px]'>
            <Label htmlFor='terms' className='text-2xl mb-2 font-serif font-bold'>Add Notes</Label>
            <form className=' flex flex-col gap-5 mt-2' onSubmit={(e) => {
                saveNotes(notes);


                e.preventDefault();

            }
            }>



                <textarea
                    placeholder="Add Notes"
                    onChange={(e)=>setNotes(e.target.value)}
                    className="h-36 w-full border border-black p-2"
                />


                <Button type='submit' className='bg-gray-600 text-white cursor-pointer' >Submit</Button>
            </form>
        </div>
    )

};




export const RegisterDealer = () => {
    const [dealername, setDealername] = useState("");
    const [dealeremail, setDealeremail] = useState("");

    const token = useSelector((state: { User: Initials }) => state.User.token);



    const registerDealer = async () => {
        try {
            const dealer = await axios.post("http://localhost:3400/api/addDealer", {name : dealername, email : dealeremail}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = dealer.data;
            console.log(data);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className='bg-blue-300  h-[400px] w-[450px] p-5 rounded-2xl'>
            <div className='grid grid-rows-1 w-[350px] items-center ml-10 gap-3' >
                <Label className='text-lg font-bold'>Dealer Name</Label>
                <Input type="text" placeholder='Enter dealer name' onChange={(e) => setDealername(e.target.value)} />

                

                <Label className='text-lg font-bold'>Dealer Address</Label>
                <Input type="email" placeholder='Enter dealer address' onChange={(e) => setDealeremail(e.target.value)} />

                <div className='flex items-center justify-center mt-5  w-full'>
                    <Button onClick={registerDealer} className='cursor-pointer w-[150px] h-[40px] bg-black text-amber-50'>Register</Button>
                </div>
            </div>
        </div>
    );
};


