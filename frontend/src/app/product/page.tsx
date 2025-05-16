"use client";
import { Initials } from '@/AppComponent/redux';
import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { Button } from '@/Components/ui/button';
import { ContactForm } from '@/AppComponent/ProductQuery';
import { Input } from '@/Components/ui/input';
import Image from 'next/image';
export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  rating: string;
  imageurl: string;
  quantity: string;
  sellerName: string;
  expirydate: string;
  category: string;
  specialmsg: string;
  stock: number | null;
  contact: string;
  mode: string;
  type: string;
  offers: string;
  Review: any;
}

type User = {
  name: string;
}
interface UserReview {
  User: User;
  rating: number;
  review: string;

}

const Product = () => {
  const productid = useSelector((state: { User: Initials }) => state.User.productid);
  const [Product, setProduct] = React.useState<Product>();
  const [showContactForm, setShowContactForm] = React.useState(false);
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [reviews, setReviews] = React.useState<UserReview[]>([]);
  const token = useSelector((state: { User: Initials }) => state.User.token);
  const [showContact, setShowContact] = React.useState(false);
  const Keyurl = process.env.NEXT_PUBLIC_Endpoint;
  const query2 = `query Getproduct($token :String!, $productid :String!){
        getProduct(token : $token , productid : $productid){
       
          id
          name
          price
          description
          rating
          imageurl
          quantity
          sellerName
          expirydate
          category
          specialmsg
          stock
          contact
          mode
          type
          offers
          Review
        
        
        }
        
        }`



  const addToWishlist = async () => {
    try {
      const response = await axios.post(
        `${Keyurl}api/wishlist/${productid}`,
        {},

        {
          headers: {
            "Content-Type": "application/json",

            "Authorization": `Bearer ${token}`,
          }
        }
      );

      console.log('Added to wishlist:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };


  const fetchProduct2 = async () => {
    try {
      const response = await axios.post(`${Keyurl}graphql`, {
        query: query2,
        variables: { token: `Bearer ${token}`, productid: productid }
      });
      console.log(response.data.data.getProduct)
      setProduct(response.data.data.getProduct[0])
      return response.data;

    } catch (error) {
      console.log(error)

    }
  };

  const addReview = async () => {
    try {
      const response = await axios.post(
        `${Keyurl}api/addreview/${productid}`,
        { review: review, rating: rating },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      console.log('Review added:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  };

  const getReviews = async () => {
    try {
      const response = await axios.get(
        `${Keyurl}api/getreviews/${productid}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      console.log('Review added:', response.data.reviews);
      setReviews(response.data.reviews);
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  };
  const createOrder = async () => {
  
    const orderStatus = 'Pending'; //
  
    try {
      const response = await axios.post(
        `${Keyurl}api/createorder/${productid}`,
        {
          status: orderStatus
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log('Order created:', response.data);
    } catch (error :any) {
      console.error('Error creating order:', error.response?.data || error.message);
    }
  };



  React.useEffect(() => {
    fetchProduct2();
    getReviews();
  }, []); 
  





  return (
    <div>
      <h1>Hlleoe </h1>

      <div>
        <div className='flex flex-row w-[70%] border-2 border-black ml-72' key={Product?.id}>
          <div className=' w-[35%] h-[600px] relative p-2'>
            {
              Product?.imageurl && (
                <Image src={Product.imageurl} width={400} height={400} alt='iamge' className='object-cover w-fit'></Image>
              )
            }



            <div>
              {
                showContact && (
                  <div className='text-3xl mt-8 ml-24 font-extrabold'><h1>Contact : {Product?.contact}</h1></div>
                )
              }


            </div>
            <div className='flex flex-col gap-2'>
              <Button className='bg-black text-white absolute bottom-0 left-10 h-[50px] w-[200px] cursor-pointer' onClick={() => setShowContact(!showContactForm)} >Contact Supplier </Button>
              <Button className='bg-black text-white absolute bottom-0 left-62 h-[50px] w-[200px] cursor-pointer' onClick={() => setShowContactForm(!showContactForm)}>Get Quotes</Button>

            </div>

          </div>
          <div className='absolute left-1/2 top-[240px] z-40'>
            {showContactForm && (
              <ContactForm />
            )}
          </div>

          <div className='w-[65%] h-screen border-2 border-black overflow-y-scroll relative'>
            <h1 className='text-3xl font-semibold m-4'>{Product?.name}</h1>
            <div>
              <p>{Product?.rating}</p>

              <div className='m-4 font-bold text-4xl'>
                <p>₹{Product?.price}</p>
              </div>
              <div className='mt-8 ml-4'>
                <h2 className='text-3xl font-semibold'>Available Offers</h2>
                <p className='font-semibold mt-3.5'>{Product?.specialmsg}</p>
              </div>
              <div className='mt-8 ml-4'>
                <h2 className='text-3xl font-semibold mt-8'>Seller</h2>
                <p className='font-semibold mt-3.5'>{Product?.sellerName}</p>
              </div>
              <div className='mt-8 ml-4'>

                <p className='font-semibold mt-3.5'>Available Stock - {Product?.stock}</p>

                <h2 className='text-3xl font-bold p-2 mt-2'>Special Offers</h2>
                <p>{Product?.offers}</p>
                <p>{Product?.mode}</p>
              </div>
              <div className='m-5 bg-black text-white w-[200px] h-[50px] flex items-center justify-center cursor-pointer'>
                <h1 onClick={addToWishlist}>Add to Wishlist</h1>
              </div>

              <div className='m-6'>
                <h2 className='text-3xl font-semibold mt-8'>Description</h2>
                <p className='font-semibold mt-3.5'>{Product?.description}</p>
              </div>
              <div className='m-5 bg-black text-white w-[200px] h-[50px] flex items-center justify-center cursor-pointer'>
                <h1 onClick={createOrder}>Add as Order</h1>
              </div>


              <div className='border-1 mt-12 mb-6'>
                <div className='flex flex-row gap-3  '>
                  <textarea placeholder='Add Review' className='w-[600px] h-[100px] p-5' onChange={(e) => setReview(e.target.value)}></textarea>
                  <Input type='text' placeholder='Rating' onChange={(e) => setRating(e.target.value)} className='w-[100px] mt-6' />
                  <Button className='bg-black text-white p-4 mt-6 cursor-pointer' onClick={addReview}>Submit</Button>
                </div>
                {reviews && reviews.slice(0, 10).map((item: UserReview , index :number) => {
                  return (
                    <div key={index}>
                      <p className='text-xl font-semibold mt-8'>{item.User.name}</p>
                      <p className='font-semibold mt-3.5'>{item.rating}</p>
                      <p>{item.review}</p>
                    </div>
                  )
                })}
              </div>



            </div>
          </div>



        </div>
      </div>

    </div>
  )
}

export default Product