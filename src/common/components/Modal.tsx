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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#000000a0] bg-opacity-50">
      <div className="bg-background rounded-lg shadow-lg p-6 w-full max-w-md relative mx-2">
        <X
          size={32}
          className="absolute p-1 top-4 right-4 rounded-md hover:bg-background-alt cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
        <div className="flex justify-center gap-4">
          <Button className='w-full flex items-center justify-center gap-2' onClick={() => navigate('/')}>
            <House />
            Back home
          </Button>
          <Button className='w-full flex items-center justify-center gap-2' onClick={onClose}>
            <ArrowsClockwise />
            Play again
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
