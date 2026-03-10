import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import Layout from './Pages/Layout';
import AdminLayout from './components/Admin/AdminLayout.jsx';

// Composants Publics
import Hero from './components/Accueil/Hero';
import About from './components/Accueil/About';
import Experience from './components/Accueil/Experience';
import ContactForm from './components/Formulaire/FormulaireG6';

// Composants Admin
import AdminDashboard from './components/Admin/Dashboard';
import AdminUsers from './components/Admin/Users';
import AdminAnalytics from './components/Admin/Statistics';
import AdminSettings from './components/Admin/Settings';
import AdminFormSubmissions from './components/Admin/AdminFormSubmissions.jsx';

// Auth
import ProtectedRoute from './components/Admin/ProtectedRoute';
import Logout from './components/Auth/Logout.jsx';
import Login from './components/Auth/Login.jsx';

// 404
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
        <a href="/" className="bg-[#0F766E] text-white px-6 py-3 rounded-lg hover:bg-[#0D6658]">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}

function App() {
  const token = localStorage.getItem('authToken');
  const isAuthenticated = Boolean(token);

  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Hero />} />
        <Route path="about" element={<About />} />
        <Route path="experience" element={<Experience />} />
        <Route path="contact" element={<ContactForm />} />
        <Route
          path="login"
          element={
            isAuthenticated ? <Navigate to="/admin" replace /> : <Login />
          }
        />
      </Route>

      {/* Routes admin protégées */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/login">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="forms" element={<AdminFormSubmissions />} />
      </Route>

      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;