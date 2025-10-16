"use client";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Initials } from "../redux/redux";
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
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>
}
interface Supplier {
    id: string;
    name: string;
    email: string;
}


export const Transaction: React.FC<TransactionProps> = ({ type, setState }) => {
    const [isCustomDealer, setIsCustomDealer] = useState(false);
    const [customDealerName, setCustomDealerName] = useState("");
    const [customDealerEmail, setCustomDealerEmail] = useState("");
    const [Dealers, setDealer] = useState<Supplier[]>([]);
    const token = useSelector((state: { User: Initials }) => state.User.token);



    const {
        register,
        handleSubmit,

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
            if (response.data.message == "Transaction recorded successfully") {
                setState(false)
            }
        } catch (error) {
            console.log(error)

        }
    }

    const onSubmit: SubmitHandler<TransactionForm> = (data) => {

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


    }, [token]);

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
                        {Dealers?.map((dealer, index) => (
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
                        <Input type="email" placeholder="Enter Dealer Email" value={customDealerEmail} onChange={(e) => setCustomDealerEmail(e.currentTarget.value)}></Input>
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