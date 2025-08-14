"use client";
import React, { useEffect, useState } from 'react'
import { FaPlus, FaStar, FaShoppingBag, FaBox, FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import Product from './Product';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Initials } from './redux';
import Image from 'next/image';
import { Button } from '@/Components/ui/button';
import { UpdateInventory } from './ExtrasForms';
import { setProductid } from './redux';
import { fetchSellerOrders } from './Fetchorder';

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  rating: string;
  imageurl: string;
  quantity: string;
  type: string;
}

interface Products {
  id: string;
  imageurl: string;
  name: string;
  specialmsg: string | null;
}

interface SellerOrder {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  buyerContact: string;
  product: Products[];
}

const Sellerprofile = () => {
  const [addProduct, setadProduct] = React.useState(false);
  const Keyurl = process.env.NEXT_PUBLIC_Endpoint;
  const [data, setData] = useState<Product[]>([]);
  const [update, setUpdate] = useState(false);
  const [orders, setOrders] = useState<SellerOrder[]>([])
  const [activeTab, setActiveTab] = useState('catalogue');
  const token = useSelector((state: { User: Initials }) => state.User.token)
  const dispatch = useDispatch();

  const query = `query GetProducts($token: String!) {
    getProducts(token: $token) {
      id
      name
      price
      description
      rating
      imageurl
      quantity
      type
    }
  }`;

  const toggleButton = (productid: string) => {
    dispatch(setProductid(productid))
    setUpdate(!update)
  };

  const loadSellerOrder = async () => {
    const data = await fetchSellerOrders(token as string);
    setOrders(data)
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.post(`${Keyurl}graphql`, {
        query,
        variables: { token: `Bearer ${token}` }
      });
      console.log(response.data.data)
      setData(response.data.data.getProducts)
      return response
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchProducts()
    loadSellerOrder();
  }, [])

  // Calculate stats
  const totalProducts = data.length;
  const totalOrders = orders.length;
  const averageRating = data.length > 0 ? (data.reduce((sum, product) => sum + parseFloat(product.rating || '0'), 0) / data.length).toFixed(1) : '0';
  const totalRevenue = orders.reduce((sum, order) => {
    return sum + order.product.reduce((productSum, product) => {
      const productData = data.find(p => p.name === product.name);
      return productSum + (productData ? parseFloat(productData.price.replace('₹', '')) : 0);
    }, 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
              <p className="text-lg text-gray-600">Manage your products and orders</p>
            </div>
            <div className="flex gap-4">
              <Button 
                onClick={() => setadProduct(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 rounded-xl px-6 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <FaPlus className="mr-2" /> Add Product
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold">{totalProducts}</p>
              </div>
              <FaBox className="text-4xl text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold">{totalOrders}</p>
              </div>
              <FaShoppingBag className="text-4xl text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Average Rating</p>
                <p className="text-3xl font-bold flex items-center">
                  {averageRating} <FaStar className="ml-1 text-yellow-200" />
                </p>
              </div>
              <FaStar className="text-4xl text-yellow-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="text-4xl text-purple-200">💰</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'catalogue', label: 'Catalogue', icon: '📦' },
              { id: 'orders', label: 'Orders', icon: '🛍️' },
              { id: 'inventory', label: 'Inventory', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center font-semibold text-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

   
        {activeTab === 'catalogue' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Your Catalogue</h2>
              <span className="text-gray-600">{data.length} products</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           
              <div 
                onClick={() => setadProduct(true)}
                className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 min-h-[320px]"
              >
                <FaPlus className="text-4xl text-gray-400 mb-4" />
                <p className="text-gray-600 font-semibold">Add New Product</p>
              </div>

       
              {data.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <Image 
                      src={item.imageurl} 
                      alt={item.name} 
                      width={300} 
                      height={200} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="flex items-center text-sm font-semibold text-gray-700">
                        <FaStar className="text-yellow-500 mr-1" />
                        {item.rating}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">{item.name}</h3>
                    <p className="text-2xl font-bold text-green-600 mb-4">{item.price}</p>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700 rounded-lg py-2 text-sm font-semibold">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

  
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Recent Orders</h2>
              <span className="text-gray-600">{orders.length} orders</span>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaShoppingBag className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600">Orders will appear here once customers start purchasing</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order, index) => (
                  <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-gray-900">Order #{order.id.slice(-6)}</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Active
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <FaUser className="mr-2" />
                        <span className="font-medium">{order.buyerName}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaPhone className="mr-2" />
                        <span>{order.buyerContact}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaEnvelope className="mr-2" />
                        <span className="truncate">{order.buyerEmail}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Products:</h4>
                      {order.product.map((product, productIndex) => (
                        <div key={productIndex} className="flex items-center justify-between py-2">
                          <span className="text-gray-700">{product.name}</span>
                          <span className="font-semibold">
                            {data.find(p => p.name === product.name)?.price || 'N/A'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Inventory Management</h2>
              <span className="text-gray-600">{data.length} items</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200">
                  <Image 
                    src={item.imageurl} 
                    alt={item.name} 
                    width={300} 
                    height={200} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">{item.name}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-green-600">{item.price}</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <Button 
                      onClick={() => toggleButton(item.id)}
                      className="w-full bg-orange-600 text-white hover:bg-orange-700 rounded-lg py-2 font-semibold transition-all duration-200"
                    >
                      Update Stock
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

   
      {addProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Add New Product</h3>
              <Button 
                onClick={() => setadProduct(false)}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg px-4 py-2"
              >
                ✕
              </Button>
            </div>
            <div className="p-6">
              <Product />
            </div>
          </div>
        </div>
      )}

      {update && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Update Inventory</h3>
              <Button 
                onClick={() => setUpdate(false)}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg px-4 py-2"
              >
                ✕
              </Button>
            </div>
            <div className="p-6">
              <UpdateInventory />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sellerprofile