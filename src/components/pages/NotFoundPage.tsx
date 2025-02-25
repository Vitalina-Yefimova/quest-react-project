import '../../index.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../footer/Footer'

export default function NotFoundPage() {
  
  const [seconds, setSeconds] = useState<number>(10)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1)
    }, 1000)
  return () => clearInterval(interval)
}, [])

  useEffect(() => {
    if (seconds === 0) {
      navigate('/')
    }
  }, [seconds, navigate])
    

  return (
    <div className='relative text-center pt-5'>
      <h1 className='text-4xl font-bold text-red-500 pb-5'>
        404 Not Found
      </h1>
      <p className='text-white text-2xl pb-3'>
        The page you are looking for does not exist.
      </p>
      <p className='text-white text-2xl'>
        You will be redirected to the homepage in {seconds} seconds...
      </p>
      < Footer />
    </div>
  );
}