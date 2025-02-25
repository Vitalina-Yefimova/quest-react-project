import '../../index.css'
import OverLayIcon from './components/OverLayIcon'
import { VkGreyIcon } from '../icons'

export default function Footer() {
  return (
    <footer className='fixed bottom-0 left-0 w-full flex items-start gap-[2px] h-[53px] pl-8'>
      < OverLayIcon />
      < VkGreyIcon />
    </footer>
  )
}