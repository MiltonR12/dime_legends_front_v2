import { TournamentOne } from "@/app/redux/tournament/tournament"
import { Button } from "../ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Link } from "react-router-dom";
import start from '@/assets/icons/estrella.png'
import cup from '@/assets/icons/cup.png'

type Props = {
  torneo: TournamentOne
}

function CardShowTorneo({ torneo }: Props) {

  return (
    <section className="grid md:grid-cols-2 gap-10 container mx-auto border-secondary 
    border-4 rounded-2xl p-5 md:p-10" >
      
      <div className="flex flex-col gap-5" >

        <h1 className="text-4xl font-semibold text-secondary" >
          {torneo.name}
        </h1>
        <p className="text-info" >{torneo.description}</p>

        <div>
          {torneo.image ? <img
            src={torneo.image}
            alt={torneo.name}
            className="w-full object-cover rounded-xl max-w-md mx-auto" /> : <div>
            <img src={cup} alt="" width={200} className="mx-auto" />
          </div>}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-secondary" >Premios</h2>
          <ul className="text-info flex flex-col gap-3" >
            {torneo.award.map((award, i) => (
              <div key={i} className="flex items-center gap-3" >
                <img src={start} alt="start" width={30} height={50} />
                <li className="text-2xl uppercase" >{award}</li>
              </div>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-secondary" >
            Requisitos
          </h2>
          <ul className="text-info" >
            {torneo.requirements.map((req, i) => (
              <li key={i} >{req}</li>
            ))}
          </ul>
        </div>

        <div className="text-lg grid grid-cols-2" >
          <div>
            <p className="text-secondary" >Fecha de inicio</p>
            <p className="text-info" >{new Date(torneo.dateStart).toLocaleDateString("es", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
          </div>
          <div>
            <p className="text-secondary" >Juego</p>
            <p className="text-info" >{torneo.game}</p>
          </div>
        </div>

        {
          torneo.formUrl ? <Button asChild variant="orange" size="lg" >
            <a href={torneo.formUrl} >
              Inscribirse
            </a>
          </Button> : <Button asChild variant="orange" size="lg" >
            <Link to={`/torneo/team/create/${torneo._id}`} >
              Inscribirse
            </Link>
          </Button>
        }

      </div>

      <div className="flex flex-col gap-5" >

        <Accordion type="single" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Modalidad del torneo
            </AccordionTrigger>
            <AccordionContent>
              <ul className="text-info" >
                {torneo.modality.map((rule, i) => (
                  <li key={i} >{rule}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Reglas del torneo
            </AccordionTrigger>
            <AccordionContent>
              <ul className="text-info" >
                {torneo.rules.map((rule, i) => (
                  <li key={i} >{rule}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </div>
    </section>
  )
}

export default CardShowTorneo