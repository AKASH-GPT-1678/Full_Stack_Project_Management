"use client";
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import React, { act, useEffect } from 'react'
import { useState } from 'react';
import { GrProjects } from "react-icons/gr";
import { Project } from './Home';
import { useSelector ,useDispatch } from 'react-redux';
import { Initials, setactiveProject ,setnoOfMembers } from './redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserData } from './MinuteForms';

const Sider2 = () => {
    const [show, setshow] = useState(true);
    const [active , setactive] = useState("Projects");
    const [projects , setProjects] = useState<Project[]>();
    const dispatch = useDispatch();
    const router = useRouter();
    const token = useSelector((state : {User : Initials}) => state.User.token);
    const [members, setMembers] = useState<UserData[]>([]);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    const activeProject = useSelector((state : {User : Initials}) => state.User.activeProject);
    const searchparam = new URLSearchParams();
  
        const SetactiveProject = (id: string) => {
            dispatch(setactiveProject(id))
            searchparam.set("id", id);
            router.push(`/project?${searchparam.toString()}`);
    
        };

 
      const fetchProjects = async () => {
        try {
          const response = await fetch(`${Key_Url}graphql`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              query: `
                query GetUserProjects($token: String!) {
                  getBasics(token: $token) {
                    id
                    name
                    coverimgUrl
                  }
                }
              `,
              variables: {
                token: `Bearer ${token}`
              }
            })
          });
    
          const json = await response.json();
          console.log(json);
          console.log(token);
          setProjects(json.data.getBasics);
        } catch (error) {
          console.error("Failed to fetch projects:", error);
        }
      };
    

 
  
  async function fetchMembers() {
    console.log(activeProject)
    try {
        const response = await fetch(`${Key_Url}api/members/${activeProject}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            }
        });


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        console.log(data.members.length);
        dispatch(setnoOfMembers(data.members.length));

        setMembers(data.members);
    } catch (error: any) {
        console.error(" Error fetching members:", error.message);
    }
};



    useEffect(() => {
       fetchProjects();
       fetchMembers();
    } , []);

    const filteredMembers = members.filter(
      (data) => data.projectId == activeProject?.toString()
    );
    ;
    return (
    
      
        <div className=' border-2 border-black cursor-pointer flex flex-row w-fit
        '>
            <div className=' border-2 border-black w-[80px]  flex flex-col items-center  h-screen
            '>
                <div className='mt-5'>
                <GrProjects size={35} onClick={() => setshow(!show)} />
                </div>

            </div>
            {show ? <div className='flex flex-col gap-2
             ml-3  mt-3 text-2xl w-[260px] h-screen'>
                <strong>Projects</strong>


                <div className='flex flex-row items-center gap-2 border-2 border-black mr-2 rounded-2xl h-[60px] cursor-pointer text-white bg-black '>
                    <Button className={`w-[110px] ml-2 h-[40px] bg-black cursor-pointer ${active === "Teams" ? "bg-gray-600" : "bg-black"}`} onClick={() => setactive("Teams")}>Teams</Button>
                    <Button className={` w-[110px] h-[40px] bg-black cursor-pointer ${active === "Projects" ? "bg-gray-600" : "bg-black"}`} onClick={() => setactive("Projects")}>Projects</Button>
                </div>
                <div className='border-2 border-black h-[400px] '>
                    <Input type='text' placeholder='Search' className='h-10 w-[90%] ml-3 mt-2' />
                    <div className='flex flex-col gap-2 mt-2 '>
                      {active === "Teams" ? <div>
                        {filteredMembers?.map((item : UserData , index : number) => (
                        <div key={index} className='h-[35px] ml-1' >
                            <p className='text-lg
                            font-bold font-sans hover:bg-gray-600 p-1 w-full'>{item.name}</p>
                         
                        </div>
                       ))}

                      </div> : <div>
                      {projects?.map((item : Project , index : number) => (
                        <div key={index} className='h-[35px] ml-1' onClick={()=> SetactiveProject(item.id)}>
                            <p className='text-lg
                            font-bold font-sans hover:bg-gray-600 p-1 w-full'>{item.name}</p>
                         
                        </div>
                       ))}

                        </div>}
                      
                    </div>
                    
                </div>
            </div> : null}
            
            <div>
          
            </div>
            
            </div>
          
          
        
            

    )
}

export default Sider2