import { getTeamByTournamentThunk } from "@/app/redux/team/teamSlice"
import { type RootState, useAppDispatch } from "@/app/store"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  type ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Fragment } from "react/jsx-runtime"
import type { Team } from "@/app/redux/team/team"
import { useState } from "react"
import { deleteTeamThunk } from "@/app/redux/team/teamSlice"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CustomToast } from "@/lib/handleToast"
import { useSelector } from "react-redux"
import ModalDelete from "@/components/modals/ModalDelete"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import SelectStatusTeam from "@/components/select/SelectStatusTeam"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Phone,
  Calendar,
  ChevronDown,
  ChevronRight,
  Receipt,
  UserCheck,
  UserX,
  Clock,
  Copy,
  TrendingUp,
  Award,
  Shield,
} from "lucide-react"
import ModalCreateTeam from "@/components/admin/ModalCreateTeam"
import ModalEditTeam from "@/components/admin/ModalEditTeam"
import TagInformation from "./components/TagInformation"

const columnHelper = createColumnHelper<Team>()

function AdminTeamPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { teams } = useSelector((state: RootState) => state.team)

  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [showPlayers, setShowPlayers] = useState("")
  const [team, setTeam] = useState<Team | null>(null)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [searchValue, setSearchValue] = useState("")

  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone).then(() => {
      CustomToast.info("Teléfono copiado al portapapeles")
    })
  }

  const handleSearch = (search: string) => {
    setSearchValue(search)
    setColumnFilters((prev) => {
      const filtered = prev.filter((filter) => filter.id !== "name")
      if (search) {
        return [...filtered, { id: "name", value: search }]
      }
      return filtered
    })
  }

  const handleFilterStatus = (status: string) => {
    setColumnFilters((prev) => {
      const filtered = prev.filter((filter) => filter.id !== "status")
      if (status === "all") {
        return filtered
      }
      return [...filtered, { id: "status", value: status }]
    })
  }

  const handleDelete = (id: string) => {
    dispatch(deleteTeamThunk(id)).then(() => {
      setIsOpenDelete(false)
      CustomToast.success("Equipo eliminado correctamente")
    })
  }

  const handleShowPlayers = (id: string) => {
    setShowPlayers(id === showPlayers ? "" : id)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-600/20 text-green-400 border-green-600/30 hover:bg-green-600/30">
            <UserCheck className="h-3 w-3 mr-1" />
            Habilitado
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-red-600/20 text-red-400 border-red-600/30 hover:bg-red-600/30">
            <UserX className="h-3 w-3 mr-1" />
            Deshabilitado
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30 hover:bg-yellow-600/30">
            <Clock className="h-3 w-3 mr-1" />
            Pendiente
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <Shield className="h-3 w-3 mr-1" />
            Desconocido
          </Badge>
        )
    }
  }

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-semibold text-white">Equipo</span>
        </div>
      ),
      cell: (info) => (
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShowPlayers(info.row.original._id)}
            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
          >
            {showPlayers === info.row.original._id ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={info.row.original.image || "/placeholder.svg?height=40&width=40"}
                alt={info.row.original.name}
                className="w-10 h-10 rounded-lg object-cover border border-slate-600"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-800 rounded-full flex items-center justify-center">
                <Award className="h-2.5 w-2.5 text-purple-400" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{info.getValue()}</p>
              <p className="text-xs text-slate-400">{info.row.original.players?.length || 0} jugadores</p>
            </div>
          </div>
        </div>
      ),
      filterFn: (row, id, value) => {
        const cellValue = row.getValue(id);
        if (cellValue == null) return false;
        return cellValue.toString().toLowerCase().includes(value.toLowerCase());
      },
    }),

    columnHelper.accessor("captain", {
      id: "captain",
      header: () => (
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-semibold text-white">Capitán</span>
        </div>
      ),
      cell: (info) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {info.getValue().charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-white font-medium">{info.getValue()}</span>
        </div>
      ),
    }),

    columnHelper.accessor("phone", {
      id: "phone",
      header: () => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-semibold text-white">Contacto</span>
        </div>
      ),
      cell: (info) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyPhone(info.getValue())}
          className="text-slate-300 hover:text-white hover:bg-slate-700 font-mono text-sm"
        >
          <Copy className="h-3 w-3 mr-2" />
          {info.getValue()}
        </Button>
      ),
    }),

    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-semibold text-white">Estado</span>
        </div>
      ),
      cell: (info) => getStatusBadge(info.getValue()),
      filterFn: (rows, id, value) => rows.getValue(id) === value,
    }),

    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-semibold text-white">Registro</span>
        </div>
      ),
      cell: (info) => (
        <div className="text-sm text-slate-300">
          {new Date(info.getValue()).toLocaleDateString("es", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      ),
    }),

    columnHelper.accessor("_id", {
      id: "_id",
      header: () => <span className="text-sm font-semibold text-white">Acciones</span>,
      cell: (info) => (
        <div className="flex items-center gap-2">
          <SelectStatusTeam _id={info.row.original._id} defaultValue={info.row.original.status} />

          {info.row.original.voucher && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <Receipt className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-white flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-purple-400" />
                    Comprobante de Pago
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Comprobante del equipo {info.row.original.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <img
                    src={info.row.original.voucher || "/placeholder.svg"}
                    alt="Comprobante"
                    className="w-full rounded-lg border border-slate-600"
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800 border-slate-700" align="end">
              <DropdownMenuLabel className="text-slate-300">Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem
                onClick={() => {
                  setTeam(info.row.original)
                  setIsOpenEdit(true)
                }}
                className="text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTeam(info.row.original)
                  setIsOpenDelete(true)
                }}
                className="text-red-400 hover:text-red-300 hover:bg-red-950/50 cursor-pointer"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    data: teams,
    columns,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  useEffect(() => {
    if (id) dispatch(getTeamByTournamentThunk(id))
  }, [dispatch, id])

  if (!id) return null

  // Estadísticas
  const totalTeams = teams.length
  const activeTeams = teams.filter((team) => team.status === "active").length
  const pendingTeams = teams.filter((team) => team.status === "pending").length
  const totalPlayers = teams.reduce((acc, team) => acc + (team.players?.length || 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 p-6">
      <div className=" mx-auto space-y-6">
        {/* Modales */}
        {team && <ModalEditTeam data={team} isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />}
        {team && (
          <ModalDelete
            isOpen={isOpenDelete}
            onClose={() => setIsOpenDelete(false)}
            onSuccess={() => handleDelete(team._id)}
          />
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestión de Equipos</h1>
            <p className="text-slate-400">Administra los equipos registrados en el torneo</p>
          </div>
          <ModalCreateTeam id={id} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <TagInformation 
            total={totalTeams}
            subtitle="Total Equipos"
            icon={<Users className="h-5 w-5 text-blue-400" />}
          />

          <TagInformation 
            total={activeTeams}
            subtitle="Equipos Activos"
            icon={<UserCheck className="h-5 w-5 text-green-400" />}
          />

          <TagInformation 
            total={pendingTeams}
            subtitle="Equipos Pendientes"
            icon={<Clock className="h-5 w-5 text-yellow-400" />}
          />

          <TagInformation 
            total={totalPlayers}
            subtitle="Total Jugadores"
            icon={<Award className="h-5 w-5 text-purple-400" />}
          />

        </div>

        {/* Controles */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="search"
                    placeholder="Buscar equipos..."
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-400 focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <Select onValueChange={handleFilterStatus}>
                    <SelectTrigger className="w-40 bg-slate-900 border-slate-700 text-white">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all" className="text-slate-300 hover:text-white">
                        Todos
                      </SelectItem>
                      <SelectItem value="active" className="text-slate-300 hover:text-white">
                        Habilitados
                      </SelectItem>
                      <SelectItem value="inactive" className="text-slate-300 hover:text-white">
                        Deshabilitados
                      </SelectItem>
                      <SelectItem value="pending" className="text-slate-300 hover:text-white">
                        Pendientes
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="border-slate-700 hover:bg-slate-800/50">
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="text-slate-300 font-semibold">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <Fragment key={row.id}>
                        <TableRow className="border-slate-700 hover:bg-slate-800/30 transition-colors">
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="py-4">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>

                        <TableRow className="border-slate-700">
                          <TableCell className="py-0 border-none" colSpan={columns.length}>
                            <Accordion type="single" collapsible value={showPlayers}>
                              <AccordionItem className="border-none" value={row.original._id}>
                                <AccordionContent className="px-4 pb-4">
                                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                      <Users className="h-4 w-4 text-purple-400" />
                                      Jugadores del equipo ({row.original.players?.length || 0})
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                      {row.original.players?.map((player, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center gap-2 p-2 bg-slate-800 rounded-md border border-slate-600"
                                        >
                                          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                            {index + 1}
                                          </div>
                                          <span className="text-slate-300 text-sm">{player}</span>
                                        </div>
                                      )) || (
                                        <p className="text-slate-400 text-sm col-span-full">
                                          No hay jugadores registrados
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="text-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <Users className="h-12 w-12 text-slate-600" />
                          <div>
                            <h3 className="text-xl font-semibold text-slate-400 mb-1">No hay equipos registrados</h3>
                            <p className="text-slate-500">Los equipos aparecerán aquí cuando se registren al torneo</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminTeamPage
