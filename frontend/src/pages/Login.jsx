import {Link, useNavigate} from "react-router-dom";
import Button from "../components/Button.jsx";
import {useContext, useState} from "react";
import axios from "axios";
import {AppContext} from "../context/AppContext.jsx";
import {toast} from "react-toastify";
import BrandLogoName from "../components/BrandLogoName.jsx";

export default function Login() {

  const [isCreatedAccount, setIsCreatedAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {backendURL, setIsLoggedIn, getUserData} = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    setLoading(true);

    try {
      if (isCreatedAccount) {
        const response = await axios.post(`${backendURL}/register`, {name, email, password});
        if (response.status === 200 || response.status === 201 || response.data?.success) {
          setIsLoggedIn?.(true);
          await getUserData?.();
          navigate("/");
          toast.success(response.data?.message || "Account created successfully.");
        } else {
          toast.error(response.data?.message || "Registration failed");
        }
      } else {
        //login api
        const response = await axios.post(`${backendURL}/login`, {email, password});
        if (response.status === 200 || response.status === 201 || response.data?.success) {
          setIsLoggedIn?.(true);
          await getUserData?.();
          navigate("/");
          toast.success(response.data?.message || "Welcome back!");
        } else {
          toast.error(response.data?.message || "Invalid credentials");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-indigo-600">

      <div className="absolute top-6 left-6">
        <BrandLogoName className="filter brightness-0 invert"/>
      </div>

      {/*CENTER*/}
      <div className="bg-white px-8 py-10 shadow-2xl w-full max-w-md">

        <div className="text-center mb-8">
          <h2 className="font-bold text-slate-900 tracking-tight text-3xl">
            {isCreatedAccount ? "Create account" : "Welcome back"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {isCreatedAccount ? "Please enter your details to sign up" : "Please enter your details to sign in"}
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>

          <div className="flex flex-col gap-4">
            {
              isCreatedAccount && (
                <div>
                  <label htmlFor="fullName"
                         className="block text-sm font-semibold text-slate-700  mb-1.5"
                  >Full Name</label>
                  <input type="text"
                         id="fullName"
                         className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition"
                         placeholder="Enter your name" required
                         onChange={(e) => setName(e.target.value)}
                         value={name}
                  />
                </div>
              )
            }

            <div>
              <label htmlFor="email"
                     className="block   text-sm font-semibold text-slate-700  mb-1.5"
              >Email address</label>
              <input type="email"
                     id="email"
                     className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition"
                     placeholder="Enter your email" required
                     onChange={(e) => setEmail(e.target.value)}
                     value={email}
              />
            </div>

            <div>
              <label htmlFor="password"
                     className="block text-sm font-semibold text-slate-700  mb-1.5"
              >Password</label>
              <input type="password"
                     id="password"
                     className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition"
                     placeholder="••••••••" required
                     onChange={(e) => setPassword(e.target.value)}
                     value={password}
              />
            </div>
          </div>

          {
            !isCreatedAccount && (
              <div className="text-right">
                <Link to="/reset-password"
                      onClick={()=>console.log("clicked reset")}
                      className="text-sm underline font-semibold text-indigo-600 hover:text-indigo-700 transition">
                  Forget password?
                </Link>
              </div>
            )
          }

          <Button
            type="submit" variant="default" size="lg" className="w-full mt-2"
            disabled={loading}
          >
            {loading ? "Loading...." : isCreatedAccount ? "Create account" : "Login"}
          </Button>

          {/* Toggle between Login and Signup */}
          <div className="text-center text-sm text-slate-600 mt-2">
            {isCreatedAccount ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsCreatedAccount(!isCreatedAccount)}
              className="font-semibold underline text-indigo-600 hover:text-indigo-700 transition cursor-pointer">
              {isCreatedAccount ? "Sign in" : "Sign up"}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
