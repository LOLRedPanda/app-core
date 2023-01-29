import React from 'react'
import Image from 'next/image'
import PropTypes, {InferProps} from 'prop-types'

type props = {

}

function Member({image, name, position}: InferProps<typeof Member.propTypes>) {
    return (<li className='bg-[#101021] shadow-md shadow-[#ED009C] rounded-lg my-3 p-2 flex items-center'>
        <div >
            <Image src={image} alt='/' width={45} height={100} />
        </div>
        <div className='pl-4'>
            <p className='text-[#EAD5E6] font-bold'>{name}</p>
            <p className='text-[#7D98A1] text-sm'>{position}</p>
        </div>
    </li>)
}

Member.propTypes = {
    image: PropTypes.any,
    name: PropTypes.string,
    position: PropTypes.string
}

export default Member
