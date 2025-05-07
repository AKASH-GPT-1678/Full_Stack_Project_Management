"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { useSelector } from 'react-redux';
import { Initials } from '@/AppComponent/redux';
import axios from 'axios';
import { set } from 'date-fns';

const Page = () => {
    const token = useSelector((state: { User: Initials }) => state.User.token);
    const [otpValues, setOtpValues] = useState(["", "", "", ""]);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [verifyOtp, setVerifyOtp] = useState(true);
    const [newEmail, setnewEmail] = useState(false);
    const [email, setemail] = useState('');

    const Keyurl = process.env.NEXT_PUBLIC_Endpoint;

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtp = [...otpValues];
        newOtp[index] = value;
        setOtpValues(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (otpValues[index]) {
                const newOtp = [...otpValues];
                newOtp[index] = "";
                setOtpValues(newOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
                const newOtp = [...otpValues];
                newOtp[index - 1] = "";
                setOtpValues(newOtp);
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const updateEmail = async () => {
        const response = await axios.post(`${Keyurl}api/updateemail`, { email: email }, {
            
        })
    }

    const verify = async () => {
        const otp = otpValues.join('');
        try {
            const response = await axios.get(`${Keyurl}api/verifyotp?otp=${otp}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data);
            if (response.data.message === "OTP Verified Sucesssfully") {
                setVerifyOtp(false);
                setnewEmail(true);

            }
        } catch (error) {
            console.error("OTP verification failed", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-10">
            {verifyOtp && <div className='flex flex-col items-center justify-center gap-4'>
                <h1 className="text-xl font-semibold">Verify OTP</h1>
                <div className="flex gap-2">

                    {[0, 1, 2, 3].map((_, index) => (
                        <Input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            className="w-[60px] text-center text-xl"
                            maxLength={1}
                            value={otpValues[index]}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el: HTMLInputElement | null) => {
                                inputRefs.current[index] = el;
                            }}
                        />
                    ))}
                </div>
                <Button onClick={verify} className='hover:bg-red-600'>Verify</Button>
            </div>}



            {
                newEmail && (
                    <div>

                        <div className='flex flex-col gap-4 w-[250px]'>
                            <Input type='email' placeholder='Enter New Email' onChange={(e) => setemail(e.target.value)} />
                            <Button>Submit</Button>

                        </div>
                    </div>
                )
            }
        </div>
    )
}
         
    


export default Page;
