import '../../index.css'
import Header from '../header/Header'
import PageTitle from '../generics/PageTitle'
import Footer from '../footer/Footer'

export default function Contacts() {
  return (
    <div className='relative'>
    <Header />
    <PageTitle
            className='pt-8 pb-[29px] pl-[142px]'
            overline='квесты в Санкт-Петербурге'
            title='Контакты'
            titleClassName='text-6xl not-italic font-extrabold leading-[70.4px]'
      /> 
      < Footer />
      </div>
  )
}