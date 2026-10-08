import { useDeleteTeam, useTeamsByTournament } from "@/hooks/team";
import { useParams } from "react-router-dom";
import {
  type ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment } from "react/jsx-runtime";
import type { Team } from "@/app/api/team/team.types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomToast } from "@/lib/handleToast";
import ModalDelete from "@/components/modals/ModalDelete";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import SelectStatusTeam from "@/components/select/SelectStatusTeam";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import CardTag from "@/page/admin/dashboard/components/CardTag";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Receipt,
  UserCheck,
  Clock,
  Copy,
  Loader2,
} from "lucide-react";
import ModalCreateTeam from "@/components/admin/ModalCreateTeam";
import ModalEditTeam from "@/components/admin/ModalEditTeam";
import ModalImportTeams from "@/components/admin/ModalImportTeams";

const columnHelper = createColumnHelper<Team>();
const NO_TEAMS: Team[] = [];

function AdminTeamPage() {
  const { id } = useParams();
  const {
    data: teams = NO_TEAMS,
    isLoading,
    isError,
    refetch,
  } = useTeamsByTournament(id);
  const { mutateAsync: deleteTeam } = useDeleteTeam();

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [showPlayers, setShowPlayers] = useState("");
  const [team, setTeam] = useState<Team | null>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchValue, setSearchValue] = useState("");

  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone).then(() => {
      CustomToast.info("Teléfono copiado al portapapeles");
    });
  };

  const handleSearch = (search: string) => {
    setSearchValue(search);
    setColumnFilters((prev) => {
      const filtered = prev.filter((filter) => filter.id !== "name");
      if (search) {
        return [...filtered, { id: "name", value: search }];
      }
      return filtered;
    });
  };

  const handleFilterStatus = (status: string) => {
    setColumnFilters((prev) => {
      const filtered = prev.filter((filter) => filter.id !== "status");
      if (status === "all") {
        return filtered;
      }
      return [...filtered, { id: "status", value: status }];
    });
  };

  const handleDelete = (teamId: string) => {
    deleteTeam({ id: teamId, tournament: id || "" })
      .then(() => {
        setIsOpenDelete(false);
        CustomToast.success("Equipo eliminado correctamente");
      })
      .catch(() => undefined);
  };

  const handleShowPlayers = (id: string) => {
    setShowPlayers(id === showPlayers ? "" : id);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="text-sm text-admin-accent">Habilitado</span>;
      case "inactive":
        return <span className="text-sm text-red-300">Deshabilitado</span>;
      case "pending":
        return <span className="text-sm text-admin-muted">Pendiente</span>;
      default:
        return <span className="text-sm text-admin-muted">Desconocido</span>;
    }
  };

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <span className="text-sm font-medium text-admin-muted">Equipo</span>
      ),
      cell: (info) => (
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShowPlayers(info.row.original._id)}
            className="h-8 w-8 p-0 text-admin-muted hover:bg-admin-input hover:text-admin-text"
            aria-label="Ver jugadores"
          >
            {showPlayers === info.row.original._id ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          <img
            src={info.row.original.image || "/placeholder.svg"}
            alt=""
            className="h-10 w-10 rounded-md border border-admin-border object-cover"
          />
          <div>
            <p className="text-sm font-medium text-admin-text">
              {info.getValue()}
            </p>
            <p className="text-xs text-admin-muted">
              {info.row.original.players?.length || 0} jugadores
            </p>
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
        <span className="text-sm font-medium text-admin-muted">Capitán</span>
      ),
      cell: (info) => (
        <span className="text-sm text-admin-text">{info.getValue()}</span>
      ),
    }),

    columnHelper.accessor("phone", {
      id: "phone",
      header: () => (
        <span className="text-sm font-medium text-admin-muted">Contacto</span>
      ),
      cell: (info) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyPhone(info.getValue())}
          className="font-mono text-sm text-admin-muted hover:bg-admin-input hover:text-admin-text"
        >
          <Copy className="h-3 w-3 mr-2" />
          {info.getValue()}
        </Button>
      ),
    }),

    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <span className="text-sm font-medium text-admin-muted">Estado</span>
      ),
      cell: (info) => getStatusBadge(info.getValue()),
      filterFn: (rows, id, value) => rows.getValue(id) === value,
    }),

    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <span className="text-sm font-medium text-admin-muted">Registro</span>
      ),
      cell: (info) => (
        <div className="text-sm text-admin-muted">
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
      header: () => (
        <span className="text-sm font-medium text-admin-muted">Acciones</span>
      ),
      cell: (info) => (
        <div className="flex items-center gap-2">
          <SelectStatusTeam
            _id={info.row.original._id}
            tournament={id || ""}
            defaultValue={info.row.original.status}
          />

          {info.row.original.voucher && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-admin-muted hover:bg-admin-input hover:text-admin-text"
                >
                  <Receipt className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md border-admin-border bg-admin-surface">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-admin-text">
                    <Receipt className="h-5 w-5 text-admin-muted" />
                    Comprobante de pago
                  </DialogTitle>
                  <DialogDescription className="text-admin-muted">
                    Comprobante del equipo {info.row.original.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <img
                    src={info.row.original.voucher || "/placeholder.svg"}
                    alt="Comprobante"
                    className="w-full rounded-lg border border-admin-border"
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-admin-muted hover:bg-admin-input hover:text-admin-text"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border-admin-border bg-admin-surface"
              align="end"
            >
              <DropdownMenuLabel className="text-admin-muted">
                Acciones
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-admin-border" />
              <DropdownMenuItem
                onClick={() => {
                  setTeam(info.row.original);
                  setIsOpenEdit(true);
                }}
                className="cursor-pointer text-admin-text focus:bg-admin-row focus:text-admin-text"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTeam(info.row.original);
                  setIsOpenDelete(true);
                }}
                className="cursor-pointer text-red-300 focus:bg-red-950/40 focus:text-red-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: teams,
    columns,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (!id) return null;

  // Estadísticas
  const totalTeams = teams.length;
  const activeTeams = teams.filter((team) => team.status === "active").length;
  const pendingTeams = teams.filter((team) => team.status === "pending").length;
  const totalPlayers = teams.reduce(
    (acc, team) => acc + (team.players?.length || 0),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Modales */}
      {team && (
        <ModalEditTeam
          data={team}
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
        />
      )}
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
          <h1 className="text-2xl font-semibold text-admin-text">Equipos</h1>
          <p className="mt-1 text-sm text-admin-muted">
            Inscripciones de este torneo
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ModalImportTeams id={id} />
          <ModalCreateTeam id={id} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <CardTag
          title="Total equipos"
          value={totalTeams}
          icon={<Users className="h-4 w-4 text-admin-muted" />}
        />
        <CardTag
          title="Habilitados"
          value={activeTeams}
          icon={<UserCheck className="h-4 w-4 text-admin-muted" />}
        />
        <CardTag
          title="Pendientes"
          value={pendingTeams}
          icon={<Clock className="h-4 w-4 text-admin-muted" />}
        />
        <CardTag
          title="Jugadores"
          value={totalPlayers}
          icon={<Users className="h-4 w-4 text-admin-muted" />}
        />
      </div>

      <Card className="border-admin-border bg-admin-surface shadow-none">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-admin-text">Listado</CardTitle>
              <CardDescription className="text-admin-muted">
                Equipos inscritos en el torneo
              </CardDescription>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-muted" />
                <Input
                  type="search"
                  placeholder="Buscar equipos..."
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="h-10 w-full border-admin-border bg-admin-input pl-10 text-sm text-admin-text shadow-none placeholder:text-admin-muted focus-visible:ring-admin-accent sm:w-64"
                />
              </div>
              <Select onValueChange={handleFilterStatus}>
                <SelectTrigger className="h-10 w-full border-admin-border bg-admin-input text-admin-text shadow-none sm:w-44">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent className="border-admin-border bg-admin-surface text-admin-text">
                  <SelectItem
                    value="all"
                    className="focus:bg-admin-row focus:text-admin-text"
                  >
                    Todos
                  </SelectItem>
                  <SelectItem
                    value="active"
                    className="focus:bg-admin-row focus:text-admin-text"
                  >
                    Habilitados
                  </SelectItem>
                  <SelectItem
                    value="inactive"
                    className="focus:bg-admin-row focus:text-admin-text"
                  >
                    Deshabilitados
                  </SelectItem>
                  <SelectItem
                    value="pending"
                    className="focus:bg-admin-row focus:text-admin-text"
                  >
                    Pendientes
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-admin-muted">
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
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-12 text-center"
                    >
                      <div className="flex flex-col items-center gap-3 text-admin-muted">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <p className="text-sm">Cargando equipos…</p>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-12 text-center"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <p className="text-sm text-red-300">
                          No se pudieron cargar los equipos
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => refetch()}
                          className="border-admin-border bg-transparent text-admin-text hover:bg-admin-input"
                        >
                          Reintentar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <Fragment key={row.id}>
                      <tr className="border-b border-admin-border text-admin-text hover:bg-admin-input">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-3">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        ))}
                      </tr>

                      <tr className="border-b border-admin-border">
                        <td className="p-0" colSpan={columns.length}>
                          <Accordion
                            type="single"
                            collapsible
                            value={showPlayers}
                          >
                            <AccordionItem
                              className="border-none"
                              value={row.original._id}
                            >
                              <AccordionContent className="px-4 pb-4">
                                <div className="rounded-lg border border-admin-border bg-admin-input p-4">
                                  <h4 className="mb-3 text-sm font-medium text-admin-text">
                                    Jugadores (
                                    {row.original.players?.length || 0})
                                  </h4>
                                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                    {row.original.players?.length ? (
                                      row.original.players.map(
                                        (player, index) => (
                                          <div
                                            key={`${player}-${index}`}
                                            className="flex items-center gap-2 rounded-md border border-admin-border bg-admin-bg px-3 py-2"
                                          >
                                            <span className="text-xs text-admin-muted">
                                              {index + 1}
                                            </span>
                                            <span className="text-sm text-admin-text">
                                              {player}
                                            </span>
                                          </div>
                                        ),
                                      )
                                    ) : (
                                      <p className="text-sm text-admin-muted">
                                        No hay jugadores registrados
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </td>
                      </tr>
                    </Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-12 text-center"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <Users className="h-8 w-8 text-admin-muted" />
                        <div>
                          <h3 className="text-sm font-medium text-admin-text">
                            No hay equipos
                          </h3>
                          <p className="text-sm text-admin-muted">
                            Aparecen aquí cuando se inscriben al torneo
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

export default AdminTeamPage;
