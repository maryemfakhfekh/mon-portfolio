// src/components/Formulaire/FormulaireG6.jsx
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axiosClient from '../../api/axiosClient';
import { sendEmail } from '../../Services/emailservice';

const FormulaireG6 = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ sending: false, success: false, error: false });

  const contactInfo = {
    email: "hanasellami18@gmail.com",
    phone: "+216 28 333 457",
    location: "Sfax, Tunisie",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: false });

    try {
      // 1️⃣ Envoi au serveur
      await axiosClient.post('/formSubmissions', {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        status: 'nouveau',
        date: new Date().toISOString(),
      });

      // 2️⃣ Envoi email
      const emailResult = await sendEmail({
        nom: form.name,
        email: form.email,
        sujet: form.subject,
        message: form.message,
      });

      if (emailResult.success) {
        setStatus({ sending: false, success: true, error: false });
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus({ sending: false, success: false, error: false }), 8000);
      } else {
        throw new Error('Email non envoyé');
      }
    } catch (err) {
      console.error(err);
      setStatus({ sending: false, success: false, error: true });
      setTimeout(() => setStatus({ sending: false, success: false, error: false }), 8000);
    }
  };

  return (
    <section className="page-bg">
      <motion.div
        className="cv-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10">
          {/* Formulaire */}
          <div>
            <h2 className="cv-section-title">Contact</h2>
            <div className="cv-section-underline" />
            <p className="text-sm md:text-base text-slate-700 mb-4">
              Vous pouvez me contacter pour un stage PFE, une collaboration
              ou toute autre opportunité. Je répondrai dans les plus brefs délais.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-800 mb-1">
                  Nom complet
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-800 mb-1">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="vous@exemple.com"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-800 mb-1">
                  Sujet
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Objet de votre message"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-800 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Écrivez votre message ici..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.sending}
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status.sending ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {status.success && (
                <p className="text-xs text-emerald-700 mt-2">
                  ✅ Merci ! Votre message a été envoyé.
                </p>
              )}
              {status.error && (
                <p className="text-xs text-red-600 mt-2">
                  😔 Une erreur est survenue, réessayez svp.
                </p>
              )}
            </form>
          </div>

          {/* Infos de contact */}
          <div className="space-y-6">
            <div>
              <h2 className="cv-section-title">Mes coordonnées</h2>
              <div className="cv-section-underline" />
              <p className="text-sm text-slate-700 mb-3">
                Vous pouvez également me joindre directement via email ou
                téléphone.
              </p>

              <div className="space-y-3 text-sm text-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FaEnvelope className="text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <a href={`mailto:${contactInfo.email}`} className="link-underline">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FaPhoneAlt className="text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Téléphone</p>
                    <span>{contactInfo.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Localisation</p>
                    <span>{contactInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f0ebe1] border border-[#e2d6c2] rounded-2xl p-4 text-xs text-slate-700">
              Je suis particulièrement intéressée par les projets en
              développement web, IA (NLP) et systèmes d’information. N’hésitez
              pas à me contacter pour discuter de vos besoins ou d’un
              éventuel stage PFE.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FormulaireG6;
