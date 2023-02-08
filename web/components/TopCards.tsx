import React from 'react'
import PropTypes, {InferProps} from 'prop-types'
import TopCardItem from './TopCardItem'

function TopCards({teamData} : InferProps<typeof TopCards.propTypes>) {
    const KDA = teamData.stats.KDA
    const teamKDA =  (KDA.top + KDA.jungle +KDA.mid + KDA.adc + KDA.support /*+ (KDA.sub !== null ? KDA.sub: 0) + (KDA.sub2 !== null ? KDA.sub2: 0))/(KDA.sub2 !== null ? 7: KDA.sub1 !== null ? 6: 5)*/)/5
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
