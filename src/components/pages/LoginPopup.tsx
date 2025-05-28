import GenericPopup from "../generics/popups/BasePopup";
import LoginForm from "../content/forms/LoginForm";

export default function LoginPopup({ onClose }: { onClose: () => void }) {
  return (
    <GenericPopup onClose={onClose}>
      <LoginForm onSubmitSuccess={onClose} />
    </GenericPopup>
  );
}
