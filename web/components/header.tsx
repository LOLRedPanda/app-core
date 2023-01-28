import React from 'react'
import Image from 'next/image'
import NlLogo from '../public/assets/NL.png'
function header() {
  return (
    <div>
     
    <div className = "flex justify-between pr-4 pt-4">   
        <Image src={NlLogo} alt='No Image' width={300} height={100}/>
        <h2 className='font-bold text-[50px] pt-14'>Never Lucky Gaming</h2>
        <h2>Welcome Back, Clint</h2>
    </div>
    </div>
  )
}

export default header
