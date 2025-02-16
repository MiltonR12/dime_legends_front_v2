import { Team } from "@/app/redux/team/team";
import Image from "../ui/Image";

type Props = {
  teamA: Team | null;
  teamB: Team | null;
  date: string;
};

function CardBattle({ teamA, teamB, date }: Props) {

  return (
    <li className="text-white border-b overflow-hidden py-3 max-w-6xl mx-auto shadow-lg">

      <div className="grid grid-cols-3">

        <div className="text-center flex flex-col md:flex-row gap-5 items-center">
          <Image src={teamA?.image} className="w-10 h-10 md:w-16 md:h-16" />
          <p className="text-sm md:text-xl line-clamp-2 font-semibold md:font-bold">
            {teamA ? teamA.name : "Sin Designar"}
          </p>
        </div>

        <div className="text-center justify-self-center">
          <p className="text-sm uppercase tracking-wider">Fecha y hora</p>
          <p className="hidden md:block font-semibold">
            {new Date(date).toLocaleString("es", {
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <p className="font-semibold">
            {new Date(date).toLocaleString("es", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <div className="text-3xl md:text-5xl font-extrabold text-[#FFD700]">VS</div>
        </div>

        <div className="text-center md:justify-self-end flex flex-col-reverse md:flex-row gap-5 items-center">
          <p className="text-sm md:text-xl line-clamp-2 font-semibold md:font-bold">
            {teamB ? teamB.name : "Sin Designar"}
          </p>
          <Image src={teamB?.image} className="w-10 h-10 md:w-16 md:h-16" />
        </div>
      </div>

    </li>
  );
}

export default CardBattle;
