import "../../../index.css";
import { NavLink } from "react-router-dom";

interface NavItems {
  // interface - это инструмент TS для описания структуры объекта
  path: string;
  label: string;
}

export default function Navigation(): React.ReactElement {
  // NavItems[] указывает, что navItems — это массив объектов, соответствующих интерфейсу NavItems
  const navItems: NavItems[] = [
    { path: "/", label: "QUESTS" },
    { path: "/for-begginners", label: "FOR BEGINNERS" },
    { path: "/testimonials", label: "TESTIMONIALS" },
    { path: "/special-offers", label: "SPECIAL OFFERS" },
    { path: "/contacts", label: "CONTACTS" },
  ];

  return (
    <nav>
      <ul className="flex gap-[47px] pt-10">
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }: { isActive: boolean }) =>
                `text-sm font-semibold leading-normal not-italic tracking-[0.42px] ${
                  isActive ? "text-[#F2890F]" : "text-[#F0F0F0]"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
