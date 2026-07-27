import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, Terminal, ExternalLink, ChevronRight, Github, Linkedin, Mail,
} from "lucide-react";
import { SectionLabel, Chip } from "../components.jsx";
import { STACK, EXPERIENCE, EDUCATION } from "../data.js";

export default function Home({ projects }) {
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorOn((c) => !c), 600);
    return () => clearInterval(t);
  }, []);

  const latestProjects = projects.slice(-2).reverse();

  return (
    <>
      {/* HERO */}
      <section className="hero-grid" style={{ maxWidth: "1080px", margin: "0 auto", padding: "88px 24px 72px" }}>
        <div>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--accent)", fontSize: "14px", marginBottom: "18px" }}>
            // full-stack developer
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5.2vw, 64px)", lineHeight: 1.02, margin: "0 0 22px" }}>
            Juan Carlos<br />Afonso Tangerino
          </h1>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "clamp(14px,1.6vw,17px)", color: "var(--text)", marginBottom: "10px" }}>
            juanc@~$ echo "Construyo lo que sueñas."{cursorOn ? "▌" : " "}
          </p>
          <p style={{ color: "var(--muted)", maxWidth: "480px", lineHeight: 1.6, marginBottom: "34px", fontSize: "15px" }}>
            Desarrollador Full-Stack con experiencia en Python, JavaScript, React y SQL.
            Construyo aplicaciones desde cero — desde interfaces de usuario hasta APIs y bases de datos.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link to="/proyectos" className="cta-primary" style={{ padding: "12px 22px", borderRadius: "6px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Ver proyectos <ChevronRight size={14} />
            </Link>
            <a href="#contacto" className="cta-ghost" style={{ padding: "12px 22px", borderRadius: "6px", border: "1px solid var(--line)", color: "var(--text)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px" }}>
              Contacto
            </a>
          </div>
          <div style={{ display: "flex", gap: "18px", marginTop: "36px" }}>
            <a href="https://github.com/afo32" target="_blank" rel="noreferrer" className="icon-link"><Github size={19} /></a>
            <a href="https://www.linkedin.com/in/juan-afodev" target="_blank" rel="noreferrer" className="icon-link"><Linkedin size={19} /></a>
            <a href="mailto:juanc1994@gmail.com" className="icon-link"><Mail size={19} /></a>
          </div>
        </div>

        <div className="hero-photo" style={{ position: "relative" }}>
          <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", aspectRatio: "3/4", background: "var(--surface)" }}>
            <img
              src="/images/juan.jpg"
              alt="Juan Carlos Afonso Tangerino"
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: "grayscale(1) contrast(1.08) brightness(0.92) sepia(0.18) hue-rotate(-10deg)",
              }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,13,16,0) 55%, rgba(12,13,16,0.55) 100%)" }} />
            {[
              { top: 14, left: 14, borderTop: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)" },
              { top: 14, right: 14, borderTop: "2px solid var(--accent)", borderRight: "2px solid var(--accent)" },
              { bottom: 14, left: 14, borderBottom: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)" },
              { bottom: 14, right: 14, borderBottom: "2px solid var(--accent)", borderRight: "2px solid var(--accent)" },
            ].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: "22px", height: "22px", ...s }} />
            ))}
            <span style={{
              position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)",
              fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--accent)",
              letterSpacing: "0.05em",
            }}>
              MADRID, ES
            </span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 72px" }}>
        <SectionLabel n="01">About</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "40px" }}>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: "15.5px" }}>
            Desarrollador Full-Stack orientado al aprendizaje continuo y a la resolución de problemas bajo presión.
            Me formé en 4Geeks Academy tras una etapa como productor de audio en SAE Institute — ese cambio de rumbo
            me dio una mirada distinta: cuido el detalle y pienso en la experiencia final tanto como en el código.
            Actualmente soy becario como Analyst Engineer en The Cocktail, donde sigo creciendo en proyectos reales
            de principio a fin.
          </p>
          <div style={{ display: "grid", gap: "14px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--muted)" }}>
              <MapPin size={14} /> Madrid, ES
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--muted)" }}>
              <Terminal size={14} /> Becario · Analyst Engineer @ The Cocktail
            </div>
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "14px", color: "var(--muted)" }}>
              Español <span style={{ color: "var(--text)" }}>nativo</span> · Inglés <span style={{ color: "var(--text)" }}>C1</span><br />
              Catalán <span style={{ color: "var(--text)" }}>básico</span> · Portugués <span style={{ color: "var(--text)" }}>básico</span>
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 72px" }}>
        <SectionLabel n="02">Stack</SectionLabel>
        <div style={{ display: "grid", gap: "20px" }}>
          {Object.entries(STACK).map(([cat, items]) => (
            <div key={cat} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "14px", alignItems: "start", borderBottom: "1px solid var(--line)", paddingBottom: "16px" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "var(--text)" }}>{cat}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {items.map((i) => <Chip key={i}>{i}</Chip>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experiencia" style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 72px" }}>
        <SectionLabel n="03">Experiencia</SectionLabel>
        <div style={{ display: "grid", gap: "26px", marginBottom: "40px" }}>
          {EXPERIENCE.map((e, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "20px" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px", color: e.current ? "var(--accent)" : "var(--muted)" }}>
                {e.period}
              </div>
              <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: "20px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "17px", margin: 0, fontWeight: 600 }}>{e.role}</h3>
                  <span style={{ color: "var(--accent)", fontSize: "14px" }}>· {e.org}</span>
                </div>
                <p style={{ color: "var(--muted)", fontSize: "12.5px", margin: "3px 0 10px", fontFamily: "'IBM Plex Mono', monospace" }}>{e.place}</p>
                <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--muted)", fontSize: "14px", lineHeight: 1.7 }}>
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "var(--accent)", marginBottom: "18px" }}>// formación</p>
        <div style={{ display: "grid", gap: "16px" }}>
          {EDUCATION.map((ed, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "6px", borderBottom: "1px solid var(--line)", paddingBottom: "12px" }}>
              <div>
                <span style={{ fontWeight: 600 }}>{ed.title}</span>
                <span style={{ color: "var(--muted)" }}> — {ed.org}</span>
              </div>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px", color: "var(--muted)" }}>{ed.period} · {ed.place}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section id="proyectos-preview" style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 72px" }}>
        <SectionLabel n="04">Proyectos recientes</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px", marginBottom: "24px" }}>
          {latestProjects.map((p) => (
            <Link key={p.id} to={`/proyectos/${p.id}`} className="proj-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", margin: 0, fontWeight: 600 }}>{p.name}</h3>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--muted)" }}>{p.year}</span>
              </div>
              <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.6, marginBottom: "14px" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
                {p.tech.slice(0, 4).map((t) => <Chip key={t}>{t}</Chip>)}
              </div>
              <span className="icon-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontFamily: "'IBM Plex Mono', monospace", marginTop: "14px" }}>
                Ver detalle <ExternalLink size={13} />
              </span>
            </Link>
          ))}
        </div>
        <Link to="/proyectos" className="cta-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "11px 20px", borderRadius: "6px", border: "1px solid var(--line)", color: "var(--text)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px" }}>
          Ver todos los proyectos <ChevronRight size={14} />
        </Link>
      </section>

      {/* CONTACT */}
      <section id="contacto" style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 100px" }}>
        <SectionLabel n="05">Contacto</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p style={{ color: "var(--muted)", maxWidth: "440px", lineHeight: 1.7, marginBottom: "20px" }}>
              ¿Tienes un proyecto en mente? Escríbeme y lo construimos.
            </p>
            <a href="mailto:juanc1994@gmail.com" className="cta-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 22px", borderRadius: "6px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px" }}>
              <Mail size={15} /> juanc1994@gmail.com
            </a>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="https://github.com/afo32" target="_blank" rel="noreferrer" className="icon-link"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/juan-afodev" target="_blank" rel="noreferrer" className="icon-link"><Linkedin size={20} /></a>
          </div>
        </div>
      </section>
    </>
  );
}
