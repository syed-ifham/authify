import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import {ArrowRight} from "lucide-react";

export default function Menubar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white shadow-xs">

      <div className="flex items-center gap-3">
        <img src="/icon.png" alt="authify_icon" className="h-8 w-8 object-contain"/>
        <span className="font-jakarta text-slate-900 font-bold text-2xl tracking-tight">Authify</span>
      </div>

      <div className="flex items-center">
        <Button children="Login"
                variant="default"
                size="md"
                className="bg-fuchsia-600 text-white hover:bg-fuchsia-700 transition-all flex items-center gap-2"
                onClick={() => navigate("/login")
                }

        >
          <span> Login </span>
          <ArrowRight size={16}/>
        </Button>
      </div>
    </nav>
  )
}

