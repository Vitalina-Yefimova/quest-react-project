import "../../index.css";
import SkypeGreyIcon from "../icons/SkypeGreyIcon";
import { VkGreyIcon } from "../icons";

export default function Footer(): React.ReactElement {
  return (
    <footer className="fixed bottom-0 left-0 w-full flex items-start gap-[7px] h-[53px] pl-8">
      <SkypeGreyIcon />
      <VkGreyIcon />
    </footer>
  );
}
