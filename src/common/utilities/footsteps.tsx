export const getAgentsImages = (footsteps: footsteps) => {
  footsteps.agentsIds.sort()
  return (
    <>
      {footsteps.agentsIds.map((agentId) => (
        <img key={agentId} src={`agents/images/${agentId}.png`} alt={agentId} className="w-12 h-12 object-contain" />
      ))}
    </>
  )
}
