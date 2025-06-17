"use client";
import { useDispatch, useSelector } from "react-redux";
import Banner1 from "../../public/service.webp"
import { Button } from "@/Components/ui/button";
import { CreateProj } from "./CreateProj";
import { fetchUserData } from "@/lib/functions";
import { useRouter } from "next/navigation";
import React from "react";
import { setactiveProject, setuserid, setContact } from "./redux";
import { Initials } from "./redux";
import Image from "next/image";
import { Profile } from "./Profile";
import axios from "axios";
import { url } from "inspector";

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
  createdAt: string;
  userid: string;
}
const Homebar = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [groupproject, setgroupProjects] = React.useState<GroupProject[]>([]);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [slicevalue, setSplicevalue] = React.useState(3);
  const dispatch = useDispatch();

  const projectMode = useSelector((state: { User: Initials }) => state.User.projectmode);
  const [showProfile, setShowProfile] = React.useState(false);


  const token = useSelector((state: { User: Initials }) => state.User.token);
  const router = useRouter();


  const searchparam = new URLSearchParams();

  const SetactiveProject = (id: string) => {
    dispatch(setactiveProject(id))
    searchparam.set("id", id);
    router.push(`/project?${searchparam.toString()}`);
    console.log(groupproject)

  }

  // const Values = useSelector((state: { User: Initials }) => state.User.activeProject);

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



  React.useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // run only once

  React.useEffect(() => {
    if (screenWidth < 768) {
      setSplicevalue(1);
    } else if (screenWidth < 1024 && screenWidth >= 768) {
      setSplicevalue(2);
    }

    else {
      setSplicevalue(3);
    }
  }, [screenWidth]);


  const bgColors = [
    "bg-amber-200",
    "bg-rose-200",
    "bg-sky-200",
    "bg-emerald-200",
    "bg-purple-200",
    "bg-yellow-200"
  ];

