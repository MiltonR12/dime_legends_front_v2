import { FaCheck, FaUsers } from "react-icons/fa"
import Image from "../ui/Image"
import { winnerBattleThunk } from "@/app/redux/battle/battleSlice"
import { useAppDispatch } from "@/app/store"

type Team = {
  id: string
  name?: string
  image?: string | null
  winner: boolean
}

type Props = {
  id: string
  position: number
  teamOne: Team
  teamTwo: Team
  date?: string
}

function CardBracket({ position, teamOne, teamTwo, id, date }: Props) {

  const dispatch = useAppDispatch()

  const winnerBattle = (winner: string | null) => {
    dispatch(winnerBattleThunk({ id, winner }))
  }

  return (
    <div className="text-white select-none w-96 mx-2 my-4 flex items-center rounded-lg">
      <div className="w-full grid grid-cols-[auto_1fr] items-center max-w-80 mx-auto">
        <div>
          <h3 className="bg-slate-900 p-2 text-center font-semibold">
            {position + 1}
          </h3>
        </div>
        <div>
          <div className="bg-slate-700 p-2 grid grid-cols-[auto_1fr_auto] items-center space-x-4">
            <Image
              src={teamOne.image}
              className="w-6 h-6 rounded-full"
              noImage={FaUsers}
            />
            <h3 className="select-none font-semibold line-clamp-1">{teamOne.name}</h3>
            <button
              onClick={() => winnerBattle(!teamOne.winner ? teamOne.id : null)}
              className={`border w-6 h-6 rounded-full ${teamOne.winner ? 'bg-green-500 flex items-center justify-center' : ''}`}
            >
              {teamOne.winner ? <FaCheck className="w-3" /> : null}
            </button>
          </div>
          <div className="bg-slate-800 p-2 grid grid-cols-[auto_1fr_auto] items-center space-x-4">
            <Image
              noImage={FaUsers}
              src={teamTwo.image}
              className="w-6 h-6 rounded-full"
            />
            <h3 className="select-none font-semibold line-clamp-1">{teamTwo.name}</h3>
            <button
              onClick={() => winnerBattle(!teamTwo.winner ? teamTwo.id : null)}
              className={`border w-6 h-6 rounded-full ${teamTwo.winner ? 'bg-green-500 flex items-center justify-center' : ''}`}
            >
              {teamTwo.winner ? <FaCheck className="w-3" /> : null}
            </button>
          </div>
          <small className="block capitalize text-slate-300 text-center">
            {date}
          </small>
        </div>
      </div>
    </div>
  )
}

export default CardBracket