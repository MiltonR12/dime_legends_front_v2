import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import SelectStatusTeam from "../select/SelectStatusTeam";
import { Fragment } from "react/jsx-runtime";
import { Accordion, AccordionContent, AccordionItem } from "../ui/accordion";
import { GrStatusGood } from "react-icons/gr";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Team } from "@/app/redux/team/team";
import { ImageTable } from "../icons/Image";
import MenuTable from "../menu/MenuTable";
import { useAppDispatch } from "@/app/store";
import { useState } from "react";
import ModalDelete from "../modals/ModalDelete";
import { deleteTeamThunk } from "@/app/redux/team/teamSlice";
import { Button } from "../ui/button";
import DirectionIcon from "../icons/DirectionIcon";
import ModalEditTeam from "./ModalEditTeam";
import ModalCreateTeam from "./ModalCreateTeam";
import Card from "../card/Card";

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

const columnHelper = createColumnHelper<Team>();

type Props = {
  data: Team[]
  id: string
}

function TableTeam({ data = [], id }: Props) {

  const dispatch = useAppDispatch()
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
    setColumnFilters([{ id: "name", value: search }])
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
      )
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
    data: data,
    columns,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="h-full" >

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

      <div className="py-4 flex items-center justify-between" >
        <input
          type="search"
          placeholder="Buscar..."
          className="bg-three-700 text-white py-2 px-4 rounded-lg outline-none"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <ModalCreateTeam id={id} />
      </div>

      <Card className="p-0 h-full" >
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
          <TableBody  >
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id} >
                  <TableRow className="border-none bg-three-700 odd:bg-fondo/50 hover:bg-oscuro" >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="hover:bg-[#1F2937] px-4 py-0" colSpan={columns.length} >
                      <Accordion type="single" collapsible value={showPlayers} >
                        <AccordionItem className="border-none" value={row.original._id} >
                          <AccordionContent>
                            <ul className="flex flex-wrap gap-5">
                              {row.original.players?.map((player, index) => (
                                <li key={index} className="w-full text-white text-lg">
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
      </Card>
    </div>
  )
}

export default TableTeam