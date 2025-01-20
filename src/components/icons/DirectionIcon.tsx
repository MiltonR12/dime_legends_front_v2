import {
  FaChevronDown, FaChevronUp, FaChevronRight,
  FaChevronLeft
} from "react-icons/fa";

type Props = {
  direction: "up" | "down" | "left" | "right"
  className?: string
}

function DirectionIcon({ direction, className }: Props) {
  if (direction === "up") {
    return <FaChevronUp className={className} />
  }
  if (direction === "down") {
    return <FaChevronDown className={className} />
  }
  if (direction === "left") {
    return <FaChevronLeft className={className} />
  }
  if (direction === "right") {
    return <FaChevronRight className={className} />
  }
  return null
}

export default DirectionIcon