import {Link} from "react-router-dom";
import Button from "../components/Button.jsx";
import {useState} from "react";
import axios from "axios";

export default function Login() {

  const [isCreatedAccount, setIsCreatedAccount] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);

    try {
      if (isCreatedAccount) {
        //register API
      } else {
        //login api
      }
    }catch (error){

    }

  }


  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-indigo-600">

      <div className="absolute top-6 left-6">
        {/*Top left*/}
        <Link to="/" className="flex gap-2.5  items-center group">
          <img src="/icon-black.png" alt="authify icon"
               className="group-hover:scale-110 transition h-8 w-8 object-contain filter brightness-0 invert"/>
          <span className="font-jakarta text-white font-bold text-2xl tracking-tight">Authify</span>
        </Link>
      </div>

      {/*CENTER*/}
      <div className="bg-white px-8 py-10 shadow-2xl w-full max-w-md">

        <div className="text-center mb-8">
          <h2 className="font-bold text-slate-900 tracking-tight text-3xl">
            {isCreatedAccount ? "Create account" : "Welcome back"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Please enter your details to sign in
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
                         placeholder="Enter your email" required
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
                <Link to="\reset-password"
                      className="text-sm underline font-semibold text-indigo-600 hover:text-indigo-700 transition">
                  Forget password?
                </Link>
              </div>
            )
          }

          <Button type="submit" variant="default" size="lg" className="w-full mt-2">
            {isCreatedAccount ? "Create account" : "Login"}
          </Button>

          {/* Toggle between Login and Signup */}
          <div className="text-center text-sm text-slate-600 mt-2">
            {isCreatedAccount ? "Already have an account?" : "Dont't have an account"}{" "}
            <button
              onClick={() => setIsCreatedAccount(!isCreatedAccount)}
              className="font-semibold underline text-indigo-600 hover:text-indigo-700 transition cursor-pointer">
              {isCreatedAccount ? "Sign in" : "Sign up"}
            </button>
          </div>


        </form>

      </div>


    </div>
  )
}