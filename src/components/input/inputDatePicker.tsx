import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { ErrorMessage } from "formik"

type Props = {
  label: string
  name: string
  required?: boolean
  className?: string
}

function InputDatePicker({ label, name, required, className }: Props) {

  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className='flex flex-col gap-2' >
      <label htmlFor={name} className='font-semibold text-xl' >
        {label} {required && <span className='text-red-500' >*</span>}
      </label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "justify-start text-left w-full py-6 bg-blue-950/50 text-xl font-normal",
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
            onSelect={setDate}
            initialFocus
            className={cn("bg-slate-900 text-white", className)}
          />
        </PopoverContent>
      </Popover>

      <div className='h-5' >
        <ErrorMessage name={name} >
          {msg => <span className='text-red-500' >{msg}</span>}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default InputDatePicker