// src/components/Accueil/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaDownload,
} from "react-icons/fa";
import maryemPhoto from "../../assets/maryem.jpg";
import cvFile from "../../assets/MaryemFakhfekhCV.pdf";

const Hero = () => {
  const user = {
    name: "Maryem Fakhfekh",
    headline: "Développeuse Web & Intelligence Artificielle",
    tagline: "Stagiaire PFE · IIT Sfax · Génie Logiciel",
    intro:
      "Étudiante en Génie Logiciel et Systèmes d'Information, passionnée par le développement web, les applications mobiles et l'intelligence artificielle. À travers mes projets académiques et professionnels, j'ai développé des compétences en développement full-stack, analyse de données et NLP.",
    email: "maryemfakhfekh1@gmail.com",
    phone: "+216 99 144 624",
    location: "Sfax, Tunisie",
    linkedin: "https://www.linkedin.com/in/maryem-fakhfekh-616231364/",
    github: "https://github.com/maryemfakhfekh",
    cvUrl: cvFile,
  };

  const stats = [
    { value: "6+", label: "Projets" },
    { value: "PFE", label: "En stage" },
    { value: "3", label: "Langues" },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #f8f9fa;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(13,148,136,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,148,136,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .hero-bg-glow {
          position: absolute;
          top: -180px; right: -120px;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 65%);
          pointer-events: none;
        }
        .hero-grid {
          position: relative; z-index: 1;
          max-width: 1140px; margin: 0 auto;
          padding: 100px 32px 80px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 72px; align-items: center; width: 100%;
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11.5px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: #0d9488; margin-bottom: 22px;
        }
        .hero-eyebrow::before {
          content: ''; display: inline-block; width: 32px; height: 2px;
          background: #0d9488; border-radius: 2px;
        }
        .hero-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(36px, 4.2vw, 56px);
          font-weight: 800; color: #0f172a;
          line-height: 1.1; letter-spacing: -1.5px; margin-bottom: 16px;
        }
        .hero-name-first { display: block; }
        .hero-name-last { display: block; color: #0d9488; }
        .hero-headline { font-size: 17px; color: #334155; font-weight: 600; margin-bottom: 6px; }
        .hero-tagline {
          font-size: 13.5px; color: #94a3b8; margin-bottom: 26px;
          display: flex; align-items: center; gap: 8px;
        }
        .tagline-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10b981; animation: pulse-dot 2s infinite; flex-shrink: 0;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .hero-intro {
          font-size: 15px; color: #475569; line-height: 1.85;
          max-width: 480px; margin-bottom: 34px;
        }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; background: #0d9488; color: white;
          border-radius: 10px; font-size: 14px; font-weight: 600;
          text-decoration: none; transition: all 0.22s;
          box-shadow: 0 4px 16px rgba(13,148,136,0.28);
          font-family: inherit; border: none; cursor: pointer;
        }
        .btn-primary:hover {
          background: #0f766e; box-shadow: 0 8px 24px rgba(13,148,136,0.38);
          transform: translateY(-2px);
        }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; background: white; color: #374151;
          border-radius: 10px; font-size: 14px; font-weight: 600;
          text-decoration: none; transition: all 0.22s;
          border: 1.5px solid #e2e8f0; font-family: inherit; cursor: pointer;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .btn-secondary:hover { border-color: #0d9488; color: #0d9488; transform: translateY(-2px); }
        .contact-divider {
          height: 1px;
          background: linear-gradient(90deg, #e2e8f0, transparent);
          margin-bottom: 22px;
        }
        .contact-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: #cbd5e1; margin-bottom: 14px;
        }
        .contact-list { display: flex; flex-direction: column; gap: 9px; margin-bottom: 16px; }
        .contact-item { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: #64748b; }
        .contact-item svg { color: #0d9488; font-size: 12px; flex-shrink: 0; }
        .contact-link { color: #64748b; text-decoration: none; transition: color 0.2s; }
        .contact-link:hover { color: #0d9488; }
        .social-row { display: flex; gap: 8px; }
        .social-chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 7px 15px; background: white; border: 1.5px solid #e2e8f0;
          border-radius: 8px; font-size: 13px; color: #475569;
          text-decoration: none; font-weight: 500; transition: all 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .social-chip:hover { border-color: #0d9488; color: #0d9488; background: #f0fdf4; }

        .hero-right { display: flex; flex-direction: column; align-items: center; gap: 20px; }
        .photo-wrap { position: relative; width: 100%; max-width: 300px; }
        .photo-deco-tl {
          position: absolute; top: -12px; left: -12px; width: 72px; height: 72px;
          border-top: 3px solid #0d9488; border-left: 3px solid #0d9488;
          border-radius: 4px 0 0 0; opacity: 0.45;
        }
        .photo-deco-br {
          position: absolute; bottom: -12px; right: -12px; width: 72px; height: 72px;
          border-bottom: 3px solid #0d9488; border-right: 3px solid #0d9488;
          border-radius: 0 0 4px 0; opacity: 0.45;
        }
        .photo-frame {
          position: relative; width: 100%; aspect-ratio: 3/4;
          border-radius: 18px; overflow: hidden;
          box-shadow: 0 20px 56px rgba(0,0,0,0.13); border: 3px solid white;
        }
        .photo-frame img { width: 100%; height: 100%; object-fit: cover; }
        .status-badge {
          position: absolute; bottom: -14px; left: 50%; transform: translateX(-50%);
          background: white; border: 1.5px solid #bbf7d0; border-radius: 100px;
          padding: 7px 18px; font-size: 12px; font-weight: 700; color: #065f46;
          white-space: nowrap; box-shadow: 0 4px 14px rgba(13,148,136,0.14);
          display: flex; align-items: center; gap: 7px; font-family: inherit;
        }
        .status-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #10b981;
          animation: pulse-dot 2s infinite; flex-shrink: 0;
        }
        .stats-row { display: flex; gap: 10px; width: 100%; max-width: 300px; margin-top: 22px; }
        .stat-card {
          flex: 1; background: white; border: 1px solid #f1f5f9;
          border-radius: 12px; padding: 14px 8px; text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        .stat-value {
          display: block; font-size: 22px; font-weight: 800; color: #0d9488;
          line-height: 1; letter-spacing: -0.5px;
        }
        .stat-label {
          display: block; font-size: 10.5px; color: #94a3b8; font-weight: 600;
          margin-top: 5px; text-transform: uppercase; letter-spacing: 0.05em;
        }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; gap: 48px; padding: 80px 24px 60px; }
          .hero-right { order: -1; }
          .photo-wrap { max-width: 220px; }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-bg-glow" />
        <div className="hero-grid">

          {/* Left */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <p className="hero-eyebrow">Portfolio</p>
              <h1 className="hero-name">
                <span className="hero-name-first">Maryem</span>
                <span className="hero-name-last">Fakhfekh</span>
              </h1>
              <p className="hero-headline">{user.headline}</p>
              <p className="hero-tagline">
                <span className="tagline-dot" />
                {user.tagline}
              </p>
            </motion.div>

            <motion.p variants={itemVariants} className="hero-intro">
              {user.intro}
            </motion.p>

            <motion.div variants={itemVariants} className="hero-actions">
              <a href={user.cvUrl} target="_blank" rel="noreferrer" className="btn-primary">
                <FaDownload style={{ fontSize: 12 }} />
                Télécharger mon CV
              </a>
              {/* ✅ Link au lieu de <a> pour éviter le 404 sur Vercel */}
              <Link to="/contact" className="btn-secondary">
                Me contacter →
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="contact-divider" />
              <p className="contact-label">Contact</p>
              <div className="contact-list">
                <div className="contact-item">
                  <FaEnvelope />
                  <a href={`mailto:${user.email}`} className="contact-link">{user.email}</a>
                </div>
                <div className="contact-item">
                  <FaPhone /><span>{user.phone}</span>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt /><span>{user.location}</span>
                </div>
              </div>
              <div className="social-row">
                <a href={user.linkedin} target="_blank" rel="noreferrer" className="social-chip">
                  <FaLinkedin /> LinkedIn
                </a>
                <a href={user.github} target="_blank" rel="noreferrer" className="social-chip">
                  <FaGithub /> GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="photo-wrap">
              <div className="photo-deco-tl" />
              <div className="photo-deco-br" />
              <div className="photo-frame">
                <img src={maryemPhoto} alt={user.name} />
              </div>
              <div className="status-badge">
                <span className="status-dot" />
                En stage PFE
              </div>
            </div>

            <div className="stats-row">
              {stats.map((s) => (
                <div key={s.label} className="stat-card">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Hero;