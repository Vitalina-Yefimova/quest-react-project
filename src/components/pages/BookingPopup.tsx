import GenericPopup from "../generics/popups/BasePopup";
import BookingForm from "../content/forms/BookingForm";

export default function BookingPopup({ onClose }: { onClose: () => void }) {
  return (
    <GenericPopup onClose={onClose}>
      <BookingForm onSubmitSuccess={onClose} />
    </GenericPopup>
  );
}
