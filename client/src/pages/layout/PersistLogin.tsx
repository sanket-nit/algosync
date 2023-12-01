import useAuth from '@/hooks/useAuth'
import useRefresh from '@/hooks/useRefresh'

import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useRefresh()
  const { auth } = useAuth()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
  }, [])

  useEffect(() => {}, [isLoading])

  return <>{isLoading ? <> </> : <Outlet />}</>
}

export default PersistLogin
