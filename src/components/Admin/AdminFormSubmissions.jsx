import { useEffect, useState } from 'react';
import {
  getFormSubmissions,
  updateFormSubmission,
  deleteFormSubmission,
} from '../../api/formSubmissionsApi';

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
          data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
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

    const updated = await updateFormSubmission(id, {
      ...current,
      status: newStatus,
    });

    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? updated : s))
    );
  }

  async function handleDelete(id) {
    if (!window.confirm('Supprimer cette demande ?')) return;
    await deleteFormSubmission(id);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  }

  if (loading)
    return <p className="text-center py-6 text-lg text-slate-700">Chargement…</p>;
  if (error)
    return (
      <p className="text-red-600 text-center py-6 text-lg font-medium">{error}</p>
    );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">
        Demandes de contact
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-slate-300 rounded-3xl shadow-lg overflow-hidden">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Message
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Statut
              </th>
              <th className="px-6 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {submissions.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {s.fullName}
                </td>
                <td className="px-6 py-4 text-slate-700">{s.email}</td>
                <td className="px-6 py-4 text-slate-700 line-clamp-2">
                  {s.message}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={s.status}
                    onChange={(e) =>
                      handleChangeStatus(s.id, e.target.value)
                    }
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-1 focus:ring-[#0F766E] transition-all"
                  >
                    <option value="new">Nouveau</option>
                    <option value="in-progress">En cours</option>
                    <option value="done">Traité</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}

            {submissions.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-slate-500 text-sm"
                >
                  Aucune demande pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminFormSubmissions;
