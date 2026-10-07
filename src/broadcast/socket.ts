import { io, type Socket } from "socket.io-client"
import { URL_API } from "@/config"

const origin = URL_API.replace(/\/api\/?$/, "")

export const deskSocket = (): Socket => io(origin, { autoConnect: false, transports: ["websocket"] })
