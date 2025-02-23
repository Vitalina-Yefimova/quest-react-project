import '../../index.css'
import { NavLink } from 'react-router-dom'

export default function Navigation(): React.ReactElement {

  const navItems = [
    { path: '/', label: 'КВЕСТЫ' },
    { path: '/not-found-page', label: 'НОВИЧКАМ' },
    { path: '/not-found-page', label: 'ОТЗЫВЫ' },
    { path: '/not-found-page', label: 'АКЦИИ' },
    {path: '/contacts', label: 'КОНТАКТЫ'}
  ]
  return (
    <nav>
      <ul className='flex gap-[47px]'>
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-semibold leading-normal not-italic tracking-[0.42px] ${isActive ? "text-[#F2890F]" : "text-[#F0F0F0]"}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}