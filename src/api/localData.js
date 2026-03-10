// src/api/localData.js
// ─────────────────────────────────────────────────────────
// Remplace json-server par localStorage
// Fonctionne EN LOCAL et sur VERCEL sans aucun backend
// ─────────────────────────────────────────────────────────

const INITIAL_DATA = {
  users: [
    {
      id: "1",
      email: "admin@portfolio.com",
      password: "admin123",
      name: "Maryem Fakhfekh",
      role: "admin",
    },
  ],
  projects: [
    {
      id: "1",
      title: "Générateur de Résumés IA",
      description: "Site web de génération automatique de résumés avec NLP (T5), Angular et Flask.",
      techStack: ["Angular", "Flask", "Python", "NLP T5"],
      status: "online",
      githubUrl: "",
      liveUrl: "",
    },
    {
      id: "2",
      title: "Lifestyle Aura",
      description: "Application mobile Flutter de bien-être : activités, recettes, hydratation.",
      techStack: ["Flutter", "Hive", "Dart"],
      status: "online",
      githubUrl: "",
      liveUrl: "",
    },
  ],
  formSubmissions: [],
};

function getStore() {
  try {
    const raw = localStorage.getItem("portfolio_db");
    if (!raw) {
      localStorage.setItem("portfolio_db", JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DATA;
  }
}

function saveStore(data) {
  localStorage.setItem("portfolio_db", JSON.stringify(data));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ── USERS ──────────────────────────────────────────────────
export function getUsers() {
  return getStore().users;
}

export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) throw new Error("Email ou mot de passe invalide");
  return {
    token: `user-${user.id}-${Date.now()}`,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}

// ── PROJECTS ───────────────────────────────────────────────
export function getProjects() {
  return getStore().projects;
}

export function createProject(data) {
  const store = getStore();
  const newProject = { ...data, id: generateId() };
  store.projects.push(newProject);
  saveStore(store);
  return newProject;
}

export function updateProject(id, data) {
  const store = getStore();
  const idx = store.projects.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Projet introuvable");
  store.projects[idx] = { ...store.projects[idx], ...data };
  saveStore(store);
  return store.projects[idx];
}

export function deleteProject(id) {
  const store = getStore();
  store.projects = store.projects.filter((p) => p.id !== id);
  saveStore(store);
  return true;
}

// ── FORM SUBMISSIONS ───────────────────────────────────────
export function getFormSubmissions() {
  return getStore().formSubmissions;
}

export function createFormSubmission(data) {
  const store = getStore();
  const entry = {
    ...data,
    id: generateId(),
    status: "nouveau",
    createdAt: new Date().toISOString(),
  };
  store.formSubmissions.unshift(entry);
  saveStore(store);
  return entry;
}

export function updateFormSubmission(id, data) {
  const store = getStore();
  const idx = store.formSubmissions.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("Soumission introuvable");
  store.formSubmissions[idx] = { ...store.formSubmissions[idx], ...data };
  saveStore(store);
  return store.formSubmissions[idx];
}

export function deleteFormSubmission(id) {
  const store = getStore();
  store.formSubmissions = store.formSubmissions.filter((s) => s.id !== id);
  saveStore(store);
  return true;
}