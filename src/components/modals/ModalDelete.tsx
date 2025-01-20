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
      <AlertDialogContent className="bg-slate-950 max-w-md md:rounded-3xl border-none" >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-xl" >
            {title || "Estas seguro de eliminar?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-lg" >
            {description || "Esta acción no se puede deshacer y se eliminará permanentemente."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-2 gap-5" >
          <AlertDialogCancel className="bg-slate-900 text-white" onClick={onClose} >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="text-white bg-red-600" onClick={onSuccess} >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ModalDelete