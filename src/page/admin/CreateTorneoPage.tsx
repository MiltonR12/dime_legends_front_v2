import CreateTorneoForm from "@/components/form/CreateTorneoForm"
import gaming from '@/assets/imgs/gaming.jpg'

function CreateTorneoPage() {
  return (
    <main className=" grid grid-cols-2 h-screen overflow-hidden" >
      <div className="pt-24 flex justify-center h-screen overflow-y-auto" >
        <CreateTorneoForm />
      </div>
      <div className="h-screen overflow-hidden" >
        <img src={gaming} alt="" className="object-cover object-center " />
      </div>
    </main>
  )
}

export default CreateTorneoPage