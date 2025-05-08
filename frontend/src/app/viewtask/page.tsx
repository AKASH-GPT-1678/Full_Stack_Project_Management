"use client";
import { Initials } from '@/AppComponent/redux'
import React from 'react'
import { useSelector } from 'react-redux'
const Taskdetails = () => {
    const task = useSelector((state: { User: Initials }) => state.User.selectedTask);
    
    return (
       <>
     <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4 border border-gray-200">
  <h2 className="text-xl font-semibold text-gray-800">Task Details</h2>
  

  
  <p><span className="font-semibold text-gray-700">Team:</span> {task.team?.join(", ")}</p>
  <p><span className="font-semibold text-gray-700">Amount:</span> ₹{task.amount}</p>
  <p><span className="font-semibold text-gray-700">Description:</span> {task.description}</p>
  <p><span className="font-semibold text-gray-700">Suppliers:</span> {task.suppliers?.join(", ")}</p>
  <p><span className="font-semibold text-gray-700">Subtasks:</span> {task.subtasks?.join(", ")}</p>
  <p><span className="font-semibold text-gray-700">Inventories:</span> {task.inventories?.join(", ")}</p>
  <p><span className="font-semibold text-gray-700">Start Date:</span> {new Date(task.startdate).toLocaleString()}</p>
  <p><span className="font-semibold text-gray-700">Deadline:</span> {new Date(task.deadline).toLocaleString()}</p>
  <p><span className="font-semibold text-gray-700">Team Lead:</span> {task.teamlead}</p>
</div>

       
       
       </>
    )
}

export default Taskdetails