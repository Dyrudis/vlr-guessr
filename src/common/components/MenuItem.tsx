type MenuItemProps = {
  imageUrl?: string
  title?: string
  description?: string
  onClick?: () => void
}

function MenuItem({ imageUrl, title, description, onClick }: MenuItemProps) {
  return (
    <div className="rounded-lg overflow-hidden w-60 cursor-pointer relative hover:scale-105 group" onClick={onClick}>
      <img src={imageUrl} alt="Menu Item" className="aspect-[8/17]" />
      <div className="absolute inset-0 bg-black opacity-0 lg:opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
      <div className="absolute inset-0 top-17/23 lg:translate-y-16 group-hover:translate-y-0 backdrop-blur-md lg:backdrop-blur-none group-hover:backdrop-blur-md">
        <div className="absolute bottom-0 p-4">
          <p className="font-extrabold text-3xl mb-4">{title}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default MenuItem
