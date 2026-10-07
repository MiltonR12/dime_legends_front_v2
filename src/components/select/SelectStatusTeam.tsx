import { useState } from "react"
import { useUpdateTeamStatus } from "@/hooks/team"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCheck, UserX, Clock, Loader2 } from "lucide-react"

interface SelectStatusTeamProps {
  _id: string
  defaultValue: string
}

function SelectStatusTeam({ _id, defaultValue }: SelectStatusTeamProps) {
  const { mutateAsync: updateStatus, isPending: isLoading } = useUpdateTeamStatus()
  const [currentStatus, setCurrentStatus] = useState(defaultValue)

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatus({ id: _id, status: newStatus })
      setCurrentStatus(newStatus)
    } catch (error) {
      console.error("Error updating team status:", error)
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
      <SelectTrigger className="h-8 w-32 border-admin-border bg-admin-input text-xs text-admin-text shadow-none">
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
      <SelectContent className="border-admin-border bg-admin-surface text-admin-text">
        <SelectItem value="active" className="focus:bg-admin-row focus:text-admin-text">
          <div className="flex items-center gap-2 text-green-400">
            <UserCheck className="h-3 w-3" />
            Activo
          </div>
        </SelectItem>
        <SelectItem value="inactive" className="focus:bg-admin-row focus:text-admin-text">
          <div className="flex items-center gap-2 text-red-400">
            <UserX className="h-3 w-3" />
            Inactivo
          </div>
        </SelectItem>
        <SelectItem value="pending" className="focus:bg-admin-row focus:text-admin-text">
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
