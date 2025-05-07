"use client";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm, SubmitHandler, Form } from "react-hook-form";
import { useState ,useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Initials } from "./redux";
import { Dealer } from "./Dealer";
import { z } from "zod";
import { getallDealers } from "@/lib/functions";
type TransactionForm = {
    amount: string;
    gstrate: string;
    dealer: string;
    proof: FileList;
    type: string;
    status: string;
};

interface TransactionProps {
    type: string;
    state :boolean;
    setState : React.Dispatch<React.SetStateAction<boolean>>
}

export const Transaction: React.FC<TransactionProps> = ({ type ,state ,setState }) => {
    const [isCustomDealer, setIsCustomDealer] = useState(false);
    const [customDealerName, setCustomDealerName] = useState("");
    const [customDealerEmail ,setCustomDealerEmail] = useState("");
    const [Dealers, setDealer] = useState<Dealer[]>([]);
    const token = useSelector((state: { User: Initials }) => state.User.token);

    

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TransactionForm>({
        defaultValues: {
            amount: "",
            gstrate: "0",
            dealer: "",
            type: type,
            status: "",
            proof: undefined,
        },
    });

    const selectedDealer = watch("dealer");
    const projectid = useSelector((state: { User: Initials }) => state.User.activeProject)

    const Senddata = async (data: TransactionForm) => {
        try {
            const response = await axios.post(`http://localhost:3400/api/upload?projectid=${projectid}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log(response.data);
            if(response.data.message == "Transaction recorded successfully"){
                setState(false)
            }
        } catch (error) {
            console.log(error)

        }
    }

    const onSubmit: SubmitHandler<TransactionForm> = (data) => {
        // Handle custom dealer
        if (selectedDealer === "New" && customDealerName) {
            data.dealer = customDealerName;
        };

        const formdata = new FormData();
        formdata.append("amount", data.amount);
        formdata.append("gstrate", data.gstrate);
        formdata.append("dealer", data.dealer);
        if (data.proof) {
            formdata.append("proof", data.proof?.[0]);
        }
        formdata.append("type", data.type);
        formdata.append("status", data.status);







        Senddata(formdata as any);
    };


    useEffect(() => {
            getallDealers(token as string).then((data) => {
                            setDealer(data);
                        });
        
    
    }, []);

    return (
        <div
            className={`w-[280px] rounded-2xl ${isCustomDealer ? "h-[600px]" : "h-[520px]"
                } bg-white absolute top-1/4 left-2/4 shadow-2xl p-4`}
        >
            <strong className="block text-center italic text-2xl mb-4">{type}</strong>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <Label>Enter Amount</Label>
                    <Input
                        type="number"
                        placeholder="Enter Amount"
                        {...register("amount", { required: true })}
                    />
                    {errors.amount && <p className="text-red-500 text-sm">Amount is required</p>}
                </div>

                <div>
                    <Label>Enter GST %</Label>
                    <select {...register("gstrate", { valueAsNumber: true })} className="w-full h-10 mt-1">
                        <option value={0}>0%</option>
                        <option value={0.05}>5%</option>
                        <option value={0.12}>12%</option>
                        <option value={0.18}>18%</option>
                        <option value={0.28}>28%</option>
                    </select>
                </div>

                <div>
                    <Label>Transaction With</Label>
                    <select
                        {...register("dealer", {
                            required: true,
                            onChange: (e) => {
                                setIsCustomDealer(e.target.value === "New");
                            },
                        })}
                        className="w-full h-10 mt-1"
                    >
                        <option value="">Choose Dealer</option>
                        {Dealers.map((dealer, index) => (
                            <option key={index} value={dealer.name!}>
                                {dealer.name}
                            </option>
                        ))}
                    </select>
                    {errors.dealer && <p className="text-red-500 text-sm">Please choose a dealer</p>}
                </div>

                {isCustomDealer && (
                    <div className="flex flex-col gap-2">
                        <Label>Enter New Dealer</Label>
                        <Input
                            type="text"
                            placeholder="New Dealer Name"
                            value={customDealerName}
                            onChange={(e) => setCustomDealerName(e.target.value)}
                        />
                        <Input type="email" placeholder="Enter Dealer Email" value={customDealerEmail}  onChange={(e) => setCustomDealerEmail(e.currentTarget.value)}></Input>
                    </div>
                )}

                <div>
                    <Label>Status</Label>
                    <select {...register("status", { required: true })} className="w-full h-10 mt-1">
                        <option value="">Select Status</option>
                        <option value="Success">Success</option>
                        <option value="Pending">Pending</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm">Status is required</p>}
                </div>

                <div>
                    <Label htmlFor="proof">Upload Proof</Label>
                    <input
                        type="file"
                        id="proof"
                        accept="image/*,.pdf,.doc,.docx,.xlsx,jpeg,png,jpg"
                        {...register("proof", { required: true })}
                        className="mt-2"
                    />
                    {errors.proof && <p className="text-red-500 text-sm">Proof is required</p>}
                </div>

                <Button type="submit" className="mt-2 text-black hover:text-white hover:bg-black">
                    Submit
                </Button>
            </form>
        </div>
    );
};


export const FinanceNotes = () => {
     interface FinanceNote {
        id: string;
        title: string;
        content: string;
        type: 'Finance'; 
        createdAt: string; 
        financeId: string;
      }
      
    const financeid = useSelector((state: { User: Initials }) => state.User.activeProject);
    const token = useSelector((state: { User: Initials }) => state.User.token);
    const [notes, setNotes] = useState("");
    const [savedNotes, setSavedNotes] = useState<FinanceNote[]>([]);   
    const [mode ,setMode] = useState("view");
    let Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    const saveNotes = async () => {

        try {
          
            const data = await axios.post(`${Key_Url}api/savenotes/${financeid}`, { content: notes }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data);
            return data

        } catch (error) {

            console.error(error);
        }
    }

    
    const getFinanceNotes = async () => {
        try {
            const data = await axios.get(`${Key_Url}api/getfnotes/${financeid}`);
            console.log(data);
            setSavedNotes(data.data.notes);
            return data
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getFinanceNotes();
    },[])
    return (
        <div className="absolute bg-white ml-96 rounded-2xl">
            <div className="w-[800px] h-[600px] rounded-2xl flex flex-row align-middle ">
                <div className="w-[20%] h-full ">
                    <h2 className="h-[50px] flex items-center justify-center text-xl font-bold bg-blue-50 mt-20 cursor-pointer" onClick={() => setMode("view")}>View Notes</h2>
                    <h2 className="h-[50px] flex items-center justify-center text-xl font-bold bg-blue-50 cursor-pointer" onClick={() => setMode("create")}>Create Notes</h2>
                </div>
                <div className="w-[80%] h-full  flex flex-col items-center">
                    {mode === "create" && (
                        <div>
                                     <textarea name="" id="" className="w-[600px] h-[400px] mt-20 border-1 p-5 border-black" maxLength={400} onChange={(e) => setNotes(e.target.value)} ></textarea>
                                     <Button className="w-[400px] h-[60px] bg-black text-white mt-2 cursor-pointer flex justify-center" onClick={saveNotes}>Save My Note</Button>

                        </div>
                    )}
                    {mode === "view" && (
                       <div className="flex flex-col items-center mt-10 overflow-y-scroll ">
                       {savedNotes.map((note, index) => (
                         <div
                           key={index}
                           className="w-[600px] min-h-[140px] p-6 mt-8 border border-gray-300 rounded-xl shadow-sm bg-white"
                         >
                           <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
                           <p className="text-gray-600 mb-4">{note.content}</p>
                           <p className="text-sm text-gray-400">
                             Created on: {new Date(note.createdAt).toLocaleDateString()}
                           </p>
                         </div>
                       ))}
                     </div>
                     
                    )}

           
                </div>

            </div>
        </div>
    )
}

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


    let Keyurl = process.env.NEXT_PUBLIC_Endpoint;
    const projectid = useSelector((state: { User: Initials }) => state.User.activeProject)

    const saveMessage = async (data: MsgType) => {
        let dateee = new Date(data.datetime).toLocaleString();
        const finaldata = {
            ...data,
            datetime: dateee


        }


        try {

            const response = await axios.post(`${Keyurl}api/setmessage/${projectid}`, finaldata);
            console.log(response)

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

export const InventoryForm =() =>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [valuePerPiece, setValuePerPiece] = useState('');
    const [available, setAvailable] = useState(false);
    const token = useSelector((state : {User : Initials}) => state.User.token);
    const projectId = useSelector((state : {User : Initials}) => state.User.activeProject);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    
const createInventory = async () => {
    const InventoryObject =    {name : name ,description : description , value : value ,valuePerPiece : valuePerPiece , available : available}

    const isEmpty = Object.values(InventoryObject).every(value => {
        
        return value === ''  || value === null || value === undefined;
      });
      if(isEmpty){
        return;
      }
    try {
      const response = await axios.post(
        `${Key_Url}api/createinventory/${projectId}`,
        InventoryObject,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error creating inventory:', error);
      throw error;
    }
  };



  
  
    return(
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <form onSubmit={createInventory} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Total Value</label>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter total value"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Value per Piece</label>
          <Input
            type="number"
            value={valuePerPiece}
            onChange={(e) => setValuePerPiece(e.target.value)}
            placeholder="Enter value per piece"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          <label className="text-sm font-medium text-gray-700">Available</label>
        </div>

        <Button type="submit" className="w-full">
          Save Inventory
        </Button>
      </form>
    </div>

    
    )
}


