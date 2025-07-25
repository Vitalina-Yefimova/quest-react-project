import { z } from "zod";
import BaseForm from "../../generics/forms/BaseForm";
import { useNavigate } from "react-router-dom";
import { handleTokenLogin } from "../../../utils/handleTokenLogin";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email(),
    phone: z
      .string()
      .min(8, "Phone is required")
      .regex(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Invalid phone number"
      ),
    password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function EmailStepAuth({
  AuthType,
  onSuccess,
}: {
  AuthType: "login" | "register";
  onSuccess: () => void;
}) {
  const navigate = useNavigate();

  const handleSubmit = async (
    data: z.infer<typeof loginSchema> | z.infer<typeof registerSchema>
  ) => {
    if (AuthType === "login") {
      const response = await fetch("http://localhost:3000/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const { access_token } = await response.json();

      await handleTokenLogin(access_token);
      onSuccess();
    } else {
      const registerData = data as z.infer<typeof registerSchema>;
      const payload = {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
      };

      const registerResponse = await fetch(
        "http://localhost:3000/auth/sign-up",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!registerResponse.ok) {
        const error = await registerResponse.json();
        throw new Error(error.message || "Registration failed");
      }

      const emailResponse = await fetch("http://localhost:3000/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      onSuccess();
    }
  };

  const schema = AuthType === "login" ? loginSchema : registerSchema;

  const fields =
    AuthType === "login"
      ? [
          { name: "email", label: "Email" },
          { name: "password", label: "Password", type: "password" },
        ]
      : [
          { name: "firstName", label: "First Name" },
          { name: "lastName", label: "Last Name" },
          { name: "email", label: "Email" },
          { name: "phone", label: "Phone" },
          { name: "password", label: "Password", type: "password" },
          {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
          },
        ];

  return (
    <BaseForm
      schema={schema}
      submitText={AuthType === "login" ? "Login" : "Sign Up"}
      onSubmit={handleSubmit}
      fields={fields}
    />
  );
}
