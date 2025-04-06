import { X } from '@phosphor-icons/react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#000000a0] bg-opacity-50">
      <div className="bg-background rounded-lg shadow-lg p-6 w-full max-w-md mx-auto relative">
        <X size={32} className="absolute p-1 top-4 right-4 rounded-md hover:bg-background-alt cursor-pointer" onClick={onClose} />
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default Modal
