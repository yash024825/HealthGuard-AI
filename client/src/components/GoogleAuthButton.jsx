import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function GoogleAuthButton({ redirectTo = "/dashboard" }) {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSuccess = async (credentialResponse) => {
    try {
      await loginWithGoogle(credentialResponse.credential);
      toast.success("Signed in with Google");
      const target = location.state?.from?.pathname || redirectTo;
      navigate(target, { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Google sign-in failed. Try again."
      );
    }
  };

  return (
    <div className="w-full flex justify-center [&>div]:w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error("Google sign-in failed. Try again.")}
        theme="outline"
        shape="rectangular"
        size="large"
        width="100%"
        text="continue_with"
      />
    </div>
  );
}
