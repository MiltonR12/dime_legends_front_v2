import axios from "@/lib/axios"
import { BANNER_FILE_TOKEN } from "@/components/input/BannerGallery"
import type { ApiResponse } from "../response"
import { uploadFile } from "../upload/uploadApi"
import type { PTournament, PUpdateTournament } from "./tournament"
import type { ListTournament, MyTournament, TournamentOne } from "./tournament.types"

const uploadAll = (files: File[]) => Promise.all(files.map((file) => uploadFile(file, "tournament")))

export const getTournamentByIdApi = async (id: string) => {
  const { data } = await axios.get<ApiResponse<TournamentOne>>(`/tournament/${id}`)
  return data.data
}

export const getListTournamentApi = async () => {
  const { data } = await axios.get<ApiResponse<ListTournament[]>>("/tournament/list")
  return data.data
}

export const getMyTournamentApi = async () => {
  const { data } = await axios.get<ApiResponse<MyTournament[]>>("/tournament/mis-torneos")
  return data.data
}

export const createTournamentApi = async (tournament: PTournament) => {
  const banners = await uploadAll([tournament.image, ...(tournament.banners ?? [])])
  const payment = tournament.payment?.qrImage
    ? {
        qrImage: await uploadFile(tournament.payment.qrImage, "tournament"),
        account: tournament.payment.account,
        amount: tournament.payment.amount,
      }
    : null

  const { data } = await axios.post<ApiResponse<TournamentOne>>("/tournament", {
    name: tournament.name,
    description: tournament.description,
    game: tournament.game,
    dateStart: tournament.dateStart,
    formUrl: tournament.formUrl,
    award: tournament.award,
    rules: tournament.rules,
    image: banners[0],
    banners,
    config: {
      ...tournament.config,
      registrationEnd: new Date(tournament.config.registrationEnd).toISOString(),
    },
    payment,
  })
  return data.data
}

export const updateTournamentApi = async (tournament: PUpdateTournament) => {
  const files = [...(tournament.bannerFiles ?? [])]
  const uploaded = tournament.bannerOrder
    ? await Promise.all(
        tournament.bannerOrder.map((token) =>
          token === BANNER_FILE_TOKEN ? uploadFile(files.shift()!, "tournament") : Promise.resolve(token),
        ),
      )
    : undefined

  const banners = uploaded?.filter(Boolean)

  const payment = tournament.payment?.qrImage
    ? {
        qrImage: await uploadFile(tournament.payment.qrImage, "tournament"),
        account: tournament.payment.account,
        amount: tournament.payment.amount,
      }
    : undefined

  const { data } = await axios.put<ApiResponse<TournamentOne>>(`/tournament/${tournament._id}`, {
    name: tournament.name,
    description: tournament.description,
    game: tournament.game,
    dateStart: tournament.dateStart,
    formUrl: tournament.formUrl,
    status: tournament.status,
    award: tournament.award,
    rules: tournament.rules,
    banners,
    config: tournament.config
      ? {
          ...tournament.config,
          registrationEnd: tournament.config.registrationEnd
            ? new Date(tournament.config.registrationEnd).toISOString()
            : undefined,
        }
      : undefined,
    payment,
  })
  return data.data
}

export const deleteTournamentApi = async (id: string) => {
  await axios.delete<ApiResponse>(`/tournament/${id}`)
}
