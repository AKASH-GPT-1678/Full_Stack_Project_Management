import React, { useEffect } from 'react'
import Image from 'next/image'
import { setProductid } from './redux'
import { Product } from './Marketplace'
import axios from 'axios'
import Banner1 from "../../public/service.webp"
import { Button } from '@/Components/ui/button'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
const Services = () => {
  const router = useRouter();
  const [products, setProducts] = React.useState<Product[]>([]);
  const dispatch = useDispatch();
  const [sliceValue ,setSliceValue] = React.useState(4);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);


  // const viewAllinCategory = (category: string) => {
  //   router.push(`viewall?category=${category}`)
  // }



  // const bgColors = [
  //   "bg-amber-200",
  //   "bg-rose-200",
  //   "bg-sky-200",
  //   "bg-emerald-200",
  //   "bg-purple-200",
  //   "bg-yellow-200"
  // ];

  const serviceCategories = [
    "Food & Event Services",
    "Beauty & Wellness",
    "Home Services",
    "Local Services",
    "Errands & Delivery",
    "Miscellaneous Services"
  ];
  // const setProduct = (id: string) => {
  //   dispatch(setProductid(id))
  //   router.push("/product")
  // }


  const shuffleProducts = [...products]; 

  for (let i = shuffleProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleProducts[i], shuffleProducts[j]] = [shuffleProducts[j], shuffleProducts[i]];
  }
  

  const shuffleServices = shuffleProducts.slice(0, 4); 
  // const filterHome = shuffleProducts.filter((data) => data.category == "Beauty_Wellness");
  // const filterConsultancy = shuffleProducts.filter((data) =>data.category == "Consultancy");
  
  const getServices = async () => {
    try {
      const response = await axios.get('http://localhost:3400/api/services');
      console.log('Services fetched:', response.data);
      setProducts(response.data.data);
      return response.data;

    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  
    React.useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);
    }, []); // run only once
  
    React.useEffect(() => {
      if (screenWidth < 768) {
        setSliceValue(1);
      } else if (screenWidth < 1024 && screenWidth >= 768) {
        setSliceValue(2);
      }
  
      else {
        setSliceValue(3);
      }
    }, [screenWidth]); 
  
  





  return (
 

      <div className="  h-full border-10 border-amber-950 min-w-[400px]" >
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
        <div className=" flex flex-col  w-full bg-white" >
          <div>
            <div className="min-h-64 border-2 border-black m-10
            ">

              <div className="flex flex-row justify-between m-10">

                <div>
                  <h1 className="text-3xl font-extrabold font-serif">Get the Best Services in your Range</h1>

                </div>
                <div className="hidden md:block">
                  <div className="grid grid-rows-3 grid-flow-col gap-2.5">
                    {serviceCategories.map((item, index) => (
                      <div key={index}>
                        <h1>{item.toString()}</h1>

                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>

          </div>


          <div>
            <div>
              <div>
                <h1 className="flex flex-row justify-center-safe text-3xl font-bold">Who's Using Us?</h1>
              </div>

              <div className="min-h-40 min-w-[320px] mt-5 border-2 border-black mr-10 ml-10 p-2 flex flex-row gap-2 justify-evenly ">
                <div className="border-2 border-black max-w-[350px] ">
                  <h1 className="p-2 text-lg md:text-xl lg:text-3xl font-bold">Top Event Managers</h1>
                  <div className="p-1">
                    <span>Mittal Caters, Naemd Institute of Management, Varsha Planners</span>
                  </div>
                </div>
                <div className="max-w-[350px] border-2 border-black">
                  <h1 className="p-2 text-lg md:text-xl lg:text-3xl font-bold  ">Top Event Managers</h1>
                  <div className="p-2">
                    <span>Mittal Caters, Naemd Institute of Management, Varsha Planners</span>
                  </div>
                </div>
                <div className="max-w-[400px] border-2 border-black ">
                  <h1 className="p-2 md:text-xl text-lg lg:text-3xl font-bold ">Top Event Managers</h1>
                  <div className="p-2">
                    <span>Mittal Caters, Naemd Institute of Management, Varsha Planners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div>
            <div className='w-full min-h-32 border-2 border-black mt-14 bg-gray-200 flex flex-row gap-5  p-2 xs:hidden sm:hidden md:block'>




            </div>

          </div>



          <div className='mt-10 flex items-center justify-center'>
            {/* <div className='border-2 broder-black  h-[300px] w-[1200px]'> */}
            <div className='grid grid-cols-2 p-4 gap-3 mt-2 '>
              <div className='border-2 border-black h-[240px] '>
                <Image src={Banner1} alt="Banner" width={600} height={600} className="object-cover h-[100%] "></Image>
              </div>
              <div className='border-2 border-black h-[240px] w-full hidden md:block'>
                <Image src={Banner1} alt="Banner" width={600} height={300} className="object-cover h-[100%]  "></Image>
              </div>

            </div>

          </div>
          <div className='flex flex-col'>

            <div className='flex flex-row justify-between p-2'>
              <h1 className='font-bold text-3xl flex flex-col'>Your Projects<span className='text-lg font-medium'>Explore Some of the Popular Services Around You</span></h1>
              {/* <span className="font-bold font-sans cursor-pointer mr-2" onClick={allProjectsPage}>View all</span> */}


            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20  mt-5 ml-10  md:ml-30 xxl:grid-cols-5 ">
                {shuffleServices.slice(0, sliceValue).map((item: Product, index: number) => (<div key={index} className="w-[240px] h-[250px] ">
                    <div className="w-[300px] h-[250px] md:w-[300px] md:h-[300px] rounded-4xl shadow-2xl flex flex-col cursor-pointer p-1
                    " >
                    <Image src={item.imageurl} alt="images" width={400} height={200} className="h-[200px] object-cover rounded-2xl" />

                    <p className='ml-2 font-bold'>{item.name}</p>
                    <p className='font-bold ml-2'>{item.name}</p>


                  </div>



                </div>))}

              </div>

            </div>




          </div>
          <div className='flex flex-col mt-16'>

            <div className='flex flex-row justify-between p-2'>
              <h1 className='font-bold text-3xl flex flex-col'>Group Projects<span className='text-lg font-medium'>Good morning hello how are you today</span></h1>
              {/* <span className="curosr-pointer font-bold font-sans mr-3" onClick={allProjectsPage}>View all</span> */}


            </div>

          <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20  mt-5 ml-10  md:ml-30 xxl:grid-cols-5ls-5 ">
                {shuffleServices.slice(0, sliceValue).map((item: Product, index: number) => (<div key={index} className="w-[240px] h-[250px] ">
                     <div className="w-[300px] h-[250px] md:w-[300px] md:h-[300px] rounded-4xl shadow-2xl flex flex-col cursor-pointer p-1"  >
                    <Image src={item.imageurl} alt="images" width={400} height={200} className="h-[200px] object-cover rounded-2xl" />

                    <p className='ml-2 font-bold'>{item.name}</p>
                    <p className='font-bold ml-2'>{item.name}</p>


                  </div>



                </div>))}

              </div>

            </div>

          </div>
          <div className='flex flex-col mt-20'>

            <div className='flex flex-row justify-between p-2 '>
              <h1 className='font-bold text-3xl flex flex-col ml-4'>Consultancy <span className='text-lg font-medium'>Consult Top Expert on Our Platform</span></h1>

              {/* <span className="cursor-pointer mr-3 font-bold font-sans" onClick={allProjectsPage}>View all</span> */}


            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20  mt-5 ml-10  md:ml-30 xxl:grid-cols-5 ">
                {shuffleServices.slice(0, sliceValue).map((item: Product, index: number) => (<div key={index} className="w-[240px] h-[250px] ">
                  <div className="w-[300px] h-[250px] md:w-[300px] md:h-[300px] rounded-4xl shadow-2xl flex flex-col cursor-pointer p-1"  >
                    <Image src={item.imageurl} alt="images" width={400} height={200} className="h-[200px] object-cover rounded-2xl" />

                    <p className='ml-2 font-bold'>{item.name}</p>
                    <p className='font-bold ml-2'>{item.name}</p>


                  </div>



                </div>))}

              </div>

            </div>




          </div>
          <div>


          </div>




        </div>

      </div>


  )
}

export default Services