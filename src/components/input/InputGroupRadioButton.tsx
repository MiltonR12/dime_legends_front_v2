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
        <label htmlFor={name} className="text-sm font-medium text-admin-text">
          {label}
        </label>
      </div>

      <RadioGroup
        disabled={disabled}
        value={value}
        onValueChange={(value) => setValue(value)}
        name={name}
        className="grid h-10 grid-cols-2 gap-2"
      >
        {options.map((option) => (
          <div key={option.value}>
            <RadioGroupItem value={option.value} id={`${name}-${option.value}`} className="peer sr-only" />
            <label
              htmlFor={`${name}-${option.value}`}
              className={cn(
                "flex h-10 items-center justify-center rounded-md border px-3 text-center text-sm",
                value === option.value
                  ? "border-admin-accent bg-admin-accent text-white"
                  : "border-admin-border bg-admin-bg text-admin-muted hover:text-admin-text",
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
