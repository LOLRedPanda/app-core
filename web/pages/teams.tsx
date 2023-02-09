import React from 'react'
import Image from 'next/image'
import PxeLogo from '../public/assets/leagueLogos/pxe_logo.png'
import {data} from '../data/teams'

function teams() {
    // let winrate: number[] = []
    // let rankings: number[] = []
    // // let winrate: number[] = []
    // data.map((teamData) => (
    //     winrate.push(teamData.wins/(teamData.wins + teamData.loses))
    // ))
    // winrate.sort(function(a, b){return b - a})\let rankings: number[] = []
    data.sort(function (a, b) {
        if(a.wins!=b.wins){
            if(a.wins > b.wins)
            return - 1
        }else
        if(a.wins==b.wins){
            if(a.wins/(a.wins + a.loses) > b.wins/(b.wins + b.loses))
            return - 1
        }else
        return 0
    });
  return (
    <div className='bg-red-300 min-h-screen'>
        <div className = "flex justify-between pr-4 pt-4">   
        <Image src={PxeLogo} alt='No Image' width={200} height={100}/>
        <h2 className='font-bold text-[50px] pt-14'>Pheonix Esports League</h2>
        <h2>Welcome Back, Chris</h2>
    </div>
        <div className='p-4'>
            <div className='w-full m-auto p-4 border rounded-lg bg-red-100 overflow-y-auto'>
                <div className='my-3 p-2 grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 items-center justify-between cursor-pointer'>
                    <span className='hidden sm:grid'>Ranked</span>
                    <span>Logo</span>
                    <span className='sm:text-left text-right'>Name</span>
                    <span className='hidden md:grid'>Record</span>
                    <span className='hidden sm:grid'>Captain</span>
                </div>
                <ul>
                    {data.map((teamData, id) => (
                        <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 items-center justify-between cursor-pointer'>
                            <p className='text-Black sm:text-left text-center text-[40px]'>{teamData.ranked}</p>
                            <div className='flex items-center'>
                                <div className='bg-red-100 p-1 rounded-lg'>
                                <Image src={teamData.logo} alt={''} width={100} height={100} />
                                </div>
                            </div>
                            <p className='text-Black sm:text-left text-center text-[45px]'>{teamData.name}</p>
                            <p className='hidden md:flex text-[45px]'>{teamData.wins + '-' + teamData.loses}</p>
                            <div className='sm:flex hidden justify-between items-center'>
                                <p className='hidden md:flex text-[45px]'>{teamData.captain}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default teams
