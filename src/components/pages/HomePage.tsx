import '../../index.css'
import Header from '../header/Header'
import PageTitle from '../generics/PageTitle'
import Footer from '../footer/Footer'

export default function HomePage() {
  return (
    <div className='relative'>
      <Header />
      <PageTitle
        className='py-12 pl-[136px]'
        overline='квесты в Санкт-Петербурге'
        title='Выберите тематику'
        titleClassName='text-6xl not-italic font-extrabold leading-[70.4px]'
      /> 
      < Footer />
    </div>
  )
}