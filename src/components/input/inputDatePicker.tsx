import { ErrorMessage, useField } from "formik"
import { DateTimePicker } from "../ui/DateTimePicker"
import { es } from 'date-fns/locale';

type Props = {
  label: string
  name: string
  required?: boolean
  className?: string
}

function InputDatePicker({ label, name, required, className }: Props) {

  const [_, meta, helpers] = useField<Date | undefined>(name)
  const { value } = meta
  const { setValue } = helpers

  return (
    <div className='flex flex-col gap-2' >
      <label htmlFor={name} className='font-semibold text-xl' >
        {label} {required && <span className='text-red-500' >*</span>}
      </label>

      <DateTimePicker
        locale={es}
        hourCycle={24}
        value={value}
        onChange={setValue}
        className={className}
      />

      <div className='h-5' >
        <ErrorMessage name={name} >
          {msg => <span className='text-red-500' >{msg}</span>}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default InputDatePicker