import '../../../index.css'
import { NavLink } from 'react-router-dom'

interface NavItems { // interface - это инструмент TS для описания структуры объекта
  path: string;
  label: string;
}

export default function Navigation() {

  // NavItems[] указывает, что navItems — это массив объектов, соответствующих интерфейсу NavItems
  const navItems: NavItems[] = [ 
    { path: '/', label: 'КВЕСТЫ' },
    { path: '/not-found-page', label: 'НОВИЧКАМ' },
    { path: '/not-found-page', label: 'ОТЗЫВЫ' },
    { path: '/not-found-page', label: 'АКЦИИ' },
    {path: '/contacts', label: 'КОНТАКТЫ'}
  ]

  return (
    <nav>
      <ul className='flex gap-[47px]'>
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }: {isActive: boolean}) =>
                `text-sm font-semibold leading-normal not-italic tracking-[0.42px] ${isActive ? "text-[#F2890F]" : "text-[#F0F0F0]"}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}