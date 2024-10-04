import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { TDataTeam } from "@/payments/columns"
import SelectStatusTeam from "../select/SelectStatusTeam";
import { Fragment } from "react/jsx-runtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { GrStatusGood } from "react-icons/gr";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Team } from "@/app/redux/team/team";

const columnHelper = createColumnHelper<TDataTeam>();

type Props = {
  data: Team[]
}

function TableTeam({ data }: Props) {

  const [dataTeam, setDataTeam] = useState<TDataTeam[]>([])

  useEffect(() => {
    const newTeams = data.map((item) => {
      return {
        _id: item._id,
        teamName: item.teamName,
        captain: item.captain,
        status: item.status,
        createdAt: item.createdAt,
        players: item.players,
        image: item.image || ''
      }
    })
    setDataTeam(newTeams)
  }, [data])

  const columns = [
    columnHelper.accessor("image", {
      id: "image",
      header: () => (
        <p className="text-sm font-bold text-white">
          Imagen
        </p>
      ),
      cell: (info) => (
        <div>
          {info.getValue() === "" ? <RiTeamFill className="w-10 h-10 text-white" />
            : <img src={info.getValue()} alt="team" className="w-10 h-10 rounded-full" />}
        </div>
      ),
    }),
    columnHelper.accessor("teamName", {
      id: "teamName",
      header: () => (
        <p className="text-sm font-bold text-white">
          Nombre
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("captain", {
      id: "captain",
      header: () => (
        <p className="text-sm font-bold text-white">
          Título
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
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
        <p className="text-sm flex gap-5 font-bold text-navy-700 dark:text-white">
          <SelectStatusTeam
            _id={info.row.original._id}
            defaultValue={info.row.original.status}
          />
        </p>
      ),
    })
  ];

  const table = useReactTable({
    data: dataTeam,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-lg">
      <Table className=" bg-[#111827]" >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="bg-primary/10" key={headerGroup.id}>
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Fragment key={row.id} >
                <TableRow className=" border-none odd:bg-fondo/50 hover:bg-oscuro" >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="border-none" >
                  <TableCell className="hover:bg-[#1F2937] px-4 py-0 border-none" colSpan={columns.length} >
                    <Accordion type="single" collapsible >
                      <AccordionItem value="item-1" >
                        <AccordionTrigger>
                          Integrantes
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-wrap gap-5">
                            {row.original.players.map((player, index) => (
                              <div key={index} className="w-full p-2 rounded-lg">
                                <p className="text-sm font-bold text-white">
                                  {player}
                                </p>
                              </div>
                            ))}
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default TableTeam