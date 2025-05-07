"use client";
import { useSelector } from 'react-redux';
import { Initials } from '@/AppComponent/redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';


const useProjectId = () => {
  return useSelector((state: { User: Initials }) => state.User.activeProject);
};


const convertToChartData = (dataObj: Object) =>
  Object.entries(dataObj).map(([date, value]) => ({ date, value }));

export const DailyIncome = () => {
  const projectId = useProjectId();
  const [income, setIncome] = useState({});

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await axios.get(`http://localhost:3400/api/transactions/${projectId}`);
        setIncome(res.data.Income);
      } catch (err) {
        console.error("Error fetching daily income", err);
      }
    };
    fetchIncome();
  }, [projectId]);

  const chartData = convertToChartData(income).toReversed().splice(0, 10);

  return (
    <ResponsiveContainer width="90%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill='#c84224' />
      </BarChart>
    </ResponsiveContainer>
  );
};


export const DailyExpenditure = () => {
  const projectId = useProjectId();
  const [expenditure, setExpenditure] = useState({});

  useEffect(() => {
    const fetchExpenditure = async () => {
      try {
        const res = await axios.get(`http://localhost:3400/api/transactions/${projectId}`);
        setExpenditure(res.data.Expenditure);
      } catch (err) {
        console.error("Error fetching daily expenditure", err);
      }
    };
    fetchExpenditure();
  }, [projectId]);

  const chartData = convertToChartData(expenditure).toReversed().splice(0, 10);

  return (
    <ResponsiveContainer width="90%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill='#c84224' />
      </BarChart>
    </ResponsiveContainer>
  );
};


export const MonthlyIncome = () => {
  const projectId = useProjectId();
  const [income, setIncome] = useState({});

  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const res = await axios.get(`http://localhost:3400/api/monthly/${projectId}`);
        setIncome(res.data.MonthlyIncome);
      } catch (err) {
        console.error("Error fetching monthly income", err);
      }
    };
    fetchMonthly();
  }, [projectId]);

  const chartData = convertToChartData(income).splice(0, 10);

  return (
    <ResponsiveContainer width="90%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill='#c84224' />
      </BarChart>
    </ResponsiveContainer>
  );
};


export const MonthlyExpenditure = () => {
  const projectId = useProjectId();
  const [expenditure, setExpenditure] = useState({});

  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const res = await axios.get(`http://localhost:3400/api/monthly/${projectId}`);
        setExpenditure(res.data.MonthlyExpenditure);
      } catch (err) {
        console.error("Error fetching monthly expenditure", err);
      }
    };
    fetchMonthly();
  }, [projectId]);

  const chartData = convertToChartData(expenditure).splice(0, 10);

  return (
    <ResponsiveContainer width="90%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" 	fill='#c84224'/>
      </BarChart>
    </ResponsiveContainer>
  );
};


export const WeeklyIncome = () => {
  const projectId = useProjectId();
  const [income, setIncome] = useState({});

  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        const res = await axios.get(`http://localhost:3400/api/weekly/${projectId}`);
        setIncome(res.data.WeeklyIncome);
      } catch (err) {
        console.error("Error fetching weekly income", err);
      }
    };
    fetchWeekly();
  }, [projectId]);

  const chartData = convertToChartData(income).toReversed().splice(0, 10);

  return (
    <ResponsiveContainer width="90%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill='#c84224' />
      </BarChart>
    </ResponsiveContainer>
  );
};

// WEEKLY EXPENDITURE
export const WeeklyExpenditure = () => {
  const projectId = useProjectId();
  const [expenditure, setExpenditure] = useState({});

  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        const res = await axios.get(`http://localhost:3400/api/weekly/${projectId}`);
        setExpenditure(res.data.WeeklyExpenditure);
      } catch (err) {
        console.error("Error fetching weekly expenditure", err);
      }
    };
    fetchWeekly();
  }, [projectId]);

  const chartData = convertToChartData(expenditure).toReversed().splice(0, 10);

  return (
    <ResponsiveContainer width="90%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill='#c84224' />
      </BarChart>
    </ResponsiveContainer>
  );
};
