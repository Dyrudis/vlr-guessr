import { GitBranch } from '@phosphor-icons/react'

function Footer() {
  return (
    <footer className="m-8 mb-4 p-4 rounded-lg flex items-center justify-start gap-4">
      <span className="text-sm">
        Made with ❤️ by{' '}
        <a href="https://github.com/dyrudis" target="_blank">
          <span className='bg-background-alt rounded-md py-1 px-2'>Dyrudis</span>
        </a>
      </span>
      <a
        href="https://github.com/dyrudis/vlr-guessr"
        target="_blank"
        className="ml-auto flex items-center hover:bg-primary hover:text-background px-2 py-1 rounded-md cursor-pointer"
      >
        <GitBranch size={24} />
        <span className="ml-2">v1.1.0</span>
      </a>
    </footer>
  )
}

export default Footer
