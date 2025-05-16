"use client";
import React, { ChangeEvent,  useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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


    const { register, handleSubmit, formState: { errors } } = useForm<TaskSchema>({
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
    const Collectvalue = ((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const value = inputref.current?.value;
        if (value) {
            setTeam((mem) => [...mem, value]);
        }
    });

    const CollectInventory = ((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const value = inventoryRef.current?.value;
        if (value) {
            setInventories((mem) => [...mem, value]);
            inventoryRef.current!.value = "";
        }
    });

    const handleSupplier = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSuplier((suppy) => [...suppy, value]);
    }

    const removeName = (name: string) => {
        setTeam((items) => items.filter((each) => each != name));
    }

    const CollectSubtask = ((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const value = subataskRef.current?.value;
        if (value) {
            setSubtask((mem) => [...mem, value]);
            subataskRef.current!.value = "";
        }
    })

    // Form submission handler
    const onSumbit: SubmitHandler<TaskSchema> = async (data) => {
        const amountInt = Number(data.amount);

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
        <div>
            <div className='w-[80%] md:w-[70%] px-4 md:px-12 lg:px-32'>
                <form onSubmit={handleSubmit(onSumbit)} className='shadow-2xl rounded-3xl bg-amber-50 p-6'>

                    {/* Responsive Grid: Stack on mobile, two columns on medium and above */}
                    <div className='flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-8'>

                        {/* Left Column */}
                        <div className='flex flex-col gap-5'>
                            {/* Task Input */}
                            <div>
                                <Label><strong>Add Task</strong></Label>
                                <Input
                                    type='text'
                                    placeholder="Add new task"
                                    className='focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-1'
                                    {...register("task")}
                                />
                                {errors.task && <p className='text-red-500 text-sm'>{errors.task.message}</p>}
                            </div>

                            {/* Add Team */}
                            <div>
                                <Label><strong>Add Team</strong></Label>
                                <div className='flex gap-2'>
                                    <Input
                                        type='text'
                                        placeholder="Add Team"
                                        ref={inputref}
                                        className='focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                                    />
                                    <Button className='bg-black text-white' onClick={Collectvalue}>Add</Button>
                                </div>
                            </div>

                            {/* Team List */}
                            <div className='flex flex-wrap gap-2'>
                                {team?.map((item, index) => (
                                    <p key={index} className='text-sm bg-gray-200 text-black p-1 flex items-center gap-1'>
                                        {item} <ImCross className='cursor-pointer' onClick={() => removeName(item)} />
                                    </p>
                                ))}
                            </div>

                            {/* Team Lead */}
                            <div>
                                <Label><strong>Team Lead</strong></Label>
                                <select className='w-full h-[42px] border-2 cursor-pointer' {...register("teamlead")}>
                                    {team.map((item, index) => (
                                        <option value={item} key={index}>{item}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Amount */}
                            <div>
                                <Label><strong>Amount</strong></Label>
                                <Input
                                    type="text"
                                    placeholder='Allot Amount'
                                    className='w-full mb-2'
                                    {...register("amount")}
                                />
                                {errors.amount && <p className='text-red-500 text-sm'>{errors.amount.message}</p>}
                            </div>

                            {/* Start Date */}
                            <div>
                                <Label><strong>Start Date</strong></Label>
                                <CalendarPopup
                                    dateValue={startDate}
                                    onDateChange={(newDate) => newDate && setDateValue(newDate)}
                                    
                                />
                            </div>

                            {/* End Date */}
                            <div>
                                <Label><strong>End Date</strong></Label>
                                <CalendarPopup
                                    dateValue={expireDate}
                                    onDateChange={(newDate) => newDate && setExpireValue(newDate)}
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className='flex flex-col gap-5'>

                            {/* Description */}
                            <div>
                                <Label><strong>Description</strong></Label>
                                <textarea
                                    className='w-full h-[100px] border-2 border-black p-2'
                                    {...register("description")}
                                    placeholder='Description'
                                    minLength={40}
                                    maxLength={100}
                                ></textarea>
                                {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
                            </div>

                            {/* Suppliers */}
                            <div>
                                <Label className='font-bold'>Suppliers looking to deal with</Label>
                                <select
                                    className='w-full h-[40px] border-2 border-black cursor-pointer'
                                    onChange={handleSupplier}
                                >

                                    {
                                        dealers && dealers.length > 0 &&
                                        dealers.map((item, index) => (
                                            <option value={item.name} key={index}>{item.name}</option>
                                        ))
                                    }

                                </select>
                            </div>

                            {/* Subtasks */}
                            <div>
                                <Label className='font-bold'>Sub task</Label>
                                <textarea
                                    className='border-2 border-black w-full h-[100px] p-2'
                                    ref={subataskRef}
                                    maxLength={60}
                                ></textarea>
                                <Button
                                    className='bg-black text-white mt-2 w-full'
                                    onClick={CollectSubtask}
                                >
                                    Add task
                                </Button>
                            </div>

                            {/* Inventories */}
                            <div>
                                <Label><strong>Key Inventories</strong></Label>
                                <div className='flex gap-2'>
                                    <Input
                                        type='text'
                                        placeholder="Add Inventories"
                                        ref={inventoryRef}
                                        className='focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                                    />
                                    <Button className='bg-black text-white' onClick={CollectInventory}>Add</Button>
                                </div>
                            </div>

                            {/* Priority Rank */}
                            <div>
                                <Label><strong>Priority Rank</strong></Label>
                                <Input
                                    type='text'
                                    placeholder="Priority Rank"
                                    {...register("priority")}
                                    className='focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-[40px] border-2 border-black'
                                />
                                {errors.priority && <p className='text-red-500 text-sm'>{errors.priority.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='flex justify-center mt-8'>
                        <Button
                            className='bg-black text-white h-[50px] w-[200px]'
                            type='submit'
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Taskform;