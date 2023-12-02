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
import { sortingArrayAtom } from '@/store/atoms/sorting'
import { sortedTillIndexAtom, swappedIndicesAtom } from '@/store/atoms/swapped'
import { CheckIcon, ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { SortingAlgorithm, sortingAlgorithms } from './algorithms'

const MIN_VALUE = 10
const MAX_VALUE = 100

const Menu = () => {
  const [arraySize, setArraySize] = useState<number[]>([10])
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>(sortingAlgorithms[0])
  const [open, setOpen] = useState<boolean>(false)
  const [peekedAlgorithm, setPeekedAlgorithm] = useState<SortingAlgorithm>(sortingAlgorithms[0])
  const [sortingSpeed, setSortingSpeed] = useState<number[]>([0])
  // const [inProcessRef, setInProcess] = useState<boolean>(false)
  const [sortingArray, setSortingArray] = useRecoilState(sortingArrayAtom)
  const setSwappedIndices = useSetRecoilState(swappedIndicesAtom)
  const setSortedIndex = useSetRecoilState(sortedTillIndexAtom)

  const inProcessRef = useRef<boolean>(false)

  function generateRandomArray() {
    setSortedIndex(arraySize[0] + 1)
    const newArray = Array.from(
      { length: arraySize[0] },
      () => Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE,
    )
    setSortingArray([...newArray])
  }

  function delayTime(ms: number) {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          resolve('')
        },
        arraySize[0] > 50 ? 120 - ms : 350 - ms,
      )
    })
  }

  const bubbleSort = async () => {
    const newArray = [...sortingArray]
    const n = newArray.length
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!inProcessRef.current) {
          return
        }
        if (newArray[j] > newArray[j + 1]) {
          setSwappedIndices([j, j + 1])
          await delayTime(sortingSpeed[0])
          const temp = newArray[j]
          newArray[j] = newArray[j + 1]
          newArray[j + 1] = temp
          setSortingArray([...newArray])
          setSwappedIndices([-1, -1])
        }
      }
      setSortedIndex(n - i - 1)
    }
    inProcessRef.current = false
  }

  const startSorting = () => {
    setSortedIndex(arraySize[0] + 1)
    inProcessRef.current = true
    bubbleSort()
  }

  const stopSorting = () => {
    inProcessRef.current = false
  }

  return (
    <div className='row-span-1 flex flex-col gap-6 lg:col-span-3'>
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
          className='cursor-pointer [&_[role=slider]]:h-4 [&_[role=slider]]:w-4'
          aria-label='arraySize'
          disabled={inProcessRef.current}
        />
      </div>
      <div className='grid gap-4'>
        <div className='flex items-center justify-between'>
          <Label htmlFor='sortingSpeed'>Sorting Speed</Label>
          <span className='w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border'>
            {sortingSpeed}%
          </span>
        </div>
        <Slider
          id='sortingSpeed'
          max={100}
          defaultValue={sortingSpeed}
          step={1}
          onValueChange={setSortingSpeed}
          className='cursor-pointer [&_[role=slider]]:h-4 [&_[role=slider]]:w-4'
          aria-label='sortingSpeed'
          disabled={inProcessRef.current}
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
                  <div className='text-sm text-muted-foreground'>{peekedAlgorithm.description}</div>
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
        <Button onClick={generateRandomArray} disabled={inProcessRef.current}>
          Generate Array
        </Button>
        <Button variant='outline' onClick={startSorting} disabled={inProcessRef.current}>
          Sort &#x1F680;
        </Button>
        <Button variant='destructive' onClick={stopSorting} disabled={!inProcessRef.current}>
          Stop Sorting
        </Button>
      </div>
    </div>
  )
}

export default Menu

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
