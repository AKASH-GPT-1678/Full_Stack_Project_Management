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
    // const socket = io("http://localhost:3400", {
    //     autoConnect: false
    // });



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
        if (value === "Custom") {
            setDisabled(false);

            inputRef.current!.placeholder = "Choos Your Rate"
        } else {
            setDisabled(true);

        }
    }, [value]);




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
    }, [fetchJobs]);



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


    const applyForJob = async (id : string , jobid : number) => {

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_Endpoint}api/applyjob/${id}?jobid=${jobid}` , {message : message} , 
                {
                    headers :{
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
        <div>

            <div className='flex flex-col md:flex-row  gap-6 mt-6 items-center justify-center'>
                <div className='flex flex-col gap-5'>
                    <select name="" id="" ref={selectRef} onChange={(e) => setWages(e.currentTarget.value)} className='w-[250px] h-[40px] p-2 rounded-lg
                 border-2 border-black'>
                        {priceRange.map((price) =>
                            <option key={price} value={[price]}>{price}</option>


                        )}
                    </select>

                    <div>
                        <p id='custom' className='hidden'>Custom Pricing</p>
                        <Input type='text' placeholder='CHoose Custom to Enable this' disabled={disabled} ref={inputRef} className='w-[250px] h-[40px]' value={customInput} onChange={(e) => setcustomInput(e.currentTarget.value)} />
                        <input type="text" onChange={(e) =>setValue(e.currentTarget.value)} disabled/>



                    </div>


                </div>
                <div className='flex flex-col gap-5'>
                    <select name="" id="" className='w-[250px] h-[40px] border-2 border-black  p-2 rounded-lg' onChange={(e) => setSkills(e.currentTarget.value)}>
                        {workCategories.map((category, index) => (
                            <option key={index} value={category.split(" ")[0]}>{category}</option> //
                        ))}

                    </select>
                    <div>
                        <select name="" id="" className='w-[250px] h-[40px] border-2 border-black  p-2 rounded-lg' onChange={(e) => setLocation(e.currentTarget.value)}>
                            {topCities.map((category, index) => (
                                <option key={index} value={category.split(" ")[0]}>{category}</option> //
                            ))}

                        </select>

                    </div>
                </div>
                <Button className='cursor-pointer bg-black text-white w-[100px] h-[50px]' onClick={() => setSearch(!search)}>Search </Button>

            </div>

            <div className='absolute top-60 xs:left-12 er:left-24 md:left-[400px]  flex flex-col  lg:absolute lg:top-[200px] lg:left-[700px] z-40'>
            {apply &&
                <div className='flex flex-col items-center justify-center xs:w-[250px] sm:w-[300px] rounded-2xl p-5 border-2 border-black bg-linear-to-r from-cyan-300 to-amber-200'>
                    <Label htmlFor='terms' className='text-xl mb-2 font-serif font-bold'>Why You think you are the best for this gig?</Label>
                    <form className=' flex flex-col gap-5 mt-2' onSubmit={(e) => {
                        e.preventDefault();

                    }
                    }>



                        <Input type="text" value={message} placeholder='Write Your Impact Message' onChange={(e) => setMessage(e.currentTarget.value)} className='h-10' />

                        <Button type='submit' className='bg-gray-600 text-white cursor-pointer' onClick={handleButton} >Submit</Button>
                    </form>
                </div>


            }
            </div>


            <div className='flex flex-col justify-center items-center   ml-6 mt-8 md:flex-row md:flex-wrap md:gap-4  gap-8'>
                {filteredJobs.map((item: Job, index: number) => (
                    <div key={index} className='flex flex-col  gap-1 rounded-2xl border-2 border-black p-2 curosr-pointer w-[260px] h-[370px] md:w-[300px] lg:w-[350px]    relative' onClick={() => console.log(item)}>

                       
                        <h2>{item.wages}</h2>
                        <h2>{item.skills}</h2>
                        <h2>{item.description.substring(0 , 240).concat("...")}</h2>
                        <h2>{item.location}</h2>
                       

                            <div className='flex flex-row mt-12 md:flex-col'>
                                <Button className='cursor-pointer bg-black text-white w-[100px] h-[50px] absolute top-5 right-5 hidden' id='apply' onClick={() => applyForJob(item.userId, item._id



                                )}>Apply</Button>

                                <Button className='cursor-pointer bg-black text-white w-[100px] h-[50px] absolute bottom-5 right-5 ' id='apply2' onClick={()=>setApply(true)}>Apply</Button>



                            </div>


                    </div>

                ))}

            </div>

        </div>
    )
}

export default FindJobs
