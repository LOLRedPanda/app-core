import React from 'react'
import Image from 'next/image'
import Top from '../public/assets/RoleLogos/Top.png'
import Jungle from '../public/assets/RoleLogos/Jungle.png'
import Mid from '../public/assets/RoleLogos/Mid.png'
import ADC from '../public/assets/RoleLogos/ADC.png'
import Support from '../public/assets/RoleLogos/Support.png'
import Member from './member'
import PropTypes, {InferProps} from 'prop-types'


function members({teamData} : InferProps<typeof members.propTypes>) {
    console.log(teamData.members.Top)
  return (
    <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-red-100 overflow-scroll'>
        <h1>Roster</h1>
        <ul>
            {teamData.members.top !== null ? <Member image={Top} name={teamData.members.Top} position='Top' />: <Member image={Top} name="" position='Top' />}
            {teamData.members.jungle !== null ? <Member image={Top} name={teamData.members.Jungle} position='Jungle' />: <Member image={Top} name="" position='Top' />}
            {teamData.members.mid !== null ? <Member image={Top} name={teamData.members.Mid} position='Mid' />: <Member image={Top} name="" position='Top' />}
            {teamData.members.adc !== null ? <Member image={Top} name={teamData.members.ADC} position='ADC' />: <Member image={Top} name="" position='Top' />}
            {teamData.members.support !== null ? <Member image={Top} name={teamData.members.Support} position='Support' />: <Member image={Top} name="" position='Top' />}
                {/* <li className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
                    <div >
                        <Image src={Top} alt='No Image' width={45} height={100}/>
                    </div>
                    <div className='pl-4'>
                        <p className='text-gray-800 font-bold'>Tyriq</p>
                        <p className='text-gray-400 text-sm'>Top</p>
                    </div>
                </li>
                <li className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
                    <div >
                        <Image src={Jungle} alt='No Image' width={45} height={100}/>
                    </div>
                    <div className='pl-4'>
                        <p className='text-gray-800 font-bold'>Tominatoo</p>
                        <p className='text-gray-400 text-sm'>Jungle</p>
                    </div>
                </li>
                <li className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
                    <div >
                        <Image src={Mid} alt='No Image' width={45} height={100}/>
                    </div>
                    <div className='pl-4'>
                        <p className='text-gray-800 font-bold'>Soxxy</p>
                        <p className='text-gray-400 text-sm'>Mid</p>
                    </div>
                </li>
                <li className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
                    <div >
                        <Image src={ADC} alt='No Image' width={45} height={100}/>
                    </div>
                    <div className='pl-4'>
                        <p className='text-gray-800 font-bold'>RedPanda</p>
                        <p className='text-gray-400 text-sm'>ADC</p>
                    </div>
                </li>
                <li className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
                    <div >
                        <Image src={Support} alt='No Image' width={45} height={100}/>
                    </div>
                    <div className='pl-4'>
                        <p className='text-gray-800 font-bold'>JTRIPPR</p>
                        <p className='text-gray-400 text-sm'>Support</p>
                    </div>
                </li> */}
        </ul>
    </div>
  )
}
members.propTypes = {
    teamData: PropTypes.any,
}
export default members
