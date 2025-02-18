import { INetwork } from "@/interfaces/globals";
import { cn } from "@/lib/utils";
import { FaFacebook, FaWhatsapp, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok, FaGithub, FaDiscord, FaGlobe } from "react-icons/fa";

type Props = {
  network?: INetwork,
  className?: string
}

function NetworkIcon({ network = "website", className }: Props) {

  const networks = {
    facebook: <FaFacebook className={cn("text-blue-500 w-6 h-6", className)} />,
    twitter: <FaTwitter className={cn("text-sky-500 w-6 h-6", className)} />,
    instagram: <FaInstagram className={cn("text-pink-500 w-6 h-6", className)} />,
    linkedin: <FaLinkedin className={cn("text-blue-700 w-6 h-6", className)} />,
    youtube: <FaYoutube className={cn("text-red-500 w-6 h-6", className)} />,
    tiktok: <FaTiktok className={cn("text-slate-50 w-6 h-6", className)} />,
    github: <FaGithub className={cn("text-slate-50 w-6 h-6", className)} />,
    discord: <FaDiscord className={cn("text-purple-500 w-6 h-6", className)} />,
    website: <FaGlobe className={cn("text-slate-50 w-6 h-6", className)} />,
    whatsapp: <FaWhatsapp className={cn("text-green-500 w-6 h-6", className)} />,
  }

  return networks[network] || null

}

export default NetworkIcon