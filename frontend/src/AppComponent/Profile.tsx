
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { setToken } from "./redux";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
export const Profile = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSession();

    function clearToken() {
        dispatch(setToken(""));
        console.log(user.status)
        if(user.status == "authenticated"){
            signOut();
        }
        window.location.reload();
    }



    const handleProject = () => {
      
        router.push("/");

    }

    return (
      <div className="border p-4 w-[350px] h-fit pb-5 mb-4 rounded-2xl shadow-2xl bg-white flex flex-col gap-4 ml-auto xs:w-[280px]">
  {/* User Info */}
  <div className="flex items-center gap-4">
    <Image
      src="https://placehold.co/600x400"
      alt="Profile"
      width={80}
      height={80}
      className="rounded-full border-2 border-black"
    />
    <div>
      <h2 className="font-bold text-xl text-gray-800">Akash Gupta</h2>
      <p className="text-sm text-gray-600">acashgupta960@gmail.com</p>
    </div>
  </div>

  {/* Accounts Section */}
  <div className="border-t pt-4">
    <p className="font-semibold text-lg text-gray-700">Accounts</p>
    <div className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer">
      <FaPlus size={18} />
      <span className="font-medium">Add Another Account</span>
    </div>
  </div>

  {/* Teams */}
  <div className="border-t pt-4">
    <p className="font-semibold text-lg text-gray-700">Teams</p>
  </div>

  {/* Menu Options */}
  <div className="flex flex-col gap-2 border-t pt-4">
    <h1 className="hover:bg-zinc-100 rounded-md py-2 px-2 text-gray-800 text-base font-medium cursor-pointer" onClick={handleProject}>Create Project</h1>
    <h1 className="hover:bg-zinc-100 rounded-md py-2 px-2 text-gray-800 text-base font-medium cursor-pointer" onClick={() => router.push("/settings")}>Settings</h1>
    <h1 className="hover:bg-zinc-100 rounded-md py-2 px-2 text-gray-800 text-base font-medium cursor-pointer" onClick={() => router.push("/selleraccount")}>Seller Account</h1>
    <h1 className="hover:bg-zinc-100 rounded-md py-2 px-2 text-gray-800 text-base font-medium cursor-pointer" onClick={() => router.push("/dealer")}>My Dealers</h1>
    <h1 className="hover:bg-zinc-100 rounded-md py-2 px-2 text-gray-800 text-base font-medium cursor-pointer">Plans and Pricing</h1>
    <h1 className="hover:bg-zinc-100 rounded-md py-2 px-2 text-gray-800 text-base font-medium cursor-pointer" onClick={() => router.push("/market")}>MarketPlace</h1>
    <h1 className="hover:bg-zinc-100 rounded-md py-2 px-2 text-gray-800 text-base font-medium cursor-pointer">Refer & Earn</h1>
    <h1 className="hover:bg-zinc-100 rounded-md py-2 px-2 text-gray-800 text-base font-medium cursor-pointer">Report Content</h1>
    <h1 className="hover:bg-zinc-100 rounded-md py-2 px-2 text-gray-800 text-base font-medium cursor-pointer">Feedback and F.A.Q</h1>
    <h1 className="hover:bg-zinc-100 rounded-md py-2 px-2 text-gray-800 text-base font-medium cursor-pointer">Privacy Policy</h1>
    <h1 className="hover:bg-red-100 rounded-md py-2 px-2 text-red-600 text-base font-semibold cursor-pointer" onClick={()=>clearToken()}>Sign Out</h1>
  </div>
</div>

    )
}