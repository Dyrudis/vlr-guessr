import { useNavigate } from 'react-router'

import MenuItem from '@components/MenuItem'
import abilityImage from '@assets/ability.png'
import aceImage from '@assets/ace.png'
import mapImage from '@assets/map.png'

function Menu() {
  const navigate = useNavigate()

  return (
    <>
      <h1 className="text-center mb-8 px-8">Choose wich mode you want to play</h1>
      <div className="flex items-center justify-center gap-6 flex-wrap px-8">
        <MenuItem
          imageUrl={mapImage}
          title="Map Theme"
          description="Guess the map by listening to its theme."
          onClick={() => navigate('/map')}
        />
        <MenuItem
          imageUrl={abilityImage}
          title="Ability"
          description="Find the agent and ability based on the sound."
          onClick={() => navigate('/ability')}
        />
        <MenuItem
          imageUrl={aceImage}
          title="Ace"
          description="Identify the skin bundle from the ace sound."
          onClick={() => navigate('/ace')}
        />
      </div>
    </>
  )
}

export default Menu
