type CardProps = {
  data: data
  onClick?: () => void
}

function Card({ data, onClick }: CardProps) {
  return (
    <div
      className="bg-background rounded-lg p-1 max-w-3xs w-full hover:bg-background-alt cursor-pointer"
      onClick={onClick}
    >
      <div>
        <img src={data.image} alt={data.name} className="w-full h-auto aspect-[16/9] rounded-lg" />
        <p className="text-center">{data.name}</p>
      </div>
    </div>
  )
}

export default Card
