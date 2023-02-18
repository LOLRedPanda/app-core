import React from 'react'
import Member from './MemberItem'
import PropTypes, { InferProps } from 'prop-types'
import player from '../models/player'

function Members({ teamData }: InferProps<typeof Members.propTypes>) {
	const { members } = teamData
	const memberItems = members.map((member: player) => (
		<Member
			key={member.name}
			image={`/assets/roleLogos/${member.position.toLowerCase()}.png`}
			name={member.name}
			position={member.position}
		/>
	))

	return (
		<div className='w-full overflow-auto col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border border-[#28bc0c] shadow-lg shadow-[#28bc0c] rounded-lg bg-[#101021]'>
			<ul>{memberItems}</ul>
		</div>
	)
}

Members.propTypes = {
	teamData: PropTypes.any,
}

export default Members
