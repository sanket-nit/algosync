import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { useMutationObserver } from '@/hooks/useMutationObserver'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronDown } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { SortingAlgorithm, sortingAlgorithms } from './algorithms'

const Visualiser: React.FC = () => {
  const [arraySize, setArraySize] = useState<number[]>([10])
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>(sortingAlgorithms[0])
  const [open, setOpen] = useState<boolean>(false)
  const [peekedAlgorithm, setPeekedAlgorithm] = useState<SortingAlgorithm>(sortingAlgorithms[0])
  const [array, setArray] = useState<number[]>([])
  const [sortingSpeed, setSortingSpeed] = useState<number[]>([500])
  const [inProcess, setInProcess] = useState<boolean>(false)
  const bubbleSort = async () => {
    setInProcess(true)
    const newArray = [...array]
    const n = newArray.length
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (newArray[j] > newArray[j + 1]) {
          await delayTime(sortingSpeed[0])
          const temp = newArray[j]
          newArray[j] = newArray[j + 1]
          newArray[j + 1] = temp
          setArray([...newArray])
        }
      }
    }
    setInProcess(false)
  }

  useEffect(() => {
    const array = generateRandomArray(arraySize[0])
    setArray(array)
  }, arraySize)

  return (
    <div className='grid grid-rows-2 lg:grid-rows-none lg:grid-cols-12 gap-4 h-full py-4'>
      <div className='row-span-1 lg:col-span-3 flex flex-col gap-6'>
        <div className='grid gap-4'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='arraySize'>Array Size</Label>
            <span className='w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border'>
              {arraySize}
            </span>
          </div>
          <Slider
            id='arraySize'
            max={100}
            defaultValue={arraySize}
            step={1}
            onValueChange={setArraySize}
            className='[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 cursor-pointer'
            aria-label='arraySize'
            disabled={inProcess ? true : false}
          />
        </div>
        <div className='grid gap-4'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='sortingSpeed'>Sorting Speed</Label>
          </div>
          <Slider
            id='sortingSpeed'
            max={100}
            defaultValue={sortingSpeed}
            step={1}
            onValueChange={setSortingSpeed}
            className='[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 cursor-pointer'
            aria-label='sortingSpeed'
            disabled={inProcess ? true : false}
          />
        </div>
        <div className='grid gap-4'>
          <Label>Algorithm</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-label='Select an Algorithm'
                className='w-full justify-between'
              >
                {selectedAlgorithm ? selectedAlgorithm.name : 'Select an algorithm...'}
                <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='min-w-full'>
              <HoverCard>
                <HoverCardContent side='left' align='start' forceMount className='min-h-full'>
                  <div className='grid gap-2'>
                    <h4 className='font-medium leading-none'>{peekedAlgorithm.name}</h4>
                    <div className='text-sm text-muted-foreground'>
                      {peekedAlgorithm.description}
                    </div>
                  </div>
                </HoverCardContent>
                <Command>
                  <CommandInput placeholder='Type a command or search...' />
                  <HoverCardTrigger />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {sortingAlgorithms.map((algorithm) => (
                      <Algorithm
                        key={algorithm.id}
                        algorithm={algorithm}
                        isSelected={selectedAlgorithm.id === algorithm.id}
                        onSelect={() => {
                          setSelectedAlgorithm(algorithm)
                          setOpen(false)
                        }}
                        onPeek={(algorithm) => setPeekedAlgorithm(algorithm)}
                      />
                    ))}
                  </CommandList>
                </Command>
              </HoverCard>
            </PopoverContent>
          </Popover>
        </div>

        <div className='grid gap-4'>
          <Button variant='secondary' onClick={bubbleSort} disabled={inProcess}>
            Sort!
          </Button>
          <Button variant='destructive' onClick={() => setInProcess(false)}>
            Stop Sorting
          </Button>
        </div>
      </div>
      <div className='row-span-1 lg:col-span-9 border-[1px] rounded-sm shadow-sm p-2 overflow-auto'>
        <div className='flex gap-2 items-end justify-center w-fit h-full'>
          {array.map((value: number, index: number) => {
            return (
              <div
                key={index}
                className='bg-violet-300 h-10 w-10 flex justify-center items-center text-white rounded transition-all duration-500'
                style={{ height: `${value}%` }}
              >
                {value}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Visualiser

interface ModelItemProps {
  algorithm: SortingAlgorithm
  isSelected: boolean
  onSelect: () => void
  onPeek: (algorithm: SortingAlgorithm) => void
}

function Algorithm({ algorithm, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  useMutationObserver(ref, (mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'aria-selected') {
        onPeek(algorithm)
      }
    })
  })

  return (
    <CommandItem
      key={algorithm.id}
      onSelect={onSelect}
      className='aria-selected:bg-primary aria-selected:text-primary-foreground'
      ref={ref}
    >
      {algorithm.name}
      <CheckIcon className={cn('ml-auto h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
    </CommandItem>
  )
}

function generateRandomArray(size: number, min = 10, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

function delayTime(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, 150 - ms)
  })
}
