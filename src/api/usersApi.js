// src/api/usersApi.js
import { getUsers as _getUsers } from './localData';

export async function getUsers() {
  return _getUsers();
}