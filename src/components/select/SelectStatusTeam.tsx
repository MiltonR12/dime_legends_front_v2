import { useAppDispatch } from '@/app/store'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { updateTeamThunk } from '@/app/redux/team/teamSlice'

type Props = {
  defaultValue?: string
  _id: string
}

function SelectStatusTeam({ defaultValue, _id }: Props) {

  const dispatch = useAppDispatch()

  const handleChange = (value: string) => {
    dispatch(updateTeamThunk({
      id: _id,
      status: value
    }))
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={handleChange} >
      <SelectTrigger className="w-[180px]">
        <SelectValue className=''  />
      </SelectTrigger>
      <SelectContent className='text-white bg-fondo' >
        <SelectItem value="active">
          Habilitado
        </SelectItem>
        <SelectItem value="inactive">
          Deshabilitado
        </SelectItem>
        <SelectItem value="pending">
          Pendiente
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SelectStatusTeam