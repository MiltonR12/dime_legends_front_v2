import { cn } from "@/lib/utils"
import { ErrorMessage, Field } from "formik"

type Props = {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  className?: string
  disabled?: boolean
}

function InputTextArea({ label, name, placeholder, required, className, disabled }: Props) {

  return (
    <div className='flex flex-col gap-2' >
      <label htmlFor={name} className='font-semibold text-xl' >
        {label} {required && <span className='text-red-500' >*</span>}
      </label>

      <Field name={name} >
        {({ field }: any) => (
          <textarea
            id={name}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={cn("px-4 py-2 rounded-lg text-xl bg-blue-950/50 outline-none", className)}
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