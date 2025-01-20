import { ErrorMessage, useField } from "formik"
import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  label: string
  name: string
  required?: boolean
  list: { label: string; value: string }[]
}

function InputComboBox({ label, name, required, list }: Props) {

  const [open, setOpen] = useState(false)
  const [, meta, helpers] = useField(name)
  const { value } = meta
  const { setValue } = helpers

  return (
    <div className='flex flex-col gap-2' >
      <label htmlFor={name} className='font-semibold text-xl' >
        {label} {required && <span className='text-red-500' >*</span>}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="w-full bg-blue-950/50 justify-between text-left font-normal"
          >
            {value
              ? list.find((item) => item.value === value)?.label
              : "Select framework..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-96" >
          <Command className="w-full bg-slate-950 text-white" >
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {list.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    className="text-white"
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
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

export default InputComboBox