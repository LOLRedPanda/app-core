import React from 'react'

function TopCards() {
  return (
    <div className="grid lg:grid-cols-5 gap-4 pr-4 pt-4 ">
        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>57,846</p>
                <p className='text-gray-600'>Daily Revenue</p>
            </div>
            <p className='bg-green-200 flex jusify-center items-center p-2 rounded-lg'>
                <span className='text-green-600 text-lg'>+18%</span>
            </p>
        </div>
        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>257,846</p>
                <p className='text-gray-600'>YTD Revenue</p>
            </div>
            <p className='bg-green-200 flex jusify-center items-center p-2 rounded-lg'>
                <span className='text-green-600 text-lg'>+12%</span>
            </p>
        </div>
        <div className=" bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>157,846</p>
                <p className='text-gray-600'>Customer</p>
            </div>
            <p className='bg-green-200 flex jusify-center items-center p-2 rounded-lg'>
                <span className='text-green-600 text-lg'>+25%</span>
            </p>
        </div>
    </div>
  )
}

export default TopCards
