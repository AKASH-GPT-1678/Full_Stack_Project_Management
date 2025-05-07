import { SiMarketo } from "react-icons/si";
import { FaFolderClosed } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
export const SidePart = () => {
    const router = useRouter();
    return (
        <div className="w-[140px] h-screen  cursor-pointer border-r-2 bg-purple-50 flex flex-col gap-10 ml-3 ">
            <div className="flex flex-col gap-5 justify-center items-center">
                <div className="flex flex-col"><FaShoppingCart size={45} onClick={() => router.push("/market")}/><span>Markets</span></div>
                <div className="flex flex-col"><FaFolderClosed size={45} fill="orange" /><span>Projects</span></div>
                <div className="flex flex-col"><SiMarketo size={45} onClick={() => router.push("/selleraccount")} /><span>Seller </span></div>
                <div className="flex flex-col"><IoSettingsSharp size={45} onClick={() => router.push("/settings")}/><span>Settings</span></div>
            </div>

        </div>
    )
}