import { ErrorMessage, useField } from "formik"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check } from "lucide-react"
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select"

type Option = {
  value: string
  label: string
  image?: string | null
}

type Props = {
  label: string
  name: string
  disabled?: boolean
  placeholder?: string
  list: Option[]
  icon?: React.ReactNode
}

function OptionLogo({ image }: { image?: string | null }) {
  if (image === undefined) return null
  return <img src={image || "/placeholder.svg"} alt="" className="h-6 w-6 shrink-0 rounded-full object-cover" />
}

function InputSelect({ label, name, disabled, list, placeholder, icon }: Props) {
  const [, meta, helpers] = useField(name)
  const { setValue } = helpers
  const { value } = meta
  const selected = list.find((item) => item.value === value)

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <label htmlFor={name} className="text-sm font-medium text-admin-text">
          {label}
        </label>
      </div>

      <Select disabled={disabled} value={value ?? ""} onValueChange={(next) => setValue(next)}>
        <SelectTrigger className="h-10 border-admin-border bg-admin-bg text-admin-text shadow-none focus:ring-admin-accent [&>span]:line-clamp-none">
          {selected ? (
            <span className="block min-w-0">
              <span className="flex items-center gap-2">
                <OptionLogo image={selected.image} />
                <span className="truncate">{selected.label}</span>
              </span>
            </span>
          ) : (
            <span className="text-admin-muted">{placeholder || "Selecciona una opción"}</span>
          )}
        </SelectTrigger>
        <SelectContent className="border-admin-border bg-admin-surface text-admin-text">
          {list.map((item) => (
            <SelectPrimitive.Item
              key={item.value}
              value={item.value}
              className="relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-admin-row focus:text-admin-text"
            >
              <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                  <Check className="h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
              </span>
              <OptionLogo image={item.image} />
              <SelectPrimitive.ItemText>{item.label}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
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
