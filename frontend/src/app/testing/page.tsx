"use client";
import { useSelector } from 'react-redux';
import { Initials } from '@/AppComponent/redux';
import React, { useEffect } from 'react'
import axios from 'axios';
import {

  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';




const page =  () => {
  const [Income ,setIncome] = React.useState<Object>({});
  const [DailyExpenditure ,setDailyExpenditure] = React.useState<Object>({});
  const [MonthlyIncome, setMonthlyIncome] = React.useState<Object>({});
  const [MonthlyExpenditure, setMonthlyExpenditure] = React.useState<Object>({});
  const [WeeklyIncome, setWeeklyIncome] = React.useState<Object>({});
  const [WeeklyExpenditure, setWeeklyExpenditure] = React.useState<Object>({});


    const projectid = useSelector((state: {User : Initials}) => state.User.activeProject);
const getTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:3400/api/transactions/${projectid}`);
      console.log('Transactions:', response.data.Income);
      setIncome(response.data.Income)
      setDailyExpenditure(response.data.Expenditure)
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };
  
  // 2. Get monthly data for the project
  const getMonthly = async () => {
    try {
      const response = await axios.get(`http://localhost:3400/api/monthly/${projectid}`);
      console.log('Monthly data:', response.data);
      setMonthlyIncome(response.data.MonthlyIncome)
      setMonthlyExpenditure(response.data.MonthlyExpenditure);
    } catch (err) {
      console.error('Error fetching monthly data:', err);
    }
  };
  
  // 3. Get weekly data for the project
  const getWeekly = async () => {
    try {
      const response = await axios.get(`http://localhost:3400/api/weekly/${projectid}`);
      console.log('Weekly data:', response.data);
      setWeeklyIncome(response.data.WeeklyIncome);
      setWeeklyExpenditure(response.data.WeeklyExpenditure);

    } catch (err) {
      console.error('Error fetching weekly data:', err);
    }
  };

  useEffect(() => {
    getTransactions();
    getMonthly();
    getWeekly();
  }, []);

  const dailyincome = Object.entries(Income).map(([date,value])=>({
    date,
    value,
  })).toReversed();
  
  const dailyExpenditure = Object.entries(DailyExpenditure).map(([date,value])=>({
    date,
    value,
  })).toReversed();

  const montlyIncome =  Object.entries(MonthlyIncome).map(([date,value])=>({
    date,
    value,
  }))
  
  const monthlyExpenditure = Object.entries(MonthlyExpenditure).map(([date,value])=>({
    date,
    value,
  }))
  

  const weeklyIncome =  Object.entries(WeeklyIncome).map(([date,value])=>({
    date,
    value,
  })).toReversed();

  const weeklyExpenditure =  Object.entries(WeeklyExpenditure).map(([date,value])=>({
    date,
    value,
  })).toReversed();





return (
    <div>

    <div className='grid grid-cols-3'>
      <div>
    <ResponsiveContainer width="90%" height={400}>
      <BarChart data={dailyincome.splice(0 , 10)}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </ResponsiveContainer>
    <ResponsiveContainer width="90%" height={400}>
      <BarChart data={dailyExpenditure.splice(0 , 10)}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />

      </BarChart>
    </ResponsiveContainer>
    </div>
    <div>

    <ResponsiveContainer width="90%" height={400}>
      <BarChart data={montlyIncome.splice(0 , 10)}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
        
      </BarChart>
    </ResponsiveContainer>
    <ResponsiveContainer width="90%" height={400}>
      <BarChart data={monthlyExpenditure.splice(0 , 10)}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
        
      </BarChart>
    </ResponsiveContainer>
    </div>
    <div>
      
    <ResponsiveContainer width="90%" height={400}>
      <BarChart data={weeklyIncome.splice(0 , 10)}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
        
      </BarChart>
    </ResponsiveContainer>

    <ResponsiveContainer width="90%" height={400}>
      <BarChart data={weeklyExpenditure.splice(0 , 10)}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
        
      </BarChart>
    </ResponsiveContainer>
      
    </div>
    </div>
    
    </div>
)  
    
}
 


export default page