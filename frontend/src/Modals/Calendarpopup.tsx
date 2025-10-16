
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/Components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Button } from '@/Components/ui/button';
import React from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Props {
    dateValue: Date | undefined;
    onDateChange: (date: Date | undefined) => void;
};

export const CalendarPopup: React.FC<Props> = ({ dateValue, onDateChange }) => {
    const [date, setDate] = React.useState<Date | undefined>(dateValue || new Date());
    
    // When local state changes, call the parent's callback function
    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate);
        onDateChange(newDate);
    };

    return (
        <div>
            <div className='flex flex-row items-center mt-2 gap-3 '>
       
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-44 justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(day) => handleDateChange(day!)}
                            initialFocus
                            className='bg-white'
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};