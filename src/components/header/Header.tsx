import '../../index.css'
import Logo from './components/Logo'
import Navigation from './components/Navigation'
import PhoneNumber from './components/PhoneNumber'

export default function Header() {
  return (
    <header className='flex items-center justify-between h-[74px]'>
      <Logo />
      <Navigation />
      <PhoneNumber />
    </header>
  )
}