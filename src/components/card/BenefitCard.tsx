type Props = {
  title: string
  description: string
}

function BenefitCard({ title, description }: Props) {
  return (
    <article className="border-l-4 border-pink-500 pl-4 py-1">
      <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
      <p className="text-purple-300 text-sm">{description}</p>
    </article>
  )
}

export default BenefitCard