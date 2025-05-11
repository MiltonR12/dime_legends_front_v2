import { ErrorMessage, useField } from 'formik'
import { cn } from '@/lib/utils'
import { PhoneInput } from '../ui/phone-input';
import { Users } from 'lucide-react';

interface Props extends React.HtmlHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  type?: "text" | "email" | "password" | "number" | "date" | "file" | "checkbox" | "radio" | "time"
  placeholder?: string
  disabled?: boolean
  required?: boolean
  variant?: "default" | "error" | "success" | "warning" | "outline"
  icon?: React.ReactNode
}

function InputPhone({
  label,
  name,
  placeholder,
  className,
  required,
  icon = <Users className="h-4 w-4 text-purple-400" />,
  variant = "default",
}: Props) {

  const [, meta, helpers] = useField(name)
  const { value } = meta
  const { setValue } = helpers

  const variantClasses = {
    default: "bg-blue-950/50 rounded-lg border-blue-500 focus:ring-blue-500",
    error: "bg-red-50 border-red-500 focus:ring-red-500",
    success: "bg-green-50 border-green-500 focus:ring-green-500",
    warning: "bg-yellow-50 border-yellow-500 focus:ring-yellow-500",
    outline: "bg-purple-900/20 border-purple-700 text-white placeholder:text-purple-400 focus:border-purple-500"
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <label className="text-white font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      </div>
      <div className="relative">
        <PhoneInput
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={setValue}
          required={required}
          className={cn(
            "py-2 text-xl w-full outline-none transition-all",
            variantClasses[variant],
            className
          )}
        />
      </div>
      <div className="h-5">
        <ErrorMessage name={name}>
          {msg => <span className="text-red-500">{msg}</span>}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default InputPhone
