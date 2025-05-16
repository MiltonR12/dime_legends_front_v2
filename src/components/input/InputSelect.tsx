import { ErrorMessage, useField } from "formik"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  label: string
  name: string
  disabled?: boolean
  placeholder?: string
  list: { value: string; label: string }[]
  icon?: React.ReactNode
}

function InputSelect({ label, name, disabled, list, placeholder, icon }: Props) {
  const [, meta, helpers] = useField(name)
  const { setValue } = helpers
  const { value } = meta

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <label htmlFor={name} className="text-white font-medium">
          {label}
        </label>
      </div>

      <Select disabled={disabled} value={value} onValueChange={(value) => setValue(value)}>
        <SelectTrigger className="bg-slate-900 border-slate-700 text-white focus:ring-purple-500 focus:border-purple-500">
          <SelectValue placeholder={placeholder || "Selecciona una opción"} />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700 text-white">
          <SelectItem value="default">Seleccionar...</SelectItem>
          {list.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  )
}

export default InputSelect
