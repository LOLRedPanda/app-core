import React from 'react'
import PropTypes, {InferProps} from 'prop-types'

function sidebar({children}:InferProps<typeof sidebar.PropTypes>) {
  return (
    <div className='flex'>
        <div className='fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>

        </div>
        <main className='nl-20 w-full'>{children}</main>
    </div>
  )
}

sidebar.PropTypes = {
    children: PropTypes.element
}
export default sidebar
