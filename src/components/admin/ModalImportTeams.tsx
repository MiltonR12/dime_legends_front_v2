import { useRef, useState } from "react";
import { isAxiosError } from "axios";
import {
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Loader2,
  Sparkles,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomToast } from "@/lib/handleToast";
import { useCommitImport, usePreviewImport } from "@/hooks/team";
import type {
  ImportPreviewTeam,
  ImportResult,
} from "@/app/api/team/team.types";

// Debe coincidir con el límite del backend.
const MAX_SHEET_CHARS = 40000;
const DUPLICATE = "Ya existe un equipo con ese nombre";

type Row = {
  key: number;
  name: string;
  captain: string;
  phone: string;
  players: string;
  include: boolean;
  originalName: string;
  serverIssue: string | null;
};

const toRow = (team: ImportPreviewTeam, key: number): Row => ({
  key,
  name: team.name,
  captain: team.captain,
  phone: team.phone,
  players: team.players.join(", "),
  include: !team.issue,
  originalName: team.name,
  serverIssue: team.issue,
});

const splitPlayers = (value: string) =>
  value
    .split(/[,\n;]/)
    .map((player) => player.trim())
    .filter(Boolean);

const issueOf = (row: Row) => {
  if (row.serverIssue === DUPLICATE && row.name.trim() === row.originalName)
    return DUPLICATE;
  if (!row.name.trim()) return "Falta el nombre";
  if (!row.captain.trim()) return "Falta el capitán";
  if (!row.phone.trim()) return "Falta el teléfono";
  if (splitPlayers(row.players).length === 0) return "Faltan los jugadores";
  return null;
};

/** Convierte la hoja en texto plano para que la IA lo interprete. */
const sheetToText = async (file: File) => {
  const { readSheet } = await import("read-excel-file/browser");
  const rows = await readSheet(file);
  return rows
    .map((row) =>
      row.map((cell) => (cell == null ? "" : String(cell))).join("\t"),
    )
    .filter((line) => line.replace(/\t/g, "").trim() !== "")
    .join("\n");
};

function UploadStep({
  onFile,
  loading,
}: {
  onFile: (file: File) => void;
  loading: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <button
        type="button"
        disabled={loading}
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center gap-3 rounded-lg border border-dashed border-admin-border bg-admin-input px-6 py-10 text-center transition hover:border-admin-accent disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? (
          <Loader2 className="h-8 w-8 animate-spin text-admin-accent" />
        ) : (
          <Upload className="h-8 w-8 text-admin-muted" />
        )}
        <span className="text-sm font-medium text-admin-text">
          {loading
            ? "La IA está leyendo tu Excel…"
            : "Selecciona un archivo .xlsx"}
        </span>
        <span className="text-xs text-admin-muted">
          {loading
            ? "Puede tardar unos segundos"
            : "Puede tener las columnas en cualquier orden, una fila por equipo o una por jugador"}
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) onFile(file);
        }}
      />

      <p className="flex items-start gap-2 text-xs text-admin-muted">
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-admin-accent" />
        Antes de importar verás los equipos detectados para que los revises y
        corrijas.
      </p>
    </div>
  );
}

