import { useState } from "react";
import BaseForm from "../../generics/forms/BaseForm";
import { z } from "zod";
import { useUserStore } from "../../../store/userStore";
import type { User } from "../../../store/userStore";
import { getTokenFromCookie } from "../../../utils/getTokenFromCookie";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [isVerifying, setVerifying] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerifiedNow] = useState(false);

  const methods = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      email: user?.newEmail || user?.email || "",
    },
    resolver: zodResolver(schema),
  });

  const watchedEmail = useWatch({
    control: methods.control,
    name: "email",
  });

  const showVerifyButton =
    !!user?.newEmail &&
    user?.emailVerified === false &&
    (!user?.email || user?.email !== user?.newEmail);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const token = urlParams.get("token");

  //   if (!token) return;

  //   const verifyEmail = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000/auth/verify-new-email", {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!res.ok) {
  //         throw new Error("Verification failed");
  //       }

  //       const updatedUser: User = await res.json();
  //       setUser(updatedUser);
  //       methods.reset({
  //         firstName: updatedUser.firstName || "",
  //         lastName: updatedUser.lastName || "",
  //         phone: updatedUser.phone || "",
  //         email: updatedUser.newEmail || updatedUser.email || "",
  //       });
  //       setEmailVerifiedNow(true);
  //     } catch (error) {
  //       console.error("Verification error:", error);
  //     }
  //   };

  //   verifyEmail();
  // }, []);

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    if (!user || !user.id) throw new Error("User is not loaded");
    const token = getTokenFromCookie();
    if (!token) throw new Error("No token provided");

    const payload: {
      firstName: string;
      lastName: string;
      phone: string;
      newEmail?: string;
    } = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    };

    if (data.email && data.email !== user.email) {
      payload.newEmail = data.email;
    }

    try {
      const res = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        if (
          err.message &&
          (err.message === "Email already in use" ||
            err.message.includes("already"))
        ) {
          setEmailError("This email is already in use.");
          return;
        }
        throw new Error(err.message || "Failed to update profile");
      }

      const updatedUser: User = await res.json();
      setUser(updatedUser);
      methods.reset({
        firstName: updatedUser.firstName || "",
        lastName: updatedUser.lastName || "",
        phone: updatedUser.phone || "",
        email: updatedUser.newEmail || updatedUser.email || "",
      });
      setSuccess(true);
      setEmailError(null);
      setEmailSent(false);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const sendVerification = async () => {
    if (!user || !user.id || !watchedEmail) return;
    setVerifying(true);
    setEmailError(null);
    setEmailSent(false);

    try {
      const token = getTokenFromCookie();
      const res = await fetch("http://localhost:3000/auth/change-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          newEmail: watchedEmail,
          frontendUrl: `${window.location.origin}`,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to send verification email");
      }

      setEmailSent(true);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setEmailError(e.message);
      } else {
        setEmailError("An unknown error occurred");
      }
    } finally {
      setVerifying(false);
    }
  };

  const fields = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    {
      name: "phone",
      label: "Phone",
      disabled: user?.authMethod === "phone",
    },
    {
      name: "email",
      label: "Email",
      disabled: user?.emailVerified === true && !user?.newEmail,
      showVerifyButton,
      onVerifyClick: sendVerification,
      isVerifying,
    },
  ];

  return (
    <>
      <BaseForm
        fields={fields}
        schema={schema}
        submitText="Save Changes"
        onSubmit={handleSubmit}
        defaultValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          phone: user?.phone || "",
          email: user?.newEmail || user?.email || "",
        }}
        isSuccess={isSuccess}
        successMessage="Changes saved successfully"
        formMethods={methods}
      />

      {emailVerifiedNow && (
        <p className="text-green-500 text-sm text-center mt-2">
          Email successfully verified!
        </p>
      )}

      {emailError && (
        <p className="text-red-500 text-sm text-center mt-2">{emailError}</p>
      )}

      {emailSent && (
        <p className="text-green-500 text-sm text-center mt-2">
          Verification email sent! Please check your inbox.
        </p>
      )}
    </>
  );
}
