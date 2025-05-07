import { useSelector } from "react-redux";
import {  useState } from "react";
import { Initials } from "./redux";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import { Input } from "@/Components/ui/input";

export interface UserData {
    id: string;
    name: string;
    projectId: string;
    useremail: string;
    userid: string;
}
interface state {
    state : boolean
    setState : React.Dispatch<React.SetStateAction<boolean>>

}
export const AddMember :React.FC<state> = ({state ,setState}) => {


    const token = useSelector((state: { User: Initials }) => state.User.token);
    const [value, setValue] = useState("");
    const [emaill, setEmail] = useState("");
    const [members, setMembers] = useState<UserData[]>([]);
  
    const [name, setName] = useState("");

    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    const projectid = useSelector((state: { User: Initials }) => state.User.activeProject);




    async function addMemberToProject() {
        console.log(name)

        if (!name) {
            return;
        }
        const split = name.split(",");
        const Name = split[0]
        let email = split[1]
        if (value === "New") {
            email = emaill
        }
        console.log(Name)
        console.log(email)

        try {
            const response = await axios.post(
                `${Key_Url}api/addmember/${projectid}`,
                {
                    name: Name,
                    email: email.trim()
                },
                {
                    headers: {

                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log("Member added:", response.data);
            setState(false)

        } catch (error: any) {
            console.error(" Error adding member:", error.response?.data || error.message);
        }
    };


   

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
        setName(e.target.value)

    }



    return (
        <div className='flex flex-col w-[250px] rounded-2xl p-5 border-2 border-black bg-linear-to-r from-cyan-300 to-amber-200'>
            <Label htmlFor='terms' className='text-2xl mb-2 font-serif font-bold'>Add Member</Label>
            <form className=' flex flex-col gap-5 mt-2' onSubmit={(e) => {
                e.preventDefault();
                addMemberToProject();
            }
            }>

                {value != "New" && <select name="" id="" onChange={handleSelect} className="h-[40px]">
                    {members.map((member) => (
                        <div key={member.id}>
                            <option value={`${member.name} , ${member.useremail}`} onClick={(e) => setName(e.currentTarget.value)} className="h-[40px]" >{member.name}</option>

                        </div>




                    ))}
                    <option value="Choose a Member"> Choose a Member</option>
                    <option value="New"> New</option>
                </select>}



                {value === "New" &&

                    <div className="flex flex-col gap-2">
                        <Button onClick={() => setValue("")}>Choose Existing</Button>

                        <Input type="text" placeholder='Enter Member Name' onChange={(e) => setName(e.target.value)} className='h-10' required={true} />
                        <Input type="email" placeholder='Enter Member Email' onChange={(e) => setEmail(e.target.value)} className='h-10' required={true} />
                    </div>

                }

                <Button type='submit' className='bg-gray-600 text-white cursor-pointer' >Submit</Button>
            </form>
            <div>

            </div>
        </div>
    )

}