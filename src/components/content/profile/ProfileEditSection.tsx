import { useState } from "react";
import BaseForm from "../../generics/forms/BaseForm";
import { z } from "zod";
import axios from "axios";
import { useUserStore } from "../../../store/userStore";
import type { User } from "../../../store/userStore";
import { getTokenFromCookie } from "../../../utils/getTokenFromCookie";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone is required"),
  email: z.string().email("Invalid email"),
});

export default function ProfileEditSection() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [isSuccess, setSuccess] = useState(false);

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    if (!user || !user.id) throw new Error("User is not loaded");
    const token = getTokenFromCookie();
    if (!token) throw new Error("No token provided");

    try {
      const res = await axios.patch(
        `http://localhost:3000/users/${user.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(res.data as User);
      setSuccess(true);
    } catch (err: unknown) {
      interface AxiosErrorResponse {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      const error = err as AxiosErrorResponse;
      if (
        typeof err === "object" &&
        err !== null &&
        error.response &&
        typeof error.response === "object" &&
        error.response.data &&
        typeof error.response.data === "object" &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Failed to update profile");
    }
  };

  const fields = [
    {
      name: "firstName",
      label: "First Name",
      defaultValue: user?.firstName ?? "",
    },
    {
      name: "lastName",
      label: "Last Name",
      defaultValue: user?.lastName ?? "",
    },
    { name: "phone", label: "Phone", defaultValue: user?.phone ?? "" },
    { name: "email", label: "Email", defaultValue: user?.email ?? "" },
  ];

  return (
    <BaseForm
      fields={fields}
      schema={schema}
      submitText="Save Changes"
      onSubmit={handleSubmit}
      defaultValues={user ?? undefined}
      isSuccess={isSuccess}
      successMessage="Changes saved successfully"
    />
  );
}
