// src/api/formSubmissionsApi.js
import {
  getFormSubmissions as _get,
  createFormSubmission as _create,
  updateFormSubmission as _update,
  deleteFormSubmission as _delete,
} from './localData';

export async function getFormSubmissions() {
  return _get();
}

export async function createFormSubmission(payload) {
  return _create(payload);
}

export async function updateFormSubmission(id, payload) {
  return _update(id, payload);
}

export async function deleteFormSubmission(id) {
  return _delete(id);
}