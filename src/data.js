export const ADMIN_KEY = "afo32-2026"; // client-side gate only, not real security

export const STACK = {
  "Front-End": ["JavaScript", "React", "HTML", "CSS", "Bootstrap", "Vite", "Angular"],
  "Back-End": ["Python", "Flask", "APIs REST"],
  "Base de datos": ["PostgreSQL", "MySQL", "SQLAlchemy", "MongoDB"],
  "Control de versiones": ["Git", "GitHub"],
  "DevOps": ["AWS", "JWT"],
};

export const EXPERIENCE = [
  {
    role: "Analyst Engineer (Becario)",
    org: "The Cocktail",
    period: "2026 — Actualidad",
    place: "Madrid, ES",
    current: true,
    bullets: ["Desarrollo y análisis en proyectos full-stack como becario del equipo de ingeniería."],
  },
  {
    role: "Dependiente de tienda",
    org: "Cex",
    period: "2025 — Presente",
    place: "Madrid, ES",
    bullets: ["Venta y revisión de artículos", "Resolución de incidencias", "Trabajo en equipo"],
  },
  {
    role: "Dependiente de tienda",
    org: "Real Cash",
    period: "2021 — 2024",
    place: "Madrid, ES",
    bullets: ["Compra y venta de productos", "Gestión de inventario y equipo", "Atención al cliente"],
  },
];

export const EDUCATION = [
  { title: "Full-stack Developer", org: "4Geeks Academy España", period: "2025 — 2026", place: "Madrid" },
  { title: "Productor de audio", org: "SAE Institute", period: "2021 — 2023", place: "Barcelona" },
];

export const SEED_PROJECTS = [
  {
    id: "p1",
    name: "Los Libritos de Yajuala",
    year: "2026",
    desc: "Ecommerce de venta de libros con sistema de match para elegir categorías favoritas y chat con IA que mejora la recomendación de libros.",
    longDesc:
      "Ecommerce de venta de libros pensado para descubrir lecturas de forma más personal. Incorpora un sistema de match donde el usuario elige sus categorías favoritas, y un chat con IA que usa esas preferencias para mejorar las recomendaciones. El backend expone una API REST propia que gestiona catálogo, usuarios y autenticación.",
    tech: ["Python", "Flask-JWT", "SQLAlchemy", "PostgreSQL", "React", "Vite"],
    link: "https://github.com/afo32/sp-124-los-libritos-de-yajuala",
    highlights: [
      "Backend con Python, Flask-JWT, SQLAlchemy y JavaScript (Node.js)",
      "Base de datos relacional con PostgreSQL",
      "Front-end con React, Vite y CSS",
      "Conexión front-end / backend mediante APIs RESTful",
      "Autenticación con JWT (JSON Web Tokens)",
      "Integración de servicios de terceros (pagos, email)",
      "Control de versiones con GitHub",
    ],
    blocks: [],
  },
  {
    id: "p2",
    name: "Carb Counter",
    year: "2026",
    desc: "Aplicación web para el seguimiento de carbohidratos: explora alimentos, calcula carbohidratos por porción, registra consumo diario y guarda favoritos.",
    longDesc:
      "Aplicación web de seguimiento nutricional enfocada en carbohidratos. Permite explorar una base de datos de alimentos, calcular carbohidratos por porción, registrar el consumo diario y guardar favoritos para un acceso más rápido. Pensada para ser simple de usar día a día, con autenticación propia para cada usuario.",
    tech: ["Python", "Flask-JWT", "Supabase", "React", "Vite"],
    link: "https://github.com/afo32/carb-counter",
    highlights: [
      "Backend con Python, Flask-JWT y JavaScript",
      "Base de datos con Supabase",
      "Front-end con React, Vite y CSS",
      "Conexión front-end / backend mediante APIs RESTful",
      "Autenticación con JWT (JSON Web Tokens) y Supabase",
      "Control de versiones con GitHub",
    ],
    blocks: [],
  },
];
