import VerifyContent from "../generics/verify/VerifyContent";
import { useNavigate } from "react-router-dom";

export default function VerifyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <VerifyContent
        endpoint="http://localhost:3000/auth/verify"
        onSuccess={() => setTimeout(() => navigate("/profile"), 3000)}
        onClose={() => navigate("/profile")}
      />
    </div>
  );
}
