import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import {ArrowRight, LogOut, MailCheck} from "lucide-react";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../context/AppContext.jsx";

export default function Menubar() {
  const navigate = useNavigate();
  const {userData, setUserData} = useContext(AppContext);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);

  const userNameFirstLetter = userData?.name?.[0]?.toUpperCase() || 'X';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropDownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropDownOpen(false);
    if (setUserData) setUserData(null)
    navigate("/login")
  }

  const handleVerifyEmail = () => {
    setDropDownOpen(false);
    navigate("/email-verify");
  }

  return (
    <nav
      className="w-full flex items-center justify-between px-6 md:px-8 py-3.5 border-b border-slate-200 bg-white shadow-xs top-0 z-40">

      {/*BRAND LOGO AND NAME*/}
      <div className="flex items-center gap-3 cursor-pointer select-none"
           onClick={() => navigate("/")}
      >
        <img src="/icon.png" alt="authify_icon" className="h-8 w-8 object-contain"/>
        <span className="font-jakarta text-slate-900 font-bold text-2xl tracking-tight">Authify</span>
      </div>

      {
        userData ? (

          <div className="relative" ref={dropDownRef}>
            <button
              className="bg-slate-800 hover:bg-slate-700 text-white rounded-full h-10 w-10 md:h-11 md:w-11 flex items-center justify-center font-bold text-lg ring-2 ring-slate-100 transition-all cursor-pointer focus:ring-2 focus:ring-fuchsia-500  select-none"
              onClick={() => {
                setDropDownOpen((prev) => !prev)
              }}
            >
              {userNameFirstLetter}
            </button>


            {dropDownOpen && (
              <div
                className="absolute top-13 right-0  z-50 bg-white border border-slate-100 rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-4 py-2 border-b border-slate-100 mb-1">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {userData.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {userData.email}
                  </p>
                </div>


                {
                  !userData.isAccountVerified && (
                      <button
                      onClick={handleVerifyEmail}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 transition-colors text-left"
                      >
                        <MailCheck size={16} className="text-amber-600"/>
                        <span>Verify Email</span>
                      </button>
                  )}

                <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left
                "
                >
                  <LogOut size={16} className="text-rose-500"/>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

        ) : (

          <div className="flex items-center">
            <Button
                    variant="default"
                    size="md"
                    className="bg-fuchsia-600 text-white hover:bg-fuchsia-700 active:bg-fuchsia-800 transition-all flex items-center gap-2 px-4 py-2 roundede-lg shadow-sm cursor-pointer"
                    onClick={() => navigate("/login")
                    }
            >
              <span> Login </span>
              <ArrowRight size={16}/>
            </Button>
          </div>
        )
      }


    </nav>
  )
}

