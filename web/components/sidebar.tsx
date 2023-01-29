import React from 'react'
import PropTypes, {InferProps} from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'
import {RxDashboard,RxPerson} from 'react-icons/rx'
import {FiSettings} from 'react-icons/fi'
import RedPandaLogo from '../public/assets/redPandaLogos/circle_panda.png'

function sidebar({children}:InferProps<typeof sidebar.propTypes>) {
  return (
    <div className='flex'>
        <div className='fixed w-20 h-screen p-4 bg-[#101021] border-r-[1px] flex flex-col justify-between'>
            <div className='flex flex-col items-center'>
                <Link href='/'>
                    <Image src={RedPandaLogo} alt='' width={500} height={500}/>
                </Link>
                <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                <Link href='/'>
                    <div className='bg-[#101021] hover:bg-gray-200 shadow-md shadow-[#FF514D] cursor-pointer my-4 p-3 rounded-lg inline-block'>
                        <RxDashboard size={24} color="#ED009C"/>
                    </div>
                </Link>
                <Link href='/teams'>
                    <div className='bg-[#101021] hover:bg-gray-200 shadow-md shadow-[#FF514D] cursor-pointer my-4 p-3 rounded-lg inline-block'>
                        <RxPerson size={24} color="#ED009C"/>
                    </div>
                </Link>
                <Link href='/'>
                    <div className='bgbg-[#101021] hover:bg-gray-200 shadow-md shadow-[#FF514D] cursor-pointer my-4 p-3 rounded-lg inline-block'>
                        <FiSettings size={24} color="#ED009C"/>
                    </div>
                </Link>
            </div>
        </div>
        <main className='ml-20 w-full'>{children}</main>
    </div>
  )
}

sidebar.propTypes = {
    children: PropTypes.element
}
export default sidebar
