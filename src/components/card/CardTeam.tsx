import { Team } from "@/app/redux/team/team"
import { FaRegTimesCircle } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { IoMdTime } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";

type Props = {
  team: Team
}

function CardTeam({ team }: Props) {
  return (
    <div className="bg-oscuro rounded-lg p-2 md:p-3 flex flex-col gap-3 items-center select-none" >
      
      {team.image ? <div className="mx-auto rounded-full overflow-hidden w-10 h-10 md:h-12 md:w-12" >
        <img src={team.image} alt={team.teamName} className="h-full object-cover" />
      </div> : <RiTeamFill className="w-10 h-10 md:h-12 md:w-12 bg-info rounded-full text-oscuro p-2" /> }
      <h3 className="line-clamp-1 truncate w-36 text-center" >
        {team.teamName}
      </h3>

      {team.status === "inactive" ?
        <span className="text-red-500 flex items-center gap-3 text-sm md:text-base">
          <FaRegTimesCircle className="inline" /> <span> Inabilitado </span>
        </span>
        : team.status === "pending" ?
          <span className="text-yellow-300 flex items-center gap-3 text-sm md:text-base">
            <IoMdTime className="inline" /> <span>Procesando pago</span>
          </span>
          : <span className="text-green-500 flex items-center gap-3 text-sm md:text-base">
            <GrStatusGood className="inline" /> <span>Habilitado</span>
          </span>}
    </div>
  )
}

export default CardTeam