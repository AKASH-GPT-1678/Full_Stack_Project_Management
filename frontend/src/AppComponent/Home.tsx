"use client";
import { useDispatch, useSelector } from "react-redux";
import Banner1 from "../../public/service.webp"
import { Button } from "@/Components/ui/button";
import { CreateProject } from "./CreateProj";
import { fetchUserData } from "@/lib/functions";
import { useRouter } from "next/navigation";
import React from "react";
import { setactiveProject, setuserid, setContact, createProject } from "./redux";
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
  createdAt: string;
  userid: string;
}
const Homebar = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [groupproject, setgroupProjects] = React.useState<GroupProject[]>([]);
  const [isVerified, setisVerified] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [slicevalue, setSplicevalue] = React.useState(3);

  const dispatch = useDispatch();


  const [showProfile, setShowProfile] = React.useState(false);


  const token = useSelector((state: { User: Initials }) => state.User.token);
  const projectMode = useSelector((state: { User: Initials }) => state.User.createProject);
  const router = useRouter();
  const profileRef = React.useRef<HTMLDivElement>(null);


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

  const projectRef = React.useRef<HTMLDivElement>(null);

  const serviceCategories = [
    {
      title: "Food & Events",
      description: "Catering, party planning, decorations"
    },
    {
      title: "Beauty & Wellness",
      description: "Salon, spa, yoga, wellness"
    },
    {
      title: "Home Services",
      description: "Repairs, plumbing, pest control"
    },
    {
      title: "Local Services",
      description: "Laundry, tailoring, coaching"
    },
    {
      title: "Errands & Delivery",
      description: "Pickup, grocery, courier"
    },
    {
      title: "Miscellaneous",
      description: "Tutors, pet care, others"
    },
    {
      title: "Tech Support",
      description: "Repair, setup, troubleshooting"
    },
    {
      title: "Automobile Services",
      description: "Wash, repair, roadside help"
    },
    {
      title: "Fitness & Sports",
      description: "Trainers, coaching, equipment"
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
    if (!token) { router.push("/login") }
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
      if (data.verified == false) {

        router.push("/login")
      }
    } catch (err) {
      console.error('Error checking token:', err);
      router.push("/login");
    }
  }

  const allProjectsPage = () => {
    router.push("/viewallprojects");
  };




  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectRef.current &&
        !projectRef.current.contains(event.target as Node)
      ) {
        dispatch(createProject()); // hide the form when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  React.useEffect(() => {
    const profileClick = (event: MouseEvent) => {
      if (profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false)
      }

    }

    document.addEventListener("mousedown", profileClick);
    return () => {
      document.removeEventListener("mousedown", profileClick);
    };


  });










  React.useEffect(() => {
    CheckToken();




    fetchProjects();
    fetchGroupProject();
    loadUser();










  }, [isVerified]);






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

      {showProfile && (<div className="  absolute z-50 right-1 top-16" ref={profileRef}>

        <Profile />




      </div>)}
      <div className="  h-full border-10 border-amber-950 min-w-[400px]" style={{ backgroundImage: `url(${'https://storage.googleapis.com/management_324/backing.avif'})` }} >

        <div className=" flex flex-col  w-full bg-white" style={{ backgroundImage: `url(${''})` }}>
          <div style={{ backgroundImage: `url(${'https://storage.googleapis.com/management_324/team2.jpg'})`, backgroundSize: 'cover' }}>
            <div className="min-h-64 m-5" >

              <div className="flex flex-row justify-between m-10" >

                <div>
                  <h1 className="text-3xl font-extrabold font-serif">Get the Best Services in your Range</h1>

                </div>

                <div className="hidden md:block">
                  <div className="grid grid-rows-3 grid-flow-col gap-2.5">
                    {serviceCategories.map((item, index) => (
                      <div
                        key={index}
                        className={`${bgColors[index % bgColors.length]} md:h-[120px] lg:h-[100px] p-4 flex flex-col justify-center cursor-pointer rounded-xl hover:shadow-lg transition-all`}
                      >
                        <h1 className="text-sm md:text-md font-bold text-black">{item.title}</h1>
                        <p className="text-xs md:text-sm text-black">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>


              </div>

            </div>
            <div className="py-10 bg-white text-center">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-8">Who's Using Us?</h1>

              <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 px-4">
                {/* Card 1 */}
                <div className="bg-gray-100 border border-gray-300 rounded-2xl p-6 shadow-md transition-transform hover:scale-105 max-w-md mx-auto">
                  <h2 className="text-xl md:text-2xl font-semibold mb-2 text-blue-700">Top Event Managers</h2>
                  <p className="text-gray-700">Mittal Caters, Naemd Institute of Management, Varsha Planners</p>
                </div>

                {/* Card 2 */}
                <div className="bg-gray-100 border border-gray-300 rounded-2xl p-6 shadow-md transition-transform hover:scale-105 max-w-md mx-auto">
                  <h2 className="text-xl md:text-2xl font-semibold mb-2 text-green-700">Trusted Institutions</h2>
                  <p className="text-gray-700">IHM Mumbai, EventPro, Global Institute of Event Management</p>
                </div>

                {/* Card 3 */}
                <div className="bg-gray-100 border border-gray-300 rounded-2xl p-6 shadow-md transition-transform hover:scale-105 max-w-md mx-auto">
                  <h2 className="text-xl md:text-2xl font-semibold mb-2 text-purple-700">Corporate Clients</h2>
                  <p className="text-gray-700">TCS Events, Infosys Celebrations, Maruti Hospitality</p>
                </div>
              </div>
            </div>


          </div>


          <div className="absolute xs:left-1/4 mt-10 z-40 md:left-1/3">




            {projectMode && (
              <div className=" xs:w-[250px] md:w-[500px]" ref={projectRef}>
                <CreateProject />
              </div>
            )}
          </div>


          <div className='mt-10 flex items-center justify-center'>
  
            <div className='grid grid-cols-2 p-4 gap-3 mt-2 '>
              <div className='border-2 border-black h-[240px] '>
                <Image src={Banner1} alt="Banner" width={600} height={600} className="object-cover h-[100%] " onClick={() => router.push("https://www.youtube.com/channel/UClYT7LhK_tl7_FMPfwfXjLw")}></Image>
              </div>
              <div className='border-2 border-black h-[240px] w-full hidden md:block'>
                <Image src={Banner1} alt="Banner" width={600} height={300} className="object-cover h-[100%] " onClick={() => router.push("https://www.youtube.com/channel/UClYT7LhK_tl7_FMPfwfXjLw")}></Image>
              </div>

            </div>

          </div>
          <div className="flex flex-col space-y-20 px-4 md:px-12 lg:px-20">
      
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-start p-2">
                <h1 className="font-bold text-3xl">
                  Your Projects
                  <span className="block text-lg font-medium text-gray-600">Explore Some of the Popular Services Around You</span>
                </h1>
                <span className="font-bold text-blue-600 hover:underline cursor-pointer mr-2" onClick={allProjectsPage}>
                  View all
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-5 gap-10 mt-6">
                {projects.slice(0, slicevalue).map((item: Project, index: number) => (
                  <div key={index} className="w-full max-w-[300px]">
                    <div
                      className="rounded-2xl shadow-xl p-2 flex flex-col cursor-pointer bg-white transition-transform hover:scale-105"
                      onClick={() => SetactiveProject(item.id)}
                    >
                      <Image
                        src={item.coverimgUrl}
                        alt="images"
                        width={400}
                        height={200}
                        className="h-[200px] object-cover rounded-xl"
                      />
                      <p className="mt-2 ml-2 font-bold text-gray-800">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

  
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-start p-2">
                <h1 className="font-bold text-3xl">
                  Group Projects
                  <span className="block text-lg font-medium text-gray-600">Good morning hello how are you today</span>
                </h1>
                <span className="cursor-pointer text-blue-600 hover:underline font-bold mr-3" onClick={allProjectsPage}>
                  View all
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-5 gap-10 mt-6">
                {projects.slice(0, slicevalue).map((item: Project, index: number) => (
                  <div key={index} className="w-full max-w-[300px]">
                    <div
                      className="rounded-2xl shadow-xl p-2 flex flex-col cursor-pointer bg-white transition-transform hover:scale-105"
                      onClick={() => SetactiveProject(item.id)}
                    >
                      <Image
                        src={item.coverimgUrl}
                        alt="images"
                        width={400}
                        height={200}
                        className="h-[200px] object-cover rounded-xl"
                      />
                      <p className="mt-2 ml-2 font-bold text-gray-800">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION: Consultancy */}

          </div>

          <div>


          </div>




        </div>

      </div>

    </div>

  )
}
export default Homebar