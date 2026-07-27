import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { ExternalLink, Pencil, Check } from "lucide-react";
import { Chip, BackLink, ProjectForm, solidBtn, ghostBtn } from "../components.jsx";
import { BlockGallery, AdminBlockGallery } from "../blocks.jsx";
import { useAdmin } from "../hooks.js";

export default function ProjectDetail({ projects, persist }) {
  const { id } = useParams();
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [editingGallery, setEditingGallery] = useState(false);
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/proyectos" replace />;
  }

  const saveProject = (proj) => {
    persist(projects.map((p) => (p.id === proj.id ? proj : p)));
    setEditing(false);
  };

  const updateBlocks = (blocks) => {
    persist(projects.map((p) => (p.id === project.id ? { ...p, blocks } : p)));
  };

  if (editing) {
    return (
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "56px 24px 100px" }}>
        <BackLink to={`/proyectos/${project.id}`} children="Cancelar edición" />
        <ProjectForm initial={project} onSave={saveProject} onCancel={() => setEditing(false)} />
      </section>
    );
  }

  return (
    <section style={{ maxWidth: "820px", margin: "0 auto", padding: "56px 24px 100px" }}>
      <BackLink to="/proyectos" />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "6px" }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", margin: 0 }}>
          {project.name}
        </h1>
        {isAdmin && (
          <button onClick={() => setEditing(true)} style={{ ...solidBtn }}>
            <Pencil size={13} /> Editar datos
          </button>
        )}
      </div>
      <p style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--muted)", fontSize: "13px", marginBottom: "28px" }}>
        {project.year}
      </p>

      <p style={{ color: "var(--text)", lineHeight: 1.75, fontSize: "16px", marginBottom: "28px" }}>
        {project.longDesc || project.desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
        {project.tech.map((t) => <Chip key={t}>{t}</Chip>)}
      </div>

      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "var(--accent)", margin: 0 }}>
            // galería
          </p>
          <button onClick={() => setEditingGallery(!editingGallery)} style={editingGallery ? solidBtn : ghostBtn}>
            {editingGallery ? <><Check size={13} /> Listo</> : <><Pencil size={13} /> Editar galería</>}
          </button>
        </div>
      )}

      {isAdmin && editingGallery ? (
        <AdminBlockGallery blocks={project.blocks || []} onChange={updateBlocks} />
      ) : (
        <BlockGallery blocks={project.blocks || []} />
      )}

      {project.highlights && project.highlights.length > 0 && (
        <div style={{ marginBottom: "36px" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "var(--accent)", marginBottom: "14px" }}>
            // detalles técnicos
          </p>
          <ul style={{ margin: 0, paddingLeft: "20px", color: "var(--muted)", fontSize: "15px", lineHeight: 1.9 }}>
            {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>
      )}

      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="cta-primary"
        style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 22px", borderRadius: "6px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px" }}
      >
        Ver repositorio <ExternalLink size={14} />
      </a>
    </section>
  );
}
