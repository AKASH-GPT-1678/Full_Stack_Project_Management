"use client";
import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { FaPlus } from "react-icons/fa";
import { Miniform } from './ExtrasForms';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Initials, getAllProjects } from './redux';
import { menuItems } from '../../public/board/Board';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { AddMember } from './MinuteForms';
import axios from 'axios';
export interface project {
    category: string;
    createdAt: string;
    description: string;
    id: string;
    name: string;
    userid: string;


}
const Projectboard = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const [budgetMode, setbudgetMode] = useState(false);
    const [memberMode, setmemberMode] = useState(false);
    const [areyouSure, setareYoursure] = useState(false);
    const [data, setData] = useState<project>();
    const token = useSelector((state: { User: Initials }) => state.User.token);
    const activeProjects = useSelector((state: { User: Initials }) => state.User.activeProject);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    // const contact = useSelector((state: { User: Initials }) => state.User.contact);

  
    const searchParam = useSearchParams();
    const param = searchParam.get('id'); //

    async function Projects(id: string): Promise<void> {
        try {

            const response = await fetch(`${Key_Url}api/gproject?projectid=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch project: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.project)
            setData(data.project);
            return data.project
        } catch (error) {
            console.error(error)



        }

    };
    async function deleteProject(){
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_Endpoint}api/deleteproject/${activeProjects}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status !== 200) {
                throw new Error(`Failed to fetch project: ${response.status}`);
                //deleteproject/:projectid
            }
            const data = response.data;
            console.log(data.project)
            setareYoursure(false);
            
            return data
        } catch (error : any) {
            console.error(error.message)            


        }    
    };

    useEffect(() => {
        if (param) {
            Projects(param)
        }

    }, [])


    useEffect(() => {

        dispatch(getAllProjects() as any);
    }, []);







    return (
        <div className='border-2 border-black w-full'>
            <div className='m-3'>
                <h1>Hello </h1>
              
                <div className='flex flex-col gap-3 relative'>
                    <div className='h-[60px] border-2 border-black flex flex-row'>
                        <h1 className='font-bold text-2xl items-center mt-3 cursor-pointer ml-2'>{data?.name}</h1>
                        <Button className="bg-red-500 text-white h-[45px] w-[160px] cursor-pointer mt-2 mr-4 p-2  ml-auto" onClick={() => setareYoursure(!areyouSure)} >Delete Project</Button>

                    </div >
                    <div className='h-[110px] border-2 border-black'>




                    </div>
                    <div className='h-[60px] border-2 border-black flex flex-row items-center relative'>
                        <div className='ml-auto'>
                            <Button className='bg-gray-600 text-white cursor-pointer h-11 mr-5' onClick={() => setbudgetMode(!budgetMode)}><FaPlus />Set Budget</Button>
                            <Button className='bg-gray-600 text-white cursor-pointer h-11 mr-5' onClick={() => setmemberMode(!memberMode)}><FaPlus />Add Members</Button>
                        </div>



                    </div>
                    <div className='flex  items-center justify-center absolute top-72 left-2/5'>
                        {budgetMode && <div ><Miniform /></div>}
                        {memberMode && <div><AddMember state={memberMode} setState={setmemberMode}/></div>}
                        {areyouSure && <div>
                            <div className="border border-black h-[140px] w-[330px] flex flex-col rounded-2xl bg-white p-2">
                                <h1 className="text-3xl text-black flex items-center justify-center font-bold font-serif mt-2">
                                    Are You Sure?
                                </h1>
                                <div className="flex justify-center items-center mt-6 gap-3">
                                    <Button className="cursor-pointer h-[40px] border border-red-100">Cancel</Button>
                                    <Button className="bg-red-600 text-white cursor-pointer h-[40px] " onClick={deleteProject}>Delete Project</Button>
                                </div>
                            </div></div>}
                    </div>
                    <div>
                        <div className='grid grid-cols-5 gap-2 border-2 border-black'>

                            {menuItems.map((item, index) => (<div key={index} className='border-2 border-black h-[300px] w-[270px] cursor-pointer mt-6 '>
                                <Image src={item.image} alt='images' className='object-cover' onClick={() => router.push(`${item.route}`)} />

                            </div>))}
                            <div className='border-2 border-black h-[50px] w-[270px] cursor-pointer bg-linear-to-r from-red-500 to-amber-400' onClick={() => router.push("/addtask")}>
                                <strong className='flex items-center justify-center text-white mt-2'>My Tasks</strong>
                            </div>
                            <div className='border-2 border-black h-[50px] w-[270px] cursor-pointer bg-linear-to-r from-red-500 to-amber-400' onClick={() => router.push("/chat")}>
                                <strong className='flex items-center justify-center text-white mt-2'>Team Chat</strong>
                            </div>
                            <div className='border-2 border-black h-[50px] w-[270px] cursor-pointer bg-linear-to-r from-red-500 to-amber-400' onClick={() => router.push("/verifympin")}>
                                <strong className='flex items-center justify-center text-white mt-2'>Manage Finances</strong>
                            </div>
                            <div className='border-2 border-black h-[50px] w-[270px] cursor-pointer bg-linear-to-r from-red-500 to-amber-400' onClick={() => router.push("/market")}>
                                <strong className='flex items-center justify-center text-white mt-2'>Find Supplies</strong>
                            </div>
                            <div className='border-2 border-black h-[50px] w-[270px] cursor-pointer bg-linear-to-r from-red-500 to-amber-400' onClick={() => router.push("/document")}>
                                <strong className='flex items-center justify-center text-white mt-2'>Legal and Inventoty</strong>
                            </div>

                        </div>



                    </div>
                    <div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Projectboard
