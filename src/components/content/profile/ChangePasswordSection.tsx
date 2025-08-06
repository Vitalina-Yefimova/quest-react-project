import { useState } from "react";
import BaseForm from "../../generics/forms/BaseForm";
import { z } from "zod";
import { useUserStore } from "../../../store/userStore";
import { getTokenFromCookie } from "../../../utils/getTokenFromCookie";

const schema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z.string().min(6, "New password is required"),
    confirmPassword: z.string().min(6, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ChangePasswordSection() {
  const user = useUserStore((state) => state.user);
  const [isSuccess, setSuccess] = useState(false);

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    if (!user || !user.id) throw new Error("User is not authenticated");
    const token = getTokenFromCookie();
    if (!token) throw new Error("No token provided");

    try {
      const res = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: data.newPassword,
          oldPassword: data.oldPassword,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to change password");
      }

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Failed to change password");
    }
  };

  const fields = [
    { name: "oldPassword", label: "Old Password", type: "password" },
    { name: "newPassword", label: "New Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
  ];

  return (
    <BaseForm
      fields={fields}
      schema={schema}
      submitText="Change Password"
      onSubmit={handleSubmit}
      isSuccess={isSuccess}
      successMessage="Password changed successfully"
      resetOnSuccess={true}
    />
  );
}
