"use client";
import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import Product from './Product';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Initials } from './redux';
import Image from 'next/image';
import { Button } from '@/Components/ui/button';
import { UpdateInventory } from './ExtrasForms';
import { setProductid } from './redux';
import { fetchSellerOrders } from './Fetchorder';
export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  rating: string;
  imageurl: string;
  quantity: string;
  type: string;
}
interface Products {
  id: string;
  imageurl: string;
  name: string;
  specialmsg: string | null;
}

interface SellerOrder {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  buyerContact: string;
  product: Products[];
}
const Sellerprofile = () => {
  const [addProduct, setadProduct] = React.useState(false);
  const Keyurl = process.env.NEXT_PUBLIC_Endpoint;
  const [data, setData] = useState<Product[]>([]);
  const [update, setUpdate] = useState(false);
  const [orders, setOrders] = useState<SellerOrder[]>([])
  const token = useSelector((state: { User: Initials }) => state.User.token)
  // const productid = useSelector((state: { User: Initials }) => state.User.productid);
  const dispatch = useDispatch();
  const query = `query GetProducts($token: String!) {
		getProducts(token: $token) {
		  id
		  name
		  price
		  description
		  rating
		  imageurl
		  quantity
          type
		
		}
	  }
	`;



  const toggleButton = (productid: string) => {
    dispatch(setProductid(productid))
    setUpdate(!update)




  };

  const loadSellerOrder = async () => {
    const data = await fetchSellerOrders(token as string);
    setOrders(data)

  }

 





  const fetchProducts = async () => {
    try {
      const response = await axios.post(`${Keyurl}graphql`, {
        query,
        variables: { token: `Bearer ${token}` }

      });
      console.log(response.data.data)
      setData(response.data.data.getProducts)
      return response

    } catch (error) {
      console.error(error)

    }
  };
  useEffect(() => {
    fetchProducts()
    loadSellerOrder();

  }, [])
  return (
    <div className='ml-auto border-2 border-black w-[90%]'>
      <div className='flex flex-col space-y-5  mt-10 ml-5
        '>
        <h1 className='text-3xl'>Your Profile</h1>
        <div className='h-[140px] border-2 border-black'></div>

        <div>
          <h2 className='text-3xl'>Your Catoulogue</h2>
          <div className='h-[280px] border-2 border-black mt-2 flex flex-row relative'>
            <div className='w-[180px] h-[250px] border-2 border-black mt-3 ml-10'>
              <FaPlus size={50} className='flex ml-7 cursor-pointer mt-6' onClick={() => setadProduct(!addProduct)} />


            </div>
            <div className='absolute ml-40 z-40 '>
              {addProduct && <Product />}
              {update && <UpdateInventory />}
            </div>
            <div className='flex flex-row'>

              <div className='flex flex-row gap-4 ml-5 mt-3'>
                {data.map((item, index) => (
                  <div key={index} className='w-[180px] h-[200px]  flex flex-col'>
                    <div>
                      <Image src={item.imageurl} alt='images' width={180} height={180} className='object-cover w-[100%] h-[90%]'></Image>
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                      <p>{item.rating}</p>
                    </div>


                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
        <div className='flex flex-col p-4 gap-2'>
          <div className='h-[340px] border-2 border-black flex flex-row overflow-scroll'>
            <h1 className='text-3xl font-bold m-5'>Orders</h1>

            {orders.map((item, index) => (
              <div key={index} className='flex flex-col gap-4 ml-5 mt-3'>
                <div className='w-[180px] h-[200px]  flex flex-col gap-3'>
                  <div className='flex flex-col gap-3'>
                    {/* <Image src={item.product[0].imageurl} alt='images' width={180} height={180} className='object-cover w-[100%] h-[90%]'></Image> */}
                    <p>{item.product[0].name}</p>
                    <p>{item.buyerName}</p>
                    <p>{item.buyerContact}</p>
                  </div>


                </div>
              </div>
            ))}
          </div>
          <div className='h-[380px] border-2 border-black'>
            <h1 className='text-3xl font-bold m-5'>Inventory</h1>
            <div className='flex flex-row'>

              <div className='flex flex-row'>

                <div className='flex flex-row gap-4 ml-5 mt-3'>
                  {data.map((item, index) => (
                    <div key={index} className='w-[190px] h-[300px]  flex flex-col'>
                      <div>
                        <Image src={item.imageurl} alt='images' width={180} height={160} className='object-cover w-[100%] h-[180px]'></Image>
                        <p className='font-bold ml-2 mt-3'>{item.name}</p>
                        <p className='font-bold ml-2 '>{item.price}</p>
                        <div>
                          <Button onClick={() => toggleButton(item.id)} className='bg-black text-white mt-1 ml-10 cursor-pointer'>Update</Button>
                        </div>

                      </div>



                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Sellerprofile