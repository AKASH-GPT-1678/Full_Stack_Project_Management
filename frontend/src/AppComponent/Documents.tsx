"use client";
import React  from 'react'
import axios from 'axios';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Initials } from './redux';
import { Button } from '@/Components/ui/button';
import { FaPlus } from 'react-icons/fa6';
import { MdCloudUpload } from "react-icons/md";
import { Input } from '@/Components/ui/input';
import { SetNotes } from './ExtrasForms';
import Image from 'next/image';

interface ProjectDocument {
    id: string;
    isEncrypted: boolean;
    notes: string;
    originalName: string;
    projectId: string;
    storageUrl: string;
    title: string;
    uploadDate: string;  // ISO date string (you can use `Date` instead if parsing it)
    userId: string | null;
}
interface LegalNote {
    id: string;
    titile: string;
    content: string;
    createdAt: string;     
    type: string;          
}

const Documents = () => {

    const [newUrl, setnewUrl] = React.useState('');
    const [files, setFiles] = React.useState(true);
    const [title, setTitle] = React.useState('');
    const [notes, setNotes] = React.useState(false);
    const [documents, setDocuments] = React.useState<ProjectDocument[]>([]);
    const [note, setNote] = React.useState<LegalNote[]>([]);
    const [description, setDescription] = React.useState('');
    const [upload, setUplaod] = React.useState(false);
    const token = useSelector((state: { User: Initials }) => state.User.token);
    const projectid = useSelector((state: { User: Initials }) => state.User.activeProject);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;

    // const previewUrl = () => {
    //     const fileInput = document.getElementById("taswir") as HTMLInputElement;
    //     if (fileInput && fileInput.files && fileInput.files.length > 0) {
    //         const file = fileInput.files[0];



    //         setnewUrl(file.name);

    //     }

    // }

    const inputRef = useRef<HTMLInputElement>(null);
  
    React.useEffect(() => {
        const fileInput = document.getElementById("taswir") as HTMLInputElement;
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];



            setnewUrl(file.name);
        }


    }, [inputRef]);


    async function getAllDocuments() {
        try {
            const response = await axios.get(`${Key_Url}api/documents/${projectid}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log('Documents:', response.data.documents);
            setDocuments(response.data.documents);
            return response.data;
        } catch (error) {
            console.error('Error fetching documents:', error);
            return null;
        }
    }

    async function getAllNotes() {
        try {
            const response = await axios.get(`${Key_Url}api/notes/${projectid}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log('Notes:', response.data.notes);
            setNote(response.data.notes);
            return response.data;
        } catch (error) {
            console.error('Error fetching notes:', error);
            return null;
        }
    }








    async function uploadDocument() {
        console.log("Started");
        const file = inputRef.current?.files?.[0];
        if (!file) {
            console.log("its Emopty")
            return;
        }


        if (title == "" || description == "") return;
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("document", file);

        try {
            const response = await axios.post(`${Key_Url}api/document/${projectid}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response) {
                throw new Error("Upload failed");
            }

            const data = response.data;
            console.log("Upload successful:", data);
            if(data.sucesss == true){ 
                window.location.reload()
            }
          
        } catch (err) {
            console.log(err)
            console.error("Error uploading document:", err);
        }
    };

    React.useEffect(() => {
        getAllDocuments();
        getAllNotes();
    }, []);






    return (
        <div className='relative'>
            <div className=' ml-64 mt-5 mb-5'>
                <Button className='bg-gray-600 text-white cursor-pointer h-14 w-[150px] mr-5' onClick={() => setUplaod(!upload)} ><FaPlus />Upload New</Button>



            </div>
            {upload &&
                <div className='absolute ml-[700px] mt-14 z-40 bg-white'>
                    <div className='w-[500px] h-[600px] border-2 rounded-xl shadow-2xl'>
                        <div className='m-12 border-2 border-dotted border-blue-400 h-[85%] z-40'>
                            <div className='flex flex-col items-center justify-center mt-10'>
                                <MdCloudUpload size={70} fill='blue' />
                                <div className='flex flex-col items-center justify-center gap-3'>
                                    <h1 className='font-bold text-2xl'>Upload Your Documents here</h1>
                                    <p>Files Supported</p>
                                    <h2>OR</h2>
                                    <label htmlFor="taswir" className='w-[160px] h-[50px] border-2 border-blue-500 text-xl font-semibold text-blue-500 cursor-pointer flex items-center justify-center'> Browse</label>
                                    <input
                                        type="file"
                                        id="taswir"
                                        className="hidden"
                                        ref={inputRef}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setnewUrl(file.name);
                                                setFiles(false);
                                            }
                                        }}
                                    />




                                    <p>File : {newUrl}</p>

                                    {newUrl.length > 0 &&
                                        <div className='flex flex-col gap-4'>
                                            <Input type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            <Input type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        </div>

                                    }



                                </div>
                                <Button className='mt-8 bg-black text-white w-[160px] h-[50px] cursor-pointer' onClick={uploadDocument} disabled={files}>Upload</Button>


                            </div>

                        </div>

                    </div>
                </div>}
            <div className='absolute ml-[900px] mt-32 z-40 bg-white '>
                {
                    notes && <SetNotes />
                }
            </div>
            <div className='w-[75%] border-2 broder-black ml-64 h-[500px] z-10 '>
                <div className='flex flex-row gap-5 m-6'> 
                    {documents.map((document, index) => (
                        <div key={index} className="w-[170px] h-[220px] rounded-2xl" onClick={()=>window.location.href = document.storageUrl} >
                              {  /\.(jpg|jpeg|png|webp|avif|gif|bmp|tiff|svg)$/i.test(document.originalName) ? <div>              <Image src={document.storageUrl} width={200} height={150} className='object-fit h-[150px]' alt='documenturl'/></div> :
                                   <iframe src={document.storageUrl} width={200} height={200} className='h-fit object-cover'></iframe> }
{/*                         
                             <Image src={document.storageUrl} width={200} height={150} className='object-fit h-[150px]' alt='documenturl'/> */}
                            <div className="ml-3 mt-2 ">
                                <h3 className="text-lg font-semibold">{document.title}</h3>
                                <p>{document.originalName}</p>
                                <p className="text-sm text-gray-600">{document.notes}</p>
                            </div>
                        </div>
                    ))}

                </div>



            </div>
            <div className='ml-64 mt-5 mb-5 z-10'>
                <Button className='bg-gray-600 text-white cursor-pointer h-14 w-[150px] mr-5' onClick={() => setNotes(!notes)} ><FaPlus />Keep Notes</Button>
            </div>
            <div className='w-[75%] border-2 broder-black ml-64 h-[500px] flex flex-row'>
            <div className='flex flex-row gap-5 m-6'> 
                    {note.map((document, index) => (
                        <div key={index} className="w-[170px] h-[220px] rounded-2xl"  >
                        
                            <div className="ml-3 mt-2 ">
                                <h3 className="text-lg font-semibold">{document.titile}</h3>
                                <p>{document.content}</p>
                                <p className="text-sm text-gray-600">{document.createdAt}</p>
                            </div>
                        </div>
                    ))}

                </div>


            </div>

        </div>
    )
}

export default Documents




