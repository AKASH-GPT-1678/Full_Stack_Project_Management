"use client";
import React from 'react'
import { useSelector } from 'react-redux';
import { Initials } from '@/AppComponent/redux';
import axios from 'axios';
interface JobApplication {
    _id: string;
    contact: string;
    createdAt: string; // ISO string (can convert to Date if needed)
    creatorid: string;
    jobid: string;
    location: string;
    message: string;
    name: string;
    rating: number | null;
    updatedAt: string; // ISO string
    userid: string;
    workdone: string | null;
    __v: number;
}

const JobApplications = () => {
    const token = useSelector((state: { User: Initials }) => state.User.token);
    const jobid = useSelector((state: { User: Initials }) => state.User.activeJobapplication);
    const [Applications, setApplications] = React.useState<JobApplication[]>([]);
    async function getMyJobApplications() {

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_Endpoint}api/myapplications/${jobid}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data);
            setApplications(response.data.application);

        } catch (error) {
            console.log(error);

        }


    }

    React.useEffect(() => {
        getMyJobApplications();
    }, []);
    return (
        <div><h1>Job Applications</h1>
            {Applications?.map((application) => (
                <div key={application._id}>
                    <h2>{application.name}</h2>
                    <p>{application.contact}</p>
                    <p>{application.message}</p>
                </div>
            ))}

        </div>
    )
}

export default JobApplications;
