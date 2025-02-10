import { Team } from "@/app/redux/team/team";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  teamA: Team | null;
  teamB: Team | null;
  date: string; // formato: "YYYY-MM-DD"
  time: string; // formato: "HH:mm"
};

function CardBattle({ teamA, teamB, date }: Props) {

  return (
    <div className="text-white border-b-2 p-6 max-w-5xl mx-auto shadow-lg">

      <div className="grid grid-cols-3">
        <div className="text-center flex flex-col md:flex-row gap-5 items-center">
          <Avatar className="w-16 h-16" >
            <AvatarImage src={teamA ? teamA.image as any : undefined} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-2xl font-bold">{teamA ? teamA.name : "Sin Designar"}</p>
        </div>

        <div className="text-center justify-self-center">
          <p className="text-sm uppercase tracking-wider">Fecha y hora</p>
          <p className="text-lg font-semibold">
            {new Date(date).toLocaleString("es", {
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <div className="text-5xl font-extrabold text-[#FFD700]">VS</div>
        </div>

        <div className="text-center justify-self-end flex flex-col-reverse md:flex-row gap-5 items-center">
          <p className="text-2xl font-bold">{teamB ? teamB.name : "Sin Designar"}</p>
          <Avatar className="w-16 h-16" >
            <AvatarImage src={teamB ? teamB.image as any : undefined} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

    </div>
  );
}

export default CardBattle;
