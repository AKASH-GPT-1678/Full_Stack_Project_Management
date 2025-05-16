'use client';
import React from 'react'
import { Input } from '@/Components/ui/input';
import Human from '../../../public/construction/human.png';
import Interi from '../../../public/construction/interi.png';
import Stud from '../../../public/construction/stud.png';
import Image from 'next/image';
import { useForm, SubmitHandler } from "react-hook-form"
import { registerSchema, registerSchemaType } from "../register/validation"
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setToken } from '@/AppComponent/redux';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../lib/firebase.config";
const provider = new GoogleAuthProvider();
import { FaEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
const Page = () => {
    const auth = getAuth(app);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint
    const [datee, setdate] = React.useState<Date>(new Date());
    const [toggleType, settoggleType] = React.useState(false);
    const [isChecked, setIsChecked] = React.useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
      };
      
    const router = useRouter();
    const dispatch = useDispatch();


    const { register, handleSubmit, formState: { errors } } = useForm<registerSchemaType>({

        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            lastname: "",
            email: "",
            password: "",
            cpassword: ""
        }

    });

    async function loginWithGoogle() {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (user) {

                const response = await axios.post(`${Key_Url}api/google`, { email: user.email, name: user.displayName, password: user.uid });
                const token = response.data.token;
                console.log(response.data)

                dispatch(setToken(token));




            }

            console.log("Logged in as:", user.displayName, user.email);
        } catch (error: any) {
            console.error("Google login error:", error.message);
        }
    }





    const Senddata = async (props: registerSchemaType) => {

        try {
           
            if (!Key_Url) {
                throw new Error("Key api url cannot be undefined");
            }
            console.log(props)
            const response = await axios.post(`${Key_Url}api/register`, props)
            console.log("Server Data is Here", response.data)
            if (response.data.message == "User registered") {
                router.push("/login")
            }
            
        } catch (error :any) {
            console.log(error , error.message);
            
        }


    }
    const onSubmit: SubmitHandler<registerSchemaType> = (data) => Senddata(data);
    // const clickSinup = () => {
    //     const signup = document.getElementById("sign") as HTMLButtonElement;
    //     signup.click()

    // }




    React.useEffect(() => {
        document.body.style.backgroundImage = "url('https://t3.ftcdn.net/jpg/02/20/91/18/360_F_220911898_L76bNmS7LKGfdDgWtsYDocULFqeDUKug.jpg')";
        const interval = setInterval(() => {
            setdate(new Date());
        })

        return () => {
            clearInterval(interval);
        }


    }, []);





    return (
        <div className='h-[100%] w-[100%] ' >
            <div className='hideden md:block' >
             <div className="bg-green-100 max-w-[1200px] w-full h-auto m-auto mt-36 cursor-pointer rounded-3xl shadow-2xl border-4 border-solid border-amber-50 p-4">
      <div className="flex flex-col md:flex-row md:justify-around">

        {/* Left promo panel: hidden on screens < md (>=768px) */}
        <div className="hidden md:block md:w-[500px]">
          <div className="relative flex flex-row justify-between items-center mb-6">
            <div className="mt-40 relative h-[120px] w-[90%] flex items-center justify-center">
              <Image className="absolute top-0 left-4 w-[100px] h-[100px] rounded-full" src={Human} alt="Human" />
              <Image className="absolute top-0 left-20 w-[100px] h-[100px] rounded-full" src={Interi} alt="Interior" />
              <Image className="absolute top-0 left-36 w-[100px] h-[100px] rounded-full" src={Stud} alt="Student" />
            </div>
            <div>
              <span className="text-4xl font-extrabold">40% OFF</span>
            </div>
          </div>
          <div>
            <h1 className="text-6xl font-extrabold text-center mb-2">{datee.toLocaleTimeString()}</h1>
            <p className="text-center text-xl">Hurry up! Offer is only valid til 12:00 AM Midnight</p>
          </div>
        </div>

        {/* Right signup form panel */}
        <div className="w-full md:w-[600px] p-4 m-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div className="flex flex-col w-full md:w-1/2">
                <label>Name <span className="text-red-600">*</span></label>
                <Input type="text" {...register('name')} className="w-full p-4" placeholder="Enter your name" />
                {errors.name && <p className="text-red-600 mt-1">{errors.name.message}</p>}
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label>Last Name <span className="text-red-600">*</span></label>
                <Input type="text" {...register('lastname')} className="w-full p-4" placeholder="Last Name" />
                {errors.lastname && <p className="text-red-600 mt-1">{errors.lastname.message}</p>}
              </div>
            </div>

            <div className="flex flex-col space-y-4 relative">
              <div>
                <label>Email <span className="text-red-600">*</span></label>
                <Input type="email" {...register('email')} className="w-full p-4" placeholder="Email" />
                {errors.email && <p className="text-red-600 mt-1">{errors.email.message}</p>}
              </div>

              <div className="relative">
                <label>Password <span className="text-red-600">*</span></label>
                <Input
                  type={toggleType ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full p-4"
                  placeholder="Password"
                />
                <div className="absolute top-8 right-4 cursor-pointer" onClick={() => settoggleType(!toggleType)}>
                  <FaEye size={20} />
                </div>
                {errors.password && <p className="text-red-600 mt-1">{errors.password.message}</p>}
              </div>

              <div className="relative">
                <label>Confirm Password <span className="text-red-600">*</span></label>
                <Input
                  type={toggleType ? 'text' : 'password'}
                  {...register('cpassword')}
                  className="w-full p-4"
                  placeholder="Confirm Password"
                />
                <div className="absolute top-8 right-4 cursor-pointer" onClick={() => settoggleType(!toggleType)}>
                  <FaEye size={20} />
                </div>
                {errors.cpassword && <p className="text-red-600 mt-1">{errors.cpassword.message}</p>}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="scale-125 cursor-pointer mr-2"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="terms">
                I agree with the <a href="/terms" className="text-blue-800 hover:underline">Terms and Conditions</a> &amp; <a href="/privacy" className="text-blue-800 hover:underline">Privacy Policy</a>
              </label>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <button
                id="signup"
                type="submit"
                className="bg-gray-900 text-white w-full md:w-40 h-14 rounded-lg disabled:opacity-50"
                disabled={!isChecked}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="bg-gray-900 text-white w-full md:w-60 h-14 rounded-lg"
                onClick={loginWithGoogle}
              >
                Sign up with Google
              </button>
            </div>

            <p className="text-center">
              Already have an account? <a href="/login" className="text-blue-800 hover:underline">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
            </div>
        </div>
    )
}

export default Page