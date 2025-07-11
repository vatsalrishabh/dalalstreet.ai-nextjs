import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../assets/images/logo.png'

const Logo = () => {
  return (
    <div>
      <Link  href="/">
      <Image alt='' src={logo} height={50} width={50}/>
      </Link>
    </div>
  )
}

export default Logo
