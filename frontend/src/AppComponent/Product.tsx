import React, { useState } from 'react'
import { Label } from '@/Components/ui/label'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import axios from 'axios';
import { useRef } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from 'react-redux';
import { Initials } from './redux';
import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const categories = [
  "Basic_Electricals",
  "Construction_Essentials",
  "Party_Essentials",
  "Food_Essentials",
  "Pharma_Essentials",
  "Apparels_Clothing_and_Garments",
  "Electrical_Goods_and_Supplies",
  "Hospital_and_Medical_Equipment",
  "Industrial_Plants_Machinery_and_Equipment"
] as const;



export const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
  // rating: z.string().min(1, "Rating is required"),
  quantity: z.string().min(1, "Quantity is required"),
  category: z.string(), 
  sellerName: z.string().min(1, "Seller name is required"),

  specialmsg: z.string().min(1, "Special message is required"),
  offers: z.string().min(1, "Offers field is required"),
  type : z.enum(["Product" , "Service"]),
  questions : z.array(z.string()).optional(),
  contact : z.string().min(10 , "Contact Cannot be lesser than 10").optional(),
  coverimage: z
    .any()
    .refine((file) => file instanceof FileList && file.length > 0, {
      message: "Cover image is required",
    }),
});

type productSchema = z.infer<typeof productFormSchema>;
const Product = () => {
  const [coverError , setCoverError] = useState(false);
  const [questions ,setquestions] = useState<string[]>([]);
  const [type ,setType] = useState("Product");
  const token = useSelector((state : {User :Initials}) => state.User.token);
 

  const { register, reset, handleSubmit , setValue, formState : {errors}} = useForm<productSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      price: '',
      description: '',
     
      quantity: '',
      category : categories[0],
      sellerName: '',
   
      questions :questions,
      specialmsg: '',
      type :"Product",
      contact : '',
      offers: '',
      coverimage: undefined,
    }, 

  });

  const Senddata = async (data: productSchema) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_Endpoint}api/saveproduct`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        });
        console.log(response.data);
    } catch (error) {
        console.log(error)

    }
}

const inputRef = useRef<HTMLInputElement>(null)

const handleQuestion = (e : React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  const value = inputRef.current?.value;
  if(value){
    setquestions(prevstate => [...prevstate , value]);
    

  }
  inputRef.current!.value = "";
 
}

const handletypeChnage =(e : React.ChangeEvent<HTMLSelectElement>) => {
  setType(e.target.value);
  setValue("type" , e.target.value as "Product" || "Service");


}


  const onSubmit: SubmitHandler<productSchema> = (data) => {
    if(!data.coverimage){
      setCoverError(true)
      console.log(coverError)

    }else {
      setCoverError(false)
    }

  

    const formdata = new FormData() ;
    formdata.append("name", data.name);
    formdata.append("price", data.price);
    formdata.append("description", data.description);
 
    formdata.append("quantity", data.quantity);
    formdata.append("sellerName", data.sellerName);
    
    formdata.append("questions" , JSON.stringify(questions));
    formdata.append("category", data.category);
    formdata.append("type" , data.type);
    if(data.contact){
      formdata.append("contact" , data.contact);

    }
  

    formdata.append("specialmsg", data.specialmsg);
    formdata.append("offers", data.offers);
    if(data.coverimage){
      formdata.append("coverimage" , data.coverimage?.[0] );

    }

    Senddata(formdata as any);


  }


  return (
    <div className='bg-amber-50 rounded-2xl shadow-2xl xs:ml-0 w-[270px] sm:w-full
    '>
      <div className='bg-amber-200 p-10 rounded-2xl  '>
        <form className='flex flex-col   sm:grid grid-cols-2 gap-5 sm:w-[300px] md:w-[500px]'  onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2 mt-4'>
            <Label>Name:</Label>
            <Input type="text" {...register("name")} />
            {errors.name && <div className='text-red-500 text-sm'>{errors.name?.message}</div>}
            <Label>Price:</Label>
            <Input type="text" {...register("price")} />
            {errors.price && <div className='text-red-500 text-sm'>{errors.price?.message}</div>}
            <Label>Description:</Label>
            <Input type="text" {...register("description")} />
            {errors.description && <div className='text-red-500 text-sm'>{errors.description?.message}</div>}
            <Label>Add Inquiry Questions:</Label>
            <Input type="text"  ref={inputRef} />
            <Button onClick={handleQuestion}className='bg-black text-white cursor-pointer'>Add</Button>
      
            <Label>Categories</Label>
            { type === "Product" ?
            <select id="" {...register("category")} className='border-1 border-black h-[40px] p-2'>
              <option value="Basic_Electricals">Basic Electricals</option>
              <option value="Construction_Essentials">Construction Essentials</option>
              <option value="Party_Essentials">Party Essentials</option>
              <option value="Food_Essentials">Food Essentials</option>
              <option value="Pharma_Essentials">Pharma Essentials</option>
              <option value="Apparels_Clothing_and_Garments">Apparels, Clothing and Garments</option>
              <option value="Electrical_Goods_and_Supplies">Electrical Goods and Supplies</option>
              <option value="Hospital_and_Medical_Equipment">Hospital and Medical Equipment</option>
              <option value="Industrial_Plants_Machinery_and_Equipment">Industrial Plants, Machinery and Equipment</option>
            </select> : <select {...register("category")} className=' h-[40px] border-1 border-black p-2'>
              <option value="Food_Event_Services">Food & Event Services</option>
              <option value="Beauty_Wellness">Beauty & Wellness</option>
              <option value="Home_Services">Home Services</option>
              <option value="Local_Services">Local Services</option>
              <option value="Errands_Delivery">Errands & Delivery</option>
              <option value="Miscellaneous_Services">Miscellaneous Services</option>
              <option value="Consultancy">Consultancy</option>
            

              
              </select>}
            {errors.category && <div className='text-red-500 text-sm'>{errors.category?.message}</div>}
            <select  id="" onChange={handletypeChnage} className='h-[40px] border-1 border-black p-2'>
              <option value="Product">Product</option>
              <option value="Service">Services</option>
            </select>
            <div className='mt-3 flex flex-col space-y-2.5'>
              <Label> Cover Page</Label>
              <Label htmlFor='coverimage' className='cursor-pointer'>Choose Your Cover Here</Label>
              <input
                type="file"
                accept="image/*"
                hidden
                id="coverimage"
                {...register("coverimage")}
              />
              {errors.coverimage  && <p className='text-xm text-rose-500'>The Cover Image cannot be empty</p>}

            </div>
            


          </div>
          <div className='flex flex-col gap-2 mt-4'>

            <Label>Quantity:</Label>
            <Input type="text" {...register("quantity")} />
            {errors.quantity && <div className='text-red-500 text-sm'>{errors.quantity?.message}</div>}
            <Label>Seller Name:</Label>
            <Input type="text" {...register("sellerName")} />
            {errors.sellerName && <div className='text-red-500 text-sm'>{errors.sellerName?.message}</div>}
           
           
            <Label>Special Message:</Label>
            <Input type="text" {...register("specialmsg")} />
            {errors.specialmsg && <div className='text-red-500 text-sm'>{errors.specialmsg?.message}</div>}
            <Label>Offers:</Label>
            <Input type="text" {...register("offers")} />
            {errors.offers && <div className='text-red-500 text-sm'>{errors.offers?.message}</div>}
            <Label>Contact:</Label>
            <Input type="text" {...register("contact")} />
            {errors.offers && <div className='text-red-500 text-sm'>{errors.offers?.message}</div>}
          </div>
          <div className='flex flex-row gap-2 xs:ml-3 sm:ml-20 xl:ml-36'>
            <Button type="submit" className=' bg-black text-amber-50 cursor-pointer h-[40px] w-[100px]'>Submit</Button>
            <Button className=' bg-black text-amber-50 cursor-pointer  h-[40px] w-[100px]' onClick={() => reset()}>Reset</Button>
          </div>
         
        </form>
      </div>
    </div>
  )
}

export default Product