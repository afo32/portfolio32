import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, Pencil, ExternalLink } from "lucide-react";
import { SectionLabel, Chip, ProjectForm, BackLink } from "../components.jsx";
import { useAdmin } from "../hooks.js";

export default function ProjectsPage({ projects, persist }) {
  const { isAdmin } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);

  const saveProject = (proj) => {
    const exists = projects.some((p) => p.id === proj.id);
    const next = exists ? projects.map((p) => (p.id === proj.id ? proj : p)) : [...projects, proj];
    persist(next);
    setEditingId(null);
    setAdding(false);
  };

  const deleteProject = (id) => {
    persist(projects.filter((p) => p.id !== id));
  };

  return (
    <section style={{ maxWidth: "1080px", margin: "0 auto", padding: "56px 24px 100px" }}>
      <BackLink to="/" children="Volver al inicio" />
      <SectionLabel n="04">Todos los proyectos</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px" }}>
        {projects.map((p) =>
          editingId === p.id ? (
            <ProjectForm key={p.id} initial={p} onSave={saveProject} onCancel={() => setEditingId(null)} />
          ) : (
            <div key={p.id} className="proj-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <Link to={`/proyectos/${p.id}`} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 600 }}>
                  {p.name}
                </Link>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--muted)" }}>{p.year}</span>
              </div>
              <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.6, marginBottom: "14px" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                {p.tech.map((t) => <Chip key={t}>{t}</Chip>)}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                <Link to={`/proyectos/${p.id}`} className="icon-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontFamily: "'IBM Plex Mono', monospace" }}>
                  Ver página <ExternalLink size={13} />
                </Link>
                {isAdmin && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => setEditingId(p.id)} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer" }}><Pencil size={14} /></button>
                    <button onClick={() => deleteProject(p.id)} style={{ background: "none", border: "none", color: "#E1615A", cursor: "pointer" }}><Trash2 size={14} /></button>
                  </div>
                )}
              </div>
            </div>
          )
        )}
        {isAdmin && !adding && (
          <button
            onClick={() => setAdding(true)}
            style={{ border: "1px dashed var(--line)", borderRadius: "10px", background: "transparent", color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", minHeight: "140px", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px" }}
          >
            <Plus size={16} /> Añadir proyecto
          </button>
        )}
        {adding && <ProjectForm onSave={saveProject} onCancel={() => setAdding(false)} />}
      </div>
    </section>
  );
}
