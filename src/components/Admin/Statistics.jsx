// src/components/Admin/Statistics.jsx
import { useEffect, useState } from 'react';
import { getProjects } from '../../api/projectsApi';
import { getFormSubmissions } from '../../api/formSubmissionsApi';
import { getUsers } from '../../api/usersApi';

function AdminStatistics() {
  const [stats, setStats] = useState({
    users: 0, admins: 0, projects: 0, onlineProjects: 0, messages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [users, projects, messages] = await Promise.all([
          getUsers(),
          getProjects(),
          getFormSubmissions(),
        ]);
        setStats({
          users: users.length,
          admins: users.filter((u) => u.role === 'admin').length,
          projects: projects.length,
          onlineProjects: projects.filter((p) => p.status === 'online').length,
          messages: messages.length,
        });
      } catch (err) {
        setError('Impossible de charger les statistiques.');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const publicationRate = stats.projects > 0
    ? Math.round((stats.onlineProjects / stats.projects) * 100)
    : 0;

  const statsData = [
    { label: 'Total Utilisateurs', value: stats.users, icon: '👥', color: '#0d9488' },
    { label: 'Administrateurs', value: stats.admins, icon: '🔐', color: '#0369a1' },
    { label: 'Projets Total', value: stats.projects, icon: '📁', color: '#7c3aed' },
    { label: 'Projets en ligne', value: stats.onlineProjects, icon: '🌐', color: '#065f46' },
    { label: 'Messages reçus', value: stats.messages, icon: '✉️', color: '#b45309' },
    { label: 'Taux de publication', value: `${publicationRate}%`, icon: '📊', color: '#be185d' },
  ];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Statistiques Globales</h1>

      {error && (
        <div style={styles.errorBox}>{error}</div>
      )}

      {loading ? (
        <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px 0' }}>
          Chargement…
        </p>
      ) : (
        <div style={styles.grid}>
          {statsData.map((stat) => (
            <div key={stat.label} style={styles.card} className="stat-card">
              <div style={{ ...styles.iconBox, background: stat.color + '15' }}>
                <span style={{ fontSize: 26 }}>{stat.icon}</span>
              </div>
              <p style={{ ...styles.value, color: stat.color }}>{stat.value}</p>
              <p style={styles.label}>{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      <style>{`.stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1) !important; }`}</style>
    </div>
  );
}

const styles = {
  page: { padding: '8px 0' },
  title: { fontSize: 26, fontWeight: 700, color: '#0f172a', marginBottom: 32 },
  errorBox: {
    background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
    padding: '14px 20px', borderRadius: 12, marginBottom: 24, fontSize: 14,
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 18,
  },
  card: {
    background: 'white', border: '1px solid #e2e8f0', borderRadius: 16,
    padding: '28px 20px', textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    transition: 'transform 0.22s, box-shadow 0.22s',
  },
  iconBox: {
    width: 52, height: 52, borderRadius: 14,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 14px',
  },
  value: { fontSize: 36, fontWeight: 800, lineHeight: 1, marginBottom: 8 },
  label: { fontSize: 12, color: '#94a3b8', fontWeight: 500 },
};

export default AdminStatistics;