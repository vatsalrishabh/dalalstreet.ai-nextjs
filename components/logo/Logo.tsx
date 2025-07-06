import React from 'react'
import Image from 'next/image'
import logo from '../../assets/images/logo.png'

const Logo = () => {
  return (
    <div>
      <Image alt='' src={logo} height={50} width={50}/>
    </div>
  )
}

export default Logo
