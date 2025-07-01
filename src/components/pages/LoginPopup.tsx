import BasePopup from "../generics/popups/BasePopup.tsx";
import LoginForm from "../content/forms/LoginForm";

export default function LoginPopup({ onClose }: { onClose: () => void }) {
  return (
    <BasePopup onClose={onClose}>
      <LoginForm onSubmitSuccess={onClose} />
    </BasePopup>
  );
}
