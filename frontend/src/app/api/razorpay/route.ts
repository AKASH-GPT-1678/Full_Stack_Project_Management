import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET as string,
});

export async function POST(request: Request) {
    const { amount } = await request.json();

    const payment = await razorpay.orders.create({
        amount: amount , 
        currency: "INR",
        receipt: "receipt_order_123",
    });

    return NextResponse.json(payment);
}

// async function createOrder() {
//     const res = await fetch("/api/razorpay", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ amount }),
//     });

//     const data = await res.json();
//     console.log("Order Data:", data);

//     const options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//       amount: data.amount,
//       currency: "INR",
//       name: "Your App",
//       description: "Test Payment",
//       order_id: data.id,
//       handler: function (response: any) {
//         alert("Payment Successful!");
//         console.log("Payment Response:", response);
//       },
//     };

//     const paymentObject = new (window as any).Razorpay(options);
//     paymentObject.open();
//   }