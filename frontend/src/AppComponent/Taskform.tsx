"use client";
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Dealer } from './Dealer';
import { getallDealers } from '@/lib/functions';
// UI Components
import { Input } from '@/Components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/Components/ui/button';
import { CalendarPopup } from './Calendarpopup';
import { ImCross } from "react-icons/im";
import { taskformSchema, TaskSchema } from './taskvalidation';
import { Initials } from './redux';

// Type definitions
type Suppliers = {
    name: string;
    address: string;
    profession: string;
}

const Taskform = () => {
    // State management
    const [team, setTeam] = useState<string[]>([]);
    const [supplier, setSuplier] = useState<string[]>([]);
    const [startDate, setDateValue] = useState<Date>(new Date());
    const [expireDate, setExpireValue] = useState<Date>(new Date());
    const [subtask, setSubtask] = useState<string[]>([]);
    const [inventories, setInventories] = useState<string[]>([]);
    const [dealers, setDealers] = React.useState<Dealer[]>([]);
 
    
  
       

    const inputref = useRef<HTMLInputElement>(null);
    const subataskRef = useRef<HTMLTextAreaElement>(null);
    const inventoryRef = useRef<HTMLInputElement>(null);


    const token = useSelector((state: { User: Initials }) => state.User.token);
    const projectid = useSelector((state: { User: Initials }) => state.User.activeProject);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;

   
    const { register, reset, handleSubmit, formState: { errors } } = useForm<TaskSchema>({
        resolver: zodResolver(taskformSchema),
        defaultValues: {
            task: "",
            team: [],
            amount: 0,
            description: "",
            suppliers: [],
            subtasks: [],
            inventories: [],
            startdate: startDate,
            deadline: expireDate,
            teamlead: "",
            priority: ""
        }
    });

    // Event handlers
    const Collectvalue = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const value = inputref.current?.value;
        if (value) {
            setTeam((mem) => [...mem, value]);
        }
    }, [team]);

    const CollectInventory = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const value = inventoryRef.current?.value;
        if (value) {
            setInventories((mem) => [...mem, value]);
            inventoryRef.current!.value = "";
        }
    }, [inventories]);

    const handleSupplier = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSuplier((suppy) => [...suppy, value]);
    }

    const removeName = (name: string) => {
        setTeam((items) => items.filter((each) => each != name));
    }

    const CollectSubtask = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const value = subataskRef.current?.value;
        if (value) {
            setSubtask((mem) => [...mem, value]);
            subataskRef.current!.value = "";
        }
    }, [subtask]);

    // Form submission handler
    const onSumbit: SubmitHandler<TaskSchema> = async (data) => {
        let amountInt = Number(data.amount);

        const finalData: TaskSchema = {
            ...data,
            amount: amountInt,
            team: team,
            subtasks: subtask,
            suppliers: supplier,
            inventories: inventories,
        };
        
        const response = await axios.post(
            `${Key_Url}api/addtask/${projectid}`, 
            finalData, 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );

        console.log(response);
        window.location.reload();
        return response.data;
    };
   
    useEffect(() => {
        getallDealers(token as string).then((data) => {
            setDealers(data);
        });

    }, []);


    return (
        <div className='w-[60%] ml-28'>
            <div className='grid grid-rows-2'>
                <form onSubmit={handleSubmit(onSumbit)}>
                    <div className='grid grid-cols-2 shadow-2xl rounded-3xl bg-amber-50'>
                        {/* Left Column */}
                        <div className='w-[45%] grid grid-cols-1 items-center ml-28 gap-6 mt-5'>
                            
                            
                            {/* Task Input */}
                            <div className='flex-col mt-4'>
                                <Label><strong>Add Task</strong></Label>
                                <Input
                                    type='text'
                                    placeholder="Add new task"
                                    id='input'
                                    className='focus:outline-none focus:ring-2 focus:ring-blue-500 w-[250px] mt-1'
                                    {...register("task")}
                                />
                                {errors.task && <p className='text-red-500 text-sm'>{errors.task.message}</p>}
                            </div>

                            <div>
                                <Label><strong>Add Team</strong></Label>
                                <div className='flex flex-row'>
                                    <Input
                                        type='text'
                                        placeholder="Add Team"
                                        id='input'
                                        className='focus:outline-none focus:ring-2 focus:ring-blue-500 w-[200px]'
                                        ref={inputref}
                                    />
                                    <div className='flex flex-col'>
                                        <Button className='bg-black text-white cursor-pointer' onClick={Collectvalue}>Add</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Team List */}
                            <div className='flex flex-row gap-2.5'>
                                {team.map((item: string, index: number) => (
                                    <div key={index}>
                                        <p className='text-sm bg-gray-200 text-black p-1 flex flex-row gap-1 items-center justify-center'>
                                            {item} <ImCross className='cursor-pointer' onClick={() => removeName(item)} />
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col gap-2 mt-3'>
                                <Label><strong>Team Lead</strong></Label>
                                <select 
                                    className='w-[220px] h-[42px] cursor-pointer border-2' 
                                    {...register("teamlead")}
                                >
                                    {team.map((item: string, index: number) => (
                                        <option value={item} key={index}>{item}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Amount Input */}
                            <div>
                                <Label><strong>Amount</strong></Label>
                                <Input
                                    type="text"
                                    placeholder='Allot Amount'
                                    className='w-[250px] mb-4'
                                    {...register("amount")}
                                />
                                {errors.amount && <p className='text-red-500 text-sm'>{errors.amount.message}</p>}

                                {/* Start Date */}
                                <div>
                                    <Label><strong>Start Date</strong></Label>
                                    <CalendarPopup 
                                        dateValue={startDate} 
                                        onDateChange={(newDate) => {
                                            if (newDate) setDateValue(newDate);
                                        }} 
                                    />
                                </div>
                            </div>

                            {/* End Date */}
                            <div>
                                <Label><strong>End Date</strong></Label>
                                <CalendarPopup 
                                    dateValue={expireDate} 
                                    onDateChange={(newDate) => {
                                        if (newDate) setExpireValue(newDate);
                                    }} 
                                />
                            </div>
                        </div>
                        

                        <div className='w-[45%] grid grid-cols-1 gap-3 mt-5 mr-5'>
                            {/* Description */}
                            <div className='flex flex-col mb-4'>
                                <Label><strong>Description</strong></Label>
                                <textarea
                                    className='w-[300px] h-[100px] border-2 border-black p-2'
                                    {...register("description")}
                                    placeholder='Description'
                                    minLength={40}
                                    maxLength={100}
                                ></textarea>
                                {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
                            </div>
                            
                            {/* Suppliers */}
                            <div className='flex flex-col ml-0 gap-2'>
                                <Label className='font-bold'>Suppliers looking to deal with</Label>
                                <select 
                                    className='w-[240px] h-[40px] cursor-pointer border-2 border-black' 
                                    onChange={handleSupplier}
                                >
                                    {dealers.map((item: Dealer, index: number) => (
                                        <option value={item.name!} className='cursor-pointer' key={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Subtasks */}
                            <div className='flex flex-col w-[270px] mt-3'>
                                <Label className='font-bold'>Sub task</Label>
                                <textarea
                                    className='border-2 border-black h-[100px] p-1'
                                    ref={subataskRef}
                                    maxLength={60}
                                ></textarea>
                                <Button 
                                    className='bg-black text-white mt-1 h-[40px] cursor-pointer' 
                                    onClick={CollectSubtask}
                                >
                                    Add task
                                </Button>
                            </div>

                            {/* Inventories */}
                            <div className='flex flex-col mt-3 gap-2'>
                                <Label><strong>Key Inventories</strong></Label>
                                <div className='flex flex-row gap-1 w-[300px]'>
                                    <Input
                                        type='text'
                                        placeholder="Add Inventories"
                                        id='input'
                                        className='focus:outline-none focus:ring-2 focus:ring-blue-500 w-[220px]'
                                        ref={inventoryRef}
                                    />
                                    <Button className='bg-black text-white cursor-pointer' onClick={CollectInventory}>
                                        Add
                                    </Button>
                                </div>
                            </div>

                            {/* Team Lead */}
                          

                            {/* Priority Rank */}
                            <div className='flex flex-col gap-2 mt-3'>
                                <Label><strong>Priority Rank</strong></Label>
                                <Input
                                    type='text'
                                    placeholder="Priority Rank"
                                    id='input'
                                    {...register("priority")}
                                    className='focus:outline-none focus:ring-2 focus:ring-blue-500 w-[220px] h-[40px] border-2 border-black'
                                />
                                {errors.priority && <p className='text-red-500 text-sm'>{errors.priority.message}</p>}
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <div className='flex justify-center col-span-2 mb-6'>
                            <Button 
                                className='bg-black text-white mt-3 h-[50px] w-[200px] cursor-pointer' 
                                type='submit'
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Taskform;