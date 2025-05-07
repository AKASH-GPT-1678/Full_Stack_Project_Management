"use client";
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Label } from "@/Components/ui/label";
import React, { useState, useEffect } from "react"
import { z } from "zod";
import { Initials } from "./redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createproject } from "./redux";
import axios from "axios";

export const CreateProj = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    

    const projectSchema = z.object({
        name: z.string().min(1, "Project name is required"),
        description: z.string().min(1, "Description is required"),
        category: z.string().min(1, "Category is required"),
        cover: z.instanceof(File).optional(),
        mpin : z.string().min(6, "MPIN with the Length of 6 is Required").max(6, "MPIN with the Length of 6 is Required"),
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
            mpin : ""
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
        const category = data.category.replace(" " , "_");
        console.log(category)
        
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("category", category);
            formData.append("mpin", data.mpin);
            
          
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
            dispatch(createproject());
            window.location.reload();
            
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
        <div className="space-y-6 p-4 bg-amber-300">
            <h1 className="text-xl font-bold">Create New Project</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                        id="name"
                        {...register("name")}
                        placeholder="Enter project name"
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        {...register("description")}
                        placeholder="Enter project description"
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500">{errors.description.message}</p>
                    )}
                </div>
                   
                <div className="space-y-2">
                    <Label htmlFor="financempin">Choose MPIN for Finance</Label>
                    <Input
                        id="financempin"
                        {...register("mpin")}
                        placeholder="Enter MPIN for Finance"
                        maxLength={6}
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500">{errors.description.message}</p>
                    )}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setValue("category", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {projectCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.category && (
                        <p className="text-sm text-red-500">{errors.category.message}</p>
                    )}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="cover">Cover Image</Label>
                    <Input
                        id="cover"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {errors.cover && (
                        <p className="text-sm text-red-500">{errors.cover.message}</p>
                    )}
                    
                    {preview && (
                        <div className="mt-2">
                            <p className="text-sm mb-1">Image Preview:</p>
                            <img 
                                src={preview} 
                                alt="Preview" 
                                className="w-full max-h-64 object-cover rounded-md" 
                            />
                        </div>
                    )}
                </div>
                
                <Button 
                    type="submit" 
                    disabled={!isFormValid || isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? "Creating..." : "Create Project"}
                </Button>
            </form>
        </div>
    );
};