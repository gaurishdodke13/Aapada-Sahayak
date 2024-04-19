import React from 'react'

const Sos = () => {
    return (
        <div className='sos'>
            <select name='type'>
                <option value=''>Select disaster :</option>
                <option>Earthquake</option>
                <option>Flash Floods</option>
                <option>Cyclone</option>
                <option>Fire</option>
            </select>

            <button></button>
        </div>
    )
}

export default Sos;