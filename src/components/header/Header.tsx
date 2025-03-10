import "../../index.css";
import EscapeRoomIcon from "../icons/EscapeRoomIcon";
import Navigation from "./components/Navigation";
import PhoneNumber from "./components/PhoneNumber";

export default function Header({
  className = "",
}: {
  className?: string;
}): React.ReactElement {
  return (
    <header
      className={`flex justify-between pl-8 h-[74px] fixed top-0 left-0 w-full z-50 ${className}`}
    >
      <EscapeRoomIcon className="mt-6" />
      <Navigation />
      <PhoneNumber />
    </header>
  );
}
