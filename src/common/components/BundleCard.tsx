import Card from '@components/Card'

type BundleCardProps = {
  bundle: bundle
}

function BundleCard({ bundle }: BundleCardProps) {
  return (
    <Card
      content={
        <>
          <img src={bundle.image} alt={bundle.name} className="w-full h-auto aspect-[16/9] rounded-lg" />
          <p className="text-center">{bundle.name}</p>
        </>
      }
    />
  )
}

export default BundleCard
