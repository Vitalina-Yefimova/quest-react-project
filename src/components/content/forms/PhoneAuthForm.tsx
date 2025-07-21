import { z } from "zod";
import { useState } from "react";
import BaseForm from "../../generics/forms/BaseForm";
import { handleTokenLogin } from "../../../utils/handleTokenLogin";

const phoneSchema = z.object({
  phone: z
    .string()
    .min(8, "Phone is required")
    .regex(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Invalid phone number"
    ),
});

const codeSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

export default function PhoneAuthForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");

  const handleSendOtp = async (data: { phone: string }) => {
    const response = await fetch("http://localhost:3000/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: data.phone }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to send code");
    }

    setPhone(data.phone);
    setStep("code");
  };

  const handleVerifyCode = async (data: { code: string }) => {
    const response = await fetch("http://localhost:3000/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        code: data.code,
      }),
    });

    if (!response.ok) throw new Error("Invalid code");

    const { access_token } = await response.json();
    await handleTokenLogin(access_token);

    onSuccess();
  };

  if (step === "phone") {
    return (
      <BaseForm
        schema={phoneSchema}
        submitText="Send Code"
        onSubmit={handleSendOtp}
        fields={[
          {
            name: "phone",
            label: "Phone Number",
          },
        ]}
      />
    );
  }

  return (
    <BaseForm
      schema={codeSchema}
      submitText="Verify Code"
      onSubmit={handleVerifyCode}
      fields={[{ name: "code", label: "Enter Code" }]}
    />
  );
}
