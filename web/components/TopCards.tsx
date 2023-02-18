import React from 'react'
import TopCardItem from './TopCardItem'
import team from '../models/team'
import player from '../models/player'

interface props {
	team: team
}

export default function TopCards({ team }: props) {
	const KDAs = team.members.map((member: player) => member.KDA)
	const teamKDA = KDAs.reduce((a: number, b: number) => a + b, 0) / KDAs.length
	return (
		<div className='grid lg:grid-cols-3 gap-8 pr-4 pt-4 '>
			<TopCardItem label='Record' data={team.wins + '-' + team.losses} />
			<TopCardItem label='Ranked' data={team.ranked} />
			<TopCardItem
				label='Team KDA'
				data={JSON.stringify(Math.ceil(teamKDA * 100) / 100)}
			/>
		</div>
	)
}
