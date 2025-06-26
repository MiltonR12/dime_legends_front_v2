import { cn } from "@/lib/utils"
import { ErrorMessage, Field } from "formik"
import { Label } from "../ui/label"

type Props = {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  className?: string
  disabled?: boolean
  variant?: "default" | "outline"
}

function InputTextArea({ label, name, placeholder, required, className, disabled, variant = "default" }: Props) {

  const variantClasses = {
    default: "bg-blue-950/50 rounded-lg",
    outline: "bg-transparent text-white border-b border-gray-300 focus:ring-gray-500 border-opacity-80 border-dashed"
  }

  return (
    <div className='flex flex-col gap-2' >
      <Label htmlFor={name} className='font-semibold text-xl text-white' >
        {label} {required && <span className='text-red-500' >*</span>}
      </Label>

      <Field name={name} >
        {({ field }: any) => (
          <textarea
            id={name}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={
              cn(
                "px-4 py-2 text-xl  outline-none",
                variantClasses[variant],
                className
              )}
            {...field}
          />
        )}
      </Field>

      <div className='h-5' >
        <ErrorMessage name={name} >
          {msg => <span className='text-red-500' >{msg}</span>}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default InputTextArea