"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Initials } from './redux';
import { Button } from '@/Components/ui/button';
import { fetchBuyerOrders } from './Fetchorder';
import { InventoryForm } from './Xtras';


interface InventoryItem {
    id: string;
    projectid: string;
    name: string;
    description: string;
    value: string;
    valueperpeice: string | null;
    available: boolean;
    stock: number | null;
    createdAt: string;
}

interface Products {
    category: string | null;
    contact: string | null;
    name: string;
    pricee: number | null;
    sellerName: string;
    sellerid: string | null;
}
interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    imageurl: string;
    rating: number | null;
  }
  
  interface WishlistApiResponse {
    message: string;
    data: { Product: Product }[];
  }
  
interface Item {
    id: string;
    product: Products[];
}

const Inventory = () => {
    const [Item, setItem] = useState<InventoryItem[]>([]);
    const [WishList, setwishList] = useState<Product[]>([]);
    const [active, setactive] = React.useState("Stocks");
    const [Items, setItems] = useState<Item[]>([]);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    const [invenTory, setInventory] = useState(false);
    const token = useSelector((state: { User: Initials }) => state.User.token);
    const projectid = useSelector((state: { User: Initials }) => state.User.activeProject);

    const getInventory = async () => {
        try {
            const response = await axios.get(`${Key_Url}api/getinventory/${projectid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setItem(response.data.data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const getWishList = async ()  => {
        try {
            const response = await axios.get(`${Key_Url}api/getwishlist`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setwishList(response.data.data);
          
        } catch (error) {
            console.log(error);
        }
    };

    const loadBuyerOrder = async () => {
        const data = await fetchBuyerOrders(token as string);
        setItems(data);
    };

    useEffect(() => {
        getInventory();
        getWishList();
        loadBuyerOrder();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
             
                <div className="md:w-1/5 w-full bg-white p-4 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
                    <select
                        className="w-full p-2 mb-4 border rounded-md"
                        onChange={(e) => setactive(e.target.value)}
                    >
                        <option value="Stocks">Stocks</option>
                        <option value="Orders">Orders</option>
                        <option value="Wishlist">Wishlist</option>
                    </select>
                    <Button
                        className="bg-blue-600 w-full text-white h-12"
                        onClick={() => setInventory(!invenTory)}
                    >
                        Add Stocks
                    </Button>
                    {invenTory && <div className="mt-4"><InventoryForm /></div>}
                </div>

            
                <div className="md:w-3/5 w-full space-y-6 overflow-auto max-h-[90vh] pr-2">
                    {active === "Stocks" && (
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Inventory</h3>
                            {Item.map((product) => (
                                <div key={product.name} className="bg-white p-4 mb-4 rounded-xl shadow-md">
                                    <h4 className="text-lg font-semibold">{product.name}</h4>
                                    <p className="text-gray-700">Category: {product.stock}</p>
                                    <p className="text-gray-700">Price: ₹{product.value}</p>
                                    <p className="text-gray-700">Stock per piece: {product.valueperpeice}</p>
                                    <p className="text-gray-700">Description: {product.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {active === "Orders" && (
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Orders</h3>
                            {Items.flatMap((item) => item.product).map((product ) => (
                                <div key={product.name} className="bg-white p-4 mb-4 rounded-xl shadow-md">
                                    <h4 className="text-lg font-semibold">{product.name}</h4>
                                    <p className="text-gray-700">Category: {product.category}</p>
                                    <p className="text-gray-700">Price: ₹{product.pricee}</p>
                                    <p className="text-gray-700">Seller: {product.sellerName}</p>
                                    <p className="text-gray-700">Contact: {product.contact}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {active === "Wishlist" && (
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Wishlist</h3>
                            {WishList.map((product, index) => (
                                <div key={index} className="bg-white p-4 mb-4 rounded-xl shadow-md">
                                    <h4 className="text-lg font-semibold">{product.name}</h4>
                                    <p className="text-gray-700">Price: ₹{product.price}</p>
                                    <p className="text-gray-700">Description: {product.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Right (Optional Wishlist Display) */}
                <div className="md:w-1/4 w-full bg-white p-4 rounded-xl shadow-md overflow-y-auto max-h-[90vh]">
                    <h3 className="text-xl font-semibold mb-4">Quick Wishlist</h3>
                    {WishList.map((product, index) => (
                        <div key={index} className="bg-gray-50 p-3 mb-3 rounded-lg shadow-sm">
                            <h4 className="text-md font-medium">{product.name}</h4>
                            <p className="text-sm text-gray-600">₹{product.price}</p>
                          
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Inventory;
