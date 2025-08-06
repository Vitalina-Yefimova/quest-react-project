import { useEffect, useState } from "react";

interface VerifyContentProps {
  endpoint: string;
  onSuccess: () => void;
  onClose: () => void;
}

export default function VerifyContent({
  endpoint = "/auth/verify",
  onSuccess,
  onClose,
}: VerifyContentProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      setStatus("error");
      return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error();
        }
        setStatus("success");
        setTimeout(() => {
          onClose?.();
          onSuccess?.();
        }, 3000);
      })
      .catch(() => {
        setStatus("error");
      });
  }, [endpoint, onClose, onSuccess]);

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "success" && <p>Verification successful!</p>}
      {status === "error" && <p>Verification failed. Please try again.</p>}
    </div>
  );
}
