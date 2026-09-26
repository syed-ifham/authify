import { cn } from "../util/cn.js";
import BrandLogoName from "../components/BrandLogoName.jsx";
import Button from "../components/Button.jsx";
import { useContext, useRef, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function EmailVerify() {
  const inputRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const { backendURL, getUserData, isLoggedIn, userData } = useContext(AppContext);
  const navigate = useNavigate();

  // Redirect if user is already verified or logged out
  useEffect(() => {
    if (isLoggedIn && userData?.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedIn, userData, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value;
    if (value && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    // Clean pasted data to numeric-only digits
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    paste.forEach((digit, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = digit;
      }
    });

    const nextIndex = paste.length < 6 ? paste.length : 5;
    inputRef.current[nextIndex]?.focus();
  };

  const handleSubmit = async () => {
    const otp = inputRef.current.map((input) => input.value).join("");
    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP");
      return;
    }

    setLoading(true);
    try {
      // Ensure credentials (cookies/tokens) are passed
      const response = await axios.post(
        `${backendURL}/verify-otp`,
        { otp },
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("OTP verified successfully");
        // Pull latest user data into context BEFORE navigating home
        await getUserData();
        navigate("/");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("relative bg-indigo-600 flex items-center justify-center min-h-screen p-4")}>
      <div className="absolute top-6 left-6">
        <BrandLogoName className="filter brightness-0 invert" />
      </div>

      <div className="p-8 rounded-3xl bg-slate-100 backdrop-blur-md border border-slate-700/50 text-slate-800 shadow-2xl w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-2">Verify Email</h1>
        <p className="text-center text-sm text-slate-600 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <div className="flex justify-between gap-2 mb-6">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-14 text-center text-2xl font-bold bg-slate-50 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
              ref={(el) => (inputRef.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
            />
          ))}
        </div>

        <Button
          className="w-full py-3 font-bold text-base rounded-xl"
          variant="indigo"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Verifying..." : "Verify email"}
        </Button>

      </div>

    </div>
  );
}