const serviceCategories = [
  {
    title: "Food & Events",
    description: "Catering, party planning, decorators, and everything to make your events memorable."
  },
  {
    title: "Beauty & Wellness",
    description: "Salon at home, spa services, yoga trainers, and wellness consultants at your doorstep."
  },
  {
    title: "Home Services",
    description: "Electricians, plumbers, carpenters, pest control, and other essential home support."
  },
  {
    title: "Local Services",
    description: "Laundry, tailoring, coaching, document assistance and more from your neighborhood."
  },
  {
    title: "Errands & Delivery",
    description: "Pickup-drop, grocery runs, courier services, and other personal errands managed for you."
  },
  {
    title: "Miscellaneous",
    description: "Everything else — from personal tutors to pet care — all in one place."
  },
  {
    title: "Tech Support",
    description: "Computer repair, mobile servicing, Wi-Fi setup, and tech troubleshooting help."
  },
  {
    title: "Automobile Services",
    description: "Bike and car washing, repair, servicing, and emergency roadside assistance."
  },
  {
    title: "Fitness & Sports",
    description: "Personal trainers, sports coaching, equipment rentals, and more for a healthy lifestyle."
  }
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

    }
  };


  const CheckToken = async () => {
    if(!token){router.push("/login")}
    try {
      const response = await fetch(`${Keyurl}api/checktoken`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`

        }
      });
      const data = await response.json();
      console.log(data);
      if(data.verified == false){ 

        router.push("/login")
      }
    }catch (err) {
      console.error('Error checking token:', err);
      router.push("/login");
    }
  }

  const allProjectsPage = () => {
    router.push("/viewallprojects");
  }

 








  React.useEffect(() => {
    CheckToken();
    

    fetchProjects();
    



    fetchGroupProject();
    loadUser();



  }, []);






  return (
    <div className="h-full relative w-full flex flex-col" >
      <div className="h-[75px]  flex flex-row items-center p-3
      " >
        <div className="flex flex-row items-center gap-2 h-fit ml-auto w-fit " >

          <Button className="bg-blue-500 h-[50px] rounded-4xl w-[100px] p-2 sm:w-[160px] cursor-pointer text-white " onClick={() => router.push("/findjobs")}>
            Find Jobs
          </Button>


          <Button className="bg-blue-500 h-[50px] rounded-4xl w-[120px] p-2 sm:w-[160px] cursor-pointer text-white" onClick={() => router.push("/hire")}>
            Hire Freelancers
          </Button>

          <Button className="bg-purple-400 h-[50px] w-[100px] p-2 sm:w-[160px] cursor-pointer" onClick={() => router.push("/login")}>
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

      {showProfile && (<div className="  absolute z-50 right-1 top-16">

        <Profile />




      </div>)}
      <div className="  h-full border-10 border-amber-950 min-w-[400px]" style={{ backgroundImage: `url(${'https://storage.googleapis.com/management_324/backing.avif'})` }} >
       
        <div className=" flex flex-col  w-full bg-white" style={{backgroundImage: `url(${''})`}}>
          <div style={{backgroundImage: `url(${'https://storage.googleapis.com/management_324/team2.jpg'})` , backgroundSize: 'cover'}}>
            <div className="min-h-64 m-5" >

              <div className="flex flex-row justify-between m-10" >

                <div>
                  <h1 className="text-3xl font-extrabold font-serif">Get the Best Services in your Range</h1>

                </div>
                {/* <div className="hidden md:block">
                  <div className={"grid grid-rows-3 grid-flow-col gap-2.5 "}>
                    {serviceCategories.map((item, index) => (
                      <div key={index} className={`${bgColors[index]} h-[60px] p-10 flex items-center justify-center  cursor-pointer rounded-xl`}>
                        <h1 className="text-lg font-bold">{item.toString()}</h1>

                      </div>
                    ))}
                  </div>

                </div> */}
                <div className="hidden md:block">
  <div className="grid grid-rows-3 grid-flow-col gap-2.5">
    {serviceCategories.map((item, index) => (
      <div
        key={index}
        className={`${bgColors[index % bgColors.length]} h-[100px] p-4 flex flex-col justify-center cursor-pointer rounded-xl hover:shadow-lg transition-all`}
      >
        <h1 className="text-md font-bold text-black">{item.title}</h1>
        <p className="text-sm text-black">{item.description}</p>
      </div>
    ))}
  </div>
</div>


              </div>

            </div>
                 <div>
            <div>
              <div>
                <h1 className="flex flex-row justify-center-safe text-3xl font-bold">Who's Using Us?</h1>
              </div>

              <div className="min-h-40 min-w-[320px] mt-5 border-2 border-black p-2 flex flex-row gap-2 justify-evenly ">
                <div className="border-2 border-black max-w-[350px] ">
                  <h1 className="p-2 text-lg md:text-xl lg:text-3xl font-bold">Top Event Managers</h1>
                  <div className="p-1">
                    <span>Mittal Caters, Naemd Institute of Management, Varsha Planners</span>
                  </div>
                </div>
                <div className="max-w-[350px] border-2 border-black">
                  <h1 className="p-2 text-lg md:text-xl lg:text-3xl font-bold  ">Top Event Managers</h1>
                  <div className="p-2">
                    <span>Mittal Caters, Naemd Institute of Management, Varsha Planners</span>
                  </div>
                </div>
                <div className="max-w-[400px] border-2 border-black ">
                  <h1 className="p-2 md:text-xl text-lg lg:text-3xl font-bold ">Top Event Managers</h1>
                  <div className="p-2">
                    <span>Mittal Caters, Naemd Institute of Management, Varsha Planners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          </div>
              

          <div className="absolute xs:left-1/4 mt-10 z-40 md:left-1/3">



            {projectMode && (
              <div className=" xs:w-[250px] md:w-[500px]">
                <CreateProj />
              </div>
            )}
          </div>



          <div>
            <div className='w-full min-h-32 border-2 border-black mt-14 bg-gray-200 flex flex-row gap-5  p-2 xs:hidden sm:hidden md:block'>




            </div>

          </div>



          <div className='mt-10 flex items-center justify-center'>
            {/* <div className='border-2 broder-black  h-[300px] w-[1200px]'> */}
            <div className='grid grid-cols-2 p-4 gap-3 mt-2 '>
              <div className='border-2 border-black h-[240px] '>
                <Image src={Banner1} alt="Banner" width={600} height={600} className="object-cover h-[100%] "></Image>
              </div>
              <div className='border-2 border-black h-[240px] w-full hidden md:block'>
                <Image src={Banner1} alt="Banner" width={600} height={300} className="object-cover h-[100%]  "></Image>
              </div>

            </div>

          </div>
          <div className='flex flex-col'>

            <div className='flex flex-row justify-between p-2'>
              <h1 className='font-bold text-3xl flex flex-col'>Your Projects<span className='text-lg font-medium'>Explore Some of the Popular Services Around You</span></h1>
              <span className="font-bold font-sans cursor-pointer mr-2" onClick={allProjectsPage}>View all</span>


            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20  mt-5 ml-10  md:ml-30 xxl:grid-cols-5 ">
                {projects.slice(0, slicevalue).map((item: Project, index: number) => (<div key={index} className="w-[240px] h-[250px] ">
                  <div className="w-[300px] h-[250px] md:w-[300px] md:h-[300px] rounded-4xl shadow-2xl flex flex-col cursor-pointer p-1
                    " onClick={() => SetactiveProject(item.id)} >
                    <Image src={item.coverimgUrl} alt="images" width={400} height={200} className="h-[200px] object-cover rounded-2xl" />

                    <p className='ml-2 font-bold'>{item.name}</p>
                    <p className='font-bold ml-2'>{item.name}</p>


                  </div>



                </div>))}

              </div>

            </div>




          </div>
          <div className='flex flex-col mt-16'>

            <div className='flex flex-row justify-between p-2'>
              <h1 className='font-bold text-3xl flex flex-col'>Group Projects<span className='text-lg font-medium'>Good morning hello how are you today</span></h1>
              <span className="curosr-pointer font-bold font-sans mr-3" onClick={allProjectsPage}>View all</span>


            </div>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20  mt-5 ml-10  md:ml-30 xxl:grid-cols-5ls-5 ">
                {projects.slice(0, slicevalue).map((item: Project, index: number) => (<div key={index} className="w-[240px] h-[250px] ">
                  <div className="w-[300px] h-[250px] md:w-[300px] md:h-[300px] rounded-4xl shadow-2xl flex flex-col cursor-pointer p-1" onClick={() => SetactiveProject(item.id)} >
                    <Image src={item.coverimgUrl} alt="images" width={400} height={200} className="h-[200px] object-cover rounded-2xl" />

                    <p className='ml-2 font-bold'>{item.name}</p>
                    <p className='font-bold ml-2'>{item.name}</p>


                  </div>



                </div>))}

              </div>

            </div>

          </div>
          <div className='flex flex-col mt-20'>

            <div className='flex flex-row justify-between p-2 '>
              <h1 className='font-bold text-3xl flex flex-col ml-4'>Consultancy <span className='text-lg font-medium'>Consult Top Expert on Our Platform</span></h1>

              <span className="cursor-pointer mr-3 font-bold font-sans" onClick={allProjectsPage}>View all</span>


            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20  mt-5 ml-10  md:ml-30 xxl:grid-cols-5 ">
                {projects.slice(0, slicevalue).map((item: Project, index: number) => (<div key={index} className="w-[240px] h-[250px] ">
                  <div className="w-[300px] h-[250px] md:w-[300px] md:h-[300px] rounded-4xl shadow-2xl flex flex-col cursor-pointer p-1" onClick={() => SetactiveProject(item.id)} >
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