"use client";
import React  from 'react'
import Sider2 from '@/AppComponent/Sider2'
import { Button } from '@/Components/ui/button'
import { FaPlus } from "react-icons/fa";
import Taskform from '@/AppComponent/Taskform';
import { Initials } from '@/AppComponent/redux';
import { useEffect } from 'react';
import { getAllProjects } from '@/AppComponent/redux';
import { useSelector ,useDispatch } from 'react-redux';
import { Task } from '@/AppComponent/taskvalidation';
import { setSelectedTask } from '@/AppComponent/redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const Page = () => {

  const [isVisible , setVisible] = React.useState(false);
  const [areyouSure , setareyousure] = React.useState(false);
  const [taskid , settaskid] = React.useState("");
  const dispatch = useDispatch();
  const Data = useSelector((state: { User: Initials }) => state.User.Task);
  const token = useSelector((state: { User: Initials }) => state.User.token);

  const router = useRouter();
  const setactiveTask = (task : Task) => {
    dispatch(setSelectedTask(task));
    router.push("/viewtask")


  };

  const deleteTask = async (id : string) => {
    
     try {
      const response = await axios.delete(`http://localhost:3400/api/deletetask/${id}` , {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const data = response.data;
      console.log(data);
      return data;
      
     } catch (error) {
      console.log(error);
      
     }
  };

  const handleDelete = (id : string) => {
    setareyousure(true);
    settaskid(id);
  };


    useEffect(() => {
        // persistor.purge();

        dispatch(getAllProjects() as any);
    }, [dispatch]);
  return (
    <div className='flex flex-row relative'>
      <Sider2 />
      <div className='w-full '>
        <Button className='cursor-pointer bg-black text-white clear-right p-8 mt-14 ml-14 w-[150px] ' onClick={()=>setVisible(!isVisible)}><FaPlus/>Add Task </Button>
        {isVisible && <div className='absolute w-full'> <Taskform/> </div>}



        <div className='w-[50%]'>
          
          {Data.map((task:Task , index : number) => (
            <div className='flex flex-row justify-between' key={index}>

            <div  className='bg-white p-4 border  shadow-md rounded-3xl cursor-pointer m-2 flex flex-row' >
              <div className='w-[80%]'>
                <h1>{task.id}</h1>
              <h2 className='text-lg font-bold'>{task.task}</h2>
            
              <p>Start Date: {task.startdate}</p>
              <p>Deadline: {task.deadline}</p>
              <p>Description: {task.description}</p>

       
              <p>Status: {task.status ? 'Completed' : 'Not Completed'}</p>
              </div>
              <div className='ml-auto'>
               
              </div>
              <div className='w-[10%] flex flex-col justify-evenly'>
            <Button className='cursor-pointer bg-red-400 p-4 text-white'onClick={()=>handleDelete(task.id!)}>Delete</Button>
            <Button className='cursor-pointer bg-red-400 p-4 text-white'onClick={()=>setactiveTask(task)}>View</Button>

            
            </div>
           
            </div>
            
            </div>
          ))}
          <div>
          </div>
            {areyouSure &&  (
              <div className='absolute top-1/3 left-1/2 z-30 bg'>
                <div className="border border-black h-[140px] w-[330px] flex flex-col rounded-2xl  p-2 bg-orange-100">
      <h1 className="text-3xl text-black flex items-center justify-center font-bold font-serif mt-2">
        Are You Sure?
      </h1>
      <div className="flex justify-center items-center mt-6 gap-3">
        <Button className="cursor-pointer h-[40px] border border-red-100" onClick={()=>setareyousure(false)}>Cancel</Button>
        <Button className="bg-red-600 text-white cursor-pointer h-[40px]" onClick={()=>deleteTask(taskid)} >Delete</Button>
      </div>
    </div>
              </div>
            )}

          </div>
        
       


      </div>
     

    </div>
  )
}

export default Page
