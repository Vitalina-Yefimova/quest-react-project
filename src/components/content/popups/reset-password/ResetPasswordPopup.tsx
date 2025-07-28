import { useSearchParams, useNavigate } from "react-router-dom";
import BasePopup from "../../../generics/popups/BasePopup";
import BaseForm from "../../../generics/forms/BaseForm";
import { z } from "zod";
import { useState } from "react";
import Button from "../../../generics/button/Button";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function ResetPasswordPopup() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [isSuccess, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    const res = await fetch("http://localhost:3000/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: data.password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to reset password");
    }
    setSuccess(true);
  };

  if (!token) {
    return (
      <BasePopup>
        <p className="text-red-500 text-center">Invalid or missing token</p>
      </BasePopup>
    );
  }

  return (
    <BasePopup>
      <h2 className="text-xl font-bold text-center pb-2 text-white">
        Reset Password
      </h2>
      <p className="text-sm text-center text-[#E5E5E5] pb-6">
        Enter your new password and confirm it.
      </p>
      <BaseForm
        schema={schema}
        onSubmit={handleSubmit}
        fields={[
          { name: "password", label: "New Password", type: "password" },
          {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
          },
        ]}
        submitText="Reset Password"
        successMessage="Password updated successfully. You can now log in."
        resetOnSuccess
        isSuccess={isSuccess}
      />

      {isSuccess && (
        <div className="pt-6 text-center">
          <Button
            onClick={() => navigate("/")}
            className="w-[180px] h-[45px] mt-2 rounded-full bg-[#F28A0F] text-white font-bold text-sm cursor-none"
          >
            Back to Home
          </Button>
        </div>
      )}
    </BasePopup>
  );
}
