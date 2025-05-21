"use client";
import React from 'react'
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { loginSchema, loginSchemaType } from './validlogin';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setToken } from '@/AppComponent/redux';
import { useDispatch } from 'react-redux';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { app } from "../../lib/firebase.config";
const provider = new GoogleAuthProvider();
import { FaEye } from "react-icons/fa";
import { Fa1 } from 'react-icons/fa6';


const Login = () => {
  const [InvalidCredentials, setInvalidCredentials] = React.useState(false);
  const [show, setshow] = React.useState(false);
  const router = useRouter();
  const auth = getAuth(app);
  const Key_Url = process.env.NEXT_PUBLIC_Endpoint;


  const dispatch = useDispatch();
  async function loginWithGoogle() {
    try {
      console.log(Key_Url);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {

        const response = await axios.post(`${Key_Url}api/google`, { email: user.email, name: user.displayName, password: user.uid });
        const token = response.data.token;
        console.log(response.data)
        console.log(token)

        dispatch(setToken(token));
        if (response.data.success == true) {
          router.push("/");
        }





      }







      console.log("Logged in as:", user.displayName, user.email);
    } catch (error: any) {
      console.error("Google login error:", error);
    }
  }




  const verify = async (details: loginSchemaType) => {

    if (!Key_Url) {
      throw new Error("Key api url cannot be undefined");
    }
    console.log(details);

    try {
      const response = await axios.post(`${Key_Url}api/login`, details);
      let token = "";
      if (response?.data?.token) {
        token = response.data.token.toString();
      }

      dispatch(setToken(token));
      if (response.data.message == "Found the User") {
        router.push("/");

      }

    } catch (error) {
      console.log(error);
      setInvalidCredentials(true)
    }


  }



  const { register, handleSubmit, formState: { errors } } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } })
  const onSubmit: SubmitHandler<loginSchemaType> = (data) => verify(data);




  React.useEffect(() => {
    document.body.style.backgroundImage = "url('https://png.pngtree.com/thumb_back/fh260/background/20210408/pngtree-white-abstract-vector-web-background-design-image_597636.jpg')"
  }, [])
  return (
    <div className='relative'>

      <div className='lg:w-[1100px] h-[600px] m-auto  inset-0 mt-32 cursor-pointer shadow-2xs z-40 rounded-4xl'>

        <div className='lg:w-[100%] h-full flex flex-row rounded-4xl m-7 md:border-2'>
          <div className='w-[40%] lg:w-[60%] hidden md:block  h-full rounded-3xl' style={{ backgroundImage: "url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/6aed5e56730527.59ba033156f54.png')", objectFit: "cover", }} >

            <Fa1 />
            <div className='flex flex-col items-center justify-center mt-40 gap-4 m-2 text-white '>
              <h1 className='text-5xl font-extrabold shadow-2xl'>Welcome Back</h1>
              <p className='font-serif text-xl'>You can Sign in here and access your already <br /> existing account</p>
            </div>

          </div>
          <div className='xs:w-full xs:mr-0 sm:w-[60%] lg:w-[40%] mr-10 mt-20 bg-white'>
            <form onSubmit={handleSubmit(onSubmit)}>



              <h1 className='text-5xl ml-12 font-bold'>Sign In</h1>
              <div className='flex flex-col justify-center items-center gap-5 mt-10 relative '>
                <Input type='text' placeholder={` Enter Your Email `} {...register("email")} className='rounded-3xl w-[80%] h-[50px] p-5 placeholder:text-md' />
                {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                <Input type={show ? "text" : "password"} placeholder='Enter your Pasword'  {...register("password")} className='rounded-full w-[80%] h-[50px] p-5 placeholder:text-md' />
                {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                <FaEye className='absolute md:ml-60 xs:ml-40  mt-16  ' size={20} onClick={() => setshow(!show)} />
              </div>
              <div className='flex flex-row justify-between gap-6 items-center w-[80%] md:ml-10 mt-1 h-[70px]  xs:text-sm md:text-lg xs:ml-8 mb-5
             '>
                <div className=' '>
                  <input type='checkbox' className='mr-2 cursor-pointer ' />
                  <span>Remember Me</span>
                </div>
                <div>
                  <span>Forget Password?</span>

                </div>

              </div>
              <div className='ml-24'>
                {InvalidCredentials && <p className='text-red-500 text-lg'>Invalid Credentials</p>}
              </div>


              <div className='flex flex-col justify-center items-center'>

                <Button className='cursor-pointer bg-purple-500 w-[80%] p-5 text-white text-lg font-bold rounded-3xl h-[50px]' type='submit'>Sign In </Button>
                
             

               
              </div>


            </form>
            <div className='flex flex-col justify-center items-center'>

           
            <Button className='cursor-pointer bg-purple-500 w-[80%] p-5 text-white text-lg font-bold rounded-3xl h-[50px] mt-5' onClick={loginWithGoogle}>Sign with Google</Button>
             <span className='mt-3'>New User? <span className='text-blue-600 cursor-pointer' onClick={() => router.push("/register")}>Create an account</span></span>
              </div>
          </div>
        </div>


      </div>


    </div>
  )
}



export default Login