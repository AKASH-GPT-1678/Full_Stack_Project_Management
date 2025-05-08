'use client'
import { Button } from "@/Components/ui/button"
import React from "react"
import Paan from "../../public/paan.png"
import Image from "next/image"
import Sonic from "../../public/sonic.png"
import Charger from "../../public/Charger.png"
import { Machinery } from "../../public/industry/indutry"
import Vanner from "../../public/vaanar.jpg"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setProductid } from "./redux"

export interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    rating: number | null; // Rating could be null
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
        Pharm,
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

    const products = [
        { "name": "Apple 20W USB-C Power Adapter", "quantity": "1 pc", "price": "₹1900" },
        { "name": "Apple USB-C to Lightning Cable (1 m)", "quantity": "1 pc", "price": "₹1800" },
        { "name": "Apple 30W USB-C Power Adapter", "quantity": "1 pc", "price": "₹2900" },
        { "name": "Syska LED Bulb 9W", "quantity": "1 pc", "price": "₹120" },
        { "name": "Havells Extension Cord 4 Socket", "quantity": "1 pc", "price": "₹750" },
        { "name": "Philips Trimmer BT1232", "quantity": "1 pc", "price": "₹999" },
        { "name": "Orient Electric Table Fan 400mm", "quantity": "1 pc", "price": "₹1850" },
        { "name": "Mi Smart Power Strip", "quantity": "1 pc", "price": "₹999" },
        { "name": "Zebronics 2.0 Multimedia Speakers", "quantity": "1 pc", "price": "₹1199" },
        { "name": "HP 65W Laptop Charger", "quantity": "1 pc", "price": "₹1799" },
        { "name": "Dell USB Keyboard KB216", "quantity": "1 pc", "price": "₹549" },
        { "name": "Logitech M221 Wireless Mouse", "quantity": "1 pc", "price": "₹899" },
        { "name": "Samsung 10000mAh Power Bank", "quantity": "1 pc", "price": "₹1399" },
        { "name": "Sony MDR-ZX110 Headphones", "quantity": "1 pc", "price": "₹999" },
        { "name": "Realme Type-C Cable 1m", "quantity": "1 pc", "price": "₹399" },
        { "name": "Bajaj Electric Kettle 1.5L", "quantity": "1 pc", "price": "₹1299" },
        { "name": "TP-Link Wi-Fi Router TL-WR841N", "quantity": "1 pc", "price": "₹1099" },
        { "name": "boAt BassHeads 100 Wired Earphones", "quantity": "1 pc", "price": "₹399" },
        { "name": "Usha Electric Iron EI 1602", "quantity": "1 pc", "price": "₹749" },
        { "name": "Ambrane USB Wall Charger 2A", "quantity": "1 pc", "price": "₹499" }
    ]



    return (
        <div>
            <div className="flex flex-row h-[75px] border-2 bprder-black"></div>
            <div className="ml-64 mr-64  h-screen border-2 border-black">
                <div className="flex flex-row h-[60px] border-2 bprder-black items-center justify-center gap-2" >
                    <Button className="w-[200px] bg-black text-amber-50 h-[50px] cursor-pointer" onClick={() => router.push("/market")} >Goods and Products</Button>
                    <Button className="w-[200px] bg-black text-amber-50 h-[50px] cursor-pointer" onClick={() => router.push("/services")} >Services</Button>
                </div>
                <div className="flex flex-row h-[160px] border-2 bprder-black"></div>
                <div className="mt-5">
                    <Image src={Paan} alt="paan"></Image>

                </div>
                <div className="mt-6 grid grid-cols-2 gap-2 h-[350px]">
                    <Image src={Sonic} alt="paan" className="h-[300px]" />
                    <Image src={Sonic} alt="paan" className="h-[300px]" />


                </div>
                <div className="bg-amber-100 h-[350px] rounded-4xl flex flex-row">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-medium mt-10 ml-6">More to Love</h1>
                        <h1 className="text-3xl font-bold ml-6">Explore Some of <br />  the Uncover <br /> Hidden Gems</h1>
                    </div>
                    <div className="mt-1 ml-60">
                        <Image src={Vanner} alt="baner" className="h-[350px] w-[1000px] p-3" />
                    </div>



                </div>
                <div>
                    <div className="flex flex-row justify-between m-3"><h2 className="text-2xl font-bold">Basic Electricals</h2><h2>See All</h2></div>
                    <div className="flex flex-row overflow-x-scroll relative">
                        {products.map((product, index) => (

                            <div
                                className="flex flex-col gap-3 m-1 min-w-[100px] max-w-[180px] h-[300px] flex-shrink-0 border-2 border-black p-4"
                                key={index}
                                onClick={() => setProduct(product.name)}
                            >
                                <div>
                                    <Image src={Charger!} alt="paan" className="h-[100px] w-[200px]" />
                                    <div className="flex flex-col gap-1">
                                        <h2>{product.name}</h2>
                                        <h2>{product.quantity}</h2>
                                    </div>
                                    <div className="flex flex-row justify-between w-[150px] items-center mb-0 absolute bottom-3 mt-2 cursor-pointer"><strong>{product.price}</strong><Button className="bg-pink-400 cursor-pointer">Add</Button></div>
                                </div>
                            </div>
                        ))}
                    </div>



                </div>
                <div className="bg-purple-100 h-[340px] mt-5 rounded-3xl grid grid-cols-[1fr_2fr] border-2">
                    <div className="grid grid-rows-2 ">

                        <strong className="flex flex-col text-3xl font-bold mt-16 ml-6">
                            Buy the Latest <br />
                            Industrial Machinery on the <br />
                            On teh Best Prices
                        </strong>
                    </div>
                    <div className="grid grid-rows-6">
                        <div className="flex flex-row gap-2 items-center justify-center mt-10
                        ">
                            {Machinery.map((product, index) => (
                                <div key={index} className="flex flex-col shadow-2xl items-center justify-center cursor-pointer p-2" >
                                    <Image src={product.image} alt="paan" className="h-[150px] w-[200px]" />
                                    <p>{product.name}</p>
                                    <p>{product.price}</p>
                                    <p>{product.seller}</p>

                                </div>

                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex flex-row justify-between m-3"><h2 className="text-2xl font-bold">Constuction Essentials</h2><h2 className="text-2xl font-bold">See All</h2></div>
                    <div className="flex flex-row overflow-x-scroll relative">
                        {Construction.map((product, index) => (
                            <div
                                className="flex flex-col gap-3 m-1 min-w-[100px] max-w-[220px] h-[310px] flex-shrink-0 border-2 border-black p-4"
                                key={index}
                                onClick={() => setProduct(product.id)}
                            >
                                <Image src={Charger!} alt="paan" className="h-[140px] w-[200px]" />
                                <div className="flex flex-col gap-1">
                                    {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                                    <h2>{product.quantity}</h2>
                                    <p>{product.sellerName}</p>
                                    <div className="flex flex-row justify-between w-[190px] items-center mb-0 absolute bottom-3 mt-6 cursor-pointer"><strong>{product.price}</strong><Button className="bg-pink-400 cursor-pointer w-[90px]">Add</Button></div>
                                </div>
                            </div>
                        ))}
                    </div>



                </div>
                <div>
                    <div className="flex flex-row justify-between m-3"><h2 className="text-2xl font-bold">Party Essentials</h2><h2 className="text-2xl font-bold">See All</h2></div>
                    <div className="flex flex-row overflow-x-scroll relative">
                        {Party.map((product, index) => (
                            <div
                                className="flex flex-col gap-3 m-1 min-w-[100px] max-w-[220px] h-[310px] flex-shrink-0 border-2 border-black p-4"
                                key={index}
                                onClick={() => setProduct(product.id)}
                            >
                                <Image src={Charger} alt="paan" className="h-[140px] w-[200px]" />
                                <div className="flex flex-col gap-1">
                                    {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                                    <h2>{product.quantity}</h2>
                                    <p>{product.sellerName}</p>
                                    <div className="flex flex-row justify-between w-[190px] items-center mb-0 absolute bottom-3 mt-6 cursor-pointer"><strong>{product.price}</strong><Button className="bg-pink-400 cursor-pointer w-[90px]">Add</Button></div>
                                </div>
                            </div>
                        ))}
                    </div>



                </div>
                <div>
                    <div className="flex flex-row justify-between m-3"><h2 className="text-2xl font-bold">Food Essentials</h2><h2 className="text-2xl font-bold">See All</h2></div>
                    <div className="flex flex-row overflow-x-scroll relative">
                        {FoodEssentials.map((product, index) => (
                            <div
                                className="flex flex-col gap-3 m-1 min-w-[100px] max-w-[220px] h-[310px] flex-shrink-0 border-2 border-black p-4"
                                key={index}
                                onClick={() => setProduct(product.id)}
                            >
                                <Image src={Charger} alt="paan" className="h-[140px] w-[200px]" />
                                <div className="flex flex-col gap-1">
                                    {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                                    <h2>{product.quantity}</h2>
                                    <p>{product.sellerName}</p>
                                    <div className="flex flex-row justify-between w-[190px] items-center mb-0 absolute bottom-3 mt-6 cursor-pointer"><strong>{product.price}</strong><Button className="bg-pink-400 cursor-pointer w-[90px]">Add</Button></div>
                                </div>
                            </div>
                        ))}
                    </div>



                </div>
                <div>
                    <div className="flex flex-row justify-between m-3"><h2 className="text-2xl font-bold">Food Essentials</h2><h2 className="text-2xl font-bold">See All</h2></div>
                    <div className="flex flex-row overflow-x-scroll relative">
                        {BasicElectricals.map((product, index) => (
                            <div
                                className="flex flex-col gap-3 m-1 min-w-[100px] max-w-[220px] h-[310px] flex-shrink-0 border-2 border-black p-4"
                                key={index}
                                onClick={() => setProduct(product.id)}
                            >
                                <Image src={Charger} alt="paan" className="h-[140px] w-[200px]" />
                                <div className="flex flex-col gap-1">
                                    {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                                    <h2>{product.quantity}</h2>
                                    <p>{product.sellerName}</p>
                                    <div className="flex flex-row justify-between w-[190px] items-center mb-0 absolute bottom-3 mt-6 cursor-pointer"><strong>{product.price}</strong><Button className="bg-pink-400 cursor-pointer w-[90px]">Add</Button></div>
                                </div>
                            </div>
                        ))}
                    </div>



                </div>
                <div>
                    <div className="flex flex-row justify-between m-3"><h2 className="text-2xl font-bold">Pharma Essentials</h2><h2 className="text-2xl font-bold">See All</h2></div>
                    <div className="flex flex-row overflow-x-scroll relative">
                        {Pharm.map((product, index) => (
                            <div
                                className="flex flex-col gap-3 m-1 min-w-[100px] max-w-[220px] h-[310px] flex-shrink-0 border-2 border-black p-4"
                                key={index}
                                onClick={() => setProduct(product.id)}
                            >
                                <Image src={Charger} alt="paan" className="h-[140px] w-[200px]" />
                                <div className="flex flex-col gap-1">
                                    {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                                    <h2>{product.quantity}</h2>
                                    <p>{product.sellerName}</p>
                                    <div className="flex flex-row justify-between w-[190px] items-center mb-0 absolute bottom-3 mt-6 cursor-pointer"><strong>{product.price}</strong><Button className="bg-pink-400 cursor-pointer w-[90px]">Add</Button></div>
                                </div>
                            </div>
                        ))}
                    </div>



                </div>
                <div>
                    <div className="flex flex-row justify-between m-3"><h2 className="text-2xl font-bold">Apparels Clothing & Garments</h2><h2 className="text-2xl font-bold">See All</h2></div>
                    <div className="flex flex-row overflow-x-scroll relative">
                        {Apparels.map((product, index) => (
                            <div
                                className="flex flex-col gap-3 m-1 min-w-[100px] max-w-[220px] h-[310px] flex-shrink-0 border-2 border-black p-4"
                                key={index}
                                onClick={() => setProduct(product.id)}
                            >
                                <Image src={Charger!} alt="paan" className="h-[140px] w-[200px]" />
                                <div className="flex flex-col gap-1">
                                    {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                                    <h2>{product.quantity}</h2>
                                    <p>{product.sellerName}</p>
                                    <div className="flex flex-row justify-between w-[190px] items-center mb-0 absolute bottom-3 mt-6 cursor-pointer"><strong>{product.price}</strong><Button className="bg-pink-400 cursor-pointer w-[90px]">Add</Button></div>
                                </div>
                            </div>
                        ))}
                    </div>



                </div>
                <div>
                    <div className="flex flex-row justify-between m-3"><h2 className="text-2xl font-bold" >Electrical Good & Supplies</h2><h2 className="text-2xl font-bold">See All</h2></div>
                    <div className="flex flex-row overflow-x-scroll relative">
                        {ElectricalGoods.map((product, index) => (
                            <div
                                className="flex flex-col gap-3 m-1 min-w-[100px] max-w-[220px] h-[310px] flex-shrink-0 border-2 border-black p-4"
                                key={index}
                                onClick={() => setProduct(product.id)}
                            >
                                
                                <Image src={product.imageurl} alt="paan" width={100} height={150} className="h-[140px] w-[200px]" />
                                <div className="flex flex-col gap-1">
                                    {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                                    <h2>{product.quantity}</h2>
                                    <p>{product.sellerName}</p>
                                    <div className="flex flex-row justify-between w-[190px] items-center mb-0 absolute bottom-3 mt-6 cursor-pointer"><strong>{product.price}</strong><Button className="bg-pink-400 cursor-pointer w-[90px]">Add</Button></div>
                                </div>
                            </div>
                        ))}
                    </div>



                </div>
                <div>

                    <div className="flex flex-row overflow-x-scroll relative">
                        {HospitalMedical.map((product, index) => (
                            <div
                                className="flex flex-col gap-3 m-1 min-w-[100px] max-w-[220px] h-[310px] flex-shrink-0 border-2 border-black p-4"
                                key={index}
                                onClick={() => setProduct(product.id)}
                            >
                                <div className="flex flex-row justify-between m-3"><h2 className="text-2xl font-bold">Hospital and Medical Equipment</h2><h2 className="text-2xl font-bold">See All</h2></div>
                                <Image src={Charger!} alt="paan" className="h-[140px] w-[200px]" />
                                <div className="flex flex-col gap-1">
                                    {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                                    <h2>{product.quantity}</h2>
                                    <p>{product.sellerName}</p>
                                    <div className="flex flex-row justify-between w-[190px] items-center mb-0 absolute bottom-3 mt-6 cursor-pointer"><strong>{product.price}</strong><Button className="bg-pink-400 cursor-pointer w-[90px]">Add</Button></div>
                                </div>
                            </div>
                        ))}
                    </div>



                </div>
                <div>
                    <div className="flex flex-row justify-between m-3"><h2 className="text-2xl font-bold">Industrial Plants, Machinery & Equipment</h2><h2 className="text-2xl font-bold">See All</h2></div>
                    <div className="flex flex-row overflow-x-scroll relative">
                        {IndustrialMachinery.map((product, index) => (
                            <div
                                className="flex flex-col gap-3 m-1 min-w-[100px] max-w-[220px] h-[310px] flex-shrink-0 border-2 border-black p-4"
                                key={index}
                                onClick={() => setProduct(product.id)}
                            >
                                <Image src={Charger!} alt="paan" className="h-[140px] w-[200px]" />
                                <div className="flex flex-col gap-1">
                                    {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                                    <h2>{product.quantity}</h2>
                                    <p>{product.sellerName}</p>
                                    <div className="flex flex-row justify-between w-[190px] items-center mb-0 absolute bottom-3 mt-6 cursor-pointer"><strong>{product.price}</strong><Button className="bg-pink-400 cursor-pointer w-[90px]">Add</Button></div>
                                </div>
                            </div>
                        ))}
                    </div>



                </div>






            </div>

        </div>


    )
}