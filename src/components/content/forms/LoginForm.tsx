import { z } from "zod";
import BaseForm from "../../generics/forms/BaseForm";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginForm({
  onSubmitSuccess,
}: {
  onSubmitSuccess: () => void;
}) {
  return (
    <BaseForm
      schema={schema}
      endpoint="http://localhost:3000/auth/login"
      submitText="Login"
      onSuccess={onSubmitSuccess}
      fields={[
        { name: "email", label: "Email" },
        { name: "password", label: "Password", type: "password" },
      ]}
    />
  );
}
