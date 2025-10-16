"use client";
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { GrProjects } from "react-icons/gr";
import { Project } from './Home';
import { useSelector, useDispatch } from 'react-redux';
import { Initials, setactiveProject, setnoOfMembers } from './redux';
import { useRouter } from 'next/navigation';
import { UserData } from '../forms/add-member';

const Sider2 = () => {
  const [show, setshow] = useState(true);
  const [active, setactive] = React.useState("Projects");
  const [projects, setProjects] = React.useState<Project[]>();
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: { User: Initials }) => state.User.token);
  const [members, setMembers] = useState<UserData[]>([]);
  const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
  const activeProject = useSelector((state: { User: Initials }) => state.User.activeProject);
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
  }, []);

  const filteredMembers = members.filter(
    (data) => data.projectId == activeProject?.toString()
  );
  ;
  return (


    <div className="flex flex-row w-full border border-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
      {/* Sidebar Icon Column */}

      {/* Main Section */}
      {show && (
        <div className="flex flex-col gap-4 p-4 text-base w-full h-screen bg-white">
          <strong className="text-lg text-gray-800">Projects</strong>

          {/* Tabs */}
          <div className="flex gap-2 bg-gray-200 rounded-lg p-1">
            <Button
              className={`w-1/2 h-9 rounded-md text-sm ${active === "Teams" ? "bg-indigo-500 text-white" : "bg-white text-gray-700"
                }`}
              onClick={() => setactive("Teams")}
            >
              Teams
            </Button>
            <Button
              className={`w-1/2 h-9 rounded-md text-sm ${active === "Projects" ? "bg-indigo-500 text-white" : "bg-white text-gray-700"
                }`}
              onClick={() => setactive("Projects")}
            >
              Projects
            </Button>
          </div>

          {/* Search + List */}
          <div className="flex flex-col border border-gray-200 rounded-lg h-[400px] overflow-hidden">
            <Input
              type="text"
              placeholder="Search"
              className="h-10 px-3 text-sm border-b border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <div className="flex flex-col gap-1 p-2 overflow-y-auto">
              {active === "Teams" ? (
                filteredMembers?.map((item: UserData, index: number) => (
                  <div
                    key={index}
                    className="px-2 py-1 text-gray-700 font-medium rounded-md hover:bg-indigo-50 cursor-pointer"
                  >
                    {item.name}
                  </div>
                ))
              ) : (
                projects?.map((item: Project, index: number) => (
                  <div
                    key={index}
                    onClick={() => SetactiveProject(item.id)}
                    className="px-2 py-1 text-gray-700 font-medium rounded-md hover:bg-indigo-50 cursor-pointer"
                  >
                    {item.name}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>






  )
}

export default Sider2