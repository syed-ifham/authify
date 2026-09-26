import {Link} from "react-router-dom";
import BrandLogoName from "../components/BrandLogoName.jsx";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4 text-center">

     <div className="absolute top-6 left-6">
       <BrandLogoName/>
     </div>

      <div className="relative mb-6">
        {/* Glow backdrop effect */}
        <div
          className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>

        <img
          src="/400.png"
          alt="404 Not Found"
          className="relative h-64 w-64 md:h-80 md:w-80 object-contain drop-shadow-md"
        />
      </div>

      <span className="text-sm font-semibold tracking-wider text-indigo-600 uppercase mb-2">
        Error 404
      </span>

      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
        Page not found
      </h1>

      <p className="text-base md:text-lg text-slate-600 max-w-md mb-8">
        Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Go Back Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200"
        >
          Previous Page
        </button>
      </div>
    </div>
  );
}