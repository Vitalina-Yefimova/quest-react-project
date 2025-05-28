import "../../../index.css";
import { NavLink, useLocation } from "react-router-dom";
import CustomCursorWrapper from "../../generics/customCursor/CustomCursorWrapper";

interface NavItems {
  // interface - это инструмент TS для описания структуры объекта
  path: string;
  label: string;
}

export default function Navigation(): React.ReactElement {
  const location = useLocation();
  // NavItems[] указывает, что navItems — это массив объектов, соответствующих интерфейсу NavItems
  const navItems: NavItems[] = [
    { path: "/", label: "QUESTS" },
    { path: "/for-begginners", label: "FOR BEGINNERS" },
    { path: "/testimonials", label: "TESTIMONIALS" },
    { path: "/special-offers", label: "SPECIAL OFFERS" },
    { path: "/contacts", label: "CONTACTS" },
  ];

  return (
    <nav className="relative">
      <ul className="flex gap-[47px] pt-10">
        {navItems.map(({ path, label }) => (
          <CustomCursorWrapper key={path}>
            <li>
              <NavLink
                to={path}
                className={({ isActive }) => {
                  const isQuestsActive =
                    isActive ||
                    (path === "/" && location.pathname.startsWith("/genre/"));

                  return `text-sm font-semibold leading-normal not-italic tracking-[0.42px] cursor-none ${
                    isQuestsActive ? "text-[#F2890F]" : "text-[#F0F0F0]"
                  }`;
                }}
              >
                {label}
              </NavLink>
            </li>
          </CustomCursorWrapper>
        ))}
      </ul>
    </nav>
  );
}
