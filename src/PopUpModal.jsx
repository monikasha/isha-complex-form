import React from 'react'

const PopUpModal = (props) => {
    const {currentObject} = props;
  return (
    <div className='w-75 h-75 mx-auto my-5 bg-light text-dark p-5 m-5'>
        {
            Object.keys(currentObject).map(key => {
                if(typeof currentObject[key]==='object') {
                    return Object.keys(currentObject[key]).map(k =>{
                        return  <li>{k}: {currentObject[key][k]}</li>
                    })
                } else return <li>{key}: {currentObject[key]}</li>
            })
        }
    </div>
  )
}

export default PopUpModal