import React from 'react'
import PropTypes, {InferProps} from 'prop-types'
import TopCardItem from './TopCardItem'

function TopCards({teamData} : InferProps<typeof TopCards.propTypes>) {
    const KDAs =  teamData.members.map((member: any) => member.KDA)
    const teamKDA = KDAs.reduce((a: number, b:number)=> a+b, 0) / KDAs.length
  return (
    <div className="grid lg:grid-cols-3 gap-8 pr-4 pt-4 ">
        <TopCardItem label="Record" data={teamData.wins + '-' + teamData.loses}/>
        <TopCardItem label="Ranked" data={teamData.ranked}/>
        <TopCardItem label="Team KDA" data={JSON.stringify(Math.ceil(teamKDA * 100) / 100)}/>
    </div>
  )
}

TopCards.propTypes = {
    teamData: PropTypes.any,
}
export default TopCards
