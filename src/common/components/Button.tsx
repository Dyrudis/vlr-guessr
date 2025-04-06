import React, { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        'rounded-lg p-2 text-background cursor-pointer',
        variant === 'primary'
          ? 'bg-primary text-background hover:bg-primary-alt'
          : 'bg-background-alt text-primary hover:bg-primary',
        props.className
      )}
    >
      {children}
    </button>
  )
}

export default Button
