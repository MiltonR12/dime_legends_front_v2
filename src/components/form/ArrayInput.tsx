import { AiFillDelete } from "react-icons/ai"
import CustomInput from "./CustomInput"
import { FieldArray, FieldArrayRenderProps } from "formik"
import { Button } from "../ui/button"

type Props = {
  name: string,
  label: string,
  placeholder?: string,
  values: string[],
  required?: boolean
  disabled?: boolean
}

function ArrayInput({ name, label, values, required, placeholder, disabled }: Props) {
  return (
    <div>
      <FieldArray
        name={name}
        render={(actions: FieldArrayRenderProps) => {
          return (
            <div className='flex flex-col gap-1' >
              <div className="flex justify-between items-center" >
                <label className='font-semibold text-xl' >
                  {label}
                </label>
                <Button type='button' onClick={() => actions.push("")} >
                  Agregar +
                </Button>
              </div>

              <div className="flex flex-col gap-1" >
                {values.map((_, index) => (
                  <div key={index} className="grid grid-cols-[1fr_auto] justify-between items-end gap-x-2" >
                    <CustomInput
                      name={`${name}.${index}`}
                      label={`${label} ${index + 1}`}
                      type='text'
                      disabled={disabled}
                      placeholder={placeholder}
                      required={required}
                    />
                    <Button
                      variant="destructive"
                      type="button"
                      className="mb-7"
                      disabled={disabled}
                      onClick={() => actions.remove(index)}
                    >
                      <AiFillDelete />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}

export default ArrayInput