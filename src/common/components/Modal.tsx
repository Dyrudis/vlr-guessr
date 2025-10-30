import { ArrowsClockwise, House, X } from '@phosphor-icons/react'
import { useNavigate } from 'react-router'

import Button from '@components/Button'

export type ModalState = {
  isOpen: boolean
  title: string
  children: React.ReactNode
}

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50 bg-[#000000a0]">
      <div className="bg-background rounded-lg shadow-lg p-6 w-full max-w-md  mx-2">
        <div className='flex items-center mb-4 justify-between'>
          <h2 className="text-xl font-semibold">{title}</h2>
          <X size={32} className="rounded-md hover:bg-background-alt cursor-pointer" onClick={onClose} />
        </div>
        {children}
        <div className="flex justify-center gap-4">
          <Button className="w-full flex items-center justify-center gap-2" onClick={() => navigate('/')}>
            <House />
            Change mode
          </Button>
          <Button className="w-full flex items-center justify-center gap-2" onClick={onClose}>
            <ArrowsClockwise />
            Play again
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
