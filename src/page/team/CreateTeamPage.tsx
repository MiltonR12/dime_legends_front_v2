import { useParams } from "react-router-dom"
import CreateTeamForm from "@/components/form/CreateTeamForm"
import Card from "@/components/card/Card"
import wanwan from "@/assets/imgs/personajes/wanwan_skin.png"

function CreateTeamPage() {

  const { id } = useParams()

  return (
    <main className="pt-24 pb-10 min-h-screen flex items-center overflow-hidden justify-center section_funtiona relative" >
      <Card className="w-full max-w-xl bg-transparent backdrop-blur-sm border-2 z-10" >
        <h1 className="text-white font-semibold mb-5 text-3xl text-center" >
          Registrar equipo
        </h1>
        {id && <CreateTeamForm id={id} />}
      </Card>
      <img src={wanwan} alt="wanwan" className="absolute bottom-0 -right-[500px] z-0 h-full opacity-90" />
    </main>
  )
}

export default CreateTeamPage