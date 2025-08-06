import { useState } from "react";
import VerifyContent from "../generics/verify/VerifyContent";
import AuthPopup from "./AuthPopup";

export default function VerifyPage() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <VerifyContent
        endpoint="http://localhost:3000/auth/verify"
        onSuccess={() => setTimeout(() => setShowLoginPopup(true), 3000)}
        onClose={() => setShowLoginPopup(true)}
      />

      {showLoginPopup && (
        <AuthPopup
          initialAuthType="login"
          initialMethod="email"
          onClose={() => setShowLoginPopup(false)}
        />
      )}
    </div>
  );
}
