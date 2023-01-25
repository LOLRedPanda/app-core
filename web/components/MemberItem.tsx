import React from 'react'
import Image from 'next/image'
import PropTypes, {InferProps} from 'prop-types'

type props = {

}

function Member({image, name, position}: InferProps<typeof Member.propTypes>) {
    return (<li className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
        <div >
            <Image src={image} alt='/' width={45} height={100} />
        </div>
        <div className='pl-4'>
            <p className='text-gray-800 font-bold'>{name}</p>
            <p className='text-gray-400 text-sm'>{position}</p>
        </div>
    </li>)
}

Member.propTypes = {
    image: Image,
    name: PropTypes.string,
    position: PropTypes.string
}

export default Member
