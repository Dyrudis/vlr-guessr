import { useNavigate } from 'react-router'

import MenuItem from '@components/MenuItem'
import abilityImage from '@assets/ability.webp'
import aceImage from '@assets/ace.webp'
import footstepsImage from '@assets/footsteps.webp'
import mapImage from '@assets/map.webp'

function Menu() {
  const navigate = useNavigate()

  return (
    <>
      <h1 className="text-center mb-8 px-8">Choose A Game Mode</h1>
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
        <MenuItem
          imageUrl={footstepsImage}
          title="Footsteps"
          description="Predict the agents from their footsteps sound."
          isNew={true}
          onClick={() => navigate('/footsteps')}
        />
      </div>
    </>
  )
}

export default Menu
