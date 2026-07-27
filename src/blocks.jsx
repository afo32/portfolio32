import React, { useState, useRef } from "react";
import { Plus, X, Check, GripVertical, Maximize2, Trash2, Image as ImageIcon, Video as VideoIcon, Type } from "lucide-react";
import { inputStyle, solidBtn, ghostBtn } from "./components.jsx";

const SIZE_SPAN = {
  small: { gridColumn: "span 1", gridRow: "span 2" },
  tall: { gridColumn: "span 1", gridRow: "span 3" },
  wide: { gridColumn: "span 2", gridRow: "span 2" },
  large: { gridColumn: "span 2", gridRow: "span 3" },
};
const SIZE_ORDER = ["small", "tall", "wide", "large"];

function getYouTubeId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}
function getVimeoId(url) {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? m[1] : null;
}
function isDirectVideo(url) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

export function MediaEmbed({ url, alt }) {
  const [broken, setBroken] = useState(false);
  const ytId = getYouTubeId(url || "");
  const vimeoId = getVimeoId(url || "");

  if (!url) return null;

  if (ytId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${ytId}`}
        title={alt || "video"}
        style={{ width: "100%", height: "100%", border: "none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (vimeoId) {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}`}
        title={alt || "video"}
        style={{ width: "100%", height: "100%", border: "none" }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (isDirectVideo(url)) {
    return (
      <video src={url} controls style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    );
  }
  if (broken) {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px", color: "#E1615A", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", padding: "10px", textAlign: "center" }}>
        <ImageIcon size={18} />
        No se pudo cargar esta imagen
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={alt || ""}
      onError={() => setBroken(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

function BlockCard({ block, children, size }) {
  return (
    <div
      style={{
        ...SIZE_SPAN[size || "small"],
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        background: "var(--surface)",
        border: "1px solid var(--line)",
      }}
    >
      {children}
    </div>
  );
}

export function BlockGallery({ blocks }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridAutoRows: "80px",
        gap: "14px",
        marginBottom: "36px",
      }}
      className="block-gallery"
    >
      {blocks.map((b) => (
        <BlockCard key={b.id} size={b.size}>
          {b.type === "text" ? (
            <div style={{ padding: "18px", height: "100%", display: "flex", alignItems: "center" }}>
              <p style={{ color: "var(--text)", fontStyle: "italic", lineHeight: 1.6, fontSize: "14.5px", margin: 0 }}>{b.content}</p>
            </div>
          ) : (
            <MediaEmbed url={b.content} alt="" />
          )}
        </BlockCard>
      ))}
    </div>
  );
}

const iconBtn = {
  background: "rgba(12,13,16,0.75)",
  border: "1px solid var(--line)",
  color: "var(--text)",
  borderRadius: "5px",
  width: "26px",
  height: "26px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

function AddBlockForm({ onAdd, onCancel }) {
  const [type, setType] = useState("image");
  const [content, setContent] = useState("");
  const [size, setSize] = useState("small");

  return (
    <div style={{ border: "1px dashed var(--accent)", borderRadius: "12px", padding: "18px", background: "var(--surface)", display: "grid", gap: "12px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        {[
          { v: "image", label: "Imagen", Icon: ImageIcon },
          { v: "video", label: "Video", Icon: VideoIcon },
          { v: "text", label: "Texto", Icon: Type },
        ].map(({ v, label, Icon }) => (
          <button
            key={v}
            onClick={() => setType(v)}
            style={{
              ...ghostBtn,
              borderColor: type === v ? "var(--accent)" : "var(--line)",
              color: type === v ? "var(--accent)" : "var(--muted)",
            }}
          >
            <Icon size={13} /> {label}
          </button>
        ))}
      </div>

      {type === "text" ? (
        <textarea
          placeholder="Texto del bloque"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      ) : (
        <input
          placeholder={type === "image" ? "URL directa de la imagen (.jpg, .png...)" : "URL de YouTube/Vimeo o .mp4 directo"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={inputStyle}
        />
      )}

      {type !== "text" && content && (
        <div style={{ height: "140px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--line)" }}>
          <MediaEmbed url={content} alt="preview" />
        </div>
      )}

      <div>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--muted)", marginBottom: "8px" }}>Tamaño</p>
        <div style={{ display: "flex", gap: "8px" }}>
          {SIZE_ORDER.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{ ...ghostBtn, borderColor: size === s ? "var(--accent)" : "var(--line)", color: size === s ? "var(--accent)" : "var(--muted)" }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button onClick={onCancel} style={ghostBtn}><X size={14} /> Cancelar</button>
        <button
          disabled={!content}
          onClick={() => content && onAdd({ id: "b" + Date.now(), type, content, size })}
          style={{ ...solidBtn, opacity: content ? 1 : 0.5, cursor: content ? "pointer" : "not-allowed" }}
        >
          <Check size={14} /> Añadir bloque
        </button>
      </div>
    </div>
  );
}

export function AdminBlockGallery({ blocks, onChange }) {
  const [adding, setAdding] = useState(false);
  const dragIndex = useRef(null);
  const [overIndex, setOverIndex] = useState(null);

  const cycleSize = (i) => {
    const next = [...blocks];
    const cur = SIZE_ORDER.indexOf(next[i].size || "small");
    next[i] = { ...next[i], size: SIZE_ORDER[(cur + 1) % SIZE_ORDER.length] };
    onChange(next);
  };

  const removeBlock = (i) => {
    onChange(blocks.filter((_, idx) => idx !== i));
  };

  const handleDrop = (i) => {
    if (dragIndex.current === null || dragIndex.current === i) {
      setOverIndex(null);
      return;
    }
    const next = [...blocks];
    const [moved] = next.splice(dragIndex.current, 1);
    next.splice(i, 0, moved);
    onChange(next);
    dragIndex.current = null;
    setOverIndex(null);
  };

  return (
    <div style={{ marginBottom: "36px" }}>
      <div
        className="block-gallery"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "80px",
          gap: "14px",
        }}
      >
        {blocks.map((b, i) => (
          <BlockCard key={b.id} size={b.size}>
            <div
              draggable
              onDragStart={() => (dragIndex.current = i)}
              onDragOver={(e) => { e.preventDefault(); setOverIndex(i); }}
              onDrop={() => handleDrop(i)}
              style={{
                position: "absolute", inset: 0, zIndex: 2, cursor: "grab",
                outline: overIndex === i ? "2px solid var(--accent)" : "none",
                outlineOffset: "-2px",
              }}
            >
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {b.type === "text" ? (
                  <div style={{ padding: "18px", height: "100%", display: "flex", alignItems: "center" }}>
                    <p style={{ color: "var(--text)", fontStyle: "italic", lineHeight: 1.6, fontSize: "14.5px", margin: 0 }}>{b.content}</p>
                  </div>
                ) : (
                  <MediaEmbed url={b.content} alt="" />
                )}
              </div>
            </div>
            <div style={{ position: "absolute", top: "8px", right: "8px", zIndex: 3, display: "flex", gap: "6px" }}>
              <button title="Arrastra para mover · click para cambiar tamaño" onClick={() => cycleSize(i)} style={iconBtn}><Maximize2 size={13} /></button>
              <button onClick={() => removeBlock(i)} style={{ ...iconBtn, color: "#E1615A" }}><Trash2 size={13} /></button>
            </div>
            <div style={{ position: "absolute", bottom: "8px", left: "8px", zIndex: 3 }}>
              <div style={iconBtn}><GripVertical size={13} /></div>
            </div>
          </BlockCard>
        ))}

        {!adding && (
          <button
            onClick={() => setAdding(true)}
            style={{
              gridColumn: "span 1", gridRow: "span 2",
              border: "1px dashed var(--line)", borderRadius: "12px", background: "transparent",
              color: "var(--muted)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px",
              cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px",
            }}
          >
            <Plus size={18} /> Añadir bloque
          </button>
        )}
      </div>

      {adding && (
        <div style={{ marginTop: "14px" }}>
          <AddBlockForm
            onAdd={(block) => { onChange([...blocks, block]); setAdding(false); }}
            onCancel={() => setAdding(false)}
          />
        </div>
      )}
    </div>
  );
}
