import Button from "./Button.jsx";
import {ArrowRight} from "lucide-react";
import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";

export default function Header() {

  const {userData} = useContext(AppContext);

  return (
    <section
      className="text-center flex flex-col items-center justify-center max-w-2xl mx-auto py-12 px-4">
      <img
        src="/security-illustration.png"
        alt="Security Illustration"
        className="h-90 w-90 object-cover mb-6"
      />

      <p className="font-semibold text-slate-600 mb-2 flex items-center gap-1 text-lg">
        Hey {userData ? userData.name : "Developer"}, <span role="img" aria-label="wave">👋</span>
      </p>

      <h1 className="font-bold font-jakarta text-slate-900 tracking-tight  text-4xl mb-4 leading-tight">
        Welcome to Product Page
      </h1>

      <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed max-w-lg">
        Let's start with a quick product tour so you can set up authentication with ease, simplicity, and high-end
        security!
      </p>

      <Button
        variant="default"
        size="lg"
        className="bg-fuchsia-600 hover:bg-fuchsia-700  flex items-center gap-2  px-6 py-3 rounded-all shadow-md transition-all"

      >
        <span>Get Started</span>
        <ArrowRight size="18"/>
      </Button>
    </section>
  );
}
