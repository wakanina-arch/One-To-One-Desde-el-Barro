import React from 'react';

export default function MenuDesplegable({ abierto, onClose, onSelectCategoria }) {
  if (!abierto) return null;

  const categorias = [
    { id: 'primero', label: 'PRIMEROS', icono: '🍖' },
    { id: 'segundo', label: 'SEGUNDOS', icono: '🥘' },
    { id: 'postres', label: 'POSTRES', icono: '🍯' },
    { id: 'otras', label: 'OTRAS', icono: '🔥' }
  ];

  return (
    <div style={styles.menu}>
      <h3 style={styles.titulo}>MENÚ PALACIO</h3>
      {categorias.map(cat => (
        <button
          key={cat.id}
          onClick={() => { 
            onSelectCategoria(cat.id); 
            onClose(); 
          }}
          style={styles.boton}
          /* --- PINTURA APLICADA AQUÍ DENTRO --- */
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 215, 0, 0.15)";
            e.currentTarget.style.paddingLeft = "1.5rem";
            e.currentTarget.style.color = "#FFD700";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.paddingLeft = "0.8rem";
            e.currentTarget.style.color = "white";
          }}
        >
          <span style={{ fontSize: "1.3rem" }}>{cat.icono}</span>
          <span style={{ fontWeight: 600 }}>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

const styles = {
  menu: {
    position: "fixed",
    top: "60px",
    left: 0,
    width: "260px",
    background: "rgba(20, 20, 20, 0.98)", // Un poco más oscuro para el Palacio
    backdropFilter: "blur(12px)",
    borderRadius: "0 0 25px 0",
    padding: "1.5rem 1rem",
    borderRight: "3px solid #FFD700",
    borderBottom: "3px solid #FFD700",
    boxShadow: "10px 0 30px rgba(0,0,0,0.5)",
    zIndex: 999,
    transition: "all 0.3s ease"
  },
  titulo: {
    color: "#FFD700",
    fontSize: "0.9rem",
    letterSpacing: "2px",
    marginBottom: "1.5rem",
    fontFamily: "'Cormorant Garamond', serif",
    borderBottom: "1px solid rgba(255,215,0,0.3)",
    paddingBottom: "0.5rem",
    textAlign: "center"
  },
  boton: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    width: "100%",
    padding: "0.8rem",
    marginBottom: "0.5rem",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease", // Suaviza el movimiento
    fontFamily: "'Cormorant Garamond', serif"
  }
};

