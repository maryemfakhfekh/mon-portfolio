// src/services/emailService.js
import emailjs from '@emailjs/browser';

export const sendEmail = async (formData) => {
  try {
    const response = await emailjs.send(
      'service_625ht2o',     // Ton service ID
      'template_ptfopr1',    // Ton template ID
      {
        name: formData.nom || formData.name,
        email: formData.email,
        message: formData.message,
      },
      'OLUuBuw92fRDp7An9'    // Ta clé publique
    );
    console.log('Email envoyé !', response.status, response.text);
    return { success: true };
  } catch (error) {
    console.error('Erreur EmailJS :', error);
    return { success: false, error };
  }
};