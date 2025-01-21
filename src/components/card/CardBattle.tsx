import { Team } from "@/app/redux/team/team";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  teamA: Team;
  teamB: Team;
  date: string; // formato: "YYYY-MM-DD"
  time: string; // formato: "HH:mm"
};

function CardBattle({ teamA, teamB, date, time }: Props) {

  return (
    <div className="text-white border-b-2 p-6 max-w-2xl mx-auto shadow-lg">

      <div className="flex items-center justify-between">
        <div className="text-center flex gap-5 items-center">
          <Avatar className="w-16 h-16" >
            <AvatarImage src={teamA.image as any} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-2xl font-bold">{teamA.name}</p>
        </div>

        <div className="text-center">
          <p className="text-sm uppercase tracking-wider">Fecha y hora</p>
          <p className="text-lg font-semibold">
            {date} - {time}
          </p>
          <div className="text-5xl font-extrabold text-[#FFD700]">VS</div>
        </div>

        <div className="text-center flex gap-5 items-center">
          <p className="text-2xl font-bold">{teamB.name}</p>
          <Avatar className="w-16 h-16" >
            <AvatarImage src={teamB.image as any} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

    </div>
  );
}

export default CardBattle;
