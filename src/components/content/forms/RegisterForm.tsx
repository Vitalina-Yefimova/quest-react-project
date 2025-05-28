import { z } from "zod";
import BaseForm from "../../generics/forms/BaseForm";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
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
  return (
    <BaseForm
      schema={schema}
      endpoint="http://localhost:3000/auth/register"
      submitText="Sign Up"
      onSuccess={onSubmitSuccess}
      fields={[
        { name: "name", label: "Name" },
        { name: "email", label: "Email" },
        { name: "password", label: "Password", type: "password" },
        { name: "phone", label: "Phone" },
      ]}
    />
  );
}
