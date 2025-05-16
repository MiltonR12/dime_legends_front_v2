"use client"

import type React from "react"

import { ErrorMessage, useField } from "formik"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Minus } from "lucide-react"
import type { ReactNode } from "react"

type Props = {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  min?: number
  max?: number
  icon?: ReactNode
}

function InputNumber({ label, name, placeholder, required, disabled, min = 1, max = 50, icon, ...args }: Props) {
  const [, meta, helpers] = useField(name)
  const { value } = meta
  const { setValue } = helpers

  const handleIncrement = () => {
    if (value < max) {
      setValue(Number.parseInt(value) + 1)
    }
  }

  const handleDecrement = () => {
    if (value > min) {
      setValue(Number.parseInt(value) - 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setValue(newValue)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <label htmlFor={name} className="text-white font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>

      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={disabled || value <= min}
          onClick={handleDecrement}
          className="rounded-r-none border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <Input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="rounded-none border-x-0 border-slate-700 bg-slate-900 text-white text-center w-16"
          {...args}
        />

        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={disabled || value >= max}
          onClick={handleIncrement}
          className="rounded-l-none border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  )
}

export default InputNumber
