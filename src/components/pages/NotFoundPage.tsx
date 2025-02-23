import '../../index.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage(): React.ReactElement {
  
  const [seconds, setSeconds] = useState<number>(10)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1)
    }, 1000)
  return () => clearInterval(interval)
}, [seconds, navigate])

if (seconds === 0) {
  navigate('/')
}

  return (
    <div className='text-center pt-9'>
      <h1 className='text-4xl font-bold text-red-500 pb-5'>
        404 Not Found
      </h1>
      <p>
        The page you are looking for does not exist.
      </p>
      <p>
        You will be redirected to the homepage in {seconds} seconds...
      </p>
    </div>
  );
}