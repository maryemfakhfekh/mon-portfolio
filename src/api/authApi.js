// src/api/authApi.js
import { loginUser } from './localData';

export async function loginWithJson(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = loginUser(email, password);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }, 300);
  });
}