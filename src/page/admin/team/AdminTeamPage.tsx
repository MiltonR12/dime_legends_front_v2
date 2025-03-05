import { getTeamByTournamentThunk } from "@/app/redux/team/teamSlice"
import { RootState, useAppDispatch } from "@/app/store"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Fragment } from "react/jsx-runtime";
import { GrStatusGood } from "react-icons/gr";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Team } from "@/app/redux/team/team";
import { useState } from "react";
import { deleteTeamThunk } from "@/app/redux/team/teamSlice";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaFileInvoiceDollar } from "react-icons/fa";
import { CustomToast } from "@/lib/handleToast";
import { useSelector } from "react-redux"
import ModalCreateTeam from "@/components/admin/ModalCreateTeam"
import ModalEditTeam from "@/components/admin/ModalEditTeam"
import ModalDelete from "@/components/modals/ModalDelete"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import SelectStatusTeam from "@/components/select/SelectStatusTeam"
import { Button } from "@/components/ui/button"
import DirectionIcon from "@/components/icons/DirectionIcon"
import MenuTable from "@/components/menu/MenuTable"
import { ImageTable } from "@/components/icons/Image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const columnHelper = createColumnHelper<Team>();

function AdminTeamPage() {

  const { id } = useParams()
  const dispatch = useAppDispatch()

  const { teams } = useSelector((state: RootState) => state.team)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [showPlayers, setShowPlayers] = useState("")
  const [team, setTeam] = useState<Team | null>(null)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone).then(() => {
      CustomToast.info("Teléfono copiado")
    })
  }

  const handleSearch = (search: string) => {
    setColumnFilters((prev) => [...prev,{ id: "name", value: search },])
  }

  const handleFilterStatus = (status: string) => {
    if (status === "all") {
      return setColumnFilters((prev) => prev.filter((filter) => filter.id !== "status"))
    }
    setColumnFilters((prev) => [...prev, { id: "status", value: status }])
  }

  const handleDelete = (id: string) => {
    dispatch(deleteTeamThunk(id)).then(() => {
      setIsOpenDelete(false)
    })
  }

  const handleShowPlayers = (id: string) => {
    setShowPlayers(id === showPlayers ? "" : id)
  }

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-white">
          Nombre
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center gap-3" >
          <Button onClick={() => handleShowPlayers(info.row.original._id)} >
            <DirectionIcon direction="down" />
          </Button>
          <ImageTable src={info.row.original.image} alt={info.row.original.name} />
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("captain", {
      id: "captain",
      header: () => (
        <p className="text-sm font-bold text-white">
          Capitán
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => (
        <p className="text-sm font-bold text-white">
          Teléfono
        </p>
      ),
      cell: (info) => (
        <Button size="none" onClick={() => copyPhone(info.getValue())} >
          {info.getValue()}
        </Button>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-white">
          Estado
        </p>
      ),
      cell: (info) => (
        <div className="font-bold select-none">
          {info.getValue() === "inactive" ?
            <span className="text-red-500 flex items-center gap-3">
              <FaRegTimesCircle className="inline" /> <span>Desabilitado</span>
            </span>
            : info.getValue() === "pending" ?
              <span className="text-yellow-300 flex items-center gap-3">
                <IoMdTime className="inline" /> <span>Pendiente de pago</span>
              </span>
              : <span className="text-green-500 flex items-center gap-3">
                <GrStatusGood className="inline" /> <span>Habilitado</span>
              </span>}
        </div>
      ),
      filterFn: (rows, id, value) => rows.getValue(id) === value
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <p className="text-sm font-bold text-white">
          Creado
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold line-clamp-3 text-navy-700 dark:text-white">
          {new Date(info.getValue()).toLocaleDateString("es", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )
    }),
    columnHelper.accessor("_id", {
      id: "_id",
      header: () => (
        <p className="text-sm font-bold text-white">
          Acciones
        </p>
      ),
      cell: (info) => (
        <div className="text-sm flex gap-5 font-bold text-navy-700 dark:text-white">
          <SelectStatusTeam
            _id={info.row.original._id}
            defaultValue={info.row.original.status}
          />
          <MenuTable
            onDelete={() => {
              setTeam(info.row.original)
              setIsOpenDelete(true)
            }}
            onEdit={() => {
              setTeam(info.row.original)
              setIsOpenEdit(true)
            }}
          />
          {info.row.original.voucher && <Dialog>
            <DialogTrigger>
              <FaFileInvoiceDollar />
            </DialogTrigger>
            <DialogContent className="bg-violetPrimary" >
              <DialogHeader>
                <DialogTitle className="text-white text-2xl text-center" >
                  Comprobante de Pago
                </DialogTitle>
                <DialogDescription className="hidden" >
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <img src={info.row.original.voucher} alt="team" />
            </DialogContent>
          </Dialog>}
        </div>
      ),
    })
  ];

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

  if (!id) return

  return (
    <div className="h-full pt-8 grid grid-rows-[auto_auto_1fr] gap-5" >

      {team && <ModalEditTeam
        data={team}
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
      />}

      {team && <ModalDelete
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        onSuccess={() => handleDelete(team._id)}
      />}

      <div className="flex items-center justify-between" >
        <h3 className="text-xl sm:text-3xl font-semibold text-white" >
          Lista de Equipos
        </h3>
        <ModalCreateTeam id={id} />
      </div>

      <div className="flex flex-col sm:flex-row gap-5 sm:items-center justify-between" >
        <input
          type="search"
          placeholder="Buscar..."
          className="bg-three-700 text-white py-2 px-4 rounded-lg outline-none"
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div className="flex items-center gap-5" >
          <h3 className="text-2xl font-semibold text-white" >
            Filtros
          </h3>
          <Select onValueChange={handleFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Habilitado</SelectItem>
              <SelectItem value="inactive">Deshabilitado</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <Fragment key={row.id} >
                <TableRow>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="py-0 border-none" colSpan={columns.length} >
                    <Accordion type="single" collapsible value={showPlayers} >
                      <AccordionItem className="border-none" value={row.original._id} >
                        <AccordionContent className="p-5" >
                          <ul className="flex flex-col text-base text-slate-300 flex-wrap gap-2">
                            {row.original.players?.map((player, index) => (
                              <li key={index}>
                                {player}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-3xl font-bold h-96 text-center">
                Sin Equipos Registrados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminTeamPage