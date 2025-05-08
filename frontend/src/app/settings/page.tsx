"use client";
import React from 'react'
import Image from 'next/image'
import { Button } from '@/Components/ui/button'
import Task from "../../../public/banner.png"
import { Input } from '@/Components/ui/input'
import VerifyContact from '@/AppComponent/addContact';
import axios from 'axios';
import { getLocationName } from '@/lib/functions';
import { useSelector } from 'react-redux';
import { Initials } from '@/AppComponent/redux';
import { useRouter } from 'next/navigation';
import { Key } from 'lucide-react';

const Settings = () => {
    const [chnageName, setchangeName] = React.useState(false);
    const [thingtoChange, setthingtoChange] = React.useState("");
    const [updatedData, setUpdatedData] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [profileStatus, setProfileStatus] = React.useState(false);
    const [verifyContact, setVerifyContact] = React.useState(false);
    const router = useRouter();
    const inputDiv = React.useRef<HTMLInputElement>(null);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    const token = useSelector((state: { User: Initials }) => state.User.token);

    const handleProfielChange = () => {
        inputDiv.current?.click();
    }




    const handleHarkat = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (chnageName == false) {
            setchangeName(true);
            setthingtoChange(e.currentTarget.value);

        }
        else {
            setchangeName(false);
            setthingtoChange("");
        }

    };
    const password = document.getElementById("password") as HTMLInputElement

    const updateThreesome = async () => {
        if (thingtoChange == "") return;

        try {
            const update = await axios.put(`${Key_Url}api/${thingtoChange}`, { data: updatedData }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                }
            });

            const response = await update.data;
            console.log(response)
            if (response.message === "Email sent successfully") {
                router.push("/verify")
            }
            if (response.message === "Password Matched") {

                password.placeholder = "Password Matched Enter New Password";
                password.value = "";

                setUpdatedData("");

            }
        } catch (error) {
            console.log(error)

        }

    };

    const ChangePassword = async () => {

        try {
            const update = await axios.put(`${Key_Url}api/changePassword`, { data: updatedData }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                }
            });

            const response = await update.data;
            console.log(response)
            window.location.reload();

        } catch (error) {
            console.log(error)
        }
    }

    const handleContact = async () => {
        if (contact.length < 10) {
            return;
        }
        try {

            const addContact = await axios.post(`${Key_Url}api/addcontact`, { contact: contact }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                }
            });
            const data = addContact.data;
            console.log(data);
            if (data.success == true) {
                setVerifyContact(true);

            }

            return data
        } catch (error) {
            console.error(error)

        }

    };

    async function getCurrentLoaction() {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by this browser.");
            console.log("Geolocation is not supported by this browser.");
            return null;
        }


        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;


        const data = await getLocationName(latitude, longitude);
        return data;
    }

    const EnableJob = async () => {
        try {
            const location = await getCurrentLoaction();

            if (!location) return;
            const response = await axios.post(`${Key_Url}api/enablejob`, {
                location: location
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log(response.data);

        } catch (error: any) {
            console.error(error);
            if (error.status === 403) {
                alert(error.message);
                throw new Error("Job is already enabled");
            }
        }
    };
    async function DisableJob() {
        const userConfirmed = confirm("Once you disable the job, you can only enable it after 5 days. Do you want to continue?");

        if (!userConfirmed) {
            return;
        }

        try {
            const response = await axios.post(`${Key_Url}api/disablejob`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error("Failed to disable job:", error);
        }
    };


    React.useEffect(() => {

        axios.get(`${Key_Url}api/profilestatus`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            }
        }).then((response) => {
            console.log(response.data.data);
            if (response.data.data == true) {
                setProfileStatus(true);


            }

        })

    }, [Key_Url, token]);


    return (
        <div className='w-full flex flex-row relative'>
            <div className='w-[20%]'>

            </div>
            <div className='mt-2 shadow-2xl flex flex-col w-[1200px] h-screen m-4'>
                <div className='h-[100px]'>

                </div>
                <div>
                    <h1 className='text-3xl font-bold font-sans'>Your Profile</h1>
                </div>
                <div className='flex flex-row justify-between mb-4' >

                    <div>
                        <Image className='w-[90px] h-[90px] rounded-full border-2 border-black ml-4 mt-6 object-cover' src={Task} alt="" height={150} width={150} onClick={handleProfielChange} />
                        <input type="file" hidden id='image' ref={inputDiv} />

                    </div>
                    <div className='flex flex-row space-x-3 mr-4 items-center'>
                        <Button className="border-2 cursor-pointer" >Remove Photo</Button>
                        <Button className="border-2 cursor-pointer" >Change Photo</Button>
                    </div>
                </div>
                <hr />
                <div className='flex flex-row justify-between p-4  mb-4'>
                    <div>
                        <p className='font-bold'>Name</p>
                        <p>Akash Kalpa</p>
                        {chnageName && thingtoChange == "name" && <div className='flex flex-row mt-3 gap-1'>
                            <Input type='text' placeholder='Enter New Name' className='w-[250px] h-[40px]' />
                            <Button className='h-[40px] bg-black text-white cursor-pointer' onClick={updateThreesome} >Add</Button>
                        </div>}


                    </div>
                    <div className='flex items-center'>
                        <Button className='border-1 cursor-pointer flex  w-[80px] font-bold mr-6 justify-center' value={"name"} onClick={handleHarkat}>Edit</Button>
                    </div>

                </div>
                <hr />
                <div className='flex flex-row justify-between p-4  mb-4'>
                    <div>
                        <p className='font-bold'>Email</p>
                        <p>acashgupta960@gmail.com</p>



                    </div>


                </div>
                <hr />
                {verifyContact && <div className='absolute ml-[400px]' id='areyousure  '>
                    <VerifyContact />
                </div>}
                <div className='flex flex-row justify-between p-4  mb-4'>
                    <div>
                        <p className='font-bold'>Password</p>
                        <p>********</p>
                        {chnageName && thingtoChange == "checkpassword" && <div className='flex flex-row mt-3 gap-1'>
                            <Input type='text' placeholder='Enter Existing Password' id='password' className='w-[250px] h-[40px]' onChange={(e) => setUpdatedData(e.target.value)} />
                            {password?.placeholder == "Enter Existing Password" ? <Button className='h-[40px] bg-black text-white cursor-pointer' onClick={updateThreesome}>Add</Button> :
                                <Button className='h-[40px] bg-black text-white cursor-pointer' onClick={ChangePassword}>Verify</Button>}
                        </div>}



                    </div>
                    <div className='hidden absolute ml-[400px]' id='areyousure'>


                    </div>
                    <div className='flex items-center'>
                        <Button className='border-1 cursor-pointer flex  w-[80px] font-bold mr-6 justify-center' value='checkpassword' onClick={handleHarkat}>Change</Button>
                  
                    </div>

                </div>
                <hr />
                <div className='flex flex-row justify-between h-[200px]'>
                    <div className='flex flex-col justify-between p-4  mb-4 mt-3'>
                        <p className='font-bold'>Phone Number</p>
                        <p>7208563916</p>

                        {
                            thingtoChange == "Contact" && <div className='flex flex-row mt-3 gap-1'>
                                <Input type='text' placeholder='Enter New Contact' onChange={(e) => setContact(e.target.value)} minLength={10} maxLength={10} className='w-[250px] h-[40px]' />
                                <Button className='h-[40px] bg-black text-white cursor-pointer' onClick={handleContact}>Add</Button>
                            </div>}







                    </div>
                    <div className='flex items-center mr-5'>
                        <Button className='border-1 cursor-pointer flex  w-[80px] font-bold mr-6 justify-center' value={"Contact"} onClick={handleHarkat}>Edit</Button>
                    </div>


                </div>
                <hr />
                <div className='flex flex-row justify-between p-4  mb-4 mt-3'>
                    <div>
                        <p className='font-bold'>Language</p>
                        <select name="select" id="" className='w-[300px] h-[40px] rounded-md mt-3 cursor-all-scroll border-2 border-black' onChange={() => handleHarkat} >
                            <option value="English">English (India)</option>
                            <option value="Hindi">Hindi</option>

                        </select>


                    </div>


                </div>
                <hr />
                <div className='flex flex-row justify-between p-4  mb-4 mt-3'>
                    <div>
                        <p className='font-bold'>What will you be using Canva for?</p>
                        <select name="select" id="" className='w-[300px] h-[40px] rounded-md mt-3 cursor-all-scroll border-2 border-black'>
                            <option value="1">1</option>
                            <option value="2">2</option>

                        </select>


                    </div>


                </div>
                <hr />
                <div className='flex flex-row justify-between p-4  mb-4'>
                    <div>
                        <p className='font-bold'>Job Profile</p>
                        <div className={`${profileStatus ? 'bg-emerald-400 h-[40px] w-[80px] rounded-2xl cursor-pointer mt-2' : 'bg-gray-200 h-[40px] w-[80px] rounded-2xl cursor-pointer mt-2'}`}>
                            <div className={`${profileStatus ? 'rounded-full h-[40px] bg-emerald-400 w-[40px] border-4 border-amber-50 ml-auto' : 'rounded-full h-[40px] bg-emerald-400 w-[40px] border-4 border-gray-400'}`}>

                            </div>
                        </div>
                        {/* <div className='bg-gray-200 h-[40px] w-[80px] rounded-2xl cursor-pointer mt-2 ' id='div1' >
                            <div className='rounded-full h-[40px] bg-emerald-400 w-[40px] border-4 border-amber-50' id='div2'></div>
                        </div> */}




                    </div>
                    <div className='flex items-center justify-center'>
                    
                        <Button className='border-3 border-blue-400 text-blue-500 cursor-pointer flex  w-[80px] font-bold mr-6 justify-center' >Loaction</Button>
                        <Button className='border-3 border-blue-400 text-blue-500 cursor-pointer flex  w-[80px] font-bold mr-6 justify-center' onClick={EnableJob}>Enable</Button>
                        <Button className='border-3 border-red-500 text-red-500 cursor-pointer flex  w-[80px] font-bold mr-6 justify-center' onClick={DisableJob}>Disable</Button>
                    </div>

                </div>
                <hr />






            </div>

        </div>
    )
}

export default Settings
