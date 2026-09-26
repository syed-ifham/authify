import { cn } from "../util/cn.js";
import BrandLogoName from "../components/BrandLogoName.jsx";
import Button from "../components/Button.jsx";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Lock, Mail } from "lucide-react";

export default function ResetPassword() {
  const inputRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const { backendURL } = useContext(AppContext);
  axios.defaults.withCredentials = true;

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendURL}/send-reset-otp?email=${encodeURIComponent(email)}`
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("OTP sent successfully");
        setIsEmailSent(true);
      } else {
        toast.error("Something went wrong, please try again");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const enteredOtp = inputRef.current.map((input) => input?.value || "").join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return; // Stop execution if OTP length is incorrect
    }

    setOtp(enteredOtp);
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/reset-password`, {
        email,
        otp,
        newPassword,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error("Something went wrong, please try again");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "relative bg-fuchsia-600 flex items-center justify-center min-h-screen p-4"
      )}
    >
      <div className="absolute top-6 left-6">
        <BrandLogoName className="filter brightness-0 invert" />
      </div>

      {/* STEP 1: ENTER EMAIL */}
      {!isEmailSent && (
        <div className="p-8 rounded-3xl bg-slate-100 backdrop-blur-md border border-slate-700/50 text-slate-800 shadow-2xl w-full max-w-md">
          <h1 className="text-center text-2xl font-bold mb-2">Reset password</h1>
          <p className="text-center text-sm text-slate-600 mb-6">
            Enter your registered email address to receive an OTP.
          </p>

          <form className="flex flex-col gap-5" onSubmit={onSubmitEmail}>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Mail size={16} />
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>
              </div>
              <input
                type="email"
                id="email"
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-fuchsia-600 py-3 font-bold text-base rounded-xl text-white"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        </div>
      )}

      {/* STEP 2: ENTER RESET OTP */}
      {isEmailSent && !isOtpSubmitted && (
        <div className="p-8 rounded-3xl bg-slate-100 backdrop-blur-md border border-slate-700/50 text-slate-800 shadow-2xl w-full max-w-md">
          <h1 className="text-center text-2xl font-bold mb-2">Enter 6-digit OTP</h1>
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
            onClick={handleVerifyOTP}
          >
            Submit OTP
          </Button>
        </div>
      )}

      {/* STEP 3: ENTER NEW PASSWORD */}
      {isOtpSubmitted && isEmailSent && (
        <div className="p-8 rounded-3xl bg-slate-100 backdrop-blur-md border border-slate-700/50 text-slate-800 shadow-2xl w-full max-w-md">
          <h1 className="text-center text-2xl font-bold mb-2">New password</h1>
          <p className="text-center text-sm text-slate-600 mb-6">
            Enter your new password below.
          </p>

          <form className="flex flex-col gap-5" onSubmit={onSubmitNewPassword}>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Lock size={16} />
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold text-slate-700"
                >
                  New Password
                </label>
              </div>
              <input
                type="password"
                id="newPassword"
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition"
                placeholder="*******"
                required
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-fuchsia-600 py-3 font-bold text-base rounded-xl text-white"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}