import Menubar from "../components/Menubar.jsx";
import Header from "../components/Header.jsx";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between  bg-slate-100 text-slate-900">
      <Menubar/>

      <main className="flex-1 flex items-center justify-center">
        <Header />
      </main>

    </div>
  )
}

