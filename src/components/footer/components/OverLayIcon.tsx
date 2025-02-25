import '../../../index.css'
import { EllipseGreyIcon } from '../../icons'
import { SkypeGreyIcon } from '../../icons'

export default function OverLayIcon() {
  return (
    <div className='relative w-[28px] h-[28px]'>
      <EllipseGreyIcon />
      <SkypeGreyIcon className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
    </div>
  )
}
