import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ErrorMessage, useField } from "formik"

type Props = {
  label: string
  name: string
  disabled?: boolean
  placeholder?: string
  list: { value: string, label: string }[]
}

function InputSelect({ label, name, disabled, list, placeholder }: Props) {

  const [, meta, helpers] = useField(name)
  const { setValue } = helpers
  const { value } = meta
  const newList = [{
    value: "ninguno",
    label: "Ninguno"
  }, ...list]

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-5" >
      <label htmlFor={name} className="font-semibold text-xl">
        {label}
      </label>
      <Select disabled={disabled} value={value} onValueChange={(value) => setValue(value)} >
        <SelectTrigger className="text-white" >
          <SelectValue placeholder={placeholder || "Selecciona una opción"} />
        </SelectTrigger>
        <SelectContent className="bg-fondo text-white" >
          {newList.map((team) => (
            <SelectItem key={team.value} value={team.value} >
              {team.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className='h-3' >
        <ErrorMessage name={name} >
          {msg => <span className='text-red-500' >{msg}</span>}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default InputSelect