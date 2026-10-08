import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useAuth } from "@/hooks/auth";
import {
  useApproveOrganizer,
  useRejectOrganizer,
  useSetUserRole,
  useSetUserStatus,
  useUsers,
} from "@/hooks/user";
import { isSuperAdmin } from "@/lib/roles";
import type { AccountUser } from "@/app/api/user/userApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const NO_USERS: AccountUser[] = [];
const SEARCH_DELAY = 350;
const columnHelper = createColumnHelper<AccountUser>();

const REVIEW_LABEL = {
  pending: "Pendiente",
  approved: "Aprobada",
  rejected: "Rechazada",
} as const;

type RoleValue = "User" | "Creator" | "Admin";

const roleValue = (account: AccountUser): RoleValue => {
  if (account.role?.name === "Admin") return "Admin";
  if (account.role?.name === "Creator") return "Creator";
  return "User";
};

function AdminUsersPage() {
  const { user, isLoading } = useAuth();
  const [page, setPage] = useState(1);
  const [typed, setTyped] = useState("");
  const [search, setSearch] = useState("");
  const {
    data,
    isLoading: loadingUsers,
    isError,
  } = useUsers(page, search, isSuperAdmin(user));
  const users = data?.items ?? NO_USERS;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(typed.trim());
      setPage(1);
    }, SEARCH_DELAY);
    return () => clearTimeout(timer);
  }, [typed]);
  const setRole = useSetUserRole();
  const setStatus = useSetUserStatus();
  const approve = useApproveOrganizer();
  const reject = useRejectOrganizer();
  const busy =
    setRole.isPending ||
    setStatus.isPending ||
    approve.isPending ||
    reject.isPending;

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "name",
        header: "Nombre",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">
              {row.original.firstName} {row.original.lastName}
            </p>
            <p className="text-xs text-admin-muted">{row.original.email}</p>
          </div>
        ),
      }),
      columnHelper.display({
        id: "role",
        header: "Rol",
        cell: ({ row }) => {
          const account = row.original;
          const locked =
            account._id === user?._id || account.role?.name === "Admin" || busy;
          const value = roleValue(account);
          return (
            <Select
              value={value}
              disabled={locked}
              onValueChange={(next) => {
                if (next === "User" || next === "Creator") {
                  setRole.mutate({ id: account._id, role: next });
                }
              }}
            >
              <SelectTrigger
                aria-label={`Rol de ${account.firstName}`}
                className="h-9 w-40 border-admin-border bg-admin-input text-admin-text shadow-none"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-admin-border bg-admin-surface text-admin-text">
                <SelectItem
                  value="User"
                  className="focus:bg-admin-row focus:text-admin-text"
                >
                  Usuario
                </SelectItem>
                <SelectItem
                  value="Creator"
                  className="focus:bg-admin-row focus:text-admin-text"
                >
                  Organizador
                </SelectItem>
                {value === "Admin" && (
                  <SelectItem
                    value="Admin"
                    className="focus:bg-admin-row focus:text-admin-text"
                  >
                    Superadmin
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          );
        },
      }),
      columnHelper.display({
        id: "status",
        header: "Estado",
        cell: ({ row }) => {
          const account = row.original;
          const locked =
            account._id === user?._id || account.role?.name === "Admin" || busy;
          const active = account.status !== false;
          return (
            <label className="flex items-center gap-2">
              <Switch
                checked={active}
                disabled={locked}
                aria-label={
                  active
                    ? `Deshabilitar a ${account.firstName}`
                    : `Habilitar a ${account.firstName}`
                }
                onCheckedChange={(checked) =>
                  setStatus.mutate({ id: account._id, status: checked })
                }
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
              />
              <span className={active ? "text-green-400" : "text-red-400"}>
                {active ? "Habilitado" : "Deshabilitado"}
              </span>
            </label>
          );
        },
      }),
      columnHelper.display({
        id: "request",
        header: "Solicitud",
        cell: ({ row }) => {
          const review = row.original.page?.review;
          return <span>{review ? REVIEW_LABEL[review] : "Sin solicitud"}</span>;
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
          const account = row.original;
          if (
            account.page?.review !== "pending" ||
            account.role?.name === "Admin"
          )
            return null;
          return (
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                disabled={busy}
                onClick={() => approve.mutate(account._id)}
                className="bg-admin-accent text-white hover:bg-admin-accent-hover"
              >
                Aprobar
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={busy}
                onClick={() => reject.mutate(account._id)}
                className="border-admin-border bg-transparent text-admin-text"
              >
                Rechazar
              </Button>
            </div>
          );
        },
      }),
    ],
    [user?._id, busy, setRole, setStatus, approve, reject],
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row._id,
    autoResetPageIndex: false,
  });

  if (isLoading) return null;
  if (!isSuperAdmin(user)) return <Navigate to="/admin" replace />;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-admin-text">Usuarios</h2>
        <p className="text-sm text-admin-muted">
          Aprueba organizadores, cambia roles y habilita cuentas.
        </p>
      </div>

      <Input
        value={typed}
        onChange={(event) => setTyped(event.target.value)}
        placeholder="Buscar por nombre o correo"
        aria-label="Buscar usuarios"
        className="max-w-sm border-admin-border bg-admin-input text-admin-text"
      />

      <div className="overflow-x-auto rounded-lg border border-admin-border">
        <table className="w-full min-w-[760px] text-left text-sm text-admin-text">
          <thead className="bg-admin-surface text-admin-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
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
            {loadingUsers ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-admin-muted"
                >
                  Cargando usuarios...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-red-400">
                  No se pudieron cargar los usuarios
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-admin-muted"
                >
                  No hay usuarios
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t border-admin-border">
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
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-admin-muted">
        <span>
          {data?.total ?? 0} usuarios · página {data?.page ?? 1} de{" "}
          {data?.pages ?? 1}
        </span>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
            className="border-admin-border bg-transparent text-admin-text"
          >
            Anterior
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={page >= (data?.pages ?? 1)}
            onClick={() => setPage((current) => current + 1)}
            className="border-admin-border bg-transparent text-admin-text"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminUsersPage;
