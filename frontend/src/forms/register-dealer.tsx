"use client";
import React from 'react'
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { useSelector } from 'react-redux';
import { Initials } from '../redux/redux';
import axios from 'axios';
export const RegisterDealer = () => {
    const [dealername, setDealername] = React.useState("");
    const [dealeremail, setDealeremail] = React.useState("");

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
        <div className='bg-blue-300  h-[350px] w-[280px] md:w-[450px] m-5 mr-5 pt-5 rounded-2xl'>
            <div className='grid grid-rows-1 w-[200px] md:w-[350px] items-center ml-10 gap-3' >
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