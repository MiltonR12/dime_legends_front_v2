export const returnPath = (search: string, fallback = "/perfil") => {
  const value = new URLSearchParams(search).get("next")
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback
  return value
}
