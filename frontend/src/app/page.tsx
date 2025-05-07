"use client";
import Homebar from "@/AppComponent/Home";

import { useState } from "react";

export default function Home() {
  const [showProfile, setshowProfile] = useState(false);
  const [amount , setamount] = useState(100);


  async function createOrder() {
    const res = await fetch('/api/razorpay', {
      method: 'POST',
      body : JSON.stringify({ amount})
    });
    

    const data  = res.json() as any;
    console.log(data );

    const paymentData = {
      key : process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id : data.id,

      handler : async function (response :any) {
        alert('Payment successful');
        console.log(response);
      },
    };

    const payment = new (window as any).Razorpay(paymentData);
    payment.open();
  }

  return (


    <>
    <div>
    <Homebar />


    </div>
  
    
    </>
  );
}
