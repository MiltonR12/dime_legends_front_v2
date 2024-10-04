import { Field, ErrorMessage } from 'formik'
import { cn } from '@/lib/utils'

interface Props extends React.HtmlHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  type?: "text" | "email" | "password" | "number" | "date" | "file" | "checkbox" | "radio" | "time"
  placeholder?: string
  disabled?: boolean
  required?: boolean
}

function CustomInput({ label, name, placeholder, className, required, type = "text", ...args }: Props) {
  return (
    <div className='flex flex-col gap-2' >
      <label htmlFor={name} className='font-semibold text-xl' >
        {label} {required && <span className='text-red-500' >*</span>}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={cn("px-4 py-2 rounded-lg text-xl bg-blue-950/50 outline-none", className)}
        {...args}
      />
      <div className='h-5' >
        <ErrorMessage name={name} >
          {msg => <span className='text-red-500' >{msg}</span>}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default CustomInput