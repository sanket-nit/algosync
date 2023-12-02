import logoDark from '@/assets/icon-dark.png'
import logoLight from '@/assets/icon-light.png'
import useAuth from '@/hooks/useAuth'
import useLogout from '@/hooks/useLogout'

import { cn } from '@/lib/utils'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { ModelToggle } from '../ui/model-toggle'
import { Separator } from '../ui/separator'
import { Spinner } from '../ui/spinner'

const Navbar = () => {
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
        'fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-background bg-bottom px-6 py-4 shadow-sm transition-all duration-300 dark:border-b-[1px] dark:border-b-slate-800 dark:bg-background dark:bg-opacity-90',
      )}
    >
      <div className='flex h-full items-center gap-2'>
        <div
          className='flex cursor-pointer items-center space-x-1 text-center'
          onClick={() => navigate(auth?.accessToken ? '/home' : '/')}
        >
          <span className='font-bold'>AlgoSync</span>
          <img src={logoDark} alt='Neural' className='hidden w-8 hover:animate-spin dark:block' />
          <img src={logoLight} alt='Neural' className='w-8 hover:animate-spin dark:hidden' />
        </div>
        {auth?.accessToken && (
          <>
            <Separator orientation='vertical' />
            <Link to='/home'>
              <Button
                variant='ghost'
                className={cn(
                  'text-zinc-600 dark:text-slate-200',
                  location.pathname === '/home' && 'bg-accent text-accent-foreground',
                )}
              >
                Home
              </Button>
            </Link>
            <Link to='/visualiser'>
              <Button
                variant='ghost'
                className={cn(
                  'text-zinc-600 dark:text-slate-200',
                  location.pathname === '/visualiser' && 'bg-accent text-accent-foreground',
                )}
              >
                Visualizer
              </Button>
            </Link>
            <Link to='/editor'>
              <Button
                variant='ghost'
                className={cn(
                  'text-zinc-600 dark:text-slate-200',
                  location.pathname === '/editor' && 'bg-accent text-accent-foreground',
                )}
              >
                Code Editor
              </Button>
            </Link>
          </>
        )}
      </div>
      <div className='flex items-center justify-center space-x-2 sm:hidden md:flex'>
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
