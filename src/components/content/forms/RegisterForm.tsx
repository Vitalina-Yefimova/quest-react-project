import { z } from "zod";
import BaseForm from "../../generics/forms/BaseForm";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  phone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Invalid phone number"
    ),
});

export default function RegisterForm({
  onSubmitSuccess,
}: {
  onSubmitSuccess: () => void;
}) {
  const navigate = useNavigate();

  const handleRegisterAndSendEmail = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    const registrationResponse = await fetch(
      "http://localhost:3000/auth/sign-up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!registrationResponse.ok) {
      const error = await registrationResponse.json();
      throw new Error(error.message || "Registration failed");
    }

    const emailResponse = await fetch("http://localhost:3000/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        frontendUrl: `${window.location.origin}/verify`,
        type: "verify",
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.json();
      throw new Error(error.message || "Failed to send email");
    }

    navigate("/check-email");
    onSubmitSuccess();
  };

  return (
    <BaseForm
      schema={schema}
      submitText="Sign Up"
      onSubmit={handleRegisterAndSendEmail}
      fields={[
        { name: "firstName", label: "First Name" },
        { name: "lastName", label: "Last Name" },
        { name: "email", label: "Email" },
        { name: "password", label: "Password", type: "password" },
        { name: "phone", label: "Phone" },
      ]}
    />
  );
}
