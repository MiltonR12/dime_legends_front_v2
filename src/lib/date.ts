type DateSize = "short" | "large"
type DatePart = "full" | "day" | "time"

const DAY: Record<DateSize, Intl.DateTimeFormatOptions> = {
  short: { weekday: "short", day: "numeric", month: "short" },
  large: { weekday: "long", day: "numeric", month: "long" },
}

const TIME: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
}

/**
 * Fecha en español.
 * `short` es la de las tablas; `large` escribe el día y el mes completos.
 * `day` y `time` parten esa misma fecha cuando la interfaz las muestra separadas.
 */
export function formatDate(
  value: Date | string | number | null | undefined,
  size: DateSize = "short",
  part: DatePart = "full",
) {
  if (value == null || value === "") return ""
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  if (part === "time") return date.toLocaleTimeString("es", TIME)
  if (part === "day") return date.toLocaleDateString("es", DAY[size])
  return date.toLocaleDateString("es", { ...DAY[size], ...TIME })
}
