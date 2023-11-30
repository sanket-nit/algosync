import logo from '@/assets/icon.png'
import useAuth from '@/hooks/useAuth'
import useLogout from '@/hooks/useLogout'
import useScrollTop from '@/hooks/useScrollTop'

import { cn } from '@/lib/utils'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { ModelToggle } from '../ui/model-toggle'
import { Separator } from '../ui/separator'
import { Spinner } from '../ui/spinner'

const Navbar = () => {
  const scrolled = useScrollTop()
  const navigate = useNavigate()
  const location = useLocation()
  const { auth } = useAuth()
  const [logout, isLoading] = useLogout()

  const isSigninPage = location.pathname === '/signin'

  const handleLogout = async () => {
    await logout()
  }

  return (
    <nav
      className={cn(
        'z-50 bg-background fixed top-0 flex items-center justify-between w-full h-20 px-6 py-4',
        scrolled && 'bg-bottom shadow-sm',
      )}
    >
      <div className='flex gap-2 h-full items-center'>
        <div
          className='flex space-x-1 text-center items-center cursor-pointer'
          onClick={() => navigate(auth?.accessToken ? '/home' : '/')}
        >
          <span className='font-bold'>AlgoSync</span>
          <img src={logo} alt='Neural' className='w-8 hover:animate-spin' />
        </div>
        <Separator orientation='vertical' />
        <Link to='/home'>
          <Button variant='ghost' className='text-zinc-800'>
            Home
          </Button>
        </Link>
        <Link to='/visualiser'>
          <Button variant='ghost' className='text-zinc-800'>
            Visualizer
          </Button>
        </Link>
        <Link to='/editor'>
          <Button variant='ghost' className='text-zinc-800'>
            Code Editor
          </Button>
        </Link>
      </div>
      <div className='flex space-x-2 items-center justify-center md:flex sm:hidden'>
        {auth?.accessToken ? (
          <Button variant={'destructive'} onClick={handleLogout}>
            {isLoading ? <Spinner /> : 'Logout'}
          </Button>
        ) : (
          <Button
            variant={'default'}
            onClick={() => (isSigninPage ? navigate('/signup') : navigate('signin'))}
          >
            {isSigninPage ? 'Sign up' : 'Sign in'}
          </Button>
        )}
        <ModelToggle />
      </div>
    </nav>
  )
}

export default Navbar
