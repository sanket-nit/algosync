import React from 'react'
import Visualiser from './Visualiser'
import Menu from './Menu'

const VisualiserLayout: React.FC = () => {
  return (
    <div className='grid h-full grid-rows-2 gap-4 py-4 lg:grid-cols-12 lg:grid-rows-none'>
      <Menu />
      <Visualiser />
    </div>
  )
}

export default VisualiserLayout
