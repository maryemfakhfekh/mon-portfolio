import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(Boolean(token));
  }, [location.pathname]);

  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/about' },
    { name: 'Expérience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  function handleLogout() {
    localStorage.removeItem('authToken');
    navigate('/login', { replace: true });
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#F8F6F2] border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo + Name */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0F766E] flex items-center justify-center text-white font-semibold shadow-sm">
              MF
            </div>
            <span className="text-slate-900 font-semibold text-lg">
              Maryem Fakhfekh
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition ${
                  location.pathname === item.path
                    ? 'text-[#0F766E] border-b-2 border-[#0F766E] pb-1'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="rounded-full border border-[#0F766E] px-4 py-2 text-sm font-medium text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition"
              >
                Se connecter
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/admin"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Tableau de bord
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition"
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900"
          >
            {isMobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#F8F6F2] border-t border-slate-200">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-emerald-100 text-[#0F766E]'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-200 px-4 py-3 space-y-2">
            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setIsMobileOpen(false)}
                className="block w-full text-center rounded-full border border-[#0F766E] px-4 py-2 text-sm text-[#0F766E]"
              >
                Se connecter
              </Link>
            ) : (
              <>
                <Link
                  to="/admin"
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full text-center rounded-full bg-[#0F766E] px-4 py-2 text-sm text-white"
                >
                  Tableau de bord
                </Link>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    handleLogout();
                  }}
                  className="block w-full rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700"
                >
                  Se déconnecter
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
