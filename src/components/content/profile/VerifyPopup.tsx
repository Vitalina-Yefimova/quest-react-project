import BasePopup from "../../generics/popups/BasePopup";
import VerifyContent from "../../generics/verify/VerifyContent";

export default function VerifyPopup({
  endpoint,
  onSuccess,
  onClose,
}: {
  endpoint?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}) {
  const handleClose = onClose ?? (() => {});
  return (
    <BasePopup onClose={handleClose}>
      <VerifyContent
        endpoint={endpoint ?? ""}
        onSuccess={onSuccess ?? (() => {})}
        onClose={onClose ?? (() => {})}
      />
    </BasePopup>
  );
}
