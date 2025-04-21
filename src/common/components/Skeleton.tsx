import classNames from 'classnames'

function Skeleton({ className }: { className?: string }) {
  return <div className={classNames('animate-pulse rounded-md bg-primary', className)}></div>
}

export default Skeleton
