import '../../index.css'
import Logo from './Logo'
import Navigation from './Navigation'
import PhoneNumber from './PhoneNumber'

export default function Header() {
  return (
    <header className='flex items-center justify-between bg-custom-gradient h-[74px]'>
      <Logo />
      <Navigation />
      <PhoneNumber />
    </header>
  )
}