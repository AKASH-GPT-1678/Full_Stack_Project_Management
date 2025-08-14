"use client";
import React from 'react';
import { Transaction } from '@/AppComponent/Xtras';
import { Button } from '@/Components/ui/button';
import { FcAlarmClock } from "react-icons/fc";
import { Initials } from '@/AppComponent/redux';
import { FinanceNotes } from '@/AppComponent/Xtras';
import { getallDealers } from '@/lib/functions';
import { Dealer } from '@/AppComponent/Dealer';
import { FaCrown } from "react-icons/fa";
import { getTransaction } from '@/lib/functions';
import Image from 'next/image';
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

const Finance = () => {
    const [type, setType] = React.useState("");
    const [transaction, showtransaction] = React.useState(false);

    const [showRemainder, setShowRemainder] = React.useState(false);
    const [showFinanceNotes, setshowFinanceNotes] = React.useState(false);
    const [showsetMessages, setshowsetMessages] = React.useState(false);
    const [financeData, setfinanceData] = React.useState<FinanceData>();
    const [typeofChart, settypeofChart] = React.useState("Net Income");
    const [activeDuration, setactiveDuration] = React.useState("Daily");
    const [dealer, setDealer] = React.useState<Dealer[]>([]);
    const [transactions, setTransactions] = React.useState<Transactions[]>([]);
    const dispatch = useDispatch();

    const projectid = useSelector((state: { User: Initials }) => state.User.activeProject);
    const token = useSelector((state: { User: Initials }) => state.User.token);
    const financeState = useSelector((state: { User: Initials }) => state.User.isVerifiedFinance);
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;

    const setTransaction = (name: string) => {
        setType(name);
        showtransaction(!transaction);
    };

    async function fetchFinanceData() {
        try {

            const response = await axios.get(`${Key_Url}api/finance?projectid=${projectid}`);

            console.log("Data received:", response.data);
            setfinanceData(response.data.data);

        } catch (error) {
            console.error("Error fetching finance data:", error);
        }
    }






    let balance = 0;
    if (financeData && financeData.budget != null && financeData.income != null && financeData.expenditure != null) {
        balance = financeData.budget + financeData.income - financeData.expenditure;
    }

    const isNegative = balance.toString().startsWith("-");
    React.useEffect(() => {
        if (financeState == false) {
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
    const handleShowRemainder = () => {
        if (!dealer) {
            alert("Add Dealers First");
            return;
        }
        setShowRemainder(!showRemainder);
    }

    return (
        <div className='bg-gray-900 min-h-screen flex flex-col relative w-full'>
            <div className='flex flex-col lg:flex-row w-full'>

                <div className='w-full h-full flex flex-col'>
                    <div className='w-full h-auto lg:h-[150px] flex flex-col lg:flex-row justify-between text-white'>
                        <div className='mt-8 ml-5'>
                            <h1 className='text-2xl sm:text-3xl font-bold font-sans'>Project Budget</h1>
                            <h2 className='text-lg sm:text-xl'>₹ {financeData?.budget}</h2>
                        </div>
                        <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-12 h-auto lg:h-[60px] items-center mt-6 lg:mt-10'>
                         
                            <button className="bg-black cursor-pointer w-[150px] sm:w-[180px] rounded-xl text-lg sm:text-xl py-4">Gupta</button>
                            <button className="bg-black cursor-pointer w-[150px] sm:w-[180px] rounded-xl text-lg sm:text-xl py-4">Generate Report</button>
                        </div>

                    </div>

                    <div className='flex flex-col xl:flex-row w-full'>
                        <div className='flex flex-col xl:flex-row gap-2 '>
                            <div className='w-full xl:w-[780px] h-auto xl:h-[410px]  '>
                                <div className='flex flex-col md:flex-row'>
                                    <div className='w-full md:w-[350px] h-auto md:h-[360px] rounded-3xl mt-3 md:ml-10'>
                                        <div className="h-auto md:h-2/5 mt-1 bg-white rounded-2xl p-3">
                                            <h2 className='text-xl sm:text-2xl font-bold'>Available Balance</h2>
                                            <p className='text-3xl sm:text-5xl mt-4 font-extrabold flex flex-row'>
                                                {isNegative ? (
                                                    <span className='text-red-500'>Rs. {balance}</span>
                                                ) : (
                                                    <>₹ {balance}</>
                                                )}
                                            </p>
                                        </div>
                                        <div className="h-[150px] md:h-3/5 mt-2 bg-white rounded-2xl"></div>
                                    </div>
                                    <div className='w-full md:w-[340px] h-auto md:h-[360px] rounded-3xl mt-3 md:ml-4'>
                                        <div className="h-auto md:h-1/2 mt-1 bg-white rounded-2xl p-3">
                                            <h2 className='text-xl sm:text-2xl font-bold'>Total Spending</h2>
                                            <span className='text-3xl sm:text-5xl font-bold flex items-center justify-center mt-4'>
                                                <span>₹</span>{financeData?.expenditure}
                                            </span>
                                        </div>
                                        <div className="h-auto md:h-1/2 mt-3 bg-white rounded-2xl p-3">
                                            <h2 className='text-xl sm:text-2xl font-bold'>Total Income</h2>
                                            <span className='text-3xl sm:text-5xl font-bold flex items-center justify-center mt-4'>
                                                <span>₹</span>{financeData?.income}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                                {/* Reminder Card */}
                                <div
                                    className="flex items-center border-2 border-white rounded-lg p-4 cursor-pointer"
                                    onClick={() => handleShowRemainder()}
                                >
                                    <FcAlarmClock size={40} className="mr-3" />
                                    <h3 className="text-white font-serif text-lg sm:text-xl">
                                        Set Reminder for Installments
                                    </h3>
                                </div>

                                {/* Schedule Messages Card */}
                                <div
                                    className="flex items-center border-2 border-white rounded-lg p-4 cursor-pointer"
                                    onClick={() => setshowsetMessages(!showsetMessages)}
                                >
                                    <h2 className="text-white font-serif text-lg sm:text-xl flex items-center">
                                        Schedule WhatsApp and Email Messages
                                        <FaCrown size={30} className="ml-2 text-yellow-400" />
                                    </h2>
                                </div>

                                {/* Finance Notes Card */}
                                <div
                                    className="flex items-center border-2 border-white rounded-lg p-4 cursor-pointer"
                                    onClick={() => setshowFinanceNotes(!showFinanceNotes)}
                                >
                                    <h2 className="text-white font-serif text-lg sm:text-xl">Finance Notes</h2>
                                </div>

                                {/* Transaction Box */}
                                <div className="border-2 border-white rounded-lg h-[240px] overflow-auto p-3">
                                    <h2 className="text-white text-lg mb-2">Transaction By Dealers</h2>
                                    {transactions.length > 0 && transactions.map((transaction: Transactions, index) => (
                                        <p
                                            key={index}
                                            className="text-white flex flex-row justify-between p-2 border-b border-white/30 last:border-0"
                                        >
                                            {transaction.dealer}
                                            <span>{transaction.amount}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>


                            <div className='flex flex-row mt-4 xl:ml-auto'>
                                <h1 className='text-white border-2 border-white w-full sm:w-[300px] h-auto sm:h-[160px] grid grid-rows-3 rounded-2xl'>
                                    <strong className='text-lg sm:text-xl m-auto'>Record Transaction</strong>
                                    <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-[80%] m-auto cursor-pointer" onClick={() => setTransaction("Debit")}>Debit</Button>
                                    <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-[80%] m-auto cursor-pointer" onClick={() => setTransaction("Credit")}>Credit</Button>
                                </h1>
                            </div>
                        </div>

                        {transaction && <Transaction type={type} state={transaction} setState={showtransaction} />}
                    </div>

                    <div className='w-full flex flex-col sm:flex-row gap-2 justify-evenly mt-3'>
                        <Button className="bg-pink-500 hover:bg-pink-700 w-[100px] sm:w-[120px] h-[50px]" onClick={() => setactiveDuration("Monthly")}>Monthly</Button>
                        <Button className="bg-pink-500 hover:bg-pink-700 w-[100px] sm:w-[120px] h-[50px]" onClick={() => setactiveDuration("Weekly")}>Weekly</Button>
                        <Button className="bg-pink-500 hover:bg-pink-700 w-[100px] sm:w-[120px] h-[50px]" onClick={() => setactiveDuration("Daily")}>Daily</Button>

                        <select name="" id="type" className='bg-white h-[50px] border-solid w-[150px]' onChange={(e) => settypeofChart(e.target.value)}>
                            <option value="">Choose Chart</option>
                            <option value="Income">Income</option>
                            <option value="Expenditure">Expenditure</option>
                        </select>
                    </div>

                    {typeofChart === "Income" && (
                        <div className='w-full lg:w-full h-[200px] mt-6'>
                            <div className={`${activeDuration === "Monthly" ? "block" : "hidden"}`}><MonthlyIncome /></div>
                            <div className={`${activeDuration === "Daily" ? "block" : "hidden"}`}><DailyIncome /></div>
                            <div className={`${activeDuration === "Weekly" ? "block" : "hidden"}`}><WeeklyIncome /></div>
                        </div>
                    )}

                    {typeofChart === "Expenditure" && (
                        <div className='w-full lg:w-full h-[200px] mt-6'>
                            <div className={`${activeDuration === "Monthly" ? "block" : "hidden"}`}><MonthlyExpenditure /></div>
                            <div className={`${activeDuration === "Daily" ? "block" : "hidden"}`}><DailyExpenditure /></div>
                            <div className={`${activeDuration === "Weekly" ? "block" : "hidden"}`}><WeeklyExpenditure /></div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Finance;
