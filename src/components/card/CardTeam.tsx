import { Team } from "@/app/redux/team/team"
import { FaRegTimesCircle } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { IoMdTime } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  team: Team
}

function CardTeam({ team }: Props) {
  return (
    <div className="p-2 md:p-3 flex flex-col gap-3 items-center select-none" >

      <Avatar className="mx-auto rounded-full overflow-hidden w-10 h-10 md:h-20 md:w-20" >
        <AvatarImage src={team.image || ''} className="h-full object-cover" />
        <AvatarFallback>
          <RiTeamFill className="w-10 h-10 md:h-20 md:w-20 bg-info rounded-full text-oscuro p-2" />
        </AvatarFallback>
      </Avatar>

      <h3 className="line-clamp-1 truncate w-36 text-xl font-semibold text-center" >
        {team.name}
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