import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TBattle } from "@/app/api/battle/battle.types";
import type { Team } from "@/app/api/team/team.types";
import { useDeleteBattle, useBattles } from "@/hooks/battle";
import { useTeamsByTournament } from "@/hooks/team";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ModalDelete from "@/components/modals/ModalDelete";
import UpdateBattleDialog from "@/components/modals/UpdateBattleDialog";
import CreateBattleModal from "@/components/modals/CreateBattleModal";
import ModalShowVersus from "@/components/modals/ModalShowVersus";
import MenuTable from "@/components/menu/MenuTable";
import Image from "@/components/ui/Image";
import { formatDate } from "@/lib/date";
import ShowTeamModal from "@/components/modals/ShowTeamModal";
import { isThisWeek, isThisMonth, isToday } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CardTag from "@/page/admin/dashboard/components/CardTag";
import { Calendar, Search, Swords, Users } from "lucide-react";

const columnHelper = createColumnHelper<TBattle>();
const NO_BATTLES: TBattle[] = [];
const NO_TEAMS: Team[] = [];

function AdminBattlePage() {
  const { id } = useParams();
  const { data: battles = NO_BATTLES } = useBattles(id);
  const { data: teams = NO_TEAMS } = useTeamsByTournament(id);
  const { mutate: removeBattle } = useDeleteBattle();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [query, setQuery] = useState("");
  const [selectBattle, setSelectBattle] = useState<TBattle | null>(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenedit, setIsOpenedit] = useState(false);

  const handleFilter = (value: string) => {
    if (value === "day") setColumnFilters([{ id: "date", value: isToday }]);
    else if (value === "week")
      setColumnFilters([{ id: "date", value: isThisWeek }]);
    else if (value === "month")
      setColumnFilters([{ id: "date", value: isThisMonth }]);
    else setColumnFilters([]);
  };

  const deleteBattle = (battleId: string) => {
    removeBattle(battleId);
    setIsOpenDelete(false);
  };

  const columns = [
    columnHelper.accessor("round", {
      id: "round",
      header: () => (
        <span className="text-sm font-medium text-admin-muted">Ronda</span>
      ),
      cell: ({ getValue }) => (
        <span className="text-sm text-admin-text">{getValue()}</span>
      ),
    }),
    columnHelper.accessor("group", {
      id: "group",
      header: () => (
        <span className="text-sm font-medium text-admin-muted">Grupo</span>
      ),
      cell: ({ getValue }) => (
        <span className="text-sm text-admin-text">
          {getValue() === "B" ? "Loser" : "Winner"}
        </span>
      ),
    }),
    columnHelper.accessor("teamOne", {
      id: "teamOne",
      header: () => (
        <span className="text-sm font-medium text-admin-muted">Equipo 1</span>
      ),
      cell: ({ row, getValue }) => {
        const team = getValue();
        const won = team && row.original.winner === team._id;
        return (
          <div className="flex items-center gap-3">
            <Image
              src={team?.image}
              className="h-10 w-10 rounded-full border border-admin-border object-cover"
            />
            <ShowTeamModal team={row.original.teamOne} />
            <span
              className={
                won ? "text-sm text-admin-accent" : "text-sm text-admin-text"
              }
            >
              {team ? team.name : "Sin designar"}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor("teamTwo", {
      id: "teamTwo",
      header: () => (
        <span className="text-sm font-medium text-admin-muted">Equipo 2</span>
      ),
      cell: ({ getValue, row }) => {
        const team = getValue();
        const won = team && row.original.winner === team._id;
        return (
          <div className="flex items-center gap-3">
            <Image
              src={team?.image}
              className="h-10 w-10 rounded-full border border-admin-border object-cover"
            />
            <ShowTeamModal team={row.original.teamTwo} />
            <span
              className={
                won ? "text-sm text-admin-accent" : "text-sm text-admin-text"
              }
            >
              {team ? team.name : "Sin designar"}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <span className="text-sm font-medium text-admin-muted">Fecha</span>
      ),
      cell: (info) => (
        <span className="text-sm capitalize text-admin-muted">
          {formatDate(info.getValue())}
        </span>
      ),
      filterFn: (row, columnId, filterValue) =>
        filterValue(new Date(row.getValue(columnId))),
    }),
    columnHelper.accessor("_id", {
      id: "_id",
      header: () => (
        <span className="text-sm font-medium text-admin-muted">Acciones</span>
      ),
      cell: (info) => (
        <div className="flex items-center gap-2">
          <MenuTable
            onDelete={() => {
              setIsOpenDelete(true);
              setSelectBattle(info.row.original);
            }}
            onEdit={() => {
              setSelectBattle(info.row.original);
              setIsOpenedit(true);
            }}
          />
          <ModalShowVersus battle={info.row.original} />
        </div>
      ),
    }),
  ];

  const visible = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return battles;
    return battles.filter((battle) =>
      [
        battle.teamOne?.name,
        battle.teamTwo?.name,
        battle.group,
        String(battle.round),
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(text)),
    );
  }, [battles, query]);

  const table = useReactTable({
    data: visible,
    columns,
    autoResetPageIndex: false,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const availableTeams = teams.filter(
    (team) => team.status !== "inactive",
  ).length;
  const thisWeek = battles.filter((battle) =>
    isThisWeek(new Date(battle.date)),
  ).length;

  return (
    <div className="space-y-6">
      {selectBattle && (
        <ModalDelete
          isOpen={isOpenDelete}
          onClose={() => setIsOpenDelete(false)}
          onSuccess={() => deleteBattle(selectBattle._id)}
          title="¿Eliminar este versus?"
          description="Se borra el enfrentamiento. Esta acción no se puede deshacer."
        />
      )}
      {selectBattle && (
        <UpdateBattleDialog
          isOpen={isOpenedit}
          onClose={() => setIsOpenedit(false)}
          battle={selectBattle}
        />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-admin-text">Versus</h1>
          <p className="mt-1 text-sm text-admin-muted">
            Enfrentamientos de este torneo
          </p>
        </div>
        <CreateBattleModal />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <CardTag
          title="Versus"
          value={battles.length}
          icon={<Swords className="h-4 w-4 text-admin-muted" />}
        />
        <CardTag
          title="Equipos disponibles"
          value={availableTeams}
          icon={<Users className="h-4 w-4 text-admin-muted" />}
        />
        <CardTag
          title="Esta semana"
          value={thisWeek}
          icon={<Calendar className="h-4 w-4 text-admin-muted" />}
        />
      </div>

      <Card className="border-admin-border bg-admin-surface shadow-none">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-admin-text">Listado</CardTitle>
              <CardDescription className="text-admin-muted">
                Partidos programados
              </CardDescription>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-muted" />
                <Input
                  type="search"
                  placeholder="Buscar equipo..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-10 w-full border-admin-border bg-admin-input pl-10 text-sm text-admin-text shadow-none placeholder:text-admin-muted focus-visible:ring-admin-accent sm:w-64"
                />
              </div>
              <Select onValueChange={handleFilter}>
                <SelectTrigger className="h-10 w-full border-admin-border bg-admin-input text-admin-text shadow-none sm:w-44">
                  <SelectValue placeholder="Fecha" />
                </SelectTrigger>
                <SelectContent className="border-admin-border bg-admin-surface text-admin-text">
                  <SelectItem
                    value="all"
                    className="focus:bg-admin-row focus:text-admin-text"
                  >
                    Todas
                  </SelectItem>
                  <SelectItem
                    value="day"
                    className="focus:bg-admin-row focus:text-admin-text"
                  >
                    Hoy
                  </SelectItem>
                  <SelectItem
                    value="week"
                    className="focus:bg-admin-row focus:text-admin-text"
                  >
                    Esta semana
                  </SelectItem>
                  <SelectItem
                    value="month"
                    className="focus:bg-admin-row focus:text-admin-text"
                  >
                    Este mes
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-b border-admin-border"
                  >
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-4 py-3 font-medium">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-admin-border text-admin-text hover:bg-admin-input"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-12 text-center"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <Swords className="h-8 w-8 text-admin-muted" />
                        <div>
                          <h3 className="text-sm font-medium text-admin-text">
                            No hay versus
                          </h3>
                          <p className="text-sm text-admin-muted">
                            Crea un enfrentamiento con los equipos del torneo
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminBattlePage;
