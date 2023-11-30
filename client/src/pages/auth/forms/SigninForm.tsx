import * as z from 'zod'

import axios from '@/api/axios'
import useAuth from '@/hooks/useAuth'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { SigninValidation } from '@/lib/validation'
import { ILoginResponse } from '@/types/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'

const SigninForm = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // If signin is called from a protected route it will pass the route to it
  const from = location?.state?.from?.pathname || '/visualiser'

  const { toast } = useToast()
  const { setAuth } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    try {
      setIsLoading(true)
      const res = await axios.post<ILoginResponse>('/api/auth/login', values, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })

      const accessToken: string = res?.data?.accessToken
      const { username } = form.getValues()

      setAuth({
        username: username,
        accessToken: accessToken,
      })
      setIsLoading(false)
      navigate(from, { replace: true })
    } catch (err: any) {
      setIsLoading(false)
      console.log(err)
      if (!err?.response) {
        toast({ title: 'Error', description: 'No reponse from server', variant: 'destructive' })
      } else if (err?.response?.status === 400) {
        toast({
          title: 'Error',
          description: 'Missing username or password',
          variant: 'destructive',
        })
      } else if (err?.response?.status === 401) {
        toast({ title: 'Error', description: 'Incorrect login details', variant: 'destructive' })
      } else {
        toast({ title: 'Error', description: err?.response?.data?.message, variant: 'destructive' })
      }
    }
  }
  return (
    <Form {...form}>
      <div className='flex flex-col'>
        <h1 className='text-center text-3xl font-bold'>Log in to AlgoSync</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-5 flex flex-col gap-5 w-full'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='password' {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>{isLoading ? <Spinner /> : 'Sign in'}</Button>
        </form>
        <p className='mt-4'>
          Don't have an account?{' '}
          <Link to='/signup' className='underline cursor-pointer'>
            Sign up
          </Link>
        </p>
      </div>
    </Form>
  )
}

export default SigninForm
