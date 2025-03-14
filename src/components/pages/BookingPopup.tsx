import "../../index.css";
import VectorCloseIcon from "../icons/VectorCloseIcon";
import CustomCursorWrapper from "../generics/customCursor/CustomCursorWrapper";
import BookingForm from "../content/BookingForm";

interface BookingPopupProps {
  onClose: () => void;
}

export default function BookingPopup({ onClose }: BookingPopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[99999]">
      <div className="absolute inset-0 bg-[#3D3333] opacity-[0.96]"></div>
      <div className="relative bg-[#1D1C1C] pl-8 pr-12 pt-8 pb-[50px] w-[480px] min-h-[656px] bg-opacity-100">
        <CustomCursorWrapper>
          <VectorCloseIcon
            className="absolute top-2 right-[-15px] w-[14px] h-[14px]"
            onClick={onClose}
          ></VectorCloseIcon>
        </CustomCursorWrapper>
        <h2 className="text-white text-[32px] font-extrabold pb-10 leading-[120%] font-variant-numeric">
          Submit a Request
        </h2>
        <BookingForm onSubmitSuccess={onClose} />
      </div>
    </div>
  );
}
