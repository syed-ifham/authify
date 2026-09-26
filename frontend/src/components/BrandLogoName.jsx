import {useNavigate} from "react-router-dom";
import {cn} from "../util/cn.js";

function BrandLogoName(props) {

  const navigate = useNavigate();
  return (
    <div>
      {/*BRAND LOGO AND NAME*/}
      <div className={
        cn("flex items-center gap-3 cursor-pointer select-none", props.className)
           }
           onClick={() => navigate("/")}
      >
        <img src="/icon.png" alt="authify_icon" className="h-8 w-8 object-contain"/>
        <span className="font-jakarta text-slate-900 font-bold text-2xl tracking-tight">Authify</span>
      </div>

    </div>
  )
}

export default BrandLogoName
