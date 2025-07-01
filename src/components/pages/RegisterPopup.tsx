import BasePopup from "../generics/popups/BasePopup.tsx";
import RegisterForm from "../content/forms/RegisterForm";

export default function RegisterPopup({ onClose }: { onClose: () => void }) {
  return (
    <BasePopup onClose={onClose}>
      <RegisterForm onSubmitSuccess={onClose} />
    </BasePopup>
  );
}
