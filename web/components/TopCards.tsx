import React from 'react'
import PropTypes, {InferProps} from 'prop-types'
function TopCards({teamData} : InferProps<typeof TopCards.propTypes>) {
    const KDA = teamData.stats.KDA
    const teamKDA = (KDA.top + KDA.jungle +KDA.mid + KDA.adc + KDA.support)/5
  return (
    
    <div className="grid lg:grid-cols-5 gap-4 pr-4 pt-4 ">
        <div className="lg:col-span-2 col-span-1 bg-red-100 flex justify-between w-full border p-4 rounded-lg">
            <div className='flex flex-col w-full pb-4'>  
                <>
                <p className='text-2xl font-bold'>{teamData.record}</p>
                <p className='text-gray-600'>Record</p>
                </>
            </div>
            <p className='bg-green-200 flex jusify-center items-center p-2 rounded-lg'>
                <span className='text-green-600 text-lg'>100%</span>
            </p>
        </div>
        <div className="lg:col-span-2 col-span-1 bg-red-100 flex justify-between w-full border p-4 rounded-lg">
            <div className='flex flex-col w-full pb-4'>
                
                <><p className='text-2xl font-bold'>1st</p><p className='text-gray-600'>Ranked</p></>          
            </div>
            <p className='bg-gray-200 flex jusify-center items-center p-2 rounded-lg'>
                <span className='text-gray-600 text-lg'>-</span>
            </p>
        </div>
        <div className=" bg-red-100 flex justify-between w-full border p-4 rounded-lg">
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>{Math.ceil(teamKDA * 100) / 100}</p>
                <p className='text-gray-600'>Team KDA</p>
            </div>
            <p className='bg-gray-200 flex jusify-center items-center p-2 rounded-lg'>
                <span className='text-gray-600 text-lg'>-</span>
            </p>
        </div>
    </div>
  )
}
TopCards.propTypes = {
    teamData: PropTypes.any,
}
export default TopCards
