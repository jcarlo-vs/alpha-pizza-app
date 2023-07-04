import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LinkButton = ({children,to,}) => {
  const navigate = useNavigate()
  const className = 'hover:text-blue-600 text-blue-500'

  if(to === '-1'){
    return   <button className={className} onClick={() => navigate(-1)}>{children}</button>

  }
  return (
    <Link to={to} className={className}>{children}</Link>

  )
}

export default LinkButton