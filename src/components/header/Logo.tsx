import '../../index.css'
import { LogoIcon } from '../icons'
import { EscapeRoomIcon } from '../icons'

export default function Logo() {
  return (
    <div className='flex w-[125px] h-[50px] mt-2 ml-8 relative'>
      <LogoIcon />
      <div className='bg-[#FFF] h-[1.2px] w-[9.5px] absolute ml-[45px] mt-[16.8px]'></div>
      <div className='bg-[#FFF] h-[2px] w-[10px] absolute mt-[23.1px] ml-[45px]'></div>
      <EscapeRoomIcon className='pt-[6.4px] pb-[4.45px]' />
    </div>
  )
}