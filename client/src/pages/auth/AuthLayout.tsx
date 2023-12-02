import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const isAuthenticated = false
  return (
    <>
      {isAuthenticated ? (
        <Navigate to={'/'} />
      ) : (
        <section className='flex min-h-full items-center justify-center'>
          <Outlet />
        </section>
      )}
    </>
  )
}

export default AuthLayout
