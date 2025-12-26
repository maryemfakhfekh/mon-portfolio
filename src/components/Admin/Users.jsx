import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';

function UsersAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get('/users');
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError('Impossible de charger les utilisateurs. Vérifie que "npm run api" tourne et que db.json contient "users".');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <h1 className="text-4xl md:text-5xl font-bold text-textPrimary font-display text-center">
  Gestion des Utilisateurs
</h1>


      {/* Barre de recherche */}
      <div className="flex justify-center md:justify-start">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par nom ou email..."
          className="w-full max-w-md px-6 py-4 bg-glass/50 backdrop-blur-md border border-glass-border rounded-3xl text-textPrimary placeholder-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-accentPink/50 focus:border-accentPink transition-all shadow-md"
        />
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-900/20 backdrop-blur-sm border border-red-800/50 text-red-600 px-8 py-5 rounded-2xl shadow-lg">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Chargement */}
      {loading ? (
        <p className="text-textSecondary text-center py-12 text-xl">Chargement des utilisateurs...</p>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-glass/50 backdrop-blur-md border border-glass-border rounded-3xl p-16 text-center shadow-lg">
          <p className="text-textSecondary text-xl">Aucun utilisateur trouvé.</p>
          <p className="text-textSecondary/70 text-sm mt-4">
            Ajoute des utilisateurs dans db.json ou vérifie la connexion API.
          </p>
        </div>
      ) : (
        /* Tableau stylisé */
        <div className="overflow-x-auto">
          <table className="min-w-full bg-glass/50 backdrop-blur-lg border border-glass-border rounded-3xl shadow-lg overflow-hidden">
            <thead className="bg-glass/30">
              <tr>
                <th className="px-8 py-4 text-left text-sm font-semibold text-textSecondary uppercase tracking-wide">
                  Nom
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-textSecondary uppercase tracking-wide">
                  Email
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-textSecondary uppercase tracking-wide">
                  Rôle
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-glass/20 transition-colors cursor-pointer"
                >
                  <td className="px-8 py-4 text-textPrimary font-medium">{user.name || 'Non défini'}</td>
                  <td className="px-8 py-4 text-textSecondary">{user.email}</td>
                  <td className="px-8 py-4">
                    <span
                      className={`px-4 py-2 inline-flex text-xs font-semibold rounded-full border transition-colors ${
                        user.role === 'admin'
                          ? 'bg-[#0F766E]/20 text-[#0F766E] border-[#0F766E]/50'
                          : 'bg-amber-300/20 text-amber-700 border-amber-300/50'
                      }`}
                    >
                      {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsersAdminPage;
