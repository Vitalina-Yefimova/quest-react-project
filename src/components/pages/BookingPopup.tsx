import BasePopup from "../generics/popups/BasePopup.tsx";
import BookingForm from "../content/forms/BookingForm";

export default function BookingPopup({ onClose }: { onClose: () => void }) {
  return (
    <BasePopup onClose={onClose}>
      <BookingForm onSubmitSuccess={onClose} />
    </BasePopup>
  );
}
