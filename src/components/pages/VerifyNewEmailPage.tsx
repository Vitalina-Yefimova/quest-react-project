import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

export default function VerifyNewEmailPage() {
  const [message, setMessage] = useState("Verifying email...");
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setMessage("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/verify-new-email", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Verification failed");
        }

        const updatedUser = await res.json();
        setUser(updatedUser);
        setMessage("Email successfully verified!");

        setTimeout(() => {
          navigate("/profile?selectedTab=edit");
        }, 2000);
      } catch (e) {
        setMessage("Verification failed. The link may be expired.");
        console.error(e);
      }
    };

    verify();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-center text-lg">{message}</p>
    </div>
  );
}
