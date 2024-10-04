import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

type Props = {
  name: string,
  label: string,
  list: string[],
  setFieldValue: (name: string, value: string) => void
  defaultValue?: string
}

function CustomSelect({ list, name, label, setFieldValue, defaultValue }: Props) {

  const random = (Math.random() * 1000).toString(36)

  return (
    <div className="flex flex-col gap-2 mb-4" >
      <label
        htmlFor={random}
        className='font-semibold text-xl'
      >
        {label}
      </label>

      <Select
        name={name}
        defaultValue={defaultValue}
        onValueChange={e => {
          setFieldValue(name, e)
        }} >
        <SelectTrigger className="bg-blue-950/70 text-white" >
          <SelectValue placeholder={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {
              list.map((item, index) => (
                <SelectItem
                  className="bg-blue-950/70 text-white hover:bg-blue-950/80"
                  key={index}
                  value={item} >
                  <div className="flex items-center gap-3" >
                    <span>{item}</span>
                  </div>
                </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default CustomSelect