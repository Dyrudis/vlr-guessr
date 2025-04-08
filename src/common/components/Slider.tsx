import { InputHTMLAttributes } from 'react'
import classNames from 'classnames'

type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (value: number) => void
}

function Slider({ onChange, ...props }: SliderProps) {
  return (
    <input
      {...props}
      type="range"
      onChange={(e) => onChange(Number(e.target.value))}
      className={classNames('h-1.5 bg-primary rounded-lg appearance-none cursor-pointer', props.className)}
    />
  )
}

export default Slider
