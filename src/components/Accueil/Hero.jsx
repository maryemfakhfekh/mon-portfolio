// src/components/Hero/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import maryemPhoto from "../../assets/maryem.jpg";
import cvFile from "../../assets/Maryemfakhfekh.pdf"; 

const Hero = () => {
  const user = {
    name: "Maryem Fakhfekh",
    headline:
      "Étudiante en 3ᵉ année de Licence en Génie Logiciel et Systèmes d’Information",
    intro:
      "Je suis passionnée par le développement web, l’intelligence artificielle et la création de solutions logicielles utiles et bien conçues. Sérieuse, motivée et organisée, je recherche un stage PFE pour mettre en pratique mes compétences techniques et humaines.",
    email: "maryemfakhfekh1@gmail.com",
    location: "Sfax, Tunisie",
    linkedin: "https://www.linkedin.com/in/maryem-fakhfekh-616231364/",
    github: "https://github.com/",
    cvUrl: cvFile, // PDF importé
  };

  return (
    <section className="page-bg py-12">
      <motion.div
        className="cv-card max-w-7xl mx-auto p-6 md:p-10 rounded-3xl bg-white shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid md:grid-cols-[2fr_1.2fr] gap-8 items-center">
          {/* Colonne gauche : texte */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-slate-500 tracking-[0.25em] uppercase">
                Hello, I am
              </p>
              <h1 className="mt-1 text-3xl md:text-4xl font-bold text-slate-900">
                {user.name}
              </h1>
              <p className="mt-2 text-sm md:text-base text-slate-700">
                {user.headline}
              </p>
            </div>

            <p className="text-sm md:text-base text-slate-700">{user.intro}</p>

            {/* Boutons actions */}
            <div className="flex flex-wrap gap-3 pt-1">
              {/* Voir mon CV */}
              <a
                href={user.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="badge-pill bg-white border-emerald-500 text-emerald-700 hover:bg-emerald-600 hover:text-white transition px-4 py-2 rounded-lg text-sm font-medium"
              >
                Voir mon CV
              </a>

              {/* Expérience */}
              <a
                href="/experience"
                className="badge-pill bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition px-4 py-2 rounded-lg text-sm font-medium"
              >
                Voir mon expérience
              </a>

              {/* Contact */}
              <a
                href="/contact"
                className="badge-pill bg-sky-50 border border-sky-200 text-sky-800 hover:bg-sky-100 transition px-4 py-2 rounded-lg text-sm font-medium"
              >
                Me contacter
              </a>
            </div>

            {/* Contact détaillé */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">
                Contact
              </h2>
              <div className="h-[2px] w-16 bg-emerald-500 mb-4" />

              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-emerald-700" />
                  <a href={`mailto:${user.email}`} className="link-underline">
                    {user.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-emerald-700" />
                  <span>+216 00 000 000</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-emerald-700" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-4 pt-1">
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm text-slate-700 hover:text-emerald-700 link-underline"
                  >
                    <FaLinkedin />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={user.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm text-slate-700 hover:text-emerald-700 link-underline"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite : photo */}
          <div className="relative flex justify-center items-center">
            {/* Fond décoratif */}
            <motion.div
              className="absolute -top-6 -right-4 w-[80%] h-[80%] bg-[#0f766e] rounded-[40%] rotate-3"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            <div className="absolute -bottom-4 left-0 w-[55%] h-[28%] bg-emerald-200 rounded-[40%] opacity-60" />

            {/* Photo recadrée */}
            <motion.div
              className="relative w-full max-w-xs md:max-w-sm aspect-[3/4] overflow-hidden rounded-[32px] border border-slate-200 shadow-xl bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img
                src={maryemPhoto}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Badge stage PFE */}
            <motion.div
              className="absolute -bottom-4 right-0 bg-white border border-emerald-200 rounded-2xl px-4 py-2 shadow-md text-xs text-slate-700 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Disponible pour un stage PFE
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
