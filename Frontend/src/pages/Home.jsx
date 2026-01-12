import React from 'react'
import Sidebar from '../component/sidebar'
import getMessage from '../CustomHook/getMessage'
import Messagearea from '../component/messagearea'

const Home = () => {
   getMessage()
  return (
   
    <div className='flex w-full h-[100vh] overflow-hidden'>
      <Sidebar/>
      < Messagearea/>
      
    </div>
  )
}

export default Home