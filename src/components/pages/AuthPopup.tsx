import { useState } from "react";
import BasePopup from "../generics/popups/BasePopup.tsx";
import EmailAuthForm from "../content/forms/EmailAuthForm.tsx";
import PhoneAuthForm from "../content/forms/PhoneAuthForm.tsx";

export default function AuthPopup({ onClose }: { onClose: () => void }) {
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const [method, setMethod] = useState<"email" | "phone">("phone");

  const switchToPhone = () => setMethod("phone");
  const switchToEmail = () => setMethod("email");

  const renderForm = () => {
    const props = {
      AuthType: authType,
      onSuccess: onClose,
      switchToPhone,
      switchToEmail,
    };

    return method === "phone" ? (
      <PhoneAuthForm {...props} />
    ) : (
      <EmailAuthForm {...props} />
    );
  };

  return (
    <BasePopup onClose={onClose}>
      <h2 className="text-3xl font-bold pb-4 pt-1 text-center text-white">
        {authType === "login" ? "Log in" : "Sign up"}
      </h2>

      <div className="w-full max-w-[400px] text-[#E5E5E5] relative pt-2">
        <div className="flex justify-between items-center pb-3">
          <span className="text-white font-bold text-sm">
            {method === "phone" ? "Phone" : "Email"}
          </span>
          <button
            onClick={() =>
              setMethod((prev) => (prev === "phone" ? "email" : "phone"))
            }
            className="text-sm text-[#F28A0F] font-semibold"
          >
            {authType === "login"
              ? method === "phone"
                ? "Log in with email"
                : "Log in with phone"
              : method === "phone"
              ? "Sign up with email"
              : "Sign up with phone"}
          </button>
        </div>

        <div className="text-center">{renderForm()}</div>

        <div className="pt-4 text-sm text-center">
          {authType === "login" ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setAuthType("register")}
                className="text-[#F28A0F] font-bold"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setAuthType("login")}
                className="text-[#F28A0F] font-bold"
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </BasePopup>
  );
}
