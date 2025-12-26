// src/Pages/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Commun/Navbar";
import Footer from "../components/Commun/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
