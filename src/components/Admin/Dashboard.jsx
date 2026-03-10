// src/components/Admin/Dashboard.jsx
import { useEffect, useState } from 'react';
import { getProjects } from '../../api/projectsApi';
import { getFormSubmissions } from '../../api/formSubmissionsApi';

function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, onlineProjects: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [projects, submissions] = await Promise.all([
          getProjects(),
          getFormSubmissions(),
        ]);
        setStats({
          projects: projects.length,
          onlineProjects: projects.filter((p) => p.status === 'online').length,
          messages: submissions.length,
        });
      } catch (err) {
        console.error('Erreur stats', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const cards = [
    { label: 'Total projets', value: stats.projects, icon: '📁', color: '#0d9488' },
    { label: 'Projets en ligne', value: stats.onlineProjects, icon: '🌐', color: '#0369a1' },
    { label: 'Messages reçus', value: stats.messages, icon: '✉️', color: '#7c3aed' },
  ];

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Dashboard</h2>
      <p style={styles.sub}>Bienvenue dans ton espace administration, Maryem 👋</p>

      {loading ? (
        <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px 0' }}>Chargement…</p>
      ) : (
        <div style={styles.grid}>
          {cards.map((card) => (
            <div key={card.label} style={styles.card} className="dash-card">
              <div style={{ ...styles.cardIcon, background: card.color + '18' }}>
                <span style={{ fontSize: 28 }}>{card.icon}</span>
              </div>
              <p style={{ ...styles.cardValue, color: card.color }}>{card.value}</p>
              <p style={styles.cardLabel}>{card.label}</p>
            </div>
          ))}
        </div>
      )}

      <div style={styles.infoBox}>
        <p style={styles.infoTitle}>💡 Comment ça marche ?</p>
        <p style={styles.infoText}>
          Les données (projets, messages) sont sauvegardées dans le navigateur (localStorage).
          Elles persistent entre les sessions et fonctionnent sur Vercel sans backend.
        </p>
      </div>

      <style>{`.dash-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1) !important; }`}</style>
    </div>
  );
}

const styles = {
  page: { padding: '8px 0' },
  title: { fontSize: 26, fontWeight: 700, color: '#0f172a', marginBottom: 6 },
  sub: { fontSize: 14, color: '#64748b', marginBottom: 36 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 36 },
  card: {
    background: 'white', border: '1px solid #e2e8f0', borderRadius: 16,
    padding: '28px 20px', textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    transition: 'transform 0.22s, box-shadow 0.22s',
  },
  cardIcon: {
    width: 56, height: 56, borderRadius: 14,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 16px',
  },
  cardValue: { fontSize: 40, fontWeight: 800, lineHeight: 1, marginBottom: 8 },
  cardLabel: { fontSize: 13, color: '#94a3b8', fontWeight: 500 },
  infoBox: {
    background: '#f0fdf4', border: '1px solid #bbf7d0',
    borderRadius: 14, padding: '20px 24px',
  },
  infoTitle: { fontWeight: 700, color: '#065f46', marginBottom: 8, fontSize: 14 },
  infoText: { fontSize: 13, color: '#374151', lineHeight: 1.7 },
};

export default AdminDashboard;