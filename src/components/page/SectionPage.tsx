import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import type { RootState } from "@/app/store"
import { CustomToast } from "@/lib/handleToast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Facebook,
  Twitter,
  Copy,
  Edit,
  Globe,
  FileText,
  LayoutDashboard,
  ExternalLink,
  Check,
} from "lucide-react"
import ModalAddNetwork from "@/page/public/profile/components/ModalAddNetwork"

function SectionPage() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    CustomToast.info("URL copiada al portapapeles")

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedUrl(null)
    }, 2000)
  }

  if (!user?.page) return null
  const page = user.page

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Page Information */}
      <Card className="bg-purple-950/30 border-purple-800/50 backdrop-blur-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-purple-800/50 to-pink-800/50 relative">
          <Badge className="absolute top-4 right-4 bg-purple-700 hover:bg-purple-600 text-white">
            Página de Organizador
          </Badge>
        </div>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-white">{page.name}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-purple-400 hover:text-white hover:bg-purple-800/50"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-purple-300">{page.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-400" />
            <span className="text-purple-200">Página pública de organizador</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-400" />
            <span className="text-purple-200">{page.description.length} caracteres en la descripción</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Link to="/admin" className="flex items-center justify-center gap-2">
              <LayoutDashboard className="h-4 w-4" /> Administrar Torneos
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Social Networks */}
      <Card className="bg-purple-950/30 border-purple-800/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-white">Redes Sociales</CardTitle>
            <ModalAddNetwork />
          </div>
          <CardDescription className="text-purple-300">
            Gestiona y comparte tus redes sociales con la comunidad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <SocialNetworkItem
              icon={<Facebook className="h-5 w-5 text-[#1877F2]" />}
              name="Facebook"
              url={page.urlPage}
              onCopy={() => copyUrl(page.urlPage)}
              isCopied={copiedUrl === page.urlPage}
            />

            <Separator className="bg-purple-800/30" />

            <SocialNetworkItem
              icon={<Twitter className="h-5 w-5 text-[#1DA1F2]" />}
              name="Twitter"
              url={page.urlGroup}
              onCopy={() => copyUrl(page.urlGroup)}
              isCopied={copiedUrl === page.urlGroup}
            />
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

interface SocialNetworkItemProps {
  icon: React.ReactNode
  name: string
  url: string
  onCopy: () => void
  isCopied: boolean
}

function SocialNetworkItem({ icon, name, url, onCopy, isCopied }: SocialNetworkItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium text-white">{name}</span>
      </div>
      <div className="flex items-center gap-2">
        <Input value={url} readOnly className="bg-purple-900/20 border-purple-700 text-white focus:border-purple-500" />
        <Button
          variant="outline"
          size="icon"
          className="border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white"
          onClick={onCopy}
        >
          {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white"
          asChild
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  )
}

export default SectionPage
