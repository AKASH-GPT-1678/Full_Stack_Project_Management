"use client";
import { Input } from '@/Components/ui/input';
import React, { useEffect, useRef } from 'react'
import { io } from "socket.io-client";
import { Button } from '@/Components/ui/button';
import { priceOptions } from '../findjobs/jobdata';
import { workCategories } from '../findjobs/jobdata';
import { Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { topCities } from '../findjobs/jobdata';
import { Initials, setactiveJobApplications } from '@/AppComponent/redux';
import { CalendarPopup } from '@/AppComponent/Calendarpopup';
import { Label } from '@/Components/ui/label';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export interface Job {
    _id: string;
    userId: string;
    wages: number;
    skills: string;
    description: string;
    location: string;
    expire: string | Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    __v?: number;
}

const Hiring = () => {
    const router = useRouter();

    const [date, setDatevalue] = React.useState<Date>(new Date());
    const [customInput, setcustomInput] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);
    const [value, setValue] = React.useState("500");
    const [category, setCategory] = React.useState("Farming");
    const [description, setDescription] = React.useState("");
    const [MyJobs, setMyJobs] = React.useState<Job[]>([]);
    const [city, setCity] = React.useState("Mumbai");
    const [location, setLocation] = React.useState("Dharavi");
    const [showPostForm, setShowPostForm] = React.useState(false);
    const selectRef = useRef<HTMLSelectElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint as string;
    const id = useSelector((state: { User: Initials }) => state.User.userid);
    const socketRef = useRef<Socket | null>(null);
    const Socket_Url = process.env.NEXT_PUBLIC_Socket_URL as string;

    const token = useSelector((state: { User: Initials }) => state.User.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (value === "Custom") {
            setDisabled(false);
            inputRef.current!.placeholder = "Choose Your Rate"
        } else {
            setDisabled(true);
        }
    }, [value]);

    const getMyJobs = async () => {
        try {
            const response = await axios.get(`${Key_Url}api/myjobs`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data);
            setMyJobs(response.data.jobs);
        } catch (error) {
            console.log(error);
        }
    }

    const JobApplications = (id: string) => {
        console.log(id);
        dispatch(setactiveJobApplications(id));
        router.push("/jobapplications");
    }

    React.useEffect(() => {
        getMyJobs();
        const socket = io(Socket_Url, {
            autoConnect: false
        });
        socket.connect();
        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Connected to server!");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected With Socket")
        });
    }, []);

    const emitPost = () => {
        if (customInput.length === 0 && socketRef.current) {
            socketRef.current.emit("jobposting", {
                id: id,
                wage: value,
                work: category,
                description: description,
                location: city + " , " + location,
                expire: date
            });
        } else if (socketRef.current) {
            socketRef.current.emit("jobposting", {
                id: id,
                wage: customInput,
                work: category,
                description: description,
                location: city + " , " + location,
                expire: date
            })
        }
        setShowPostForm(false);
    };

    const handleClick = () => {
        setShowPostForm(!showPostForm);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
            {/* Header Section */}
            <div className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Post & Manage Jobs</h1>
                        <p className="text-lg text-gray-600">Create job opportunities and manage applications</p>
                    </div>

               
                    <div className="md:hidden mb-6 text-center">
                        <Button 
                            onClick={handleClick}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 rounded-xl px-8 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            ✨ Post New Job
                        </Button>
                    </div>

                  
                    <div className={`${showPostForm ? 'block' : 'hidden'} md:block transition-all duration-300`}>
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 shadow-2xl">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">Create New Job Posting</h2>
                                <p className="text-emerald-100">Fill in the details to attract the best candidates</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          
                                <div className="space-y-4">
                                    <Label className="text-white font-semibold text-sm flex items-center">
                                        💰 Payment Details
                                    </Label>
                                    <select 
                                        ref={selectRef} 
                                        onChange={(e) => setValue(e.currentTarget.value)} 
                                        className="w-full h-12 px-4 rounded-lg border-0 bg-white/90 backdrop-blur-sm text-gray-700 font-medium shadow-md focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200"
                                    >
                                        <option value="None">Willing to Pay?</option>
                                        {priceOptions.map((price) =>
                                            <option key={price} value={price}>{price}</option>
                                        )}
                                    </select>
                                    
                                    <Input
                                        type='text'
                                        placeholder='Choose Custom to enable this'
                                        disabled={disabled}
                                        ref={inputRef}
                                        className='w-full h-12 bg-white/90 backdrop-blur-sm border-0 rounded-lg shadow-md disabled:opacity-50'
                                        onChange={(e) => setcustomInput(e.currentTarget.value)}
                                    />
                                </div>

                          
                                <div className="space-y-4">
                                    <Label className="text-white font-semibold text-sm flex items-center">
                                        🎯 Job Details
                                    </Label>
                                    <select 
                                        onChange={(e) => setCategory(e.currentTarget.value)}
                                        className="w-full h-12 px-4 rounded-lg border-0 bg-white/90 backdrop-blur-sm text-gray-700 font-medium shadow-md focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200"
                                    >
                                        <option value="None">Category</option>
                                        {workCategories.map((category, index) => (
                                            <option key={index} value={category.split(" ")[0]}>{category}</option>
                                        ))}
                                    </select>
                                    
                                    <Input
                                        type='text'
                                        placeholder='Enter Your Job Description'
                                        className='w-full h-12 bg-white/90 backdrop-blur-sm border-0 rounded-lg shadow-md'
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                         
                                <div className="space-y-4">
                                    <Label className="text-white font-semibold text-sm flex items-center">
                                        📍 Location
                                    </Label>
                                    <select 
                                        onChange={(e) => setCity(e.currentTarget.value)}
                                        className="w-full h-12 px-4 rounded-lg border-0 bg-white/90 backdrop-blur-sm text-gray-700 font-medium shadow-md focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200"
                                    >
                                        <option value="None">Choose Your City</option>
                                        {topCities.map((city, index) => (
                                            <option key={index} value={city.split(" ")[0]}>{city}</option>
                                        ))}
                                    </select>
                                    
                                    <Input
                                        type='text'
                                        placeholder='Enter Your Detail Address'
                                        className='w-full h-12 bg-white/90 backdrop-blur-sm border-0 rounded-lg shadow-md'
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>

                                {/* Date & Action Section */}
                                <div className="space-y-4">
                                    <Label className="text-white font-semibold text-sm flex items-center">
                                        📅 Closing Date
                                    </Label>
                                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
                                        <CalendarPopup
                                            dateValue={date}
                                            onDateChange={(newDate) => {
                                                if (newDate) setDatevalue(newDate);
                                            }}
                                        />
                                    </div>
                                    
                                    <Button 
                                        className='w-full h-12 bg-white text-emerald-600 hover:bg-gray-100 font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105'
                                        onClick={emitPost}
                                    >
                                        🚀 Post Job
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">My Job Postings</h2>
                    <p className="text-lg text-gray-600">
                        {MyJobs.length > 0 ? `${MyJobs.length} active job${MyJobs.length > 1 ? 's' : ''} posted` : 'No jobs posted yet'}
                    </p>
                </div>

            
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MyJobs && MyJobs.map((item: Job, index: number) => (
                        <div 
                            key={index} 
                            onClick={() => JobApplications(item._id)} 
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden cursor-pointer"
                        >
                         
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                                        <span className="text-lg font-bold">₹{item.wages.toLocaleString()}</span>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                                        <span className="text-sm font-medium capitalize">{item.skills}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center text-white/90">
                                    <span className="text-sm">📍 {item.location}</span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">
                                        {item.skills} Position
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed line-clamp-4">
                                        {item.description.substring(0, 180)}...
                                    </p>
                                </div>

                         
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span className="mr-2">⏰</span>
                                        <span>Expires: {new Date(item.expire).toLocaleDateString()}</span>
                                    </div>
                                    {item.createdAt && (
                                        <div className="flex items-center text-sm text-gray-500">
                                            <span className="mr-2">📅</span>
                                            <span>Posted: {new Date(item.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>

                      
                                <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 rounded-lg h-12 font-semibold transition-all duration-200 transform hover:scale-105">
                                    👥 View Applications
                                </Button>
                            </div>

               
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

        
                {MyJobs.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">💼</span>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">No jobs posted yet</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Start by creating your first job posting to find the perfect candidates for your needs.
                        </p>
                        <Button 
                            onClick={() => setShowPostForm(true)}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 rounded-xl px-8 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            ✨ Create Your First Job
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Hiring