import React from "react";

const Experience = () => {
  const experience = {
    company: "ASM, Sfax",
    period: "Juin – Juillet 2025",
    title: "Stage d’été – Développement web & Intelligence Artificielle",
    description:
      "Développement d’un site web de génération automatique de résumés à partir de texte en utilisant un modèle NLP (T5).",
    tasks: [
      "Conception du frontend de l’application (structure, navigation, composants).",
      "Développement de l’API backend avec Flask (Python).",
      "Intégration d’un modèle NLP (T5) pour la génération automatique de résumés.",
      "Mise en place d’une interface utilisateur simple et claire.",
    ],
    stack: ["Angular", "Flask", "Python", "NLP (T5)", "HTML", "CSS", "JavaScript"],
  };

  // 🔹 TES PROJETS PERSONNELS / ACADÉMIQUES
  const projects = [
    {
      title: "Librairie en ligne",
      detail:
        "Site web en HTML/CSS permettant d’afficher et gérer des livres avec une interface simple et responsive.",
    },
    {
      title: "Site web de boucherie",
      detail:
        "Mini-application web pour afficher les produits d’une boucherie et gérer les commandes (HTML, CSS, JavaScript).",
    },
    {
      title: "Application CRUD .NET",
      detail:
        "Application de gestion (ajout, modification, suppression, recherche) en C#/.NET avec base de données SQL.",
    },
    {
      title: "Jeu vidéo 2D (Unity)",
      detail:
        "Création d’un mini-jeu 2D avec gestion du mouvement, collisions et interactions basiques.",
    },
  ];

  const hardSkills = [
    "Python",
    "Java",
    "C#",
    "JavaScript",
    "SQL",
    "Angular",
    "Flask",
    ".NET",
    "ReactJS",
    "Node.js",
    "MySQL",
    "SQLite",
    "Oracle",
    "HTML",
    "CSS",
    "API REST",
    "Git",
    "VS Code",
    "Postman",
    "NLP (T5)",
    "Agile / Scrum",
  ];

  const softSkills = [
    "Travail d’équipe",
    "Organisation",
    "Esprit d’analyse",
    "Créativité",
    "Autonomie",
  ];

  return (
    <section className="page-bg">
      <div className="cv-card space-y-10">
        {/* EXPÉRIENCE */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8">
          <div>
            <h2 className="cv-section-title">Expérience professionnelle</h2>
            <div className="cv-section-underline" />

            <h3 className="font-semibold text-slate-900 text-sm md:text-base">
              {experience.title}
            </h3>
            <p className="text-sm text-slate-700">
              {experience.company} • {experience.period}
            </p>
            <p className="mt-3 text-sm text-slate-700">
              {experience.description}
            </p>
            <ul className="mt-3 list-disc ml-5 text-sm text-slate-700 space-y-1">
              {experience.tasks.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">
              Technologies utilisées
            </h3>
            <div className="flex flex-wrap gap-2">
              {experience.stack.map((tech) => (
                <span key={tech} className="skill-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* TES PROJETS */}
        <div>
          <h2 className="cv-section-title">Mes projets</h2>
          <div className="cv-section-underline" />
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-800">
            {projects.map((p) => (
              <div
                key={p.title}
                className="bg-[#f0ebe1] rounded-2xl p-4 border border-[#e2d6c2]"
              >
                <p className="font-semibold mb-1">{p.title}</p>
                <p className="text-slate-700 text-xs md:text-sm">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* COMPÉTENCES */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="cv-section-title">Compétences techniques</h2>
            <div className="cv-section-underline" />
            <div className="flex flex-wrap gap-2 text-xs md:text-sm">
              {hardSkills.map((s) => (
                <span key={s} className="skill-tag">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="cv-section-title">Compétences personnelles</h2>
            <div className="cv-section-underline" />
            <div className="flex flex-wrap gap-2 text-xs md:text-sm">
              {softSkills.map((s) => (
                <span key={s} className="skill-tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
