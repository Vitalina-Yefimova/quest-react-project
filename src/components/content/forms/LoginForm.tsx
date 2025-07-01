import { z } from "zod";
import BaseForm from "../../generics/forms/BaseForm";
import { useUserStore } from "../../../store/userStore";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginForm({
  onSubmitSuccess,
}: {
  onSubmitSuccess: () => void;
}) {
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (data: { email: string; password: string }) => {
    const response = await fetch("http://localhost:3000/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const { access_token } = await response.json();

    if (!access_token) {
      throw new Error("No token received");
    }

    localStorage.setItem("token", access_token);

    const payload = JSON.parse(atob(access_token.split(".")[1]));
    const userId = payload.sub;

    const res = await fetch(`http://localhost:3000/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    const user = await res.json();
    setUser(user);

    onSubmitSuccess();
  };
  return (
    <BaseForm
      schema={schema}
      submitText="Login"
      onSubmit={handleSubmit}
      fields={[
        { name: "email", label: "Email" },
        { name: "password", label: "Password", type: "password" },
      ]}
    />
  );
}
