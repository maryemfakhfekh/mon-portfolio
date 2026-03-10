// src/components/Admin/AdminFormSubmissions.jsx
import { useEffect, useState } from 'react';
import {
  getFormSubmissions,
  updateFormSubmission,
  deleteFormSubmission,
} from '../../api/formSubmissionsApi';

const STATUS_LABELS = {
  nouveau: { label: 'Nouveau', color: '#0369a1', bg: '#e0f2fe' },
  'in-progress': { label: 'En cours', color: '#b45309', bg: '#fef3c7' },
  done: { label: 'Traité', color: '#065f46', bg: '#d1fae5' },
};

function AdminFormSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getFormSubmissions();
        setSubmissions(
          [...data].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleChangeStatus(id, newStatus) {
    const current = submissions.find((s) => s.id === id);
    if (!current) return;
    const updated = await updateFormSubmission(id, { ...current, status: newStatus });
    setSubmissions((prev) => prev.map((s) => (s.id === id ? updated : s)));
  }

  async function handleDelete(id) {
    if (!window.confirm('Supprimer cette demande ?')) return;
    await deleteFormSubmission(id);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  }

  if (loading) return (
    <div style={styles.center}>
      <p style={styles.loading}>Chargement…</p>
    </div>
  );

  if (error) return (
    <div style={styles.center}>
      <p style={styles.error}>{error}</p>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Demandes de contact</h1>
        <span style={styles.badge}>{submissions.length} message{submissions.length !== 1 ? 's' : ''}</span>
      </div>

      {submissions.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>📭</p>
          <p style={{ color: '#64748b', fontSize: 15 }}>Aucune demande pour le moment.</p>
        </div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Nom</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Sujet</th>
                <th style={styles.th}>Message</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Statut</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => {
                const st = STATUS_LABELS[s.status] || STATUS_LABELS['nouveau'];
                return (
                  <tr key={s.id} style={styles.tr} className="admin-row">
                    {/* FIX: s.name au lieu de s.fullName */}
                    <td style={styles.tdBold}>{s.name || s.fullName || '—'}</td>
                    <td style={styles.td}>{s.email}</td>
                    <td style={styles.td}>{s.subject || '—'}</td>
                    <td style={{ ...styles.td, maxWidth: 200 }}>
                      <span style={styles.clamp}>{s.message}</span>
                    </td>
                    <td style={{ ...styles.td, whiteSpace: 'nowrap' }}>
                      {s.createdAt
                        ? new Date(s.createdAt).toLocaleDateString('fr-FR')
                        : s.date
                        ? new Date(s.date).toLocaleDateString('fr-FR')
                        : '—'}
                    </td>
                    <td style={styles.td}>
                      <select
                        value={s.status || 'nouveau'}
                        onChange={(e) => handleChangeStatus(s.id, e.target.value)}
                        style={{
                          ...styles.select,
                          color: st.color,
                          background: st.bg,
                          borderColor: st.color + '60',
                        }}
                      >
                        <option value="nouveau">Nouveau</option>
                        <option value="in-progress">En cours</option>
                        <option value="done">Traité</option>
                      </select>
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleDelete(s.id)}
                        style={styles.deleteBtn}
                        onMouseOver={e => e.target.style.color = '#b91c1c'}
                        onMouseOut={e => e.target.style.color = '#ef4444'}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .admin-row:hover { background: #f8fafc; }
        .admin-row { transition: background 0.15s; }
      `}</style>
    </div>
  );
}

const styles = {
  page: { padding: '8px 0', fontFamily: 'inherit' },
  header: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 },
  title: { fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 },
  badge: {
    padding: '4px 12px', background: '#f0fdf4', color: '#065f46',
    border: '1px solid #bbf7d0', borderRadius: 100, fontSize: 13, fontWeight: 600,
  },
  center: { display: 'flex', justifyContent: 'center', padding: '40px 0' },
  loading: { color: '#64748b', fontSize: 16 },
  error: { color: '#dc2626', fontSize: 15 },
  empty: {
    background: 'white', border: '1px solid #e2e8f0', borderRadius: 16,
    padding: '60px 20px', textAlign: 'center',
  },
  tableWrap: {
    background: 'white', border: '1px solid #e2e8f0',
    borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { background: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
  th: {
    padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8',
  },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '14px 16px', fontSize: 13.5, color: '#475569', verticalAlign: 'top' },
  tdBold: { padding: '14px 16px', fontSize: 13.5, color: '#0f172a', fontWeight: 600, verticalAlign: 'top' },
  clamp: { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  select: {
    padding: '5px 10px', borderRadius: 8, border: '1.5px solid',
    fontSize: 12, fontWeight: 600, cursor: 'pointer', outline: 'none',
    fontFamily: 'inherit',
  },
  deleteBtn: {
    background: 'none', border: 'none', color: '#ef4444',
    fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0,
  },
};

export default AdminFormSubmissions;