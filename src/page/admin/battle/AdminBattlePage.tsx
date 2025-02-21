import { ColumnFiltersState, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { TBattle } from "@/app/redux/battle/battle";
import { RootState, useAppDispatch } from "@/app/store";
import { deleteBattleThunk, getBattlesThunk } from "@/app/redux/battle/battleSlice";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalDelete from "@/components/modals/ModalDelete";
import UpdateBattleDialog from "@/components/modals/UpdateBattleDialog";
import CreateBattleModal from "@/components/modals/CreateBattleModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ModalShowVersus from "@/components/modals/ModalShowVersus";
import MenuTable from "@/components/menu/MenuTable";
import Image from "@/components/ui/Image";
import ShowTeamModal from "@/components/modals/ShowTeamModal";

import { isToday, isThisWeek, isThisMonth } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const columnHelper = createColumnHelper<TBattle>();

function AdminBattlePage() {

  const dispatch = useAppDispatch()
  const { battles } = useSelector((state: RootState) => state.battle)
  const { id } = useParams()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [selectBattle, setSelectBattle] = useState<TBattle | null>(null)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenedit, setIsOpenedit] = useState(false)
  const rowRef = useRef<HTMLTableRowElement>(null)

  const handleFilter = (value: string) => {
    switch (value) {
      case "day":
        setColumnFilters([{ id: "date", value: isToday }]);
        break;
      case "week":
        setColumnFilters([{ id: "date", value: isThisWeek }]);
        break;
      case "month":
        setColumnFilters([{ id: "date", value: isThisMonth }]);
        break;
      default:
    }
  };

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
            <ShowTeamModal captain={team?.captain || ""} players={team?.players || []} />
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
      filterFn: (row, columnId, filterValue) => {
        const rowDate = new Date(row.getValue(columnId));
        return filterValue(rowDate);
      },
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

            <ShowTeamModal
              captain={team?.captain || ""}
              players={team?.players || []}
            />

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
    data: battles,
    columns,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    sortDescFirst: true,
  })

  useEffect(() => {
    if (id) dispatch(getBattlesThunk(id))
  }, [dispatch, id])

  return (
    <div className="rounded-lg h-full grid grid-rows-[auto_auto_1fr] gap-5" >

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

      <div className="flex gap-5" >
        <input
          type="search"
          placeholder="Buscar..."
          className="bg-three-700 text-white py-2 px-4 rounded-lg outline-none"
        />

        <Select onValueChange={handleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Hoy</SelectItem>
            <SelectItem value="week">Esta Semana</SelectItem>
            <SelectItem value="month">Este mes</SelectItem>
          </SelectContent>
        </Select>
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} ref={rowRef} >
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

export default AdminBattlePage