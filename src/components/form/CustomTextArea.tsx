import { Field, ErrorMessage } from 'formik'
import React from 'react'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  label: string;
  required?: boolean;
}

function CustomTextArea({ id, label, placeholder, required, disabled, name = "", ...props }: Props) {

  return (
    <div className='flex flex-col gap-2' >
      <label
        htmlFor={id}
        className="block text-xl font-semibold"
      >
        {label} {required && <span className='text-red-500' >*</span>}
      </label>
      <Field
        as="textarea"
        name={name}
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg text-xl bg-blue-950/50 outline-none"
        {...props}
      />
      <div className='h-5' >
        <ErrorMessage name={name} >
          {(error) => (
            <p className='text-red-500'>{error}</p>
          )}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default CustomTextArea
