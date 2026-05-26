type MenuItemProps = {
  imageUrl?: string
  imageMobileUrl?: string
  title?: string
  description?: string
  isNew?: boolean
  onClick?: () => void
}

function MenuItem({ imageUrl, imageMobileUrl, title, description, isNew, onClick }: MenuItemProps) {
  return (
    <div
      className="rounded-lg overflow-hidden lg:w-60 lg:h-128 cursor-pointer relative hover:scale-105 group transition"
      onClick={onClick}
    >
      {isNew && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          NEW
        </div>
      )}
      <img src={imageUrl} alt="Menu Item" className="hidden lg:block aspect-square lg:aspect-[8/17] lg:object-fill object-none" />
      <img
        src={imageMobileUrl}
        alt="Menu Item"
        className="lg:hidden visible aspect-square lg:aspect-[8/17] lg:object-fill object-none "
      />
      <div className="absolute inset-0 bg-black opacity-0 lg:opacity-20 group-hover:opacity-0 transition"></div>
      <div className="absolute inset-0 top-1/2 lg:top-17/23 lg:translate-y-16 group-hover:translate-y-0 backdrop-blur-md lg:backdrop-blur-none group-hover:backdrop-blur-md transition">
        <div className="absolute bottom-0 p-4">
          <p className="font-extrabold text-3xl mb-4">{title}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default MenuItem
