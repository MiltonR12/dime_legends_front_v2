import { Card, CardContent } from "@/components/ui/card"

type Props = {
  total: number
  subtitle: string
  icon: React.ReactNode
}

function TagInformation({ total, subtitle, icon }: Props) {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            {icon}
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{total}</p>
            <p className="text-sm text-slate-400">
              {subtitle}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TagInformation