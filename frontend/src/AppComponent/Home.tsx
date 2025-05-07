"use client";
import { useDispatch, useSelector } from "react-redux";
import Banner1 from "../../public/service.webp"
import Banner2 from "../../public/banner2.webp"
import { Button } from "@/Components/ui/button";
import { CreateProj } from "./CreateProj";
import { Service } from "../../public/images";
import { fetchUserData} from "@/lib/functions";
import { useRouter } from "next/navigation";
import React, {useEffect } from "react";
import { setactiveProject, setuserid, setContact } from "./redux";
import { Initials } from "./redux";
import Image from "next/image";
import { Profile } from "./Profile";
import axios from "axios";
export const Keyurl = process.env.NEXT_PUBLIC_Endpoint;
export interface Project {
  id: string;
  name: string;
  coverimgUrl: string


}
interface GroupProject {
  id: string;
  name: string;
  description: string;
  budget: number;
  category: string;
  coverimgUrl: string;
  createdAt: string; // or use `Date` if you plan to convert it
  userid: string;
}
const Homebar = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [groupproject, setgroupProjects] = React.useState<GroupProject[]>([]);
  const dispatch = useDispatch();

  const projectMode = useSelector((state: { User: Initials }) => state.User.projectmode);
  const [showProfile, setShowProfile] = React.useState(false);
  const [username, setusername] = React.useState<string>("");

  const token = useSelector((state: { User: Initials }) => state.User.token);
  const router = useRouter();


  let searchparam = new URLSearchParams();

  const SetactiveProject = (id: string) => {
    dispatch(setactiveProject(id))
    searchparam.set("id", id);
    router.push(`/project?${searchparam.toString()}`);

  }

  const Values = useSelector((state: { User: Initials }) => state.User.activeProject);

  const keyurl = process.env.NEXT_PUBLIC_Endpoint;
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${keyurl}graphql`, {
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





  const bgColors = [
    "bg-amber-200",
    "bg-rose-200",
    "bg-sky-200",
    "bg-emerald-200",
    "bg-purple-200",
    "bg-yellow-200"
  ];

  const serviceCategories = [
    "Food & Event Services",
    "Beauty & Wellness",
    "Home Services",
    "Local Services",
    "Errands & Delivery",
    "Miscellaneous Services"
  ];


  const fetchGroupProject = async () => {
    try {
      const res = await axios.get(`${Keyurl}api/groupproject`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res) throw new Error('Failed to fetch');
      console.log(res.data)
      console.log(res.data.Project);
      setgroupProjects(res.data.projects)
      const json = await res.data;
      return json;
    } catch (err) {
      console.error('Error fetching group project:', err);
    }
  };
  const loadUser = async () => {
    const user = await fetchUserData(token as string, Keyurl as string);
    if (user) {
      console.log(`I am user`, user);
      dispatch(setuserid(user.id));
      dispatch(setContact(user.contact));
      setusername(user.name);
    }
  };









  useEffect(() => {
    fetchProjects();
  


    fetchGroupProject();
    loadUser();



  }, []);






  return (
    <div className="h-full relative w-full flex flex-col">
      <div className="h-[75px] border-2 border-black flex flex-row" >
        <div className="flex flex-row gap-2 border-2 border-amber-500 h-fit ml-auto w-fit] ">

          <Button className="bg-purple-400 h-[50px] w-[100px] sm:w-[160px] cursor-pointer" onClick={() => router.push("/findjobs")}>
            Find Jobs
          </Button>


          <Button className="bg-purple-400 h-[50px] w-[100px] sm:w-[160px] cursor-pointer " onClick={() => router.push("/hire")}>
            Hire Freelancers
          </Button>

          <Button className="bg-purple-400 h-[50px] w-[100px] sm:w-[160px] cursor-pointer" onClick={() => router.push("/login")}>
            Sign Up
          </Button>

          <Button
            className="h-[60px] w-[60px] rounded-full mr-5 cursor-pointer bg-amber-400 flex flex-col"
            onClick={() => setShowProfile(!showProfile)}
          >
            {"Profile"}
          </Button>

        </div>

      </div>

      {showProfile && (<div className="  absolute z-50 right-2.5">

        <Profile />




      </div>)}
      <div className="  h-full border-10 border-amber-950">
        <div className="flex flex-row h-[60px] border-2 bprder-black items-center justify-center gap-2" >
          <Button className="w-[200px] bg-black text-amber-50 h-[50px] cursor-pointer" >Goods and Products</Button>
          <Button className="w-[200px] bg-black text-amber-50 h-[50px] cursor-pointer"  >Services</Button>
        </div>
        <div className=" flex flex-col  w-full bg-white" >
          <div className="flex flex-row h-[500px]  mt-5 rounded-3xl bg-white relative sm:flex-col">
            <div className='w-[700px] h-[380px]  mt-4'>

              <h1 className='font-bold text-3xl ml-14 mt-6 sm:text-4xl md:text-4xl xl:text-5xl'>Get Truted Services in Your Range</h1>

            </div>

            <div className='ml-[800px]  absolute z-40 h-96 mt-5'>
              <div className='grid grid-cols-2 grid-flow-rows w-[700px] ml-4 mt-5
                space-y-2.5'>

                {serviceCategories.map((category, index) => (
                  <div key={index}>
                    <div className={`w-[300px] h-[100px]  flex flex-row ${bgColors[index]} rounded-4xl shadow-2xl`}>
                      <p className='ml-6 mt-3 font-bold text-lg'>{category}</p>
                      <Image src={Service[0]} alt="Service" width={100} height={90} className='ml-14 object-fill roudned-4xl
                      ' />

                    </div>


                  </div>

                ))}






              </div>


            </div>

          </div>
          {projectMode && (
            <div>
              <CreateProj />
            </div>
          )}
          <div>
            <h1 className='flex  items-center justify-center text-4xl font-bold'>Who's Using Us</h1>


            <div className='flex flex-row gap-4 items-center justify-center mt-6'>

              <div className='w-[350px] h-[100px] border-1 border-gray-200 flex flex-col p-1 font-semibold'>
                <span className='flex items-center justify-center text-2xl font-bold '>Top Event Managers</span>
                <span className='ml-3 mt-1'>{"Mittal Caters, " + "Naemd Institute of Management, " + "Varsha Planners"}</span>
              </div>

              <div className='w-[350px] h-[100px] border-1 border-gray-200 flex flex-col p-1'>
                <span className='flex items-center justify-center text-2xl font-bold'>Top Contractors</span>
                <span className='font-semibold ml-3 mt-1'>{"Sharma Construction Co., " + "Elite Infra Projects, " + "Pioneer Builders"}</span>
              </div>

              <div className='w-[350px] h-[100px] border-1 border-gray-200  flex flex-col p-1'>
                <span className='flex items-center justify-center text-2xl font-bold'>Local Professionals</span>
                <span className='font-semibold ml-3 mt-1'>{"Employees of Microsoft , Goldman Sachs, " + "Dream Decor Studio"}</span>
              </div>

            </div>
          </div>

          <div className='w-full h-[150px] border-2 border-black mt-14 bg-gray-200 flex flex-row gap-5  p-2'>




          </div>

          <div className='mt-10 flex items-center justify-center'>
            <div className='border-2 broder-black  h-[300px] w-[1200px]'>
              <div className='grid grid-cols-2 p-4 gap-3 mt-2'>
                <div className='border-2 border-black h-[260px]'>
                  <Image src={Banner1} alt="Banner" width={600} height={300}></Image>
                </div>
                <div className='border-2 border-black h-[260px]'>
                  <Image src={Banner2} alt="Banner" width={600} height={300}></Image>
                </div>


              </div>

            </div>
          </div>
          <div className='flex flex-col'>

            <div className='flex flex-row justify-between p-4'>
              <h1 className='font-bold text-3xl flex flex-col'>Your Projects<span className='text-lg font-medium'>Explore Some of the Popular Services Around You</span></h1>
              <span>View all</span>


            </div>
            <div>
              <div className="grid grid-cols-4 gap-2 mt-5 ml-30 ">
                {projects.map((item: Project, index: number) => (<div key={index} className="w-[240px] h-[250px] ">
                  <div className="w-[300px] h-[300px] rounded-4xl shadow-2xl flex flex-col cursor-pointer" onClick={() => SetactiveProject(item.id)} >
                    <Image src={item.coverimgUrl} alt="images" width={400} height={200} className="h-[200px] object-cover rounded-2xl" />

                    <p className='ml-2 font-bold'>{item.name}</p>
                    <p className='font-bold ml-2'>{item.name}</p>


                  </div>



                </div>))}

              </div>

            </div>




          </div>
          <div className='flex flex-col mt-16'>

            <div className='flex flex-row justify-between p-4'>
              <h1 className='font-bold text-3xl flex flex-col'>Group Projects<span className='text-lg font-medium'>Good morning hello how are you today</span></h1>
              <span>View all</span>


            </div>

            <div>
              <div className="grid grid-cols-4 gap-2 mt-5 ml-30 ">
                {groupproject.map((item, index: number) => (<div key={index} className="w-[240px] h-[250px] ">
                  <div className="w-[300px] h-[300px] rounded-4xl shadow-2xl flex flex-col cursor-pointer" onClick={() => SetactiveProject(item.id)}>
                    <Image src={item.coverimgUrl} alt="images" width={400} height={200} className="h-[200px] object-cover rounded-2xl" />

                    <p className='ml-2 font-bold'>{item.name}</p>
                    <p className='font-bold ml-2'>{item.name}</p>


                  </div>



                </div>))}

              </div>

            </div>

          </div>
          <div className='flex flex-col mt-20'>

            <div className='flex flex-row justify-between '>
              <h1 className='font-bold text-3xl flex flex-col ml-4'>Consultancy <span className='text-lg font-medium'>Consult Top Expert on Our Platform</span></h1>

              <span>View all</span>


            </div>
            <div>
              <div className="grid grid-cols-4 gap-2 mt-5 ml-30 ">
                {projects.map((item, index: number) => (<div key={index} className="w-[240px] h-[250px] ">
                  <div className="w-[300px] h-[300px] rounded-4xl shadow-2xl flex flex-col cursor-pointer"  >
                    <Image src={item.coverimgUrl} alt="images" width={400} height={200} className="h-[200px] object-cover rounded-2xl" />

                    <p className='ml-2 font-bold'>{item.name}</p>
                    <p className='font-bold ml-2'>{item.name}</p>


                  </div>



                </div>))}

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
export default Homebar