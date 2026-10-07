import { useState } from "react"
import { Link } from "react-router-dom"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { createPageValidation } from "@/lib/validations"
import { useAuth, useCreateUserPage, useUpdateUserPage } from "@/hooks/auth"
import { useAddPageNetwork } from "@/hooks/page"
import { useMyTournaments } from "@/hooks/tournament"
import { isOrganizer } from "@/lib/roles"
import type { MyTournament } from "@/app/api/tournament/tournament.types"
import CustomInput from "@/components/form/CustomInput"
import InputUploadImage from "@/components/input/InputUploadImage"
import UploadField from "@/components/form/UploadField"
import { Button } from "@/components/ui/button"
import { CustomToast } from "@/lib/handleToast"

const NO_TOURNAMENTS: MyTournament[] = []

type PageForm = {
  name: string
  description: string
  image: File | string | null
  banner: File | string | null
}

const platformLabel = (platform: string) =>
  platform.charAt(0).toUpperCase() + platform.slice(1)

function OrganizerPage() {
  const { user } = useAuth()
  const organizer = isOrganizer(user)
  const page = user?.page ?? null
  const resubmit = !organizer && (!page || page.review === "rejected")
  const { mutateAsync: createPage } = useCreateUserPage()
  const { mutateAsync: updatePage } = useUpdateUserPage()
  const addNetwork = useAddPageNetwork()
  const { data: tournaments = NO_TOURNAMENTS } = useMyTournaments(organizer)
  const [url, setUrl] = useState("")

  if (!user) return null

  const initial: PageForm = {
    name: page?.name ?? "",
    description: page?.description ?? "",
    image: page?.image ?? null,
    banner: page?.banner ?? null,
  }

  const save = async (values: PageForm) => {
    if (typeof values.image !== "string" && !(values.image instanceof File)) return
    const payload = {
      name: values.name,
      description: values.description,
      image: values.image,
      banner: values.banner,
    }
    if (resubmit) {
      await createPage(payload)
      CustomToast.success("Solicitud enviada. Queda pendiente de aprobación")
      return
    }
    await updatePage(payload)
    CustomToast.success("Página actualizada")
  }

  const sendNetwork = () => {
    const next = url.trim()
    if (!next) return
    addNetwork.mutate(next, { onSuccess: () => setUrl("") })
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-admin-text">Perfil de organizador</h1>
        <p className="mt-1 text-sm text-admin-muted">Banner, foto, nombre y descripción de tu página.</p>
      </div>

      {page?.review === "pending" && !organizer && (
        <p className="text-sm text-admin-muted">
          Tu solicitud está en revisión. Cuando un superadmin la apruebe podrás administrar torneos.
        </p>
      )}
      {page?.review === "rejected" && !organizer && (
        <p className="text-sm text-red-400">
          La solicitud fue rechazada. Corrige los datos y vuelve a enviarla.
        </p>
      )}

      <Formik
        initialValues={initial}
        enableReinitialize
        validationSchema={createPageValidation}
        onSubmit={save}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-5">
            <UploadField
              name="banner"
              className="h-44 w-full !rounded-lg !border-admin-border !bg-admin-input"
            />
            <div className="relative z-10 -mt-16 ml-6 w-fit">
              <InputUploadImage name="image" compact />
            </div>
            <ErrorMessage name="image" component="span" className="text-xs text-red-400" />

            <CustomInput
              name="name"
              label="Nombre"
              placeholder="Nombre de la página"
              variant="dark"
              icon={null}
              required
            />

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm text-admin-text">Descripción</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows={4}
                placeholder="Cuéntale a la comunidad quién organiza"
                className="rounded-md border border-admin-border bg-admin-input px-3 py-2 text-sm text-admin-text outline-none placeholder:text-admin-muted focus:border-admin-accent"
              />
              <ErrorMessage name="description" component="span" className="text-xs text-red-400" />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-fit bg-admin-accent text-white hover:bg-admin-accent-hover"
            >
              {resubmit ? (page ? "Volver a enviar" : "Enviar solicitud") : "Guardar cambios"}
            </Button>
          </Form>
        )}
      </Formik>

      {page && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium text-admin-text">Redes</h2>
          {(page.socialLinks ?? []).length === 0 ? (
            <p className="text-sm text-admin-muted">Todavía no tienes redes.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {(page.socialLinks ?? []).map((item) => (
                <li key={item.url} className="flex items-center gap-3 text-sm">
                  <span className="w-24 shrink-0 text-admin-muted">{platformLabel(item.platform)}</span>
                  <a href={item.url} target="_blank" rel="noreferrer" className="truncate text-admin-text hover:underline">
                    {item.url}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-2">
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://"
              className="h-10 flex-1 rounded-md border border-admin-border bg-admin-input px-3 text-sm text-admin-text outline-none placeholder:text-admin-muted focus:border-admin-accent"
            />
            <Button
              type="button"
              disabled={addNetwork.isPending}
              onClick={sendNetwork}
              className="bg-admin-accent text-white hover:bg-admin-accent-hover"
            >
              Agregar
            </Button>
          </div>
        </section>
      )}

      {organizer && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium text-admin-text">Tus torneos</h2>
          {tournaments.length === 0 ? (
            <p className="text-sm text-admin-muted">Todavía no tienes torneos.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-admin-border rounded-lg border border-admin-border">
              {tournaments.map((item) => (
                <li key={item._id}>
                  <Link
                    to={`/admin/torneo/${item._id}`}
                    className="flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-admin-surface"
                  >
                    <span className="font-medium text-admin-text">{item.name}</span>
                    <span className="text-admin-muted">
                      {item.dateStart ? new Date(item.dateStart).toLocaleDateString("es") : item.game}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  )
}

export default OrganizerPage
