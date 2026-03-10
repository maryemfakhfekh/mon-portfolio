// src/components/Admin/Users.jsx
import { useEffect, useState } from 'react';
import { getUsers } from '../../api/usersApi';

function UsersAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Gestion des Utilisateurs</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher par nom ou email…"
        style={styles.search}
      />

      {loading ? (
        <p style={{ color: '#94a3b8', padding: '32px 0', textAlign: 'center' }}>Chargement…</p>
      ) : filtered.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ color: '#64748b' }}>Aucun utilisateur trouvé.</p>
        </div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Nom</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Rôle</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} style={styles.tr} className="user-row">
                  <td style={styles.tdBold}>{user.name || 'Non défini'}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.roleBadge,
                      background: user.role === 'admin' ? '#f0fdf4' : '#eff6ff',
                      color: user.role === 'admin' ? '#065f46' : '#1e40af',
                      borderColor: user.role === 'admin' ? '#bbf7d0' : '#bfdbfe',
                    }}>
                      {user.role === 'admin' ? '🔐 Administrateur' : '👤 Utilisateur'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`.user-row:hover { background: #f8fafc; }`}</style>
    </div>
  );
}

const styles = {
  page: { padding: '8px 0' },
  title: { fontSize: 26, fontWeight: 700, color: '#0f172a', marginBottom: 24 },
  search: {
    width: '100%', maxWidth: 380, padding: '10px 16px',
    border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14,
    fontFamily: 'inherit', outline: 'none', marginBottom: 24,
    display: 'block',
  },
  empty: {
    background: 'white', border: '1px solid #e2e8f0',
    borderRadius: 14, padding: '40px', textAlign: 'center',
  },
  tableWrap: {
    background: 'white', border: '1px solid #e2e8f0',
    borderRadius: 16, overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { background: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
  th: {
    padding: '12px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8',
  },
  tr: { borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' },
  td: { padding: '14px 20px', fontSize: 14, color: '#475569' },
  tdBold: { padding: '14px 20px', fontSize: 14, color: '#0f172a', fontWeight: 600 },
  roleBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: '4px 12px', borderRadius: 100, fontSize: 12,
    fontWeight: 600, border: '1px solid',
  },
};

export default UsersAdminPage;