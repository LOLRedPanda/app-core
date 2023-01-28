import React from 'react'
import Image from 'next/image'
import {BsPersonFill, BsThreeDotsVertical} from "react-icons/bs"
import TeamLogo from '../public/assets/NL.png'
import PxeLogo from '../public/assets/pxe_logo.png'
import {data} from '../data/teams'
function customers() {
  return (
    <div className='bg-red-300 min-h-screen'>
        <div className = "flex justify-between pr-4 pt-4">   
        <Image src={PxeLogo} alt='No Image' width={200} height={100}/>
        <h2 className='font-bold text-[50px] pt-14'>Pheonix Esports League</h2>
        <h2>Welcome Back, Chris</h2>
    </div>
        <div className='p-4'>
            <div className='w-full m-auto p-4 border rounded-lg bg-red-100 overflow-y-auto'>
                <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                    <span>Logo</span>
                    <span className='sm:text-left text-right'>Name</span>
                    <span className='hidden md:grid'>Record</span>
                    <span className='hidden sm:grid'>Captain</span>
                </div>
                <ul>
                    {data.map((order, id) => (
                        <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                            <div className='flex items-center'>
                                <div className='bg-red-100 p-1 rounded-lg'>
                                <Image src={order.logo} alt={''} width={100} height={100} />
                                </div>
                                
                            </div>
                            <p className='text-Black sm:text-left text-center text-[50px]'>{order.name}</p>
                            <p className='hidden md:flex text-[50px]'>{order.Record}</p>
                            <div className='sm:flex hidden justify-between items-center'>
                                <p className='hidden md:flex text-[50px]'>{order.Captain}</p>
                                
                
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default customers
