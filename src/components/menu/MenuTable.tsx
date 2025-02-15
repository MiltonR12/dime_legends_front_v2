import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { FaEllipsisV } from "react-icons/fa"

type Props = {
  onEdit?: () => void
  onDelete?: () => void
  options?: {
    onClick: () => void
    text: string
  }[]
}

function MenuTable({ onEdit, onDelete, options }: Props) {
  return (
    <Menubar className="p-0 border-none bg-transparent" >
      <MenubarMenu>
        <MenubarTrigger className="data-[state=open]:bg-three-700 text-white data-[state=open]:text-white cursor-pointer" >
          <FaEllipsisV />
        </MenubarTrigger>
        <MenubarContent className="bg-slate-900 text-white" >
          {options?.map((option, index) => (
            <MenubarItem key={index} onClick={option.onClick} >
              {option.text}
            </MenubarItem>
          ))}
          <MenubarItem onClick={onEdit} >
            Editar
          </MenubarItem>
          <MenubarItem onClick={onDelete} className="text-red-600" >
            Eliminar
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default MenuTable