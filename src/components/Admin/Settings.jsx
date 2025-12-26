import { useState } from 'react';

function AdminSettings() {
  const [form, setForm] = useState({
    name: 'Maryem Fakhfekh',
    email: 'Maryemfakhfekh1@gmail.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setMessage({ text: 'Les nouveaux mots de passe ne correspondent pas.', type: 'error' });
      return;
    }

    if (form.newPassword && !form.currentPassword) {
      setMessage({ text: 'Mot de passe actuel requis.', type: 'error' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage({ text: 'Paramètres mis à jour avec succès.', type: 'success' });
      setForm({ ...form, currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-10">
      {/* Titre */}
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 text-center">
        Paramètres Administrateur
      </h2>

      {/* Message */}
      {message.text && (
        <div
          className={`rounded-xl px-6 py-4 text-center font-medium text-lg mx-auto max-w-lg ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profil */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-lg p-10">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center md:text-left">
          Profil administrateur
        </h3>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Infos */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-5 py-3 text-sm shadow-sm focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-5 py-3 text-sm shadow-sm focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E] transition"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div className="border-t border-slate-200 pt-10">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center md:text-left">
              Sécurité
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirmer
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E] transition"
                />
              </div>
            </div>
          </div>

          {/* Bouton */}
          <div className="flex justify-center md:justify-end pt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0F766E] text-white px-10 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition shadow-md disabled:opacity-60"
            >
              {loading ? 'Sauvegarde...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>

      {/* Paramètres site */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-lg p-10">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center md:text-left">
          Paramètres du site
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Titre du portfolio
            </label>
            <input
              type="text"
              disabled
              value="Maryem Fakhfekh - Portfolio"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-slate-50 text-slate-600 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email de contact
            </label>
            <input
              type="email"
              disabled
              value="Maryemfakhfekh1@gmail.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-slate-50 text-slate-600 shadow-sm"
            />
            <p className="text-xs text-slate-500 mt-2">
              Les messages sont envoyés via EmailJS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
