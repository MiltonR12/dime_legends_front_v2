import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  className?: string
  icon?: React.ReactNode
  title: string
  value: number
}

function CardTag({ icon, title, value }: Props) {
  return (
    <Card className="border-admin-border bg-admin-surface shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-admin-muted">
          {title}
        </CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-admin-border bg-admin-input">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-admin-text">
          {value}
        </div>
      </CardContent>
    </Card>
  )
}

export default CardTag