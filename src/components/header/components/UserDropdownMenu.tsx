import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";

interface Props {
  onClose: () => void;
}

export default function UserDropdownMenu({ onClose }: Props) {
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-md w-36 z-50"
    >
      <button
        onClick={() => handleNavigate("/profile")}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
      >
        My Profile
      </button>
      <button
        onClick={() => {
          logout();
          onClose();
        }}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
      >
        Logout
      </button>
    </div>
  );
}
