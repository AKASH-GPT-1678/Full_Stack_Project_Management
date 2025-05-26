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
  
// 
const Hiring = () => {
    const router = useRouter();

    const [date, setDatevalue] = React.useState<Date>(new Date());
    const [customInput, setcustomInput] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);
    const [value, setValue] = React.useState("500");
    const [category, setCategory] = React.useState("Farming");
    const [description, setDescription] = React.useState("");
    const [MyJobs , setMyJobs] = React.useState<Job[]>([]);
    const [city, setCity] = React.useState("Mumbai");
    const [location, setLocation] = React.useState("Dharavi");
    const selectRef = useRef<HTMLSelectElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint as string;
    const id = useSelector((state: { User: Initials }) => state.User.userid);
    const socketRef = useRef<Socket | null>(null);

    const token = useSelector((state: { User: Initials }) => state.User.token);
    const dispatch = useDispatch();

    useEffect(() => {

        if (value === "Custom") {
            setDisabled(false); 

            inputRef.current!.placeholder = "Choos Your Rate"
        } else {
            setDisabled(true);

        }
    }, [value]);



    const getMyJobs = async () => {

        try {
            const response = await axios.get(`${Key_Url}api/myjobs` ,{
                headers : {
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


    const JobApplications = (id :string) => {
        console.log(id);
        dispatch(setactiveJobApplications(id));
        router.push("/jobapplications");

    }



    React.useEffect(() => {
        getMyJobs();
        const socket = io("http://localhost:3400", {
            autoConnect: false

        });
        socket.connect();
        socketRef.current = socket;




        socket.on("connect", () => {
            console.log("Connected to the server!");
        });







        socket.on("disconnect", () => {
            console.log("Disconnected With Socket")
        });






    }, []);

    React.useEffect(() => {
        if(window.innerWidth){

        }
        
    } , [window.innerWidth])

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

            }
            )


        }
    };

    const handleClick =() => {
        const elem = document.getElementById("filterdiv") as HTMLDivElement;
       
        if(elem.style.display != "block"){
            elem.style.display = "block"
            

        }else{
            elem.style.display = "none"

        }

    }



    return (
        <div>

            <div className='flex flex-col md:flex-row  gap-6 mt-6 items-center justify-center'>
                  <Button className='md:hidden' onClick={handleClick}>Post Job </Button>

            <div className='hidden md:grid grid-cols-4 gap-6 mt-6' id='filterdiv'>

  <div className='flex flex-col gap-5 m-3'>
    <select name="" id="" ref={selectRef} onChange={(e) => setValue(e.currentTarget.value)} className='w-full h-[40px] p-2 rounded-lg border-2 border-black'>
      <option value="None">Willing to Pay?</option>
      {priceOptions.map((price) =>
        <option key={price} value={price}>{price}</option>
      )}
    </select>

    <div>
      <p id='custom' className='hidden'>Custom Pricing</p>
      <Input
        type='text'
        placeholder='Choose Custom to enable this'
        disabled={disabled}
        ref={inputRef}
        className='w-full h-[40px]'
        onChange={(e) => setcustomInput(e.currentTarget.value)}
      />
    </div>
  </div>

  
  <div className='flex flex-col gap-5 m-3'>
    <select name="" id="" className='w-full h-[40px] p-2 border-2 border-black rounded-lg' onChange={(e) => setCategory(e.currentTarget.value)}>
      <option value="None">Category</option>
      {workCategories.map((category, index) => (
        <option key={index} value={category.split(" ")[0]}>{category}</option>
      ))}
    </select>

    <div>
      <Input
        type='text'
        placeholder='Enter Your Job Description'
        className='w-full h-[40px]'
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  </div>

  {/* Column 3 */}
  <div className='flex flex-col gap-5 m-3'>
  
    <select name="" id="" className='w-full h-[40px] p-2 border-2 border-black rounded-lg' onChange={(e) => setCity(e.currentTarget.value)}>
         
      <option value="None">Choose Your City</option>
      {topCities.map((city, index) => (
        <option key={index} value={city.split(" ")[0]}>{city}</option>
      ))}
    </select>
    

    <div>
      <Input
        type='text'
        placeholder='Enter Your Detail Address'
        className='w-full h-[40px]'
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
  </div>

  {/* Column 4 */}
  <div className='flex flex-col gap-5 m-3'>
    <div>
      <Label><strong>Closing Date</strong></Label>
      <CalendarPopup
        dateValue={date}
        onDateChange={(newDate) => {
          if (newDate) setDatevalue(newDate);
        }}
      />
    </div>
  </div>


  <div className='col-span-2 flex justify-center'>
    <Button className='cursor-pointer bg-black text-white w-[100px] h-[50px]' onClick={emitPost}>
      Post
    </Button>
  </div>
</div>

            
            </div>
            <div>
                
               <div className='flex flex-row gap-6 mt-6 items-center justify-center flex-wrap '>
                {MyJobs  &&  MyJobs.map((item: Job, index: number) => (
                    <div key={index} onClick={() => JobApplications(item._id)} className='flex flex-col w-[300px] h-[300px] p-2 border-2 border-b'>
                    
                        <h1>{item.wages}</h1>
                        <h1>{item.skills}</h1>
                        <h1>{item.description.substring(0, 250).concat("...")}</h1>
                        <h1>{item.location}</h1>
                  
                    </div>
                ))}
            </div>
            </div>

        </div>
    )
}

export default Hiring
