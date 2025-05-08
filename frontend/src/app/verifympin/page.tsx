'use client';
import React from 'react';
import { Input } from '@/Components/ui/input';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Initials ,setFinanceState } from '@/AppComponent/redux';
const MPINPage  = () => {
    const [mpin, setMpin] = React.useState<string[]>(['', '', '', '', '', '']);
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const token = useSelector((state: { User: Initials }) => state.User.token);
    const projectid = useSelector((state: { User: Initials }) => state.User.activeProject);
    const dispatch = useDispatch();
    
    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newMpin = [...mpin];
        newMpin[index] = value;
        setMpin(newMpin);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && mpin[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const joinedMpin = mpin.join('');
        console.log("Submitted MPIN:", joinedMpin);

     
        try {
            const response = await axios.post(`http://localhost:3400/api/verifympin/${projectid}`, { mpin: joinedMpin } ,{
                headers : {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data);
            if (response.data.success === true) {
                dispatch(setFinanceState(true));

                window.location.href = '/finance';
            }
            
        } catch (error) {
            console.error(error);
            
        }
    };

    return (
        <div className='w-full h-screen bg-white z-40 flex flex-col items-center justify-center'>
            <span className='font-bold mb-4'>Enter your MPIN</span>
            <div className='flex flex-row gap-4 mb-6'>
                {mpin.map((digit, index) => (
                    <Input
                        key={index}
                        type='text'
                        maxLength={1}
                        className='w-[40px] h-[40px] text-center text-lg border border-gray-400'
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => { inputRefs.current[index] = el; }}
                    />
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className='bg-blue-500 text-white px-4 py-2 rounded'
            >
                Submit
            </button>
        </div>
    );
};

export default MPINPage;
