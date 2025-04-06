type MenuItemProps = {
  imageUrl?: string
  title?: string
  description?: string
  onClick?: () => void
}

function MenuItem({ imageUrl, title, description, onClick }: MenuItemProps) {
  return (
    <div className="rounded-lg overflow-hidden w-60 cursor-pointer relative hover:scale-105" onClick={onClick}>
      <img src={imageUrl} alt="Menu Item" className="aspect-[8/17]" />
      <div className="absolute bottom-0 p-4">
        <p className="font-extrabold text-3xl">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default MenuItem
