import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ children, disabled, to, type, onClick }) => {
  const base =
    'bg-yellow-500 uppercase font-semibold text-stone-800 py-3 px-4 inline-block tracking-widest rounded-full hover:bg-yellow-300 transition-colors duration-500 outline-none focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed'

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-2 py-2 md:px-5 md:py-2.5 text-xs',
    secondary:
      'inline-block tracking-widest rounded-full hover:bg-yellow-300 transition-colors duration-500 outline-none focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed border-stone-300 border px-4 py-3 hover:bg-stone-300 hover:text-stone-800',
    round: base + 'px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
  }

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    )
  }

  return (
    <button disabled={disabled} className={styles[type]} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
