/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f9f9f9f9", // Background warna utama
        card: "#ffffff", // Warna untuk elemen kartu
        primary: "#A4E7FF", // Warna ungu untuk aksen
        dark: "#171717", // Warna gelap untuk teks
      },
      fontFamily: {
        mono: ["Syne", "monospace"], // Font Syne untuk judul
        inter: ["Inter", "sans-serif"], // Font Inter untuk konten
        Fira_Code: ['Fira_Code', 'monospace'],
        Funnel_Sans: ['Funnel Sans', 'sans-serif'],
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
    },
  },
  plugins: [],
};
