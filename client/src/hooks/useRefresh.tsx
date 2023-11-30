import axios from '@/api/axios'
import useAuth from './useAuth'
import { ILoginResponse } from '@/types/login'

const useRefresh = () => {
  const { setAuth } = useAuth()
  const refresh = async () => {
    const response = await axios.get<ILoginResponse>('/api/auth/refresh', {
      withCredentials: true,
    })

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken }
    })
    return response.data.accessToken
  }
  return refresh
}

export default useRefresh
