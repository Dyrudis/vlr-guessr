import { useNavigate } from 'react-router'

import MenuItem from '@components/MenuItem'
import finisherImage from '@assets/finisher.png'
import killImage from '@assets/kill.png'

function Menu() {
  const navigate = useNavigate()

  return (
    <>
      <h1 className="text-center mb-8 px-8">Choose wich mode you want to play</h1>
      <div className="flex items-center justify-center gap-6 flex-wrap px-8">
        <MenuItem
          imageUrl={finisherImage}
          title="Finisher"
          description="Find the skin bundle based on the finisher sound."
          onClick={() => navigate('/finisher')}
        />
        <MenuItem
          imageUrl={killImage}
          title="Kill"
          description="Find the skin bundle based on the kill sound."
          onClick={() => navigate('/kill')}
        />
      </div>
    </>
  )
}

export default Menu
