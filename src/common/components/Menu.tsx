import { useNavigate } from 'react-router'

import MenuItem from '@components/MenuItem'
import abilityImage from '@assets/ability.webp'
import aceImage from '@assets/ace.webp'
import footstepsImage from '@assets/footsteps.webp'
import mapImage from '@assets/map.webp'
import voicelineImage from '@assets/wip.webp'

function Menu() {
  const navigate = useNavigate()

  const goto = (path: string) => {
    navigate(path)
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }

  return (
    <>
      <div className="flex items-center justify-center gap-6 flex-wrap px-8">
        <MenuItem
          imageUrl={abilityImage}
          title="Ability"
          description="Find the agent and ability based on the sound."
          onClick={() => goto('/ability')}
        />
        <MenuItem
          imageUrl={mapImage}
          title="Map Theme"
          description="Guess the map by listening to its theme."
          onClick={() => goto('/map')}
        />
        <MenuItem
          imageUrl={footstepsImage}
          title="Footsteps"
          description="Predict the agents from their footsteps sound."
          onClick={() => goto('/footsteps')}
        />
        <MenuItem
          imageUrl={aceImage}
          title="Ace"
          description="Identify the skin bundle from the ace sound."
          onClick={() => goto('/ace')}
        />

        <MenuItem
          imageUrl={voicelineImage}
          title="Voiceline"
          description="Coming soon... Work in Progress!"
          onClick={() => goto('/voiceline')}
        />
      </div>
    </>
  )
}

export default Menu
