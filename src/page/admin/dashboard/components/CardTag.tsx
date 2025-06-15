import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  className?: string
  icon?: React.ReactNode
  title: string
  value: number
}

function CardTag({ icon, title, value }: Props) {
  return (
    <Card className="bg-gradient-to-br from-purple-950 to-black border-purple-800 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-purple-300">
          {title}
        </CardTitle>
        <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">
          {value}
        </div>
      </CardContent>
    </Card>
  )
}

export default CardTag