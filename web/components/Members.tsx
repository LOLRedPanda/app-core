import React from 'react'
import Top from '../public/assets/RoleLogos/Top.png'
import Jungle from '../public/assets/RoleLogos/Jungle.png'
import Mid from '../public/assets/RoleLogos/Mid.png'
import ADC from '../public/assets/RoleLogos/ADC.png'
import Support from '../public/assets/RoleLogos/Support.png'
import Sub from '../public/assets/RoleLogos/Fill.png'
import Member from './MemberItem'
import PropTypes, {InferProps} from 'prop-types'

function Members({teamData} : InferProps<typeof Members.propTypes>) {
  return (
    <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border border-[#28bc0c] shadow-lg shadow-[#28bc0c] rounded-lg bg-[#101021]'>
        <ul>
            {teamData.members.top !== null ? <Member image={Top} name={teamData.members.top} position='Top' />: <Member image={Top} name="" position='Top' />}
            {teamData.members.jungle !== null ? <Member image={Jungle} name={teamData.members.jungle} position='Jungle' />: <Member image={Jungle} name="" position='Jungle' />}
            {teamData.members.mid !== null ? <Member image={Mid} name={teamData.members.mid} position='Mid' />: <Member image={Mid} name="" position='Mid' />}
            {teamData.members.adc !== null ? <Member image={ADC} name={teamData.members.adc} position='ADC' />: <Member image={ADC} name="" position='ADC' />}
            {teamData.members.support !== null ? <Member image={Support} name={teamData.members.support} position='Support' />: <Member image={Support} name="" position='Support' />}
            {/* {teamData.members.sub !== null ? <Member image={Sub} name={teamData.members.sub} position='Sub' /> : null}
            {teamData.members.sub2 !== null ? <Member image={Sub} name={teamData.members.sub2}/>:null} */}
        </ul>
    </div>
  )
}

Members.propTypes = {
    teamData: PropTypes.any,
}

export default Members
