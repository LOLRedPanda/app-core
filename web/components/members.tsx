import React from 'react'
import Top from '../public/assets/RoleLogos/Top.png'
import Jungle from '../public/assets/RoleLogos/Jungle.png'
import Mid from '../public/assets/RoleLogos/Mid.png'
import ADC from '../public/assets/RoleLogos/ADC.png'
import Support from '../public/assets/RoleLogos/Support.png'
import Member from './MemberItem'
import PropTypes, {InferProps} from 'prop-types'


function members({teamData} : InferProps<typeof members.propTypes>) {
  return (
    <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border border-[#ff514d] shadow-lg shadow-[#FF514D] rounded-lg bg-[#101021] overflow-scroll'>
        <h1>Roster</h1>
        <ul>
            {teamData.members.top !== null ? <Member image={Top} name={teamData.members.top} position='Top' />: <Member image={Top} name="" position='Top' />}
            {teamData.members.jungle !== null ? <Member image={Jungle} name={teamData.members.jungle} position='Jungle' />: <Member image={Jungle} name="" position='Jungle' />}
            {teamData.members.mid !== null ? <Member image={Mid} name={teamData.members.mid} position='Mid' />: <Member image={Mid} name="" position='Mid' />}
            {teamData.members.adc !== null ? <Member image={ADC} name={teamData.members.adc} position='ADC' />: <Member image={ADC} name="" position='ADC' />}
            {teamData.members.support !== null ? <Member image={Support} name={teamData.members.support} position='Support' />: <Member image={Support} name="" position='Support' />}
        </ul>
    </div>
  )
}
members.propTypes = {
    teamData: PropTypes.any,
}
export default members
