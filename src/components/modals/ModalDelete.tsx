import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type Props = {
  title?: string
  description?: string
  onSuccess: () => void
  isOpen: boolean
  onClose: () => void
}

function ModalDelete({ onSuccess, isOpen, onClose, title, description }: Props) {
  return (
    <AlertDialog open={isOpen} >
      <AlertDialogContent className="max-w-md border-admin-border bg-admin-surface" >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-admin-text" >
            {title || "¿Eliminar este equipo?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-admin-muted" >
            {description || "Esta acción no se puede deshacer."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-admin-border bg-transparent text-admin-text hover:bg-admin-input" onClick={onClose} >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="bg-red-700 text-white hover:bg-red-600" onClick={onSuccess} >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ModalDelete