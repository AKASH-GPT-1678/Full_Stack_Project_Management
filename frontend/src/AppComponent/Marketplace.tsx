'use client'
import { Button } from "@/Components/ui/button"
import React from "react"

import Image from "next/image"
import Sonic from "../../public/sonic.png"
import Charger from "../../public/Charger.png"
import { Machinery } from "../../public/industry/indutry"
import { Ecommerce } from "../../public/platforms/platforms"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setProductid } from "./redux"
import { GiAbstract100 } from "react-icons/gi";

export interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    rating: number | null;
    imageurl: string;
    quantity: string;
    sellerName: string;
    expirydate: string;
    category: string;
    specialmsg: string;
    offers: string;
    sellerid: string;
}

export const Marketplace = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [
        Party,
        setParty
    ] = React.useState<Product[]>([]);
    const [
        Pharma,
        setPharma
    ] = React.useState<Product[]>([]);
    const [
        BasicElectricals,
        setBasicElectricals
    ] = React.useState<Product[]>([]);
    const [
        Construction,
        setConstruction
    ] = React.useState<Product[]>([]);
    const [
        FoodEssentials,
        setFoodEssentials
    ] = React.useState<Product[]>([]);
    const [
        Apparels,
        setApparels
    ] = React.useState<Product[]>([]);
    const [
        ElectricalGoods,
        setElectricalGoods
    ] = React.useState<Product[]>([]);
    const [
        HospitalMedical,
        setHospitalMedical
    ] = React.useState<Product[]>([]);
    const [
        IndustrialMachinery,
        setIndustrialMachinery
    ] = React.useState<Product[]>([]);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;



    const getdisplayProducts = async () => {
        try {
            const allproducts = await axios.get(`${Key_Url}api/display`);
            const data = (await allproducts).data;
            console.log(data)

            setPharma(data.Pharma);
            setParty(data.Party);
            setBasicElectricals(data.BasicElectricals);
            setConstruction(data.Construction);
            setFoodEssentials(data.FoodEssentials);
            setApparels(data.Apparels);
            setElectricalGoods(data.ElectricalGoods);
            setHospitalMedical(data.HospitalMedical);
            setIndustrialMachinery(data.IndustrialMachinery);




        } catch (error) {
            console.log(error)


        }

    };
    const setProduct = (id: string) => {

        dispatch(setProductid(id));

        router.push("/product")
    }


    React.useEffect(() => {
        getdisplayProducts();

    }, [])



    return (

        <>
            <div>
                <div>
                    <div className="flex flex-col gap-5 mr-10 ml-10 border-2 border-black md:border-blue-500 lg:border-red-500 xl:border-green-500 2xl:border-yellow-500">

                        <div className="h-[80px] flex flex-row justify-between items-center">
                            <div>
                                 <Button onClick={() => router.push("/")}>Home</Button>

                            </div>
                            <div className="flex flex-row gap-4">
                                <Button onClick={() => router.push("/market")} className="bg-black text-white">Marketplace</Button>
                                <Button onClick={() => router.push("/services")} className="bg-black text-white">Services</Button>
                            </div>
                           


                        </div>


                    </div>
              
                      
                    <div>
                         <div className="flex flex-row justify-between items-center ml-10 mr-10 ">
                            <h2 className="text-2xl mt-2 font-bold">Best Sellers</h2>
                            <h2 className="text-xxl mt-2 font-semibold cursor-pointer">View all</h2>
                        </div>

                    <div className="m-10 h-[320px]  overflow-auto">
                      
                        <div className="flex flex-row flex-wrap  gap-5 p-4 overflow-auto">
                            {Party.slice(0, 16).map((product, index) => (
                                <div key={index} className="w-[200px] h-[260px] border-2 border-black p-2">
                                    <Image src={Charger} alt={product.name} className="h-[120px] w-[200px] object-contain" />
                                    <div>
                                        <h2>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h2>
                                        <p>{product.quantity}</p>
                                        <p>{product.sellerName}</p>
                                        <div className="flex justify-between mt-2">
                                            <strong>{product.price}</strong>
                                            <Button className="bg-pink-400 w-[90px]">Add</Button>
                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div>
                    </div>
                     </div>
                     <div className="h-[300px] mr-10 ml-10">
                        <div className="w-full">
                            <Image src={Sonic} alt="Banner" className="h-[300px] w-full xs:object-fill md:object-fill" />
                        </div>

                     </div>
                       
                    <div>
                         <div className="flex flex-row justify-between items-center ml-10 mr-10 ">
                            <h2 className="text-2xl mt-2 font-bold">Best Sellers</h2>
                            <h2 className="text-xxl mt-2 font-semibold cursor-pointer">View all</h2>
                        </div>

                    <div className="m-10 h-[320px]  overflow-auto">
                      
                        <div className="flex flex-row flex-wrap  gap-5 p-4 overflow-auto">
                            {Party.slice(0, 16).map((product, index) => (
                                <div key={index} className="w-[200px] h-[260px] border-2 border-black p-2"onClick={() => setProduct(product.id)}>
                                    <Image src={Charger} alt={product.name} className="h-[120px] w-[200px] object-contain" />
                                    <div>
                                        <h2>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h2>
                                        <p>{product.quantity}</p>
                                        <p>{product.sellerName}</p>
                                        <div className="flex justify-between mt-2">
                                            <strong>{product.price}</strong>
                                            <Button className="bg-pink-400 w-[90px]">Add</Button>
                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div>
                    </div>
                     </div>
                       
                    <div>
                         <div className="flex flex-row justify-between items-center ml-10 mr-10 ">
                            <h2 className="text-2xl mt-2 font-bold">Best Sellers</h2>
                            <h2 className="text-xxl mt-2 font-semibold cursor-pointer">View all</h2>
                        </div>

                    <div className="m-10 h-[320px]  overflow-auto">
                      
                        <div className="flex flex-row flex-wrap  gap-5 p-4 overflow-auto">
                            {Pharma?.slice(0, 16).map((product, index) => (
                                <div key={index} className="w-[200px] h-[260px] border-2 border-black p-2">
                                    <Image src={Charger} alt={product.name} className="h-[120px] w-[200px] object-contain" />
                                    <div>
                                        <h2>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h2>
                                        <p>{product.quantity}</p>
                                        <p>{product.sellerName}</p>
                                        <div className="flex justify-between mt-2">
                                            <strong>{product.price}</strong>
                                            <Button className="bg-pink-400 w-[90px]">Add</Button>
                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div>
                    </div>
                     </div>
                       
                       
                    <div>
                         <div className="flex flex-row justify-between items-center ml-10 mr-10 ">
                            <h2 className="text-2xl mt-2 font-bold">Best Sellers</h2>
                            <h2 className="text-xxl mt-2 font-semibold cursor-pointer">View all</h2>
                        </div>

                    <div className="m-10 h-[320px]  overflow-auto">
                      
                        <div className="flex flex-row flex-wrap  gap-5 p-4 overflow-auto">
                            {BasicElectricals?.slice(0, 16).map((product, index) => (
                                <div key={index} className="w-[200px] h-[260px] border-2 border-black p-2">
                                    <Image src={Charger} alt={product.name} className="h-[120px] w-[200px] object-contain" />
                                    <div>
                                        <h2>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h2>
                                        <p>{product.quantity}</p>
                                        <p>{product.sellerName}</p>
                                        <div className="flex justify-between mt-2">
                                            <strong>{product.price}</strong>
                                            <Button className="bg-pink-400 w-[90px]">Add</Button>
                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div>
                    </div>
                    <div>
                         <div className="flex flex-row justify-between items-center ml-10 mr-10 ">
                            <h2 className="md:text-2xl mt-2 font-bold sm:text-xl">Find What your Want on Other Platforms?</h2>
                            <h2 className="text-xxl mt-2 font-semibold cursor-pointer">Click to Visit Other Platforms</h2>
                        </div>
                    </div>
                     </div>
                        <div className="h-[250px] xl:h-[350px] p-2 mr-10 ml-10 border-0 border-black">
                            <div className="xs:grid-cols-2 xs:h-[350px]  md:h-[90%] w-full border-2 border-black grid md:grid-cols-4 p-2 gap-2">
                                {Ecommerce.map((product, index) => (
                                    <div key={index} className="h-full w-full border-2 border-black" onClick={()=>router.push(product.link)}>
                                        <Image src={product.image} alt={product.name} className="h-full w-full object-fill" />
                                    </div>
                                ))}
                                
                            

                            </div>
                            <div>

                            </div>

                     </div>

                       
                    <div className="xs:mt-32 sm:mt-32 md:mt-10">
                         <div className="flex flex-row justify-between items-center ml-10 mr-10 ">
                            <h2 className="text-2xl mt-2 font-bold">Best Sellers</h2>
                            <h2 className="text-xxl mt-2 font-semibold cursor-pointer">View all</h2>
                        </div>

                    <div className="m-10 h-[320px]  overflow-auto">
                      
                        <div className="flex flex-row flex-wrap  gap-5 p-4 overflow-auto">
                            {Construction.slice(0, 16).map((product, index) => (
                                <div key={index} className="w-[200px] h-[260px] border-2 border-black p-2">
                                    <Image src={Charger} alt={product.name} className="h-[120px] w-[200px] object-contain" />
                                    <div>
                                        <h2>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h2>
                                        <p>{product.quantity}</p>
                                        <p>{product.sellerName}</p>
                                        <div className="flex justify-between mt-2">
                                            <strong>{product.price}</strong>
                                            <Button className="bg-pink-400 w-[90px]">Add</Button>
                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div>
                    </div>
                     </div>
                       
                    <div>
                         <div className="flex flex-row justify-between items-center ml-10 mr-10 ">
                            <h2 className="text-2xl mt-2 font-bold">Best Sellers</h2>
                            <h2 className="text-xxl mt-2 font-semibold cursor-pointer">View all</h2>
                        </div>

                    <div className="m-10 h-[320px]  overflow-auto">
                      
                        <div className="flex flex-row flex-wrap  gap-5 p-4 overflow-auto">
                            {FoodEssentials.slice(0, 16).map((product, index) => (
                                <div key={index} className="w-[200px] h-[260px] border-2 border-black p-2">
                                    <Image src={Charger} alt={product.name} className="h-[120px] w-[200px] object-contain" />
                                    <div>
                                        <h2>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h2>
                                        <p>{product.quantity}</p>
                                        <p>{product.sellerName}</p>
                                        <div className="flex justify-between mt-2">
                                            <strong>{product.price}</strong>
                                            <Button className="bg-pink-400 w-[90px]">Add</Button>
                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div>
                    </div>
                     </div>
                       
                    <div>
                         <div className="flex flex-row justify-between items-center ml-10 mr-10 ">
                            <h2 className="text-2xl mt-2 font-bold">Best Sellers</h2>
                            <h2 className="text-xxl mt-2 font-semibold cursor-pointer">View all</h2>
                        </div>

                    <div className="m-10 h-[320px]  overflow-auto">
                      
                        <div className="flex flex-row flex-wrap  gap-5 p-4 overflow-auto">
                            {ElectricalGoods.slice(0, 16).map((product, index) => (
                                <div key={index} className="w-[200px] h-[260px] border-2 border-black p-2">
                                    <Image src={Charger} alt={product.name} className="h-[120px] w-[200px] object-contain" />
                                    <div>
                                        <h2>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h2>
                                        <p>{product.quantity}</p>
                                        <p>{product.sellerName}</p>
                                        <div className="flex justify-between mt-2">
                                            <strong>{product.price}</strong>
                                            <Button className="bg-pink-400 w-[90px]">Add</Button>
                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div>
                    </div>
                     </div>

                   
                    <div>
                         <div className="flex flex-row justify-between items-center ml-10 mr-10 ">
                            <h2 className="text-2xl mt-2 font-bold">Best Sellers</h2>
                            <h2 className="text-xxl mt-2 font-semibold cursor-pointer">View all</h2>
                        </div>

                    <div className="m-10 h-[320px]  overflow-auto">
                      
                        <div className="flex flex-row flex-wrap  gap-5 p-4 overflow-auto">
                            {Apparels.slice(0, 16).map((product, index) => (
                                <div key={index} className="w-[200px] h-[260px] border-2 border-black p-2">
                                    <Image src={Charger} alt={product.name} className="h-[120px] w-[200px] object-contain" />
                                    <div>
                                        <h2>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h2>
                                        <p>{product.quantity}</p>
                                        <p>{product.sellerName}</p>
                                        <div className="flex justify-between mt-2">
                                            <strong>{product.price}</strong>
                                            <Button className="bg-pink-400 w-[90px]">Add</Button>
                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div>
                    </div>
                                 <div>
                         <div className="flex flex-row justify-between items-center ml-10 mr-10 ">
                            <h2 className="text-2xl mt-2 font-bold">Best Sellers</h2>
                            <h2 className="text-xxl mt-2 font-semibold cursor-pointer">View all</h2>
                        </div>

                    <div className="m-10 h-[320px]  overflow-auto">
                      
                        <div className="flex flex-row flex-wrap  gap-5 p-4 overflow-auto">
                            {HospitalMedical.slice(0, 16).map((product, index) => (
                                <div key={index} className="w-[200px] h-[260px] border-2 border-black p-2">
                                    <Image src={Charger} alt={product.name} className="h-[120px] w-[200px] object-contain" />
                                    <div>
                                        <h2>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h2>
                                        <p>{product.quantity}</p>
                                        <p>{product.sellerName}</p>
                                        <div className="flex justify-between mt-2">
                                            <strong>{product.price}</strong>
                                            <Button className="bg-pink-400 w-[90px]">Add</Button>
                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div>
                    </div>
                     </div>
                        <div className="h-[250px] flex flex-row ml-10 mr-10 border-2 border-black p-2">
                            <div className="hidden lg:block lg:w-[45%]">
                                <h2 className="text-3xl font-bold p-4 mt-3">
                                    Get the Best Machinery with Top Trusted Sellers across Globe
                                </h2>
                                <div className="flex flex-row p-4">
                                      <span className="flex flex-row gap-4"><GiAbstract100 size={50}/> <span className="text-2xl font-bold mt-3">100% Quality Assurance</span></span>

                                </div>
                              

                            </div>
            

                            <div className="flex flex-row flex-wrap bg-amber-400 sm:w-full h-full gap-4 items-baseline justify-end overflow-hidden lg:w-[55%]">
                                {Machinery.map((product, index) => (
                                    <div key={index} className="flex flex-col mr-5 ">
                                        <Image src={product.image} alt={product.name} className="h-[160px] w-[200px] object-fit mt-5
                                        "/>
                                        <div className="flex flex-col justify-between items-center">
                                            <p className="font-bold">{product.name}</p>
                                            <p className="font-bold">{product.price}</p>
                                        </div>
                                      

                                    </div>
                                ))}


                            </div>

                     </div>

                                  <div>
                         <div className="flex flex-row justify-between items-center ml-10 mr-10 ">
                            <h2 className="text-2xl mt-2 font-bold">Best Sellers</h2>
                            <h2 className="text-xxl mt-2 font-semibold cursor-pointer">View all</h2>
                        </div>

                    <div className="m-10 h-[320px]  overflow-auto">
                      
                        <div className="flex flex-row flex-wrap  gap-5 p-4 overflow-auto">
                            {IndustrialMachinery.slice(0, 16).map((product, index) => (
                                <div key={index} className="w-[200px] h-[260px] border-2 border-black p-2">
                                    <Image src={Charger} alt={product.name} className="h-[120px] w-[200px] object-contain" />
                                    <div>
                                        <h2>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h2>
                                        <p>{product.quantity}</p>
                                        <p>{product.sellerName}</p>
                                        <div className="flex justify-between mt-2">
                                            <strong>{product.price}</strong>
                                            <Button className="bg-pink-400 w-[90px]">Add</Button>
                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div>
                    </div>
                     </div>
                     </div>
                     </div>
                </div>
          

        </>
    )
}