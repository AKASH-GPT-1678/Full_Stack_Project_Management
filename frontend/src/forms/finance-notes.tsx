"use client";
import { Button } from "@/Components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Initials } from "../redux/redux";


export const FinanceNotes = () => {
    interface FinanceNote {
        id: string;
        title: string;
        content: string;
        type: 'Finance';
        createdAt: string;
        financeId: string;
    }

    const financeid = useSelector((state: { User: Initials }) => state.User.activeProject);
    const token = useSelector((state: { User: Initials }) => state.User.token);
    const [notes, setNotes] = useState("");
    const [savedNotes, setSavedNotes] = useState<FinanceNote[]>([]);
    const [mode, setMode] = useState("view");
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    const saveNotes = async () => {

        try {

            const data = await axios.post(`${Key_Url}api/savenotes/${financeid}`, { content: notes }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data);
            return data

        } catch (error) {

            console.error(error);
        }
    }


    const getFinanceNotes = async () => {
        try {
            const data = await axios.get(`${Key_Url}api/getfnotes/${financeid}`);
            console.log(data);
            setSavedNotes(data.data.notes);
            return data
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getFinanceNotes();
    }, []);
    return (
        <div className="absolute bg-white ml-96 rounded-2xl">
            <div className="w-[800px] h-[600px] rounded-2xl flex flex-row align-middle ">
                <div className="w-[20%] h-full ">
                    <h2 className="h-[50px] flex items-center justify-center text-xl font-bold bg-blue-50 mt-20 cursor-pointer" onClick={() => setMode("view")}>View Notes</h2>
                    <h2 className="h-[50px] flex items-center justify-center text-xl font-bold bg-blue-50 cursor-pointer" onClick={() => setMode("create")}>Create Notes</h2>
                </div>
                <div className="w-[80%] h-full  flex flex-col items-center">
                    {mode === "create" && (
                        <div>
                            <textarea name="" id="" className="w-[600px] h-[400px] mt-20 border-1 p-5 border-black" maxLength={400} onChange={(e) => setNotes(e.target.value)} ></textarea>
                            <Button className="w-[400px] h-[60px] bg-black text-white mt-2 cursor-pointer flex justify-center" onClick={saveNotes}>Save My Note</Button>

                        </div>
                    )}
                    {mode === "view" && (
                        <div className="flex flex-col items-center mt-10 overflow-y-scroll ">
                            {savedNotes.map((note, index) => (
                                <div
                                    key={index}
                                    className="w-[600px] min-h-[140px] p-6 mt-8 border border-gray-300 rounded-xl shadow-sm bg-white"
                                >
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
                                    <p className="text-gray-600 mb-4">{note.content}</p>
                                    <p className="text-sm text-gray-400">
                                        Created on: {new Date(note.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>

                    )}


                </div>

            </div>
        </div>
    )
}