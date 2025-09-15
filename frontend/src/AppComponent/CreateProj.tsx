"use client";
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label";
import React from "react"
import { z } from "zod";
import { createProject, Initials } from "./redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";

export const CreateProject = () => {
    const [preview, setPreview] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);



    const projectSchema = z.object({
        name: z.string().min(1, "Project name is required"),
        description: z.string().min(1, "Description is required"),
        category: z.string().min(1, "Category is required"),
        cover: z.instanceof(File).optional(),
        mpin: z.string().min(6, "MPIN with the Length of 6 is Required").max(6, "MPIN with the Length of 6 is Required"),
    });

    type Project = z.infer<typeof projectSchema>;

    const dispatch = useDispatch();
    const token = useSelector((state: { User: Initials }) => state.User.token);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<Project>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            mpin: ""
        }
    });

    const watchedValues = watch();
    const isFormValid = watchedValues.name &&
        watchedValues.description &&
        watchedValues.category;


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("cover", file);
            setPreview(URL.createObjectURL(file));
        }
    };


    const onSubmit: SubmitHandler<Project> = async (data) => {
        setIsSubmitting(true);
        const category = data.category.replace(" ", "_");
        console.log(category)

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("category", category);
            formData.append("mpin", data.mpin);
            console.log(Key_Url);


            if (data.cover) {
                formData.append("cover", data.cover);
            }



            const response = await axios.post(
                `${Key_Url}api/project`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            console.log("Project created successfully:", response.data);


        } catch (error) {
            console.error("Error creating project:", error);
            // Handle error (show error message)
        } finally {
            setIsSubmitting(false);
            dispatch(createProject());


        }
    };


    const projectCategories = [
        "Event Management",
        "Construction Projects",
        "Software Development",
        "Marketing Campaigns",
        "Corporate Projects",
        "Others"
    ];

    return (
        <div className="space-y-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">Create New Project</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Project Name */}
                <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Project Name</Label>
                    <Input
                        id="name"
                        {...register("name")}
                        placeholder="Enter project name"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500">{errors.name.message}</p>
                    )}
                </div>

         
                <div className="space-y-1.5">
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                    <Input
                        id="description"
                        {...register("description")}
                        placeholder="Enter project description"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.description && (
                        <p className="text-xs text-red-500">{errors.description.message}</p>
                    )}
                </div>

                {/* Finance MPIN */}
                <div className="space-y-1.5">
                    <Label htmlFor="financempin" className="text-sm font-medium text-gray-700">Choose MPIN for Finance</Label>
                    <Input
                        id="financempin"
                        {...register("mpin")}
                        placeholder="Enter MPIN for Finance"
                        maxLength={6}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.mpin && (
                        <p className="text-xs text-red-500">{errors.mpin.message}</p>
                    )}
                </div>

             
                <div className="space-y-1.5">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category</Label>
                    <select
                        id="category"
                        {...register("category")}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select category
                        </option>
                        {projectCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className="text-xs text-red-500">{errors.category.message}</p>
                    )}
                </div>


               
                <div className="space-y-1.5">
                    <Label htmlFor="cover" className="text-sm font-medium text-gray-700">Cover Image</Label>
                    <Input
                        id="cover"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.cover && (
                        <p className="text-xs text-red-500">{errors.cover.message}</p>
                    )}

                    {preview && (
                        <div className="mt-3">
                            <p className="text-xs text-gray-600 mb-1">Image Preview:</p>
                            <Image
                                src={preview}
                                alt="Preview"
                                className="w-full max-h-64 object-cover rounded-md shadow-sm border"
                                width={500}
                                height={500}
                            />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors"
                >
                    {isSubmitting ? "Creating..." : "Create Project"}
                </Button>
            </form>
        </div>

    );
};