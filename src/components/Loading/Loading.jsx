import React from 'react'
import {HashLoader} from 'react-spinners'

const Loading = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <div className='absolute z-50 '>
      <HashLoader color="#ff0000" />
      </div>
    </div>
  )
}

export default Loading
