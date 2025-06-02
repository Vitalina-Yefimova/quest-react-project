import { z } from "zod";
import BaseForm from "../../generics/forms/BaseForm";
import { useUserStore } from "../../../store/userStore";

type AuthResponse = {
  access_token: string;
};

const schema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
});

export default function LoginForm({
  onSubmitSuccess,
}: {
  onSubmitSuccess: () => void;
}) {
  const setUser = useUserStore((state) => state.setUser);

  const handleSuccess = async (response: AuthResponse) => {
    const token = response.access_token;
    localStorage.setItem("token", token);

    const res = await fetch("http://localhost:3000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await res.json();
    setUser(user);

    onSubmitSuccess();
  };
  return (
    <BaseForm
      schema={schema}
      endpoint="http://localhost:3000/auth/login"
      submitText="Login"
      onSuccess={handleSuccess}
      fields={[
        { name: "login", label: "Username or Email" },
        { name: "password", label: "Password", type: "password" },
      ]}
    />
  );
}
