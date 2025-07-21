import "../../index.css";
import EscapeRoomIcon from "../icons/EscapeRoomIcon";
import Navigation from "./components/Navigation";
import PhoneNumber from "./components/PhoneNumber";
import CustomCursorWrapper from "../generics/customCursor/CustomCursorWrapper";
import { useState, useEffect, useRef } from "react";
import AuthPopup from "../pages/AuthPopup";
import { useUserStore } from "../../store/userStore";
import { ChevronDown, User } from "lucide-react";
import UserDropdownMenu from "./components/UserDropdownMenu";

export default function Header({
  className = "",
}: {
  className?: string;
}): React.ReactElement {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { user } = useUserStore();

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
                <CustomCursorWrapper>
                  <button
                    onClick={() => setOpenMenu((prev) => !prev)}
                    className="text-sm bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition flex items-center gap-2 cursor-none"
                  >
                    My Profile
                    <ChevronDown size={20} className="mt-[1px]" />
                  </button>
                </CustomCursorWrapper>

                {openMenu && (
                  <UserDropdownMenu onClose={() => setOpenMenu(false)} />
                )}
              </div>
            ) : (
              <>
                <CustomCursorWrapper>
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="text-white text-sm bg-[#F28A0F] transition px-5 py-2 rounded-md cursor-none"
                  >
                    <User size={18} className="inline mr-2" />
                    Log in
                  </button>
                </CustomCursorWrapper>
              </>
            )}
          </div>
        </div>
      </header>
      {isAuthOpen && <AuthPopup onClose={() => setIsAuthOpen(false)} />}
    </>
  );
}
