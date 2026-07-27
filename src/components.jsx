import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Github, Linkedin, Mail, Lock, Unlock, X, Check, ChevronLeft } from "lucide-react";
import { useAdmin } from "./hooks.js";

export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');`;

export const inputStyle = {
  fontFamily: "'IBM Plex Sans', sans-serif",
  fontSize: "14px",
  background: "var(--bg)",
  border: "1px solid var(--line)",
  borderRadius: "6px",
  padding: "9px 11px",
  color: "var(--text)",
  outline: "none",
};

export const solidBtn = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "12px",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  background: "var(--accent)",
  color: "#0C0D10",
  border: "none",
  borderRadius: "6px",
  padding: "8px 14px",
  cursor: "pointer",
  fontWeight: 600,
};

export const ghostBtn = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "12px",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  background: "transparent",
  color: "var(--muted)",
  border: "1px solid var(--line)",
  borderRadius: "6px",
  padding: "8px 14px",
  cursor: "pointer",
};

export function GlobalStyles() {
  return (
    <>
      <style>{FONT_IMPORT}</style>
      <style>{`
        * { box-sizing: border-box; }
        html { background: #0C0D10; }
        a { color: inherit; text-decoration: none; }
        ::selection { background: #C9A227; color: #0C0D10; }
        input::placeholder, textarea::placeholder { color: #5A5D66; }
        .navlink { color: var(--muted); font-family: 'IBM Plex Mono', monospace; font-size: 13px; transition: color .15s; }
        .navlink:hover { color: var(--accent); }
        .proj-card { border: 1px solid var(--line); border-radius: 10px; padding: 22px; background: var(--surface); transition: border-color .15s, transform .15s; display: flex; flex-direction: column; }
        .proj-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .icon-link { color: var(--muted); transition: color .15s; }
        .icon-link:hover { color: var(--accent); }
        .cta-primary { background: var(--accent); color: #0C0D10; font-weight: 600; }
        .cta-primary:hover { opacity: 0.88; }
        .cta-ghost:hover { border-color: var(--accent); color: var(--accent); }
        .hero-grid { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 48px; align-items: center; }
        @media (max-width: 780px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-photo { max-width: 280px; margin: 0 auto; }
        }
        @media (max-width: 640px) { .navlink.hide-mobile { display: none; } }
        @media (max-width: 640px) {
          .block-gallery { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}

export function Chip({ children }) {
  return (
    <span
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "12px",
        color: "var(--muted)",
        border: "1px solid var(--line)",
        borderRadius: "4px",
        padding: "4px 9px",
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export function SectionLabel({ n, children }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "28px" }}>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--accent)", fontSize: "13px" }}>
        // {n}
      </span>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(22px, 3vw, 30px)",
          color: "var(--text)",
          margin: 0,
        }}
      >
        {children}
      </h2>
      <div style={{ flex: 1, height: "1px", background: "var(--line)", marginLeft: "6px" }} />
    </div>
  );
}

export function ProjectForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial || { name: "", year: new Date().getFullYear().toString(), desc: "", longDesc: "", tech: "", link: "", highlights: "" }
  );
  return (
    <div
      style={{
        border: "1px solid var(--accent)",
        borderRadius: "8px",
        padding: "18px",
        background: "var(--surface)",
        display: "grid",
        gap: "10px",
      }}
    >
      <input
        placeholder="Nombre del proyecto"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={inputStyle}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          placeholder="Año"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          style={{ ...inputStyle, width: "100px" }}
        />
        <input
          placeholder="Link (github / demo)"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          style={{ ...inputStyle, flex: 1 }}
        />
      </div>
      <textarea
        placeholder="Descripción corta (se muestra en las tarjetas)"
        value={form.desc}
        onChange={(e) => setForm({ ...form, desc: e.target.value })}
        rows={2}
        style={{ ...inputStyle, resize: "vertical" }}
      />
      <textarea
        placeholder="Descripción larga (se muestra en la página del proyecto)"
        value={form.longDesc || ""}
        onChange={(e) => setForm({ ...form, longDesc: e.target.value })}
        rows={3}
        style={{ ...inputStyle, resize: "vertical" }}
      />
      <input
        placeholder="Tecnologías separadas por coma"
        value={Array.isArray(form.tech) ? form.tech.join(", ") : form.tech}
        onChange={(e) => setForm({ ...form, tech: e.target.value })}
        style={inputStyle}
      />
      <textarea
        placeholder="Puntos clave, uno por línea (opcional)"
        value={Array.isArray(form.highlights) ? form.highlights.join("\n") : (form.highlights || "")}
        onChange={(e) => setForm({ ...form, highlights: e.target.value })}
        rows={3}
        style={{ ...inputStyle, resize: "vertical" }}
      />
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button onClick={onCancel} style={ghostBtn}>
          <X size={14} /> Cancelar
        </button>
        <button
          onClick={() =>
            onSave({
              ...form,
              id: form.id || "p" + Date.now(),
              tech: Array.isArray(form.tech) ? form.tech : form.tech.split(",").map((t) => t.trim()).filter(Boolean),
              highlights: Array.isArray(form.highlights)
                ? form.highlights
                : (form.highlights || "").split("\n").map((t) => t.trim()).filter(Boolean),
            })
          }
          style={solidBtn}
        >
          <Check size={14} /> Guardar
        </button>
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { hash: "about", label: "About" },
  { hash: "stack", label: "Stack" },
  { hash: "experiencia", label: "Experiencia" },
  { hash: "contacto", label: "Contacto" },
];

export function Header() {
  const { isAdmin, login, logout } = useAdmin();
  const [showLogin, setShowLogin] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const goToHash = (hash) => (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/#" + hash);
    } else {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogin = () => {
    if (login(pw)) {
      setShowLogin(false);
      setPw("");
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  return (
    <>
      <header
        style={{
          position: "sticky", top: 0, zIndex: 40,
          backdropFilter: "blur(8px)", background: "rgba(12,13,16,0.85)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "16px" }}>
            JC<span style={{ color: "var(--accent)" }}>.</span>afo
          </Link>
          <nav style={{ display: "flex", gap: "26px", alignItems: "center" }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.hash} href={`/#${item.hash}`} onClick={goToHash(item.hash)} className="navlink hide-mobile">
                {item.label}
              </a>
            ))}
            <Link to="/proyectos" className="navlink hide-mobile">Proyectos</Link>
            <button
              onClick={() => (isAdmin ? logout() : setShowLogin(true))}
              title={isAdmin ? "Salir de modo admin" : "Acceso admin"}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: isAdmin ? "var(--accent)" : "var(--muted)", display: "flex" }}
            >
              {isAdmin ? <Unlock size={16} /> : <Lock size={16} />}
            </button>
          </nav>
        </div>
      </header>

      {showLogin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "10px", padding: "24px", width: "320px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "var(--accent)" }}>// admin login</span>
              <button onClick={() => setShowLogin(false)} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer" }}><X size={16} /></button>
            </div>
            <input
              type="password"
              placeholder="Clave de acceso"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setPwError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{ ...inputStyle, width: "100%", marginBottom: "8px" }}
              autoFocus
            />
            {pwError && <p style={{ color: "#E1615A", fontSize: "12px", margin: "0 0 10px" }}>Clave incorrecta.</p>}
            <button onClick={handleLogin} style={{ ...solidBtn, width: "100%", justifyContent: "center" }}>Entrar</button>
            <p style={{ color: "var(--muted)", fontSize: "11px", marginTop: "10px", lineHeight: 1.5 }}>
              Una vez dentro, este navegador queda recordado como admin.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "20px 24px", textAlign: "center", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--muted)" }}>
      Juan Carlos Afonso Tangerino · Madrid, ES · {new Date().getFullYear()}
    </footer>
  );
}

export function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.hash) {
      // wait a tick for the DOM to paint before scrolling to the anchor
      setTimeout(() => {
        const el = document.getElementById(location.hash.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 60);
    }
  }, [location.pathname, location.hash]);

  return (
    <div
      style={{
        "--bg": "#0C0D10",
        "--surface": "#15171B",
        "--text": "#EDEEF0",
        "--muted": "#8B8F98",
        "--accent": "#C9A227",
        "--line": "#26282E",
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}
    >
      <GlobalStyles />
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export function BackLink({ to = "/proyectos", children = "Volver a proyectos" }) {
  return (
    <Link to={to} className="icon-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", marginBottom: "28px" }}>
      <ChevronLeft size={14} /> {children}
    </Link>
  );
}

export { Github, Linkedin, Mail };
