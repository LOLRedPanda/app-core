import React from 'react'
import Image from 'next/image'
import PxeLogo from '../public/assets/leagueLogos/pxe_logo.png'
import {data} from '../data/teams'
import TeamService from '../services/teamService'

function teams() {
    const teamsResults = data.map((t) => {
        const team = new TeamService(t)
        return {
            name: t.name,
            score: team.winLossScore(),
            members: t.members,
            wins: t.wins,
            loses: t.loses,
            logo: t.logo
        }
    })

    teamsResults.sort((a, b) => {
        if(a.score!=b.score){
            if(a.score > b.score)
            return -1
        }
        return 0
    });

    return (
    <div className='bg-[#101021]'>
        <div className = "flex justify-between pr-4 pt-4">   
        <Image src={PxeLogo} alt='League Photo' width={200} height={100}/>
        <h2 className='text-[#FF514D] font-bold text-[50px] pt-14'>Pheonix Esports League</h2>
    </div>
        <div className='p-4'>
            <div className='w-full m-auto p-4 border rounded-lg bg-[#da2b82] overflow-y-auto'>
                <div className='my-3 p-2 grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 items-center justify-between cursor-pointer'>
                    <span className='hidden sm:grid'>Ranked</span>
                    <span>Logo</span>
                    <span className='sm:text-left text-right'>Name</span>
                    <span className='hidden md:grid'>Record</span>
                    {/* <span className='hidden sm:grid'>Captain</span> */}
                </div>
                <ul>
                    {teamsResults.map((teamData, rank) =>
                        (
                        <li key={rank} className='bg-[#101021] rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 items-center justify-between cursor-pointer'>
                            <p className='text-[#FF514D] sm:text-left text-center text-[40px]'>{rank + 1}</p>
                            <div className='flex items-center'>
                                <div className='bg-[#8d3f3f] p-1 shadow-md shadow-[#573d3d] rounded-lg'>
                                <Image src={`/assets/teamLogos/${teamData.logo}`} alt={''} width={100} height={100} />
                                </div>
                            </div>
                            <p className='text-[#FF514D] sm:text-left text-center text-[45px]'>{teamData.name}</p>
                            <p className='text-[#FF514D] hidden md:flex text-[45px]'>{teamData.wins + '-' + teamData.loses}</p>
                            {/* <div className='text-[#FF514D] sm:flex hidden justify-between items-center'>
                                <p className=' hidden md:flex text-[45px]'>{captain}</p>
                            </div> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default teams
