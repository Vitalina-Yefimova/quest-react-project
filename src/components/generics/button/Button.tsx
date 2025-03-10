import "../../../index.css";
import CustomCursorWrapper from "../customCursor/CustomCursorWrapper";

export default function Button(): React.ReactElement {
  return (
    <CustomCursorWrapper>
      <button className="flex items-center justify-center w-[250px] h-[65px] bg-[#F28A0F] text-white text-[17px] font-extrabold not-italic leading-normal tracking-[0.51px] cursor-none rounded-full">
        Book now
      </button>
    </CustomCursorWrapper>
  );
}
