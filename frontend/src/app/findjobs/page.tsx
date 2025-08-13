"use client";
import { Input } from '@/Components/ui/input';
import React from 'react'
import { Button } from '@/Components/ui/button';
import { workCategories } from './jobdata';
import { priceRange } from './jobdata';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Initials } from '@/AppComponent/redux';
import { topCities } from './jobdata';
import { Label } from '@/Components/ui/label';

interface Job {
    userId: string;
    description: string;
    skills: string;
    wages: number;
    location: string;
    _id: number;
}

const FindJobs = () => {
    const [customInput, setcustomInput] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);
    const [value, setValue] = React.useState("");
    const [search, setSearch] = React.useState(false);
    const [jobs, setJobs] = React.useState<Job[]>([]);
    const [wages, setWages] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [skills, setSkills] = React.useState("");
    const [minimum, setMinimum] = React.useState(0);
    const [maximum, setMaximum] = React.useState(0);
    const [apply, setApply] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const token = useSelector((state: { User: Initials }) => state.User.token);

    const selectRef = React.useRef<HTMLSelectElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (wages === "Custom") {
            setDisabled(false);
            inputRef.current!.placeholder = "Choose Your Rate"
        } else {
            setDisabled(true);
        }
    }, [wages]);

    const fetchJobs = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_Endpoint}api/alljobs`, config);
            console.log(response.data);
            setJobs(response.data.jobs);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchJobs();
    }, []);

    React.useEffect(() => {
        const wage3 = wages.replace(/₹/g, '').split("-");
        setMinimum(parseInt(wage3[0]));
        setMaximum(parseInt(wage3[1]))
    }, [wages])

    const filteredJobs = jobs.filter(job =>
        minimum <= job.wages && job.wages <= maximum &&
        job.skills === skills &&
        job.location.includes(location)
    );

    const handleButton = () => {
        setApply(false);
        const apply1 = document.getElementById("apply") as HTMLButtonElement;
        const apply2 = document.getElementById("apply2") as HTMLButtonElement;
        apply1.style.display = "block";
        apply2.style.display = "none";
    }

    const applyForJob = async (id: string, jobid: number) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_Endpoint}api/applyjob/${id}?jobid=${jobid}`, { message: message },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
  
       
    
            <div className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Perfect Job</h1>
                        <p className="text-lg text-gray-600">Discover opportunities that match your skills and preferences</p>
                    </div>

                    {/* Search Filters */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                            {/* Price Range */}
                            <div className="space-y-2">
                                <Label className="text-white font-semibold text-sm">Salary Range</Label>
                                <select 
                                    ref={selectRef} 
                                    onChange={(e) => setWages(e.currentTarget.value)} 
                                    className="w-full h-12 px-4 rounded-lg border-0 bg-white/90 backdrop-blur-sm text-gray-700 font-medium shadow-md focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200"
                                >
                                    <option value="">Select salary range</option>
                                    {priceRange.map((price) =>
                                        <option key={price} value={price}>{price}</option>
                                    )}
                                </select>
                            </div>

                      
                            <div className="space-y-2">
                                <Label className="text-white font-semibold text-sm">Category</Label>
                                <select 
                                    onChange={(e) => setSkills(e.currentTarget.value)}
                                    className="w-full h-12 px-4 rounded-lg border-0 bg-white/90 backdrop-blur-sm text-gray-700 font-medium shadow-md focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200"
                                >
                                    <option value="">Select category</option>
                                    {workCategories.map((category, index) => (
                                        <option key={index} value={category.split(" ")[0]}>{category}</option>
                                    ))}
                                </select>
                            </div>

                     
                            <div className="space-y-2">
                                <Label className="text-white font-semibold text-sm">Location</Label>
                                <select 
                                    onChange={(e) => setLocation(e.currentTarget.value)}
                                    className="w-full h-12 px-4 rounded-lg border-0 bg-white/90 backdrop-blur-sm text-gray-700 font-medium shadow-md focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200"
                                >
                                    <option value="">Select location</option>
                                    {topCities.map((city, index) => (
                                        <option key={index} value={city.split(" ")[0]}>{city}</option>
                                    ))}
                                </select>
                            </div>

                        
                            <Button 
                                className="h-12 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                                onClick={() => setSearch(!search)}
                            >
                                🔍 Search Jobs
                            </Button>
                        </div>

               
                        <div className="mt-4">
                            <Input 
                                type='text' 
                                placeholder='Choose Custom to Enable this' 
                                disabled={disabled} 
                                ref={inputRef} 
                                className='w-full md:w-80 h-12 bg-white/90 backdrop-blur-sm border-0 rounded-lg shadow-md' 
                                value={customInput} 
                                onChange={(e) => setcustomInput(e.currentTarget.value)} 
                            />
                            <input type="text" onChange={(e) => setValue(e.currentTarget.value)} disabled className="hidden"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            {apply && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💼</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Apply for this Job</h3>
                            <Label className="text-gray-600">Why are you the best fit for this position?</Label>
                        </div>
                        
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-gray-700">Your Message</Label>
                                <textarea
                                    value={message}
                                    placeholder="Tell us why you're perfect for this role..."
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    rows={4}
                                />
                            </div>
                            
                            <div className="flex gap-3">
                                <Button 
                                    type="button"
                                    onClick={() => setApply(false)}
                                    className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg h-12"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    onClick={handleButton}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-lg h-12 shadow-lg"
                                >
                                    Submit Application
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Jobs Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {filteredJobs.length > 0 ? `${filteredJobs.length} Jobs Found` : 'Available Opportunities'}
                    </h2>
                    <p className="text-gray-600">Click on any job card to view details</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredJobs.map((item: Job, index: number) => (
                        <div 
                            key={index} 
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden cursor-pointer"
                            onClick={() => console.log(item)}
                        >
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                                        <span className="text-sm font-semibold">₹{item.wages.toLocaleString()}</span>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                                        <span className="text-sm font-medium">{item.skills}</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-white/90">
                                    <span className="text-sm">📍 {item.location}</span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6">
                                <p className="text-gray-700 leading-relaxed mb-6 line-clamp-4">
                                    {item.description.substring(0, 180)}...
                                </p>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <Button 
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-lg h-12 shadow-md transition-all duration-200 transform hover:scale-105 hidden group-hover:block"
                                        id={`apply-${index}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            applyForJob(item.userId, item._id);
                                        }}
                                    >
                                        ✨ Quick Apply
                                    </Button>
                                    
                                    <Button 
                                        className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg h-12 font-semibold transition-all duration-200"
                                        id={`apply2-${index}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setApply(true);
                                        }}
                                    >
                                        📝 Apply Now
                                    </Button>
                                </div>
                            </div>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredJobs.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">🔍</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search filters to find more opportunities</p>
                        <Button 
                            onClick={() => {
                                setWages("");
                                setSkills("");
                                setLocation("");
                                setSearch(false);
                            }}
                            className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-6"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FindJobs