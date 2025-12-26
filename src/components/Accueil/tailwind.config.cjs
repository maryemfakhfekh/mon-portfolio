// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette Maryem
        charcoal: "#222831",      // texte/titres
        charcoalSoft: "#393E46",
        softGray: "#F5F5F7",      // fond général
        cardGray: "#FFFFFF",      // cartes
        accentOrange: "#F4A259",  // accent principal
        accentOrangeDark: "#D88332",
        borderGray: "#DDDDDD",
      },
      fontFamily: {
        display: ["Poppins", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "soft-lg": "0 10px 30px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
