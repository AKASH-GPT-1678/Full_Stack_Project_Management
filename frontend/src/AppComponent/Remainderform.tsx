import React, { useState } from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Dealer } from './Dealer';
import { CalendarPopup } from './Calendarpopup';
const RemainderForm: React.FC<{ dealer: Dealer[] }> = ({ dealer }) => {
    const [amount, setAmount] = useState('');
    const [dealerName, setDealerName] = useState('');
    const [date, setDate] = useState<Date>(new Date());



    const handleSubmit = () => {
        console.log('Amount:', amount);
        console.log('Dealer Name:', dealerName);
        console.log('Date:', date);
    };

    return (
        <div className='w-[350px] h-[350px] border-2 border-white flex flex-col gap-5 cursor-pointer bg-white absolute items-center justify-center rounded-2xl'>
            <Input
                className='w-[250px] h-[40px] ml-5 mt-3 placeholder:text-black'
                placeholder='Enter Amount'
                type='text'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <select
                className="w-[250px] ml-5 h-[40px] cursor-pointer"
                value={dealerName}
                onChange={(e) => setDealerName(e.target.value)}
            >
                <option value="">Select Dealer</option>
                {dealer.map((item) => (
                    <option key={item.id} value={item.name!}>
                        {item.name}
                    </option>
                ))}
            </select>

            <div className='ml-6'>
            <CalendarPopup dateValue={date} onDateChange={(datevalue) => {if (datevalue) setDate(datevalue)}} />

            </div>

           

            <Button onClick={handleSubmit} className='bg-black text-white cursor-pointer w-[200px]'>Submit</Button>
        </div>
    );
};

export default RemainderForm;
