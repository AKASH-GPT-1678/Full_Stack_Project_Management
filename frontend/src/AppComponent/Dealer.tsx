"use client";
import React from 'react'
import { Button } from '@/Components/ui/button';
import { useSelector } from 'react-redux';
import { Initials } from './redux';
import { RegisterDealer } from './ExtrasForms';
import { FaPlus } from 'react-icons/fa';
export interface Dealer {
    id: string;
    name: string ;
    email: string | null;
    address: string | null;
    category: string | null;
    phonenum: string | null;
    transactionWorth: string | null;
    verified: boolean | null;
    createdAt: string;
}

const Dealer = () => {
    const [dealers, setDealers] = React.useState<Dealer[]>([]);
    const [showRegisterDealer, setShowRegisterDealer] = React.useState(false);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    

    const token = useSelector((state: { User: Initials }) => state.User.token);
    const getallDealers = async () => {

        try {
           

            const response = await fetch(`${Key_Url}api/getdealer`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }


            const data = await response.json();
            console.log(data);
            setDealers(data?.dealers?.[0]?.Dealer);

        } catch (error) {
            console.log(error)

        }
    };

    React.useEffect(() => {
        getallDealers();

    }, []);
    return (
        <div className='xs:ml-10'>
            <div className='h-[70px]'>
                   <Button className='bg-gray-600 text-white cursor-pointer h-11 m-5' onClick={() => setShowRegisterDealer(!showRegisterDealer)} ><FaPlus />Add Dealer</Button>
            </div>
            <div>
                <div className='mt-5 m-5'>
                <h1 className='text-4xl font-bold'>Your Dealers </h1>
                            {dealers?.map((dealer: Dealer, index: number) => (
                        <div key={index} className='h-fit flex flex-xol gap-3 pt-4 10 w-[400px] cursor-pointer rounded-2xl te
                        '>
                            <h1 className='xs:text-xl sm:text-2xl md:text-3xl font-bold text-blue-500'>{dealer.name}</h1>
                          
                        </div>
                    ))}

                </div>
              
                <div className='flex flex-col gap-3 mt-5'>


        
                </div>
           
                {showRegisterDealer && <div className='md:absolute  md:ml-[300px] lg:ml-[400px]'><RegisterDealer /></div>}
            </div>

        </div>
    )
}

export default Dealer
