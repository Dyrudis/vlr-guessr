import { useNavigate } from 'react-router'

import icon from '@assets/icon.svg'
import { House } from '@phosphor-icons/react'
import Button from './Button'

function Header() {
  const navigate = useNavigate()

  return (
    <header className="mb-8 p-12 rounded-lg flex flex-col sm:flex-row items-center sm:items-start">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <img src={icon} alt="Icon" className="w-16 h-16" />
        <h1>vlr-guessr</h1>
      </div>

      {window.location.pathname !== '/' && (
        <Button
          className="ml-auto px-4 py-2 h-11 sm:w-auto w-full flex items-center justify-center gap-2"
          onClick={() => navigate('/')}
        >
          <House />
          Change mode
        </Button>
      )}
    </header>
  )
}

export default Header