function ReviewStep({
  rows,
  setRows,
  pending,
  onBack,
  onCommit,
}: {
  rows: Row[];
  setRows: (update: (rows: Row[]) => Row[]) => void;
  pending: boolean;
  onBack: () => void;
  onCommit: () => void;
}) {
  const change = (key: number, patch: Partial<Row>) =>
    setRows((current) =>
      current.map((row) => (row.key === key ? { ...row, ...patch } : row)),
    );

  const ready = rows.filter((row) => row.include && !issueOf(row)).length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-admin-muted">
        Se detectaron{" "}
        <span className="font-medium text-admin-text">{rows.length}</span>{" "}
        equipos. Corrige lo que haga falta y desmarca los que no quieras
        importar.
      </p>

      <div className="max-h-[50vh] space-y-3 overflow-y-auto pr-1">
        {rows.map((row) => {
          const issue = issueOf(row);
          return (
            <div
              key={row.key}
              className={`rounded-lg border p-3 ${issue ? "border-red-500/40 bg-red-950/20" : "border-admin-border bg-admin-input"}`}
            >
              <div className="mb-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  aria-label={`Importar ${row.name || "equipo"}`}
                  checked={row.include && !issue}
                  disabled={!!issue}
                  onChange={(event) =>
                    change(row.key, { include: event.target.checked })
                  }
                  className="h-4 w-4 accent-purple-500"
                />
                {issue ? (
                  <span className="flex items-center gap-1 text-xs text-red-300">
                    <AlertTriangle className="h-3.5 w-3.5" /> {issue}
                  </span>
                ) : (
                  <span className="text-xs text-admin-muted">
                    Listo para importar
                  </span>
                )}
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <Input
                  value={row.name}
                  onChange={(event) =>
                    change(row.key, { name: event.target.value, include: true })
                  }
                  placeholder="Equipo"
                  aria-label="Nombre del equipo"
                  className="border-admin-border bg-admin-bg text-admin-text"
                />
                <Input
                  value={row.captain}
                  onChange={(event) =>
                    change(row.key, {
                      captain: event.target.value,
                      include: true,
                    })
                  }
                  placeholder="Capitán"
                  aria-label="Capitán"
                  className="border-admin-border bg-admin-bg text-admin-text"
                />
                <Input
                  value={row.phone}
                  onChange={(event) =>
                    change(row.key, {
                      phone: event.target.value,
                      include: true,
                    })
                  }
                  placeholder="Teléfono"
                  aria-label="Teléfono"
                  className="border-admin-border bg-admin-bg text-admin-text"
                />
              </div>
              <Input
                value={row.players}
                onChange={(event) =>
                  change(row.key, {
                    players: event.target.value,
                    include: true,
                  })
                }
                placeholder="Jugadores separados por coma"
                aria-label="Jugadores"
                className="mt-2 border-admin-border bg-admin-bg text-admin-text"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between gap-3 border-t border-admin-border pt-4">
        <Button
          type="button"
          variant="outline"
          disabled={pending}
          onClick={onBack}
          className="border-admin-border bg-transparent text-admin-text hover:bg-admin-input"
        >
          Elegir otro archivo
        </Button>
        <Button
          type="button"
          disabled={pending || ready === 0}
          onClick={onCommit}
          className="bg-admin-accent text-white hover:bg-admin-accent-hover"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Importando…
            </span>
          ) : (
            `Importar ${ready} ${ready === 1 ? "equipo" : "equipos"}`
          )}
        </Button>
      </div>
    </div>
  );
}

function ResultStep({
  result,
  onClose,
}: {
  result: ImportResult;
  onClose: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-lg border border-admin-border bg-admin-input p-4">
        <CheckCircle2 className="h-6 w-6 text-admin-accent" />
        <p className="text-sm text-admin-text">
          {result.created.length}{" "}
          {result.created.length === 1
            ? "equipo importado"
            : "equipos importados"}
        </p>
      </div>

      {result.skipped.length > 0 ? (
        <div className="rounded-lg border border-red-500/40 bg-red-950/20 p-4">
          <p className="mb-2 text-sm font-medium text-red-200">
            No se importaron {result.skipped.length}:
          </p>
          <ul className="space-y-1 text-sm text-red-200/90">
            {result.skipped.map((item) => (
              <li key={item.name}>
                <span className="font-medium">{item.name}</span> — {item.reason}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex justify-end border-t border-admin-border pt-4">
        <Button
          type="button"
          onClick={onClose}
          className="bg-admin-accent text-white hover:bg-admin-accent-hover"
        >
          Listo
        </Button>
      </div>
    </div>
  );
}

function ModalImportTeams({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const preview = usePreviewImport();
  const commit = useCommitImport();

  const reset = () => {
    setRows(null);
    setResult(null);
  };

  const changeOpen = (next: boolean) => {
    // No se cierra mientras la IA o la importación están trabajando.
    if (!next && (preview.isPending || commit.isPending)) return;
    setOpen(next);
    if (!next) reset();
  };

  const handleFile = async (file: File) => {
    try {
      const sheet = await sheetToText(file);
      if (!sheet) return CustomToast.error("El archivo no tiene datos");
      if (sheet.length > MAX_SHEET_CHARS)
        return CustomToast.error(
          "El archivo es demasiado grande. Divídelo en partes",
        );

      const teams = await preview.mutateAsync({ tournament: id, sheet });
      if (teams.length === 0)
        return CustomToast.warning("No se encontraron equipos en el archivo");
      setRows(teams.map(toRow));
    } catch (error) {
      // Los errores de la API ya muestran su aviso; aquí queda el archivo inválido.
      if (!isAxiosError(error)) {
        CustomToast.error(
          "No se pudo leer el archivo. Usa un Excel .xlsx válido",
        );
      }
    }
  };

  const handleCommit = () => {
    if (!rows) return;
    const teams = rows
      .filter((row) => row.include && !issueOf(row))
      .map((row) => ({
        name: row.name.trim(),
        captain: row.captain.trim(),
        phone: row.phone.trim(),
        players: splitPlayers(row.players),
      }));

    commit
      .mutateAsync({ tournament: id, teams })
      .then(setResult)
      .catch(() => undefined);
  };

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-admin-border bg-transparent text-admin-text hover:bg-admin-input hover:text-admin-text"
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Importar Excel
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl border-admin-border bg-admin-surface">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-admin-text">
            <FileSpreadsheet className="h-5 w-5 text-admin-muted" /> Importar
            equipos desde Excel
          </DialogTitle>
          <DialogDescription className="text-admin-muted">
            La IA lee el archivo y propone los equipos. Tú decides cuáles
            importar.
          </DialogDescription>
        </DialogHeader>

        {result ? (
          <ResultStep result={result} onClose={() => changeOpen(false)} />
        ) : rows ? (
          <ReviewStep
            rows={rows}
            setRows={(update) =>
              setRows((current) => (current ? update(current) : current))
            }
            pending={commit.isPending}
            onBack={reset}
            onCommit={handleCommit}
          />
        ) : (
          <UploadStep onFile={handleFile} loading={preview.isPending} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ModalImportTeams;
