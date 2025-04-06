import { useNavigate } from 'react-router'

import icon from '@assets/icon.svg'

function Header() {
  const navigate = useNavigate()

  return (
    <header className="m-8 p-4 rounded-lg flex items-center">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
        <img src={icon} alt="Icon" className="w-8 h-8" />
        <h2>vlr-guessr</h2>
      </div>
    </header>
  )
}

export default Header
