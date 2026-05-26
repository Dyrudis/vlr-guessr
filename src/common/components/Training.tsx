import { useState } from 'react'
import Modal, { ModalState } from '@components/Modal'
import Button from './Button'

import AudioPlayer from '@components/AudioPlayer'
import Browser from '@components/Browser'
import agents from '@data/agents.json'
import bundles from '@data/bundles.json'
import footsteps from '@data/footsteps.json'
import maps from '@data/maps.json'

type Tab = 'abilities' | 'maps' | 'footsteps' | 'aces'

function Training() {
  const [activeTab, setActiveTab] = useState<Tab>('abilities')

  return (
    <>
      <div className="mb-4 max-w-3xl px-4 text-center">
        <h1 className="mb-2">Training</h1>
        <p className="mb-4">Listen freely to the sounds of each ability, map, footsteps, and ace.</p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            variant={activeTab === 'abilities' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('abilities')}
          >
            Abilities
          </Button>
          <Button variant={activeTab === 'maps' ? 'primary' : 'secondary'} onClick={() => setActiveTab('maps')}>
            Maps
          </Button>
          <Button
            variant={activeTab === 'footsteps' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('footsteps')}
          >
            Footsteps
          </Button>
          <Button variant={activeTab === 'aces' ? 'primary' : 'secondary'} onClick={() => setActiveTab('aces')}>
            Aces
          </Button>
        </div>
      </div>
      {activeTab === 'abilities' && <AbilitiesTraining />}
      {activeTab === 'maps' && <MapsTraining />}
      {activeTab === 'footsteps' && <FootstepsTraining />}
      {activeTab === 'aces' && <AcesTraining />}
    </>
  )
}

const AbilitiesTraining = () => {
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, title: '', children: null })

  const allAbilities = agents.flatMap((agent) =>
    agent.abilities.map((ability) => ({ ...ability, agentName: agent.name }))
  )

  const handleSelect = (item: bundle | map | ability | footsteps) => {
    const ability = allAbilities.find((a) => a.id === item.id)
    if (ability) {
      setModalState({
        isOpen: true,
        title: `${ability.agentName} - ${ability.name}`,
        children: (
          <>
            <img src={ability.icon} alt={ability.name} className="mx-auto px-4 w-32 mb-4" />
            <AudioPlayer url={`/abilities/${ability.agentId}/${ability.id}.wav`} autoPlay />
          </>
        ),
      })
    }
  }

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <>
      <Browser data={agents} onResponse={handleSelect} attemps={[]} />
      <Modal {...modalState} onClose={closeModal} trainingMode={true}></Modal>
    </>
  )
}

const MapsTraining = () => {
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, title: '', children: null })

  const handleSelect = (item: bundle | map | ability | footsteps) => {
    const map = maps.find((m) => m.id === item.id)
    if (map) {
      setModalState({
        isOpen: true,
        title: map.name,
        children: (
          <>
            <img src={`/${map.image}`} alt={map.name} className="px-4 h-auto mb-4" />
            <AudioPlayer url={`/maps/sounds/${map.id}.mp3`} autoPlay />
          </>
        ),
      })
    }
  }

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <>
      <Browser data={maps} onResponse={handleSelect} attemps={[]} />
      <Modal {...modalState} onClose={closeModal} trainingMode></Modal>
    </>
  )
}

const FootstepsTraining = () => {
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, title: '', children: null })

  const handleSelect = (item: bundle | map | ability | footsteps) => {
    const footstep = footsteps.find((f) => f.id === item.id)
    if (footstep) {
      setModalState({
        isOpen: true,
        title: footstep.name,
        children: <AudioPlayer url={`/footsteps/sounds/${footstep.id}.wav`} autoPlay />,
      })
    }
  }

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <>
      <Browser data={footsteps} onResponse={handleSelect} attemps={[]} />
      <Modal {...modalState} onClose={closeModal} trainingMode></Modal>
    </>
  )
}

const AcesTraining = () => {
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, title: '', children: null })

  const handleSelect = (item: bundle | map | ability | footsteps) => {
    const ace = bundles.find((b) => b.id === item.id)
    if (ace) {
      setModalState({
        isOpen: true,
        title: ace.name,
        children: (
          <>
            <img src={`/${ace.image}`} alt={ace.name} className="px-4 h-auto mb-4" />
            <AudioPlayer url={`/bundles/sounds/${ace.id}.mp3`} autoPlay />
          </>
        ),
      })
    }
  }

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <>
      <Browser data={bundles} onResponse={handleSelect} attemps={[]} />
      <Modal {...modalState} onClose={closeModal} trainingMode></Modal>
    </>
  )
}

export default Training
