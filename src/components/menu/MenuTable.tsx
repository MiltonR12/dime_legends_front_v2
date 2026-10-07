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
        <MenubarTrigger className="cursor-pointer text-admin-muted data-[state=open]:bg-admin-input data-[state=open]:text-admin-text" >
          <FaEllipsisV />
        </MenubarTrigger>
        <MenubarContent className="border-admin-border bg-admin-surface text-admin-text" >
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