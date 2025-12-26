import React from "react";

const Footer = () => {
  return (
    <footer className="border-top border-slate-200 bg-transparent text-center text-sm text-slate-500 py-4 mt-6">
      © {new Date().getFullYear()} Maryem Fakhfekh — Portfolio
    </footer>
  );
};

export default Footer;
