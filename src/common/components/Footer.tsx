import { GitBranch } from '@phosphor-icons/react'

function Footer() {
  return (
    <footer className="m-8 mb-0 p-4 pb-8 rounded-lg flex flex-col lg:flex-row items-center justify-between gap-4 ">
      <div className="flex flex-row items-center justify-around w-full max-w-lg lg:w-auto gap-4">
        <span className="text-sm text-center">
          Made by{' '}
          <a href="https://github.com/dyrudis" target="_blank">
            <span className="bg-background-alt rounded-md py-1 px-2">Dyrudis</span>
          </a>
        </span>
        <a
          href="https://github.com/dyrudis/vlr-guessr"
          target="_blank"
          className="flex items-center hover:bg-primary hover:text-background px-2 py-1 rounded-md cursor-pointer lg:hidden"
        >
          <GitBranch size={24} />
          <span className="ml-2">v1.8.0</span>
        </a>
      </div>
      <span className="text-xs text-center max-w-lg">
        vlr-guessr was created under{' '}
        <a href="https://www.riotgames.com/en/legal" target="_blank" className="hover:underline">
          Riot Games' "Legal Jibber Jabber" policy
        </a>{' '}
        using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.
      </span>
      <a
        href="https://github.com/dyrudis/vlr-guessr"
        target="_blank"
        className="hidden lg:flex items-center hover:bg-primary hover:text-background px-2 py-1 rounded-md cursor-pointer"
      >
        <GitBranch size={24} />
        <span className="ml-2">v1.8.0</span>
      </a>
    </footer>
  )
}

export default Footer
