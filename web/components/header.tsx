import React from 'react'
import Image from 'next/image'
import NlLogo from '../public/assets/teamLogos/NL.png'

function header() {
  return (
    <div>
      <div className = "flex justify-between pr-4 pt-4">   
          <Image className ="rounded-full" src={NlLogo} alt='Team Logo' width={150} height={150}/>
          <h2 className='font-bold text-[50px] text-[#EAD5E6] pt-14'>Never Lucky Gaming</h2>
          <h2 className='text-[#7D98A1]'>Welcome Back, Chris</h2>
      </div>
    </div>
  )
}

export default header
