"use client";
import React, { useEffect, useState } from 'react';
import { Transaction } from '@/AppComponent/Xtras';
import { Button } from '@/Components/ui/button';
import { FcAlarmClock } from "react-icons/fc";
import { Initials } from '@/AppComponent/redux';
import { FinanceNotes } from '@/AppComponent/Xtras';
import { getallDealers } from '@/lib/functions';
import { Dealer } from '@/AppComponent/Dealer';
import { FaCrown } from "react-icons/fa";
import { getTransaction } from '@/lib/functions';
import axios from 'axios';
import RemainderForm from '@/AppComponent/Remainderform';
import {
    DailyIncome,
    DailyExpenditure,
    MonthlyIncome,
    MonthlyExpenditure,
    WeeklyIncome,
    WeeklyExpenditure,
  } from "@/AppComponent/MyCharts"; // adjust path
import { setFinanceState } from '@/AppComponent/redux';
import { SetMessages } from '@/AppComponent/Xtras';
import { useDispatch, useSelector } from 'react-redux';
interface FinanceData {
    budget: number;
    expenditure: number;
    income: number;
}
interface Transactions {
    id: string;
    createdAt: Date;
    amount: number;
    type: string;
    dealer: string;
}

const page = () => {
    const [type, setType] = useState("");
    const [transaction, showtransaction] = useState(false);

    const [showRemainder, setShowRemainder] = useState(false);
    const [showFinanceNotes, setshowFinanceNotes] = useState(false);
    const [isVerfied, setisVerfied] = useState(true);
    const [showsetMessages, setshowsetMessages] = useState(false);
    const [netIncome, setnetIncome] = useState(false);
    const [financeData, setfinanceData] = useState<FinanceData>();
    const [typeofChart, settypeofChart] = useState("Net Income");
    const [activeDuration, setactiveDuration] = useState("Daily");
    const [dealer, setDealer] = useState<Dealer[]>([]);
    const [transactions, setTransactions] = useState<Transactions[]>([]);
    const dispatch = useDispatch();

    const projectid = useSelector((state: { User: Initials }) => state.User.activeProject);
    const token = useSelector((state: { User: Initials }) => state.User.token);
    const financeState = useSelector((state: { User: Initials }) => state.User.isVerifiedFinance);

    const setTransaction = (name: string) => {
        setType(name);
        showtransaction(!transaction);
    };

    async function fetchFinanceData() {
        try {

            const response = await axios.get(`http://localhost:3400/api/finance?projectid=${projectid}`);

            console.log("Data received:", response.data);
            setfinanceData(response.data.data);

        } catch (error) {
            console.error("Error fetching finance data:", error);
        }
    }

    const dealerSpending = [
        { dealer: "Dealer A", amount: 12000 },
        { dealer: "Dealer B", amount: 8500 },
        { dealer: "Dealer C", amount: 9500 },
        { dealer: "Dealer D", amount: 15000 },
        { dealer: "Dealer E", amount: 6700 },
    ];

    const sortedAscending = dealerSpending.sort((a, b) => a.amount - b.amount);



    let balance = financeData?.budget! + financeData?.income! - financeData?.expenditure!;
    const isNegative = balance.toString().startsWith("-");
    useEffect(() => {
        if(financeState === false){
            window.location.href = '/verifympin';
        }
        fetchFinanceData();
        getallDealers(token as string).then((data) => {
            setDealer(data);
        });
        getTransaction(projectid as string, token as string).then((data) => {
            console.log(data.data.data);
            setTransactions(data.data.data);
        });


        return () => {
            dispatch(setFinanceState(false));
            
        }



    }, []);

    return (
        <div className='bg-gray-900 min-h-screen flex flex-col relative w-full'>
            <div className='flex flex-row w-full'>
                <div className="flex flex-col gap-10 w-[200px] h-full mt-10 ml-10">
                    <div className="w-[160px] h-[400px] bg-white rounded-3xl cursor-pointer"></div>
                    <div className="w-[160px] h-[400px] bg-gray-50 rounded-3xl cursor-pointer"></div>
                </div>
                <div className='w-full h-full flex flex-col'>
                    <div className='w-full h-[150px] flex flex-row justify-between text-white'>
                        <div className='mt-8 ml-5'>
                            <h1 className='text-3xl font-bold font-sans'>Project Budget</h1>
                            <h2>₹ {financeData?.budget}</h2>
                        </div>
                        <div className='flex flex-row space-x-12 h-[60px] align-middle mt-10'>
                            <button className="bg-black cursor-pointer w-[180px] rounded-xl text-xl">Akash</button>
                            <button className="bg-black cursor-pointer w-[180px] rounded-xl text-xl">Gupta</button>
                            <button className="bg-black cursor-pointer w-[180px] rounded-xl text-xl">Generate Report</button>
                        </div>
                        <div>
                            <div className='w-[200px] h-[60px] cursor-pointer mt-10 mr-5 bg-amber-200 flex flex-row'>
                                <img src="/construction/human.png" alt="human" className="w-[50px] h-[50px] mt-1 ml-2" />
                                <div className='flex flex-col'>
                                    <h2 className='text-lg ml-4 text-teal-700'>Ad Dudner</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                    <div className='flex flex-col'>
                        <div className='flex flex-row gap-2 border-2 border-white'>
                            <div className='w-[780px] h-[410px] border-2 border-white'>
                                <div className='flex flex-row'>
                                    <div className='w-[350px] h-[360px] rounded-3xl mt-3 ml-10'>
                                        <div className="h-2/5 mt-1 bg-white rounded-2xl">
                                            <h2 className='text-2xl font-bold ml-10'>Available Balance</h2>
                                            <p className='text-5xl mt-8 ml-8 font-extrabold flex flex-row'>{isNegative ? <><p className='text-red-500'>Rs. {balance}</p></> : <>₹ {balance}</>}</p>
                                        </div>
                                        <div className="h-3/5 mt-2 bg-white rounded-2xl"></div>
                                    </div>
                                    <div className='w-[340px] h-[360px] rounded-3xl mt-3 ml-4'>
                                        <div className="h-1/2 mt-1 bg-white rounded-2xl">
                                            <h2 className='text-2xl font-bold ml-10'>Total Spending</h2>
                                            <span className='text-5xl  font-bold flex items-center justify-center mt-8'><span>₹</span>{financeData?.expenditure}</span>
                                        </div>
                                        <div className="h-1/2 mt-3 bg-white rounded-2xl">
                                            <h2 className='text-2xl font-bold ml-10'>Total Income</h2>
                                            <span className='text-5xl  font-bold flex items-center justify-center mt-8'><span>₹</span>{financeData?.income}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='space-y-3'>
                                <div className='w-[300px] h-[130px] border-2 border-white flex flex-row cursor-pointer' onClick={() => setShowRemainder(!showRemainder)}>
                                    <FcAlarmClock size={50} className='ml-7 mt-4' />
                                    <h3 className='text-white font-serif text-xl mt-5 ml-2'>Set Reminder for Installments</h3>
                                </div>



                                <div className='w-[300px] h-[130px] border-2 border-white flex flex-row cursor-pointer' onClick={() => setshowsetMessages(!showsetMessages)}>
                                    <h2 className='text-white font-serif text-xl mt-5 ml-2 flex flex-row'>Schedule WhatsApp and Email Messages to Customers and Suppliers <span className='mr-3'><FaCrown size={40} fill='#FFD700' /></span></h2>
                                </div>

                                <div className='w-[300px] h-[130px] border-2 border-white flex flex-row cursor-pointer' onClick={() => setshowFinanceNotes(!showFinanceNotes)}>
                                    <h2 className='text-white font-serif text-xl mt-5 ml-2'>Finance Notes</h2>
                                </div>
                            </div>

                            {showFinanceNotes && (
                                <div className='absolute z-40'>
                                    <FinanceNotes />
                                </div>
                            )};

                           
                            {showRemainder && (
                                <div className='absolute top-[250px] left-2/5 z-40'>
                                    <RemainderForm dealer={dealer} />
                                </div>
                            )}
                            {
                                showsetMessages && (
                                    <div className='absolute top-1/6 left-2/5'>
                                        <SetMessages />
                                    </div>

                                )
                            }
                            <div className='w-[240px] border-2 border-white ml-2 h-[240px] overflow-auto'>
                                <h2 className='text-white text-xxl'>Transaction By Dealers</h2>
                                <div>
                        {transactions.length > 0 && transactions!.map((transaction: Transactions, index) => (
                            <div key={index}>
                                <p className='text-white flex flex-row justify-between p-2'>{transaction.dealer}<span>{transaction.amount}</span></p>
                            </div>

                        ))}
                    </div>
                            </div>

                            <div className='flex flex-row ml-auto'>
                                <h1 className='text-white border-2 border-white ml-auto mr-10 w-[300px] h-[160px] grid grid-rows-3 rounded-2xl'>
                                    <strong className='text-xl m-auto'>Record Transaction</strong>
                                    <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-[80%] m-auto cursor-pointer" onClick={() => setTransaction("Debit")}>Debit</Button>
                                    <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-[80%] m-auto cursor-pointer" onClick={() => setTransaction("Credit")}>Credit</Button>
                                </h1>
                            </div>
                        </div>

                        {transaction && <Transaction type={type} state={transaction} setState={showtransaction} />}
                    </div>
                    <div>

                        <div className=' w-[400px] h-[40px] flex  gap-2 justify-evenly ml-30 cursor-pointer mt-3'>
                            <Button className="bg-pink-500 hover:bg-pink-700 w-[120px] h-[50px] cursor-pointer" onClick={() => setactiveDuration("Monthly")}>Monthly</Button>
                            <Button className="bg-pink-500 hover:bg-pink-700 w-[120px] h-[50px] cursor-pointer" onClick={() => setactiveDuration("Weekly")}>Weekly</Button>
                            <Button className="bg-pink-500 hover:bg-pink-700 w-[120px] h-[50px] cursor-pointer" onClick={() => setactiveDuration("Daily")}>Daily</Button>

                            <select name="" id="type" className='bg-white h-[50px] border-solid ' onChange={(e) => settypeofChart(e.target.value)}
                            > <option value="">Choose Chart</option>
                                <option value="Income">Income</option>
                                <option value="Expenditure">Expenditure</option>
                            
                            </select>



                        </div>
                      
                      
                        {
                            typeofChart === "Income" && (
                                <div className='w-[800px] h-[200px] mt-6 z-0'>
                                    <div className={`${activeDuration === "Monthly" ? "block" : "hidden"}`}><MonthlyIncome /></div>
                                    <div className={`${activeDuration === "Daily" ? "block" : "hidden"}`}><DailyIncome /></div>
                                    <div className={`${activeDuration === "Weekly" ? "block" : "hidden"}`}><WeeklyIncome /></div>
                                </div>


                            )
                        }
                        {
                            typeofChart === "Expenditure" && (
                                <div className='w-[800px] h-[200px] mt-6 z-0'>
                                    <div className={`${activeDuration === "Monthly" ? "block" : "hidden"} h-full`}><MonthlyExpenditure/></div>
                                    <div className={`${activeDuration === "Daily" ? "block" : "hidden"}`}><DailyExpenditure /></div>
                                    <div className={`${activeDuration === "Weekly" ? "block" : "hidden"}`}><WeeklyExpenditure/></div>
                                </div>


                            )
                        } 

                    </div>
                </div>

            </div>
        </div>
    );
};

export default page;
