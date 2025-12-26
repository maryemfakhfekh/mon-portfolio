// src/components/Admin/ProjectsAdminPage.jsx
import { useEffect, useState } from 'react';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../api/projectsApi';
import ProjectForm from './ProjectForm';

function ProjectsAdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (projectData) => {
    const created = await createProject(projectData);
    setProjects((prev) => [...prev, created]);
  };

  const handleUpdate = async (id, projectData) => {
    const updated = await updateProject(id, projectData);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    setEditingProject(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce projet ?')) {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Gestion des Projets</h1>

      {error && <p className="text-red-600">{error}</p>}

      <ProjectForm
        key={editingProject?.id || 'new'}
        initialProject={editingProject}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancel={() => setEditingProject(null)}
      />

      {loading ? (
        <p>Chargement...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500">Aucun projet pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 text-sm">{project.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'online' ? 'bg-green-100 text-green-800' :
                      project.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status === 'online' ? 'En ligne' : project.status === 'draft' ? 'Brouillon' : 'Archivé'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => setEditingProject(project)} className="text-indigo-600 hover:underline mr-4">
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:underline">
                      Supprimer
                    </button>
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

export default ProjectsAdminPage;