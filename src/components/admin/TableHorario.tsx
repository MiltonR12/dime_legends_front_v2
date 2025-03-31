import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import CreateBattleModal from "../modals/CreateBattleModal";
import { TBattle } from "@/app/redux/battle/battle";
import { useAppDispatch } from "@/app/store";
import { deleteBattleThunk } from "@/app/redux/battle/battleSlice";
import ShowTeamModal from "../modals/ShowTeamModal";
import MenuTable from "../menu/MenuTable";
import Image from "../ui/Image";
import { useRef, useState } from "react";
import ModalDelete from "../modals/ModalDelete";
import UpdateBattleDialog from "../modals/UpdateBattleDialog";
import ModalShowVersus from "../modals/ModalShowVersus";

const columnHelper = createColumnHelper<TBattle>();

type Props = {
  data: TBattle[]
}

function TableHorario({ data }: Props) {

  const dispatch = useAppDispatch()
  const [selectBattle, setSelectBattle] = useState<TBattle | null>(null)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenedit, setIsOpenedit] = useState(false)
  const rowRef = useRef<HTMLTableRowElement>(null)

  const deleteBattle = (id: string) => {
    dispatch(deleteBattleThunk(id))
  }

  const columns = [
    columnHelper.accessor("teamOne", {
      id: "teamOne",
      header: () => (
        <p className="text-sm text-center font-bold text-white">
          Equipo 1
        </p>
      ),
      cell: ({ row, getValue }) => {
        const team = getValue()
        return (
          <div className="font-semibold grid grid-cols-[auto_auto_1fr] gap-5 items-center" >
            <Image src={team?.image} className="w-10 h-10 rounded-full" />
            <ShowTeamModal team={row.original.teamOne} />
            <h3 className={row.original.winner === row.original.teamOne?._id ? "text-green-500" : ""} >
              {team ? team.name : "Sin designar"}
            </h3>
          </div>
        )
      },
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <p className="text-sm text-center font-bold text-white">
          Fecha
        </p>
      ),
      cell: (info) => (
        <p className="text-sm text-center capitalize font-bold text-navy-700 dark:text-white">
          {new Date(info.getValue()).toLocaleDateString("es", {
            month: "short",
            day: "numeric",
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      ),
    }),
    columnHelper.accessor("teamTwo", {
      id: "teamTwo",
      header: () => (
        <p className="text-sm font-bold text-center text-white">
          Equipo 2
        </p>
      ),
      cell: ({ getValue, row }) => {
        const team = getValue()
        return (
          <div className="font-semibold grid grid-cols-[1fr_auto_auto] items-center gap-5 select-none">
            <h3 className={row.original.winner === team?._id ? "text-green-500" : ""} >
              {team ? team.name : "Sin designar"}
            </h3>

            <ShowTeamModal team={row.original.teamTwo} />

            <Image src={team?.image} className="w-10 h-10 rounded-full" />
          </div>
        )
      }
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
          <MenuTable
            onDelete={() => {
              setIsOpenDelete(true)
              setSelectBattle(info.row.original)
            }}
            onEdit={() => {
              setSelectBattle(info.row.original)
              setIsOpenedit(true)
            }}
          />
          <ModalShowVersus battle={info.row.original} />
        </div>
      ),
    })
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    sortDescFirst: true,
  })

  return (
    <div className="rounded-lg h-full grid grid-rows-[auto_1fr] gap-5" >

      {selectBattle && <ModalDelete
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        onSuccess={() => deleteBattle(selectBattle._id)}
        title="Eliminar Versus"
        description="Esta acción no se puede deshacer y se eliminará permanentemente."
      />}

      {
        selectBattle && <UpdateBattleDialog
          isOpen={isOpenedit}
          onClose={() => setIsOpenedit(false)}
          battle={selectBattle}
        />
      }

      <div className="bg-fondo flex justify-between" >
        <h1 className="text-2xl font-bold text-white p-5">Horarios</h1>
        <div>
          <CreateBattleModal />
        </div>
      </div>

      <Table className="h-full overflow-y-scroll" >
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
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} ref={rowRef} className="border-none odd:bg-fondo/50 hover:bg-oscuro" >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
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

export default TableHorario