import GenericPopup from "../generics/popups/BasePopup";
import RegisterForm from "../content/forms/RegisterForm";

export default function RegisterPopup({ onClose }: { onClose: () => void }) {
  return (
    <GenericPopup onClose={onClose}>
      <RegisterForm onSubmitSuccess={onClose} />
    </GenericPopup>
  );
}
