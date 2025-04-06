interface CardProps {
  title?: string
  content: React.ReactNode
  onClick?: () => void
}

function Card(props: CardProps) {
  return (
    <div
      className="bg-background rounded-lg p-4 max-w-3xs w-full hover:bg-background-alt cursor-pointer"
      onClick={props.onClick}
    >
      {props.title && <h3>{props.title}</h3>}
      <div>{props.content}</div>
    </div>
  )
}

export default Card
