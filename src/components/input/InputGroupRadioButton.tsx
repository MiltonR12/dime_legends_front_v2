"use client"

import { ErrorMessage, useField } from "formik"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type Props = {
  options: { value: string; label: string }[]
  name: string
  label: string
  disabled?: boolean
  icon?: ReactNode
}

function InputGroupRadioButton({ options, name, label, disabled, icon }: Props) {
  const [, meta, helpers] = useField(name)
  const { setValue } = helpers
  const { value } = meta

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <label htmlFor={name} className="text-white font-medium">
          {label}
        </label>
      </div>

      <RadioGroup
        disabled={disabled}
        value={value}
        onValueChange={(value) => setValue(value)}
        name={name}
        className="flex flex-wrap gap-2"
      >
        {options.map((option) => (
          <div key={option.value} className="flex-1 min-w-[120px]">
            <RadioGroupItem value={option.value} id={`${name}-${option.value}`} className="peer sr-only" />
            <label
              htmlFor={`${name}-${option.value}`}
              className={cn(
                "flex items-center justify-center px-4 py-2 rounded-md border text-center cursor-pointer transition-all",
                "hover:bg-slate-800 hover:border-purple-500",
                value === option.value
                  ? "bg-purple-700 border-purple-500 text-white"
                  : "bg-slate-900 border-slate-700 text-slate-300",
              )}
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup>

      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  )
}

export default InputGroupRadioButton
