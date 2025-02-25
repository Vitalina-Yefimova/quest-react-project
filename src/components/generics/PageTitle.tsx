import '../../index.css'

interface PageTitleProps {
  className: string;
  overline: string;
  title: string;
  titleClassName: string
}

export default function PageTitle({ overline, title, titleClassName = '', className = '' }: PageTitleProps) {
  
  return (
    <div className={`${className}`}>
      <h4 className='text-[#F2890F] text-sm font-medium leading-[144%]'>
        {overline}
      </h4>
      <h1 className={`text-[#FFF] ${titleClassName}`}>
        {title}
      </h1>
    </div>
  )
}