"use client";
import React from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { Initials } from "../redux/redux";
import { z } from "zod";
export const SetMessages = () => {

    const msgSchema = z.object({
        email: z.string().email().min(1, { message: "Email is required" }),
        phonenum: z.string().min(1, { message: "Phone number is required" }),
        datetime: z.string().min(1, { message: "Date and time is required" }),
        type: z.enum(["Email", "Whatsapp"]),
        message: z.string().min(1, { message: "Message is required" }),
    });
    type MsgType = z.infer<typeof msgSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<MsgType>({
        defaultValues: {
            email: '',
            phonenum: '',
            datetime: '',
            type: 'Email',
            message: '',
        }
    });


    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    const projectid = useSelector((state: { User: Initials }) => state.User.activeProject)

    const saveMessage = async (data: MsgType) => {
        const dateee = new Date(data.datetime).toLocaleString();
        const finaldata = {
            ...data,
            datetime: dateee


        }


        try {

            const response = await axios.post(`${Key_Url}api/setmessage/${projectid}`, finaldata);
            console.log(response)
            console.log(msgSchema)

        } catch (error) {
            console.log(error)

        }
    };

    const onSubmit: SubmitHandler<MsgType> = (data) => saveMessage(data);
    return (
        <div className="relative ">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-[500px] h-[500px] bg-white border-2 border-black absolute rounded-3xl ">
                    <div className="flex flex-col gap-5 ml-30 mt-10">
                        <Input type="email" placeholder="Email" className="w-[250px] h-[40px] mr-5" {...register('email')} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        <Input type="tel" placeholder="Phone Number" className="w-[250px] h-[40px]" {...register('phonenum')} />
                        {errors.phonenum && <p className="text-red-500 text-sm">{errors.phonenum.message}</p>}
                        <Input type="text" placeholder="DD-MM-YYYY      Time" className="w-[250px] h-[40px]" {...register('datetime')} />
                        {errors.datetime && <p className="text-red-500 text-sm">{errors.datetime.message}</p>}
                        <select id="type" className="w-[250px] h-[40px]" {...register('type')}>
                            <option value="" className="h-[30px]">Choose Message type</option>
                            <option value="Email" className="h-[30px]">Email</option>
                            <option value="Whatsapp" className="h-[30px]">Whatsapp</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                        <textarea id="message" className="w-[250px] h-[140px] border-2 border-black p-2" maxLength={100} {...register('message')}></textarea>
                        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                        <Button className="w-[250px] h-[40px] bg-black text-white cursor-pointer" type="submit">Submit</Button>

                    </div>

                </div>
            </form>
        </div>

    )
}