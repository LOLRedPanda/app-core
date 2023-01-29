import React from 'react'
import PropTypes, {InferProps} from 'prop-types'
import TopCardItem from './TopCardItem'

function TopCards({teamData} : InferProps<typeof TopCards.propTypes>) {
    const KDA = teamData.stats.KDA
    const teamKDA = (KDA.top + KDA.jungle +KDA.mid + KDA.adc + KDA.support)/5
  return (
    <div className="grid lg:grid-cols-3 gap-8 pr-4 pt-4 ">
        <TopCardItem label="Record" data={teamData.record}/>
        <TopCardItem label="Ranked" data="1st"/>
        <TopCardItem label="Team KDA" data={JSON.stringify(Math.ceil(teamKDA * 100) / 100)}/>
    </div>
  )
}

TopCards.propTypes = {
    teamData: PropTypes.any,
}
export default TopCards
