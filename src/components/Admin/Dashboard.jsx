import { useEffect, useState } from 'react';
import { getProjects } from '../../api/projectsApi';
import { getFormSubmissions } from '../../api/formSubmissionsApi';

function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    onlineProjects: 0,
    messages: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const projects = await getProjects();
        const submissions = await getFormSubmissions?.() || [];

        setStats({
          projects: projects.length,
          onlineProjects: projects.filter(p => p.status === 'online').length,
          messages: submissions.length,
        });
      } catch (error) {
        console.error('Erreur stats', error);
      }
    }
    loadStats();
  }, []);

  const cards = [
    { label: 'Total projets', value: stats.projects, color: 'text-slate-900' },
    { label: 'Projets en ligne', value: stats.onlineProjects, color: 'text-[#0F766E]' },
    { label: 'Messages reçus', value: stats.messages, color: 'text-slate-900' },
  ];

  return (
    <div className="space-y-12 py-6">
      {/* Titre */}
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 text-center tracking-tight">
        Dashboard Admin
      </h2>

      {/* Cartes stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-glass/60 backdrop-blur-lg border border-glass-border rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <h3 className="text-sm text-slate-600 mb-2">{card.label}</h3>
            <p className={`text-4xl md:text-5xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Texte */}
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm md:text-base text-slate-600">
          Bienvenue dans ton espace administration.  
          Ici tu gères tes projets et les messages reçus via le formulaire de contact.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
