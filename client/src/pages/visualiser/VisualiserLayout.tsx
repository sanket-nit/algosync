import React from 'react'
import Menu from './menu';
import Visualiser from './Visualiser';

const VisualiserLayout: React.FC = () => {
  return (
    <div className='grid grid-rows-2 lg:grid-rows-none lg:grid-cols-12 gap-4 h-full py-4'>
      <Menu />
      <Visualiser />
    </div>
  )
}

export default VisualiserLayout;
