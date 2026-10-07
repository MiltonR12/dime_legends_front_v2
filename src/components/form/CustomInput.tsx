import { Field, ErrorMessage } from 'formik'
import { cn } from '@/lib/utils'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { Users } from 'lucide-react';

interface Props extends React.HtmlHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  type?: "text" | "email" | "password" | "number" | "date" | "file" | "checkbox" | "radio" | "time"
  placeholder?: string
  disabled?: boolean
  required?: boolean
  variant?: "default" | "error" | "success" | "warning" | "outline" | "dark"
  icon?: React.ReactNode | null
}

function CustomInput({
  label,
  name,
  placeholder,
  className,
  required,
  type = "text",
  variant = "default",
  icon = <Users className="h-4 w-4 text-purple-400" />,
  ...args
}: Props) {

  const [isVisible, setIsVisible] = useState(false)

  const variantClasses = {
    default: "bg-blue-950/50 rounded-lg border-blue-500 focus:ring-blue-500",
    error: "bg-red-50 border-red-500 focus:ring-red-500",
    success: "bg-green-50 border-green-500 focus:ring-green-500",
    warning: "bg-yellow-50 border-yellow-500 focus:ring-yellow-500",
    outline: "bg-transparent text-white/80 border-b border-gray-300 focus:ring-gray-500 border-opacity-80 border-dashed",
    dark: "h-10 rounded-md border border-admin-border bg-admin-input text-sm text-admin-text placeholder:text-admin-muted focus:border-admin-accent"
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <label className={cn("font-medium text-white", variant === "dark" && "text-sm text-admin-text")}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      </div>
      <div className="relative">
        <Field
          id={name}
          name={name}
          type={type === "password" ? (isVisible ? "text" : "password") : type}
          placeholder={placeholder}
          required={required}
          className={cn(
            "px-4 py-2 text-xl w-full outline-none transition-all",
            variantClasses[variant],
            className
          )}
          {...args}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute top-1/2 transform right-5 -translate-y-1/2"
          >
            {isVisible ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
          </button>
        )}
      </div>
      <div className="h-3">
        <ErrorMessage name={name}>
          {msg => <span className="text-red-500 text-sm">{msg}</span>}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default CustomInput
