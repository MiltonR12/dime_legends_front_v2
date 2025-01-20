import { cn } from "@/lib/utils"
import { ErrorMessage, Field, useField } from "formik"
import { Button } from "../ui/button"

type Props = {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  className?: string
  disabled?: boolean
  min?: number
  max?: number
}

function InputNumber({ label, name, placeholder, required, className, disabled, min = 1, max = 50, ...args }: Props) {

  const [, meta, helpers] = useField(name)
  const { value } = meta
  const { setValue } = helpers

  return (
    <div className='flex flex-col gap-2' >

      <label htmlFor={name} className='font-semibold text-xl' >
        {label} {required && <span className='text-red-500' >*</span>}
      </label>

      <div className="flex items-center gap-5" >
        <Button onClick={() => {
          if (value < max) {
            setValue(parseInt(value) + 1)
          }
        }} >
          <span className='text-white text-3xl' >+</span>
        </Button>
        <Field
          id={name}
          name={name}
          type='text'
          placeholder={placeholder}
          onChange={(e: any) => {
            if (e.target.value >= min && e.target.value <= max) {
              setValue(e.target.value)
            }
          }}
          value={value}
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          className={cn("px-4 py-2 w-28 rounded-lg text-xl text-center bg-blue-950/50 outline-none", className)}
          {...args}
        />
        <Button onClick={() => {
          if (value > min) {
            setValue(parseInt(value) - 1)
          }
        }} >
          <span className='text-white text-3xl' >-</span>
        </Button>
      </div>

      <div className='h-5' >
        <ErrorMessage name={name} >
          {msg => <span className='text-red-500' >{msg}</span>}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default InputNumber