import { useNavigate } from 'react-router'

import MenuItem from '@components/MenuItem'
import abilityImage from '@assets/ability.webp'
import abilityImageMobile from '@assets/ability mobile.webp'
import aceImage from '@assets/ace.webp'
import aceImageMobile from '@assets/ace mobile.webp'
import footstepsImage from '@assets/footsteps.webp'
import footstepsImageMobile from '@assets/footsteps mobile.webp'
import mapImage from '@assets/map.webp'
import mapImageMobile from '@assets/map mobile.webp'
import voicelineImage from '@assets/wip.webp'
import voicelineImageMobile from '@assets/wip mobile.webp'
import Button from './Button'
import { Crosshair } from '@phosphor-icons/react'

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
    <div className="flex flex-col-reverse lg:flex-col items-center">
      <div className="flex items-center justify-center gap-6 flex-wrap px-8">
        <MenuItem
          imageUrl={abilityImage}
          imageMobileUrl={abilityImageMobile}
          title="Ability"
          description="Find the agent and ability based on the sound."
          onClick={() => goto('/ability')}
        />
        <MenuItem
          imageUrl={mapImage}
          imageMobileUrl={mapImageMobile}
          title="Map Theme"
          description="Guess the map by listening to its theme."
          onClick={() => goto('/map')}
        />
        <MenuItem
          imageUrl={footstepsImage}
          imageMobileUrl={footstepsImageMobile}
          title="Footsteps"
          description="Predict the agents from their footsteps sound."
          onClick={() => goto('/footsteps')}
        />
        <MenuItem
          imageUrl={aceImage}
          imageMobileUrl={aceImageMobile}
          title="Ace"
          description="Identify the skin bundle from the ace sound."
          onClick={() => goto('/ace')}
        />
        <MenuItem
          imageUrl={voicelineImage}
          imageMobileUrl={voicelineImageMobile}
          title="Voiceline"
          description="Coming soon... Work in Progress!"
          onClick={() => goto('/voiceline')}
        />
      </div>
      <Button variant="primary" onClick={() => goto('/training')} className="w-120 max-w-2/3 h-24 lg:mt-8 mb-8">
        <div className="flex items-center justify-center gap-2">
          <Crosshair size={32} />
          <h3>Training Mode</h3>
        </div>
        <p>Browse all the sounds from the game to sharpen your skills.</p>
      </Button>
    </div>
  )
}

export default Menu
