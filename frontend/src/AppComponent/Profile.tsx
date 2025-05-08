
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { createproject } from "./redux";
import { useDispatch} from "react-redux";
import Image from "next/image";
export const Profile = () => {
    const router = useRouter();
    const dispatch = useDispatch();

   

    const handleProject = () => {
        dispatch(createproject());
        router.push("/");
       
    }   

    return (
        <div className="border-1 p-1 w-[350px] h-[750px] rounded-4xl shadow-xl bg-white flex flex-col gap-2 ml-auto">
            <div className="h-[100px]">
                <div className="m-2 h-[95%] flex flex-row">
                    <Image src="https://placehold.co/600x400" alt="" width={80} height={80} style={{ borderRadius: "50%" , border: "2px solid black" , margin : 2 }} />
                    <div className="mt-3 ml-2">
                        <h2 className="font-bold text-xl">{"Akash Gupta"}</h2>
                        <p>{"acashgupta960@gmail.com"}</p>
                    </div>

                </div>

               

            </div>
            <div className="w-full h-[85px] flex flex-col hover:bg-zinc-100 ml-2 "><p className="font-medium text-lg 
            ">Accounts</p>   <h1 className=" mt-6 flex flex-row items-center gap-2 font-medium text-lg"><FaPlus size={20} />Add Another Account </h1></div>
            <div><p>Teams</p></div>
            <div className="flex flex-col gap-2 pl-2 ">
            <h1 id="settings" className="hover:bg-zinc-200 h-[35px] text-lg cursor-pointer font-medium" onClick={handleProject}>Create Project</h1>
            <h1 id="settings" className="hover:bg-zinc-200 h-[35px] text-lg cursor-pointer font-medium" onClick={()=>router.push("/settings")}>Settings</h1>
            <h1 id="settings" className="hover:bg-zinc-200 h-[35px] text-lg cursor-pointer font-medium" onClick={()=>router.push("/selleraccount")}>Seller Account</h1>
            <h1 id="settings" className="hover:bg-zinc-200 h-[35px] text-lg cursor-pointer font-medium" onClick={()=>router.push("/dealer")}>My Dealers</h1>
            <h1 id="settings" className="hover:bg-zinc-200 h-[35px] text-lg cursor-pointer font-medium">Plans and Pricing</h1>
            <h1 id="settings" className="hover:bg-zinc-200 h-[35px] text-lg cursor-pointer font-medium" onClick={()=>router.push("/market")}>MarketPlace</h1>
            <h1 id="settings" className="hover:bg-zinc-200 h-[35px] text-lg cursor-pointer font-medium">Refer & Earn</h1>
            <h1 id="settings" className="hover:bg-zinc-200 h-[35px] text-lg cursor-pointer font-medium">Report Content</h1>
            <h1 id="settings" className="hover:bg-zinc-200 h-[35px] text-lg cursor-pointer font-medium">Feedback and F.A.Q</h1>
            <h1 id="settings" className="hover:bg-zinc-200 h-[35px] text-lg cursor-pointer font-medium">Privacy Policy</h1>
            <h1 id="settings" className="hover:bg-zinc-200 h-[35px] text-lg cursor-pointer font-medium">Sign Out</h1>
            </div>

        </div>
    )
}