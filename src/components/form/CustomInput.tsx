import { Field, ErrorMessage } from 'formik'
import { cn } from '@/lib/utils'

interface Props extends React.HtmlHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  type?: "text" | "email" | "password" | "number" | "date" | "file" | "checkbox" | "radio" | "time"
  placeholder?: string
  disabled?: boolean
  required?: boolean
  variant?: "primary" | "error" | "success" | "warning" | "outline"
}

function CustomInput({ 
  label, 
  name, 
  placeholder, 
  className, 
  required, 
  type = "text", 
  variant = "primary", 
  ...args 
}: Props) {

  const variantClasses = {
    primary: "bg-blue-950/50 rounded-lg border-blue-500 focus:ring-blue-500",
    error: "bg-red-50 border-red-500 focus:ring-red-500",
    success: "bg-green-50 border-green-500 focus:ring-green-500",
    warning: "bg-yellow-50 border-yellow-500 focus:ring-yellow-500",
    outline: "bg-transparent border-b border-gray-300 focus:ring-gray-500 border-opacity-80 border-dashed"
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-xl">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={cn(
          "px-4 py-2 text-xl outline-none transition-all",
          variantClasses[variant],
          className
        )}
        {...args}
      />
      <div className="h-5">
        <ErrorMessage name={name}>
          {msg => <span className="text-red-500">{msg}</span>}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default CustomInput
