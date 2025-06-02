import "../../index.css";
import EscapeRoomIcon from "../icons/EscapeRoomIcon";
import Navigation from "./components/Navigation";
import PhoneNumber from "./components/PhoneNumber";
import CustomCursorWrapper from "../generics/customCursor/CustomCursorWrapper";
import { useState, useEffect, useRef } from "react";
import LoginPopup from "../pages/LoginPopup";
import RegisterPopup from "../pages/RegisterPopup";
import { useUserStore } from "../../store/userStore";
import { ChevronDown } from "lucide-react";

export default function Header({
  className = "",
}: {
  className?: string;
}): React.ReactElement {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useUserStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`flex justify-between pl-8 h-[74px] fixed top-0 left-0 w-full z-50 ${className}`}
      >
        <EscapeRoomIcon className="mt-6" />
        <Navigation />
        <div className="flex items-center gap-6 pr-8">
          <PhoneNumber />
          <div className="flex items-center gap-3 font-bold pt-10">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpenMenu((prev) => !prev)}
                  className="text-sm bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition flex items-center gap-2"
                >
                  @{user.username}
                  <ChevronDown size={20} className="mt-[1px]" />
                </button>

                {openMenu && (
                  <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-md w-36 z-50">
                    <a
                      href={`/u/${user.username}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      My Profile
                    </a>
                    <button
                      onClick={() => {
                        logout();
                        setOpenMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <CustomCursorWrapper>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="text-white text-sm hover:text-orange-400 transition px-3 py-1 cursor-none"
                  >
                    Login
                  </button>
                </CustomCursorWrapper>
                <CustomCursorWrapper>
                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="text-sm bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition cursor-none"
                  >
                    Sign Up
                  </button>
                </CustomCursorWrapper>
              </>
            )}
          </div>
        </div>
      </header>

      {isLoginOpen && <LoginPopup onClose={() => setIsLoginOpen(false)} />}
      {isRegisterOpen && (
        <RegisterPopup onClose={() => setIsRegisterOpen(false)} />
      )}
    </>
  );
}
