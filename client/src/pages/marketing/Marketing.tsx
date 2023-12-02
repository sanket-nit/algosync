import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Marketing = () => {
  const navigate = useNavigate()
  return (
    <div className='flex min-h-full flex-col'>
      <div className='flex flex-1 flex-col items-center justify-center gap-y-8 text-center'>
        <Heading />
        <Button onClick={() => navigate('/signup')}>
          Enter AlgoSync <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}

const Heading = () => {
  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl font-bold sm:text-5xl md:text-6xl'>
        <span className='underline'>AlgoSync</span>: Visualize, Learn, and Master Algorithms
        Seamlessly
      </h1>
      <h3 className='text-base font-medium sm:text-xl md:text-2xl'>
        Revolutionizing coding education through live algorithm visualizations. <br />
        Elevate your coding skills with AlgoSync today!"
      </h3>
    </div>
  )
}

export default Marketing
