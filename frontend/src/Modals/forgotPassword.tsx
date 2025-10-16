"use client";
import React from 'react';
import { Input } from '@/Components/ui/input';
import logo from "../../public/Renovate (1).webp";
import Image from 'next/image';
import { Button } from '@/Components/ui/button';
import axios from 'axios';
import { Initials } from '../redux/redux';
import { useSelector } from 'react-redux';
import { ImCross } from "react-icons/im";

interface Props {
    setShow: () => void;
}
const ForgotPasswordModal = ({ setShow }: Props) => {
    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState(false);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;


    const token = useSelector((state: { User: Initials }) => state.User.token);

    async function forgotPassword(email: string) {
        try {

            const response = await axios.post(`${Key_Url}api/forgotpassword`, { email }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data);


        } catch (error) {
            console.log(error);
            setError(true);

        }

    }

    return (
        <div className='p-4  px-4   relative' >
            <div className='absolute top-2 right-2 bg-gray-100 p-2 rounded-full'>
                <ImCross className='cursor-pointer ' fill='red' onClick={() => setShow()} />

            </div>


           <div className='rounded-2xl flex flex-col gap-3 items-center p-4  px-6 bg-gray-100  max-w-[400px]'>
            <Image src={logo} alt="Logo" className='w-[100px] h-[100px]' />

            <p className='text-2xl py-2  md:text-3xl font-bold'>Welcome to Rennovator</p>
            <span className='text-sm'>Enter your valid email to recover passowrd?</span>

            <Input type='text' placeholder='Enter your email' className='p-2 mt-2' onChange={(e) => setEmail(e.target.value)} />

            {error && <p className='text-red-500 text-sm py-2'>Something went wrong add proper email</p>}

            <Button className='bg-black text-white p-2 w-full mt-4 max-w-[400px] cursor-pointer'>Send</Button>
            </div>



        </div>
    )
}

export default ForgotPasswordModal;
