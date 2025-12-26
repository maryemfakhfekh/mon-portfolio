// src/components/Admin/ProjectForm.jsx
import { useEffect, useRef, useState } from 'react';

function ProjectForm({ initialProject, onCreate, onUpdate, onCancel }) {
  const [title, setTitle] = useState(initialProject?.title || '');
  const [description, setDescription] = useState(initialProject?.description || '');
  const [techStack, setTechStack] = useState(initialProject?.techStack?.join(', ') || '');
  const [status, setStatus] = useState(initialProject?.status || 'draft');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const titleRef = useRef(null);
  const isEditMode = Boolean(initialProject);

  useEffect(() => {
    setTitle(initialProject?.title || '');
    setDescription(initialProject?.description || '');
    setTechStack(initialProject?.techStack?.join(', ') || '');
    setStatus(initialProject?.status || 'draft');
    titleRef.current?.focus();
  }, [initialProject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Le titre est obligatoire');
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      techStack: techStack.split(',').map(t => t.trim()).filter(Boolean),
      status,
    };

    try {
      setLoading(true);
      if (isEditMode) {
        await onUpdate(initialProject.id, payload);
      } else {
        await onCreate(payload);
        // Reset form après création
        setTitle('');
        setDescription('');
        setTechStack('');
        setStatus('draft');
        titleRef.current?.focus();
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">
        {isEditMode ? 'Modifier le projet' : 'Ajouter un nouveau projet'}
      </h2>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (séparées par virgule)</label>
          <input
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="React, Node.js, MySQL"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="draft">Brouillon</option>
            <option value="online">En ligne</option>
            <option value="archived">Archivé</option>
          </select>
        </div>

        <div className="flex gap-3 pt-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? 'En cours...' : isEditMode ? 'Mettre à jour' : 'Ajouter'}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;