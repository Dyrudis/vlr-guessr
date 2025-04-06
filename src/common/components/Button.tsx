import React, { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

function Button(props: ButtonProps) {
  return (
    <button {...props} className="bg-primary text-background rounded-lg p-2 hover:bg-primary-alt cursor-pointer">
      {props.children}
    </button>
  )
}

export default Button
