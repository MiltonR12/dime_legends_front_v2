import { useEffect } from "react"
import { matchPath, useLocation } from "react-router-dom"

const SITE = "Dime Legends"

export const titleOf = (name?: string | null) => (name ? `${name} | ${SITE}` : SITE)

// Páginas con título fijo. Las que dependen de datos (torneo, equipo, organizador) lo ponen con `usePageTitle`.
const ROUTE_TITLES: [pattern: string, title: string][] = [
  ["/", SITE],
  ["/torneos", "Torneos"],
  ["/sobre-nosotros", "Sobre nosotros"],
  ["/contacto", "Contacto"],
  ["/login", "Iniciar sesión"],
  ["/register", "Crear cuenta"],
  ["/perfil", "Mi perfil"],
  ["/torneo/team/create/:id", "Inscribir equipo"],
  ["/admin", "Panel"],
  ["/admin/usuarios", "Usuarios"],
  ["/admin/equipos", "Mis equipos"],
  ["/admin/organizador", "Mi página de organizador"],
  ["/admin/torneo/create", "Crear torneo"],
  ["/admin/torneo/:id", "Administrar torneo"],
  ["/admin/torneo/equipos/:id", "Equipos del torneo"],
  ["/admin/torneo/versus/:id", "Enfrentamientos"],
  ["/admin/torneo/bracket/:id", "Bracket"],
  ["/admin/torneo/obs/:id", "Transmisión OBS"],
]

const DYNAMIC = ["/torneo/:id", "/equipo/:id", "/organizador/:id", "/obs/:id/:screen"]

/** Actualiza el título de la pestaña según la ruta. Va una sola vez, en `App`. */
export function useRouteTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (DYNAMIC.some((pattern) => matchPath({ path: pattern, end: true }, pathname))) return

    const found = ROUTE_TITLES.find(([pattern]) => matchPath({ path: pattern, end: true }, pathname))
    document.title = found ? (found[0] === "/" ? SITE : titleOf(found[1])) : titleOf("Página no encontrada")
  }, [pathname])
}

/** Título para páginas cuyo nombre viene de la API. */
export function usePageTitle(name?: string | null) {
  useEffect(() => {
    if (name) document.title = titleOf(name)
  }, [name])
}
