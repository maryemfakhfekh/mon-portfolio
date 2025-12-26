import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUsers,
  FaCog,
  FaChartBar,
  FaSignOutAlt,
} from 'react-icons/fa';

const AdminLayout = () => {
  const location = useLocation();

  const navItem = (to, icon, label) => {
    const active = location.pathname === to;

    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
          ${
            active
              ? 'bg-[#1E293B] text-white'
              : 'bg-[#0F172A] text-slate-300 hover:bg-[#020617]'
          }`}
      >
        {icon}
        {label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-[280px] bg-[#0F172A] p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-8">
          Admin Panel
        </h2>

        <nav className="space-y-3 flex-1">
          {navItem('/admin', <FaHome />, 'Dashboard')}
          {navItem('/admin/users', <FaUsers />, 'Utilisateurs')}
          {navItem('/admin/analytics', <FaChartBar />, 'Statistiques')}
          {navItem('/admin/settings', <FaCog />, 'Paramètres')}
          {navItem('/admin/forms', <FaChartBar />, 'Formulaires')}
        </nav>

        {/* Actions bas */}
        <div className="space-y-3 pt-6 border-t border-slate-700">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-[#1E293B]"
          >
            <FaSignOutAlt />
            Retour au site
          </Link>

          <Link
            to="/logout"
            className="flex items-center justify-center rounded-xl bg-[#1E293B] px-4 py-2 text-sm font-medium text-white hover:bg-[#020617]"
          >
            Se déconnecter
          </Link>
        </div>
      </aside>

      {/* Contenu */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
