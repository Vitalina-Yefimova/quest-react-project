import "../../index.css";
import EscapeRoomIcon from "../icons/EscapeRoomIcon";
import Navigation from "./components/Navigation";
import PhoneNumber from "./components/PhoneNumber";
import CustomCursorWrapper from "../generics/customCursor/CustomCursorWrapper";
import { useState } from "react";
import LoginPopup from "../pages/LoginPopup";
import RegisterPopup from "../pages/RegisterPopup";

export default function Header({
  className = "",
}: {
  className?: string;
}): React.ReactElement {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
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
