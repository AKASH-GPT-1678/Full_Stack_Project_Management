'use client';
import React from 'react'
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
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
    const keyurl = process.env.NEXT_PUBLIC_Endpoint
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

                const response = await axios.post(`${keyurl}api/google`, { email: user.email, name: user.displayName, password: user.uid });
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
           
            if (!keyurl) {
                throw new Error("Key api url cannot be undefined");
            }
            console.log(props)
            const response = await axios.post(`${keyurl}api/register`, props)
            console.log("Server Data is Here", response.data)
            if (response.data.message == "User registered") {
                router.push("/login")
            }
            
        } catch (error :any) {
            console.log(error , error.message);
            
        }


    }
    const onSubmit: SubmitHandler<registerSchemaType> = (data) => Senddata(data);
    const clickSinup = () => {
        const signup = document.getElementById("sign") as HTMLButtonElement;
        signup.click()

    }




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
            <div className='' >
                <div className='bg-green-100 w-[1200px] h-[600px] m-auto mt-36 cursor-pointer rounded-3xl shadow-2xl border-4 border-solid border-amber-50 '>
                    <div className='flex flex-row justify-around '>
                        <div className='w-[500px] grid grid-rows-3 mt-40'>

                            <div className=' relative flex flex-row justify-between items-center '>
                                <div className='border-2 border-black
                            '>
                                    <Image className='absolute top-4 left-20  w-[100px] h-[100px] rounded-full' src={Human} alt="Human" />
                                    <Image className='absolute top-4 left-40  w-[100px] h-[100px] rounded-full' src={Interi} alt="Interior" />
                                    <Image className='absolute top-4 left-60  w-[100px] h-[100px] rounded-full' src={Stud} alt="Student" />


                                </div>
                                <div>
                                    <span className='text-4xl font-extrabold  mt-9'>40% OFF </span>
                                </div>

                            </div>
                            <div>

                                <h1 className='text-6xl font-extrabold ml-24'>{datee.toLocaleTimeString()}</h1>
                                <p className='ml-20 text-xxl mt-4'>Hurry up Offer is only valid til 12:00 AM Midnight</p>

                            </div>


                        </div>
                        <div className='w-[600px]'>
                            <div className='flex flex-row justify-evenly gap-5 mt-14   ' >
                                <div className='flex flex-col'>
                                    <label>Name <span className='text-red-600 top-3 mt-5'>*</span></label>
                                    <Input type='text'  {...register("name")} className='mb-4 w-64 p-5' placeholder='Enter your name' />
                                    {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                                </div>
                                <div className='flex flex-col'>
                                    <label>Last Name <span className='text-red-600 top-3'>*</span></label>
                                    <Input type='text'  {...register("lastname")} placeholder='Last Name' className='w-64 p-5' />
                                    {errors.lastname && <p className='text-red-600'>{errors.lastname.message}</p>}
                                </div>

                            </div>
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='ml-5  space-y-4 relative'>


                                        <label>Email <span className='text-red-600 top-3' >*</span></label>
                                        <Input type='email' {...register("email")} placeholder='Email' className='w-[90%] mt-1  placeholder:text-sm p-5' />
                                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                                        <label>Password <span className='text-red-600 top-3'>*</span></label>
                                        <div className='absolute ml-[470px] mt-4' onClick={() => settoggleType(!toggleType)}><FaEye size={20} /></div>
                                        <Input type={`${toggleType ? "text" : "password"}`} {...register("password")} placeholder="Password" className='w-[90%] mt-1 placeholder:text-sm p-5' />
                                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                                        <div className='absolute ml-[470px] mt-9' onClick={() => settoggleType(!toggleType)}><FaEye size={20} /></div>
                                        <label>Confirm Password <span className='text-red-600 top-3'>*</span></label>

                                        <Input type={`${toggleType ? "text" : "password"}`} {...register("cpassword")} placeholder="Confirm Password" className='w-[90%] mt-1 placeholder:text-sm p-5' />
                                        {errors.cpassword && <p className='text-red-600'>{errors.cpassword.message}</p>}


                                    </div>

                                    <div className='mt-3 flex flex-row gap-3 justify-center '>
                                        <input type="checkbox" id="vehicle1" name="vehicle1"  size={30} className='scale-125 cursor-pointer' onChange={handleCheckboxChange}></input>
                                        <span>Are you agree with the <a href='http://localhost:3000/terms' className='text-blue-800 hover:text-blue-800'>Terms and Condition </a> & <a href='http://localhost:3000/terms' className='text-blue-800'>Privacy Policy</a></span>
                                    </div>
                                    <div className='mt-8 gap-5 flex flex-row ml-24'>
                                        <button id='sign' type='submit' className='hidden'>signup</button>

                                    </div>
                                </form>
                                <div className='flex flex-row gap-2 ml-28'>
                                    <Button className='cursor-pointer bg-gray-900 w-40 h-14 text-white' id='signup' onClick={clickSinup} disabled={!isChecked}>Sign Up</Button>
                                    <Button className='cursor-pointer bg-gray-900 w-40 h-14 text-white' onClick={loginWithGoogle}>Sign up with Google </Button>
                                </div>
                            </div>
                            <div className='mt-3 ml-36'>
                                <p>Already have an account? <a href='http://localhost:3000/login' className='text-blue-800 hover:text-blue-800'>Login</a></p>
                            </div>



                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Page