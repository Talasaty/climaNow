'use client'
import styles from './button.module.css'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    isHalfButton?: boolean
}

const Button = ({ children, isHalfButton, ...props }: ButtonProps) => {
    const buttonStyle = isHalfButton ? styles.halfButton : styles.button
    return (
        <button className={buttonStyle} {...props}>
            {children}
        </button>
    )
}

export default Button
