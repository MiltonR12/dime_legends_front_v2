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
  placeholder?: string
  disabled?: boolean
  list: { label: string; value: string }[]
}

function InputComboBox({ label, name, required, list, placeholder = "Selecciona una opción", disabled = false }: Props) {

  const [open, setOpen] = useState(false)
  const [, meta, helpers] = useField(name)
  const { value } = meta
  const { setValue } = helpers

  return (
    <div className='flex flex-col gap-2' >
      <label htmlFor={name} className="text-sm font-medium text-admin-text">
        {label} {required && <span className='text-red-500' >*</span>}
      </label>

      <Popover open={disabled ? false : open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="h-10 w-full justify-between rounded-md border-admin-border bg-admin-input text-left text-sm font-normal text-admin-text shadow-none hover:bg-admin-input hover:text-admin-text disabled:opacity-70"
          >
            {value
              ? list.find((item) => item.value === value)?.label
              : <span className="text-admin-muted">{placeholder}</span>}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-50 w-[var(--radix-popover-trigger-width)] border-admin-border bg-admin-surface p-0 text-admin-text shadow-lg">
          <Command className="w-full bg-admin-surface text-admin-text">
            <CommandInput placeholder="Buscar..." className="text-sm" />
            <CommandList>
              <CommandEmpty>Sin resultados.</CommandEmpty>
              <CommandGroup>
                {list.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    className="text-admin-text data-[selected=true]:bg-admin-row data-[selected=true]:text-admin-text"
                    onSelect={() => {
                      setValue(item.value === value ? "" : item.value)
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