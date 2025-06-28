import { useState } from "react"
import { useAppDispatch } from "@/app/store"
import { updateStatusTeamThunk } from "@/app/redux/team/teamSlice"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCheck, UserX, Clock, Loader2 } from "lucide-react"

interface SelectStatusTeamProps {
  _id: string
  defaultValue: string
}

function SelectStatusTeam({ _id, defaultValue }: SelectStatusTeamProps) {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(defaultValue)

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true)
    try {
      await dispatch(updateStatusTeamThunk({ id: _id, status: newStatus })).unwrap()
      setCurrentStatus(newStatus)
    } catch (error) {
      console.error("Error updating team status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <UserCheck className="h-3 w-3" />
      case "inactive":
        return <UserX className="h-3 w-3" />
      case "pending":
        return <Clock className="h-3 w-3" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400"
      case "inactive":
        return "text-red-400"
      case "pending":
        return "text-yellow-400"
      default:
        return "text-slate-400"
    }
  }

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange} disabled={isLoading}>
      <SelectTrigger className="w-32 h-8 bg-slate-800 border-slate-600 text-xs">
        <SelectValue>
          <div className={`flex items-center gap-1 ${getStatusColor(currentStatus)}`}>
            {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : getStatusIcon(currentStatus)}
            <span className="capitalize">
              {currentStatus === "active" && "Activo"}
              {currentStatus === "inactive" && "Inactivo"}
              {currentStatus === "pending" && "Pendiente"}
            </span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-slate-800 border-slate-700">
        <SelectItem value="active" className="text-slate-300 hover:text-white">
          <div className="flex items-center gap-2 text-green-400">
            <UserCheck className="h-3 w-3" />
            Activo
          </div>
        </SelectItem>
        <SelectItem value="inactive" className="text-slate-300 hover:text-white">
          <div className="flex items-center gap-2 text-red-400">
            <UserX className="h-3 w-3" />
            Inactivo
          </div>
        </SelectItem>
        <SelectItem value="pending" className="text-slate-300 hover:text-white">
          <div className="flex items-center gap-2 text-yellow-400">
            <Clock className="h-3 w-3" />
            Pendiente
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SelectStatusTeam
