import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    fetch("http://localhost:3000/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Verification failed");
        }
        return response.json();
      })
      .then(() => {
        setStatus("success");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch(() => {
        setStatus("error");
      });
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {status === "loading" && <p className="text-gray-700">Verifying...</p>}
      {status === "success" && (
        <p className="text-green-600">
          Your email has been successfully verified!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600">Verification failed. Please try again.</p>
      )}
    </div>
  );
}
