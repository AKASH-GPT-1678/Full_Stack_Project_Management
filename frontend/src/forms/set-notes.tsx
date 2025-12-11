"use client";
import React from 'react'
import { Label } from '@/Components/ui/label';

import { Button } from '@/Components/ui/button';
import { useSelector } from 'react-redux';
import { Initials } from '../redux/redux';
import axios from 'axios';
export const SetNotes = () => {
    const [notes, setNotes] = React.useState("");

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