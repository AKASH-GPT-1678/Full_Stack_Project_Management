"use client";
import React from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import axios from "axios";
import { useSelector } from "react-redux";
import { Initials } from "../redux/redux";

export const InventoryForm = () => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [value, setValue] = React.useState('');
    const [valuePerPiece, setValuePerPiece] = React.useState('');
    const [available, setAvailable] = React.useState(false);
    const token = useSelector((state: { User: Initials }) => state.User.token);
    const projectId = useSelector((state: { User: Initials }) => state.User.activeProject);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;

    const createInventory = async () => {
        const InventoryObject = { name: name, description: description, value: value, valuePerPiece: valuePerPiece, available: available }

        const isEmpty = Object.values(InventoryObject).every(value => {

            return value === '' || value === null || value === undefined;
        });
        if (isEmpty) {
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





    return (
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