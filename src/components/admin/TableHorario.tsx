import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { TDataHorario } from "@/payments/columns";
import CreateBattleModal from "../modals/CreateBattleModal";
import { TBattle } from "@/app/redux/battle/battle";
import { useEffect, useState } from "react";
import { BsMicrosoftTeams } from "react-icons/bs";
import { useAppDispatch } from "@/app/store";
import { deleteBattleThunk, generateBattleThunk, winnerBattleThunk } from "@/app/redux/battle/battleSlice";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "../ui/button";
import ShowTeamModal from "../modals/ShowTeamModal";
import UpdateBattleDialog from "../modals/UpdateBattleDialog";
import { useParams } from "react-router-dom";
import { PWinnerBattle } from "@/app/api/battle/battle";

const columnHelper = createColumnHelper<TDataHorario>();

type Props = {
  data: TBattle[]
}

function TableHorario({ data }: Props) {

  const [dataBattle, setDataBattle] = useState<TDataHorario[]>([])
  const dispatch = useAppDispatch()
  const { id } = useParams()

  const generateBattle = () => {
    if (id) {
      dispatch(generateBattleThunk(id))
    }
  }

  const winnerBattle = (data: PWinnerBattle) => {
    dispatch(winnerBattleThunk(data))
  }

  const deleteBattle = (id: string) => {
    dispatch(deleteBattleThunk(id))
  }

  useEffect(() => {
    setDataBattle(data.map((item) => {
      return {
        _id: item._id,
        _idOne: item.teamOne?._id || "",
        teamOne: item.teamOne?.teamName || "Sin equipo",
        imageOne: item.teamOne?.image || "",
        captainOne: item.teamOne?.captain || "",
        playersOne: item.teamOne?.players || [],
        _idTwo: item.teamTwo?._id || "",
        teamTwo: item.teamTwo?.teamName || "Sin equipo",
        imageTwo: item.teamTwo?.image || "",
        captainTwo: item.teamTwo?.captain || "",
        playersTwo: item.teamTwo?.players || [],
        date: item.date,
        hour: item.hour,
        round: item.round,
        nro: item.nro,
        winner: item.winner
      }
    }))
  }, [data])

  const columns = [
    columnHelper.accessor("teamOne", {
      id: "teamOne",
      header: () => (
        <p className="text-sm font-bold text-white">
          Equipo 1
        </p>
      ),
      cell: (info) => (
        <div className="flex justify-between gap-5 items-center" >
          {info.row.original.imageOne ? <img src={info.row.original.imageOne} alt="team" className="w-10 h-10 rounded-full" /> : <BsMicrosoftTeams className="w-10 h-10 rounded-full text-primary" />}
          <Button
            className={info.row.original.winner === info.row.original._idOne ? "bg-green-500" : ""}
            onClick={() => winnerBattle({
              id: info.row.original._id,
              winner: info.row.original._idOne,
              tournament: id || ""
            })} >
            {info.getValue()}
          </Button>
          <ShowTeamModal
            captain={info.row.original.captainOne}
            players={info.row.original.playersOne}
          />
        </div>
      ),
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-white">
          Fecha
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {new Date(info.getValue()).toLocaleDateString("es", {
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </p>
      ),
    }),
    columnHelper.accessor("hour", {
      id: "hour",
      header: () => (
        <p className="text-sm font-bold text-white">
          Hora
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("teamTwo", {
      id: "teamTwo",
      header: () => (
        <p className="text-sm font-bold text-white">
          Equipo 2
        </p>
      ),
      cell: (info) => (
        <div className="font-bold flex justify-between items-center gap-5 select-none">
          {info.row.original.imageTwo ? <img src={info.row.original.imageTwo} alt="team" className="w-10 h-10 rounded-full" /> : <BsMicrosoftTeams className="w-10 h-10 rounded-full text-secondary" />}
          <Button
            className={info.row.original.winner === info.row.original._idTwo ? "bg-green-500" : ""}
            onClick={() => winnerBattle({
              id: info.row.original._id,
              winner: info.row.original._idTwo,
              tournament: id || ""
            })}
          >
            {info.getValue()}
          </Button>
          <ShowTeamModal captain={info.row.original.captainTwo} players={info.row.original.playersTwo} />
        </div>
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
          <Button className="text-red-500 text-lg" onClick={() => deleteBattle(info.row.original._id)} >
            <MdDeleteForever />
          </Button>
          <UpdateBattleDialog
            currentDate={new Date(info.row.original.date)}
            currentHour={info.row.original.hour}
            currentOne={info.row.original._idOne}
            currentTwo={info.row.original._idTwo}
            id={info.row.original._id}
          />
        </p>
      ),
    })
  ];

  const table = useReactTable({
    data: dataBattle,
    columns,
    getCoreRowModel: getCoreRowModel(),
    sortDescFirst: true,
  })

  return (
    <div className="rounded-lg">
      <div className="bg-fondo" >
        <h1 className="text-2xl font-bold text-white p-5">Horarios</h1>
        <div>
          <CreateBattleModal />
        </div>

        <Button onClick={generateBattle} >
          Generar Horario
        </Button>
      </div>

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
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className=" border-none odd:bg-fondo/50 hover:bg-oscuro" >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
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