// src/api/projectsApi.js
import {
  getProjects as _getProjects,
  createProject as _createProject,
  updateProject as _updateProject,
  deleteProject as _deleteProject,
} from './localData';

export async function getProjects() {
  return _getProjects();
}

export async function createProject(project) {
  return _createProject(project);
}

export async function updateProject(id, project) {
  return _updateProject(id, project);
}

export async function deleteProject(id) {
  return _deleteProject(id);
}