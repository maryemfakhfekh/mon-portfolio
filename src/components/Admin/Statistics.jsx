import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';

function AdminStatistics() {
  const [stats, setStats] = useState({
    users: 0,
    admins: 0,
    projects: 0,
    onlineProjects: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, projectsRes, messagesRes] = await Promise.all([
          axiosClient.get('/users'),
          axiosClient.get('/projects'),
          axiosClient.get('/formSubmissions'),
        ]);

        const users = usersRes.data;
        const projects = projectsRes.data;
        const messages = messagesRes.data;

        setStats({
          users: users.length,
          admins: users.filter(u => u.role === 'admin').length,
          projects: projects.length,
          onlineProjects: projects.filter(p => p.status === 'online').length,
          messages: messages.length,
        });
        setError(null);
      } catch (err) {
        setError('Impossible de charger les statistiques. Vérifie que json-server tourne.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const publicationRate = stats.projects > 0 
    ? Math.round((stats.onlineProjects / stats.projects) * 100) 
    : 0;

  const statsData = [
    { label: 'Total Utilisateurs', value: stats.users },
    { label: 'Administrateurs', value: stats.admins },
    { label: 'Projets Total', value: stats.projects },
    { label: 'Projets en ligne', value: stats.onlineProjects },
    { label: 'Messages de contact', value: stats.messages },
    { label: 'Taux de publication', value: `${publicationRate}%` },
  ];

  return (
    <div className="space-y-12">
      <h1 className="text-4xl md:text-5xl font-bold text-textPrimary font-display text-center">
        Statistiques Globales
      </h1>

      {error && (
        <div className="bg-red-900/20 backdrop-blur-sm border border-red-800/50 text-red-600 px-8 py-6 rounded-2xl shadow-lg text-center">
          <p className="font-medium text-lg">{error}</p>
        </div>
      )}

      {loading ? (
        <p className="text-textSecondary text-center py-16 text-2xl">Chargement des statistiques...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="bg-glass/70 backdrop-blur-lg border border-glass-border rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all text-center hover:scale-105"
            >
              <h3 className="text-textSecondary text-xl mb-6">{stat.label}</h3>
              <p className="text-6xl font-bold text-[#0F766E]">{stat.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminStatistics;
