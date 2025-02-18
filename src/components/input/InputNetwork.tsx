import { Field, ErrorMessage, useField } from 'formik'
import { cn } from '@/lib/utils'
import NetworkIcon from '../icons/NetworkIcon';
import { useState, useEffect } from 'react';
import { INetwork } from '@/interfaces/globals';

interface Props extends React.HtmlHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  variant?: "default" | "error" | "success" | "warning" | "outline"
}

const detectNetwork = (value: string) => {
  if (value.includes("facebook")) return "facebook";
  if (value.includes("twitter")) return "twitter";
  if (value.includes("instagram")) return "instagram";
  if (value.includes("linkedin")) return "linkedin";
  if (value.includes("youtube")) return "youtube";
  if (value.includes("tiktok")) return "tiktok";
  if (value.includes("github")) return "github";
  if (value.includes("discord")) return "discord";
  if (value.includes("whatsapp")) return "whatsapp";
  return "website";
}

function InputNetwork({
  label,
  name,
  placeholder,
  className,
  required,
  variant = "default",
  ...args
}: Props) {

  const [, meta, helpers] = useField(name)
  const { value } = meta
  const { setValue } = helpers
  const [network, setNetwork] = useState<INetwork>("website");

  useEffect(() => {
    setNetwork(detectNetwork(value));
  }, [value]);

  const variantClasses = {
    default: "bg-blue-950/50 rounded-lg border-blue-500 focus:ring-blue-500",
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
      <div className='flex items-center gap-3'>
        <NetworkIcon network={network} />
        <Field
          id={name}
          name={name}
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          type="text"
          placeholder={placeholder}
          required={required}
          className={cn(
            "px-4 py-2 text-xl w-full outline-none transition-all",
            variantClasses[variant],
            className
          )}
          {...args}
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

export default InputNetwork
