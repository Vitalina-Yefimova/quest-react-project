import "../../index.css";
import EscapeRoomIcon from "../icons/EscapeRoomIcon";
import Navigation from "./components/Navigation";
import PhoneNumber from "./components/PhoneNumber";

export default function Header(): React.ReactElement {
  return (
    <header className="flex justify-between pl-8 h-[74px]">
      <EscapeRoomIcon className="mt-6" />
      <Navigation />
      <PhoneNumber />
    </header>
  );
}
