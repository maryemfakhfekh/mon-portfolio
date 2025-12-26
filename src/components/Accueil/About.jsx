import React from "react";

const About = () => {
  const education = [
    {
      title: "Licence en Génie Logiciel et Systèmes d’Information",
      school: "Institut International de Technologie (IIT), Sfax",
      years: "2023 – Présent",
      detail: "3ᵉ année, préparation du projet de fin d’études (PFE).",
    },
    {
      title: "Baccalauréat – Sciences Expérimentales",
      school: "Lycée 9 Avril 1938, Sfax",
      years: "2023",
      detail: "",
    },
  ];

  const languages = [
    { name: "Arabe", level: "Langue maternelle", percent: 100 },
    { name: "Français", level: "B2", percent: 80 },
    { name: "Anglais", level: "B2", percent: 75 },
  ];

  const interests = ["Sport", "Voyage"];

  return (
    <section className="page-bg">
      <div className="cv-card">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Éducation */}
          <div>
            <h2 className="cv-section-title">Éducation</h2>
            <div className="cv-section-underline" />
            <ul className="space-y-4 text-sm text-slate-800">
              {education.map((e, i) => (
                <li key={i}>
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-slate-600">{e.school}</p>
                  <p className="text-xs text-slate-500">{e.years}</p>
                  {e.detail && (
                    <p className="mt-1 text-xs text-slate-600">{e.detail}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Langues + Centres d'intérêt */}
          <div className="space-y-8">
            <div>
              <h2 className="cv-section-title">Langues</h2>
              <div className="cv-section-underline" />
              <div className="space-y-3 text-sm text-slate-800">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-xs text-slate-500">
                        {lang.level}
                      </span>
                    </div>
                    <div className="level-bar">
                      <div
                        className="level-bar-fill"
                        style={{ width: `${lang.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="cv-section-title">Centres d’intérêt</h2>
              <div className="cv-section-underline" />
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <span key={i} className="skill-tag">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
