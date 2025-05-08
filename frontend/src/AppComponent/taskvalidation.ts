import { string, z } from 'zod';



const curretdate = new Date();
const tenyearlater = new Date();
const maxdate = tenyearlater.setFullYear(curretdate.getFullYear() + 10)
export const taskformSchema = z.object({
    task: z.string().nonempty({ message: "The Task cannot be empty " }).min(10, { message: "The Message cannot be less than of 10 words " }),
    team: z.array(z.string()),
    amount: z.string().or(z.number()).optional(),
    description: z.string().nonempty({ message: "The description cannot be empty " }).min(40, { message: "The description cannot be less than 40 words " }),
    suppliers: z.array(z.string()),
    subtasks: z.array(z.string()),
    inventories: z.array(z.string()),
    startdate: z.date().min(new Date(), { message: "Thd date cannot be in past" }).or(string().regex(/^\d+$/, { message: "Only digits (0-9) are allowed" })),
    deadline: z.date().max(new Date(maxdate)).min(new Date(), { message: "Thd date cannot be in past" }).or(string().regex(/^\d+$/, { message: "Only digits (0-9) are allowed" })),
    teamlead: z.string().optional(),
    priority: z.string().or(z.number())




})



export type Task = {
    id ?: string;
    task: string;
    amount?: string | number;
    startdate: string;
    deadline: string;
    description: string;
    priority: string;
    teamlead?: string;
    team: string[];
    suppliers: string[];
    subtasks: string[];
    inventories: string[];
    status: boolean;


}

export interface TaskSchema {
    task: string;                    
    team: string[];                 
    amount?: string | number;       
    description: string;            
    suppliers: string[];            
    subtasks: string[];            
    inventories: string[];          
    startdate: Date | string;       
    deadline: Date | string;        
    teamlead?: string;               
    priority: string | number;      
}



