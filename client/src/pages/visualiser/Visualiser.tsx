import { cn } from '@/lib/utils'
import { sortingArrayAtom } from '@/store/atoms/sorting'
import { sortedTillIndexAtom, swappedIndicesAtom } from '@/store/atoms/swapped'
import React from 'react'
import { useRecoilValue } from 'recoil'

const Visualiser: React.FC = () => {
  const array = useRecoilValue(sortingArrayAtom)
  const swappedIndices = useRecoilValue(swappedIndicesAtom)
  const sortedIndex = useRecoilValue(sortedTillIndexAtom)

  return (
    <div className='row-span-1 overflow-auto rounded-sm border-[1px] p-2 shadow-sm lg:col-span-9'>
      <div className='flex h-full w-fit items-end justify-center gap-2'>
        {array.map((value: number, index: number) => {
          return (
            <div
              key={index}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded bg-violet-300 text-white transition-all duration-500',
                swappedIndices[0] === index || swappedIndices[1] === index ? 'bg-red-500' : '',
                sortedIndex <= index ? 'bg-green-500' : '',
              )}
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
