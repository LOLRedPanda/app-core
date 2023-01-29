import React from 'react'
import PropTypes, {InferProps} from 'prop-types'
function TopCards({teamData} : InferProps<typeof TopCards.propTypes>) {
    const KDA = teamData.stats.KDA
    const teamKDA = (KDA.top + KDA.jungle +KDA.mid + KDA.adc + KDA.support)/5
  return (
    
    <div className="grid lg:grid-cols-5 gap-4 pr-4 pt-4 ">
        <div className="lg:col-span-2 col-span-1 bg-[#101021] shadow-lg shadow-[#FF514D] flex justify-between w-full border border-[#FF514D] p-4 rounded-lg">
            <div className='flex flex-col w-full pb-4'>  
                <>
                <p className='text-2xl text-[#EAD5E6] font-bold'>{teamData.record}</p>
                <p className='text-[#7D98A1]'>Record</p>
                </>
            </div>
            <p className='bg-[#101021] flex jusify-center items-center p-2 rounded-lg'>
                <span className='text-green-600 text-lg'>100%</span>
            </p>
        </div>
        <div className="lg:col-span-2 col-span-1 bg-[#101021] shadow-lg shadow-[#FF514D] flex justify-between w-full p-4 border border-[#FF514D] rounded-lg">
            <div className='flex flex-col w-full items-center pb-4'>
                <>
                    <p className='text-2xl text-[#EAD5E6] font-bold'>1st</p>
                    <p className='text-[#7D98A1]'>Ranked</p>
                </>          
            </div>
        </div>
        <div className=" bg-[#101021] shadow-lg shadow-[#FF514D] flex justify-between w-full p-4 border border-[#FF514D] rounded-lg">
            <div className='flex flex-col w-full items-center pb-4'>
                <p className='text-2xl text-[#EAD5E6] font-bold'>{Math.ceil(teamKDA * 100) / 100}</p>
                <p className='text-[#7D98A1]'>Team KDA</p>
            </div>
        </div>
    </div>
  )
}
TopCards.propTypes = {
    teamData: PropTypes.any,
}
export default TopCards
