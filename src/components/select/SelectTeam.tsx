import { CaretSortIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSelector } from "react-redux"
import { RootState } from "@/app/store"

type Props = {
  value: string
  setValue: (value: string) => void
  defaultValue?: string
}

function SelectTeam({ setValue, value, defaultValue }: Props) {

  const [open, setOpen] = useState(false)
  const { teams } = useSelector((state: RootState) => state.team)
  const nameTeams = teams.map((team) => ({ value: team._id, label: team.teamName }))

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger className="bg-oscuro" asChild >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? nameTeams.find((framework) => framework.value === value)?.label
            : "Seleccionar un equipo"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command defaultValue={defaultValue} className="bg-oscuro text-white" >
          <CommandInput placeholder="Buscar equipo" className="h-9 " />
          <CommandList>
            <CommandEmpty>
              No se encontraron equipos
            </CommandEmpty>
            <CommandGroup defaultValue={defaultValue} className="bg-oscuro text-white" >
              {nameTeams.map((framework) => (
                <CommandItem
                  className="hover:bg-primary/10"
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectTeam