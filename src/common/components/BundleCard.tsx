import Card from '@components/Card'

interface BundleCardProps {
  bundle: bundleData
}

function BundleCard({ bundle }: BundleCardProps) {
  return (
    <Card
      content={
        <>
          <img src={bundle.displayIcon} alt={bundle.displayName} className="w-full h-auto aspect-[16/9] rounded-lg" />
          <p className="text-center">{bundle.displayName}</p>
        </>
      }
    />
  )
}

export default BundleCard
