import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckEmail() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/");
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Check your email</h1>
        <p className="text-gray-700 mb-6">
          Thanks for signing up! <br />
          We've sent a verification link to your email address. <br />
          Please click the link to activate your account.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          Back to Home
        </button>

        <p className="text-sm text-gray-400 mt-4">
          You’ll be redirected automatically in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}
