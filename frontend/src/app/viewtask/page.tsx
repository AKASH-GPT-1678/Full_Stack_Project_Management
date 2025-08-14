"use client";
import { Initials } from '@/AppComponent/redux'
import React from 'react'
import { useSelector } from 'react-redux'

const Taskdetails = () => {
   const task = useSelector((state: { User: Initials }) => state.User.selectedTask);

   return (
      <div className="max-w-2xl mx-auto p-6">
         <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl border border-gray-200 overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4">
               <h2 className="text-2xl font-bold text-white">{task.task}</h2>
               <p className="text-sm text-blue-100">Priority: <span className="capitalize">{task.priority}</span></p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">

               {/* Quick info grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Info label="Team" value={task.team?.join(", ")} />
                  <Info label="Amount" value={`₹${task.amount}`} />
                  <Info label="Start Date" value={new Date(task.startdate).toLocaleString()} />
                  <Info label="Deadline" value={new Date(task.deadline).toLocaleString()} />
                  <Info label="Team Lead" value={task.teamlead} />
                  <Info label="Status" value={task.status ? "✅ Completed" : "⏳ Pending"} />
               </div>

               {/* Long text sections */}
               <Section label="Description" value={task.description} />
               <Section label="Suppliers" value={task.suppliers?.join(", ")} />
               <Section label="Subtasks" value={task.subtasks?.join(", ")} />
               <Section label="Inventories" value={task.inventories?.join(", ")} />
            </div>
         </div>
      </div>
   );
};

// Reusable info block
const Info = ({ label, value }: { label: string; value?: string | number }) => (
   <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
      <p className="text-xs text-gray-500 uppercase font-semibold">{label}</p>
      <p className="text-gray-800 font-medium">{value || "—"}</p>
   </div>
);

// Reusable section for longer text
const Section = ({ label, value }: { label: string; value?: string }) => (
   <div>
      <p className="text-sm font-semibold text-gray-700 mb-1">{label}</p>
      <p className="text-gray-600 bg-gray-50 rounded-lg p-3 border border-gray-200">{value || "—"}</p>
   </div>
);



export default Taskdetails;