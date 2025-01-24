import { FaStar, FaStarHalf } from "react-icons/fa";

type Props = {
  image: string
  name: string
  comment: string
  punctuation: number
}

function CardReview({ image, name, comment, punctuation }: Props) {
  return (
    <article className="bg-violetTertiary h-full items-center grid grid-cols-[80px_1fr] gap-5 p-5 rounded-2xl shadow-md" >
      <img src={image} alt={name} className="w-20 h-20 rounded-full" />
      <div className="flex flex-col gap-2" >
        <p className="text-white/60" >{comment}</p>
        <h3 className="text-2xl" >{name}</h3>
        <div className="flex gap-1" >
          {[...Array(Math.round(punctuation))].map((_, index) => {
            const isHalf = index + 1 > punctuation && index < punctuation
            return (
              <div key={index} >
                {index < punctuation ? (
                  <FaStar className="text-yellow-400" />
                ) : isHalf ? (
                  <FaStarHalf className="text-yellow-400" />
                ) : (
                  <FaStar className="text-yellow-400" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </article>
  )
}

export default CardReview