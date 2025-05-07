import React, { useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import { userReviews } from './reviews'
import { Service } from '../../public/images'
import { setProductid } from './redux'
import { Product } from './Marketplace'
import axios from 'axios'
import Banner1 from "../../public/service.webp"
import Banner2 from "../../public/banner2.webp"
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
const Services = () => {
  const router = useRouter();
  const [products, setProducts] = React.useState<Product[]>([]);
  const dispatch = useDispatch();


  const viewAllinCategory = (category: string) => {
    router.push(`viewall?category=${category}`)
  }



  const bgColors = [
    "bg-amber-200",
    "bg-rose-200",
    "bg-sky-200",
    "bg-emerald-200",
    "bg-purple-200",
    "bg-yellow-200"
  ];

  const serviceCategories = [
    "Food & Event Services",
    "Beauty & Wellness",
    "Home Services",
    "Local Services",
    "Errands & Delivery",
    "Miscellaneous Services"
  ];
  const setProduct = (id: string) => {
    dispatch(setProductid(id))
    router.push("/product")
  }


  const shuffleProducts = [...products]; 

  for (let i = shuffleProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleProducts[i], shuffleProducts[j]] = [shuffleProducts[j], shuffleProducts[i]];
  }
  

  const shuffleServices = shuffleProducts.slice(0, 4); 
  const filterHome = shuffleProducts.filter((data) => data.category == "Beauty_Wellness");
  const filterConsultancy = shuffleProducts.filter((data) =>data.category == "Consultancy");
  
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





  return (
    <div className='h-[100%]'>
      <div className="flex flex-row h-[75px] border-2 bprder-black"></div>
      <div className="ml-44 mr-44  h-full">
    
        <div className=" flex flex-col  w-full bg-white" >
          <div className="flex flex-row h-[500px]  mt-5 rounded-3xl bg-white relative ">
            <div className='w-[700px] h-[380px]  mt-4'>

              <h1 className='font-bold text-7xl ml-14 mt-6'>Get Truted Services in Your Range</h1>

            </div>
            <div className='ml-[800px]  absolute z-40 h-96 mt-5'>
              <div className='grid grid-cols-2 grid-flow-rows w-[700px] ml-4 mt-5
                space-y-2.5'>

                {serviceCategories.map((category, index) => (
                  <div key={index}>
                    <div className={`w-[300px] h-[100px]  flex flex-row ${bgColors[index]} rounded-4xl shadow-2xl`}>
                      <p className='ml-6 mt-3 font-bold text-lg'>{category}</p>
                      <Image src={Service[index]} alt="Service" width={100} height={90} className='ml-14 object-fill roudned-4xl
                      ' />

                    </div>


                  </div>

                ))}






              </div>


            </div>

          </div>
        

          <div className='w-full h-[150px] border-2 border-black mt-14 bg-gray-200 flex flex-row gap-5  p-2'>

            {userReviews.map((category, index) => (


              <div key={index} className='flex flex-row gap-5 items-center  '>
                <div className={`   h-[120px] shadow-2xl w-[270px] gap-10 p-1  `}>
                  <p className='mt-4 ml-3 font-bold italic'>"{category.review}"</p>
                  <p className='ml-38 mt-2'>~{category.name}</p>


                </div>


              </div>


            ))}


          </div>

          <div className='mt-10 flex items-center justify-center'>
            <div className='border-2 broder-black  h-[300px] w-[1200px]'>
              <div className='grid grid-cols-2 p-4 gap-3 mt-2'>
                <div className='border-2 border-black h-[260px]'>
                  <Image src={Banner1} alt="Banner" width={600} height={300}></Image>
                </div>
                <div className='border-2 border-black h-[260px]'>
                  <Image src={Banner2} alt="Banner" width={600} height={300}></Image>
                </div>


              </div>

            </div>
          </div>
          <div className='flex flex-col'>

            <div className='flex flex-row justify-between p-4 overflow-hidden'>
              <h1 className='font-bold text-3xl flex flex-col'>Popular Services Around You <span className='text-lg font-medium'>Explore Some of the Popular Services Around You</span></h1>
              <span>View all</span>


            </div>
            <div>
              <div className="grid grid-cols-4  gap-2 mt-5 ml-30 ">
                {shuffleServices.map((item, index: number) => (<div key={index} className="w-[240px] h-[250px] ">
                  <div className="w-[300px] h-[300px] rounded-4xl shadow-2xl flex flex-col cursor-pointer" onClick={() => setProduct(item.id)} >
                    <Image src={item.imageurl} alt="images" width={400} height={200} className="h-[200px] object-cover rounded-2xl" />

                    <p className='ml-2 font-bold'>{item.sellerName}</p>
                    <p className='font-bold ml-2'>{item.name}</p>
                    <p className='font-bold ml-2'>Price : {item.price}</p>

                  </div>



                </div>))}

              </div>

            </div>




          </div>
          <div className='flex flex-col mt-16'>

            <div className='flex flex-row justify-between p-4'>
              <h1 className='font-bold text-3xl flex flex-col'>Home Services<span className='text-lg font-medium'>Good morning hello how are you today</span></h1>
              <span>View all</span>


            </div>

            <div>
              <div className="grid grid-cols-4 gap-2 mt-5 ml-30 ">
                {filterHome.map((item, index: number) => (<div key={index} className="w-[240px] h-[250px] ">
                  <div className="w-[300px] h-[300px] rounded-4xl shadow-2xl flex flex-col cursor-pointer" onClick={() => setProduct(item.id)} >
                    <Image src={item.imageurl} alt="images" width={400} height={200} className="h-[200px] object-cover rounded-2xl" />

                  <div className='flex flex-col items-center justify-center mt-3'>
                    <p className='font-bold ml-2'>{item.name}</p>
                    <p className='font-bold ml-2'>Price : {item.price}</p>
                    </div>

                  </div>



                </div>))}

              </div>

            </div>

          </div>
          <div className='flex flex-col mt-20'>

            <div className='flex flex-row justify-between '>
              <h1 className='font-bold text-3xl flex flex-col ml-4'>Consultancy <span className='text-lg font-medium'>Consult Top Expert on Our Platform</span></h1>

              <span>View all</span>


            </div>
            <div>
              <div className="grid grid-cols-4 gap-2 mt-5 ml-30 ">
                {filterConsultancy.map((item, index: number) => (<div key={index} className="w-[240px] h-[250px] ">
                  <div className="w-[300px] h-[300px] rounded-4xl shadow-2xl flex flex-col cursor-pointer" onClick={() => setProduct(item.id)} >
                    <Image src={item.imageurl} alt="images" width={400} height={200} className="h-[200px] object-cover rounded-2xl" />

                    <p className='ml-2 font-bold'>{item.sellerName}</p>
                    <p className='font-bold ml-2'>{item.name}</p>
                    <p className='font-bold ml-2'>Price : {item.price}</p>

                  </div>



                </div>))}

              </div>

            </div>




          </div>
          <div>


          </div>




        </div>

      </div>

    </div>



  )
}

export default Services