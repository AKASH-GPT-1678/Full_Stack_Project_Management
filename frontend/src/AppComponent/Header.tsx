"use client";
import { Button } from "@/Components/ui/button";
import Logo from "../../public/Renovate (1).webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
export const Header = () => {
    const router = useRouter();

    return (
        <div className="border-1 border-black h-[70px]">

            <div className="flex flex-row space-x-6 justify-between">
                <div className="flex flex-row">
                    <Image src={Logo} alt="Logo" className="w-44 h-12 mt-1 cursor-pointer" onClick={() => { window.location.href = "/" }}></Image>
                    <div className="flex flex-row space-x-4 items-end m-6 ">
                        <h2 className=" font-bold cursor-pointer  hover:underline">Explore</h2>
                        <h2 className=" font-bold cursor-pointer hover:underline" onClick={()=>router.push("/findjobs")}>Find Jobs</h2>
                        <h2 className=" font-bold cursor-pointer hover:underline" onClick={()=>router.push("/hire")}>Hire Freelancers</h2>
                    </div>
                </div>
                <div className="flex flex-row m-5">
                    <div className="flex flex-row space-x-2 items-end  border-2 border-black">
                        <Button className="cursor-pointer bg-blue-400">Upgrade to Pro</Button>
                        <Button className="cursor-pointer" onClick={() => router.push("/login")}>Sign In</Button>

                        <div className="flex flex-row items-center justify-center mt-4 gap-3 cursor-pointer hover:bg-gray-200 mr-5 rounded-2xl w-28">
                            <img src="https://placehold.co/400" alt="profile" width={35} height={35} className="cursor-pointer rounded-full" />
                            <div className="flex flex-col ">
                                <p>Helo</p>
                                <p>Chalo </p>

                            </div>
                        </div>


                    </div>
                </div>


            </div>
        </div>
    )
}