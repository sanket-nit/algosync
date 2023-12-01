import { cn } from '@/lib/utils'
import { sortingArrayAtom } from '@/store/atoms/sorting'
import { sortedTillIndexAtom, swappedIndicesAtom } from '@/store/atoms/swapped'
import React from 'react'
import { useRecoilValue } from 'recoil'

const Visualiser: React.FC = () => {
  const array = useRecoilValue(sortingArrayAtom)
  const swappedIndices = useRecoilValue(swappedIndicesAtom);
  const sortedIndex = useRecoilValue(sortedTillIndexAtom);

  return (
    <div className='row-span-1 lg:col-span-9 border-[1px] rounded-sm shadow-sm p-2 overflow-auto'>
      <div className='flex gap-2 items-end justify-center w-fit h-full'>
        {array.map((value: number, index: number) => {
          return (
            <div
              key={index}
              className={cn('bg-violet-300 h-10 w-10 flex justify-center items-center text-white rounded transition-all duration-500', swappedIndices
              [0] === index || swappedIndices[1] === index ? 'bg-red-500' : '', sortedIndex <= index ? 'bg-green-500': '')}
              style={{ height: `${value}%` }}
            >
              {value}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Visualiser
