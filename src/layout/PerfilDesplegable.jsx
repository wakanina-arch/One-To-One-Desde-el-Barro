import React from 'react';

export default function PerfilDesplegable({ abierto, onClose, usuario, onEditar, onLogout }) {
  if (!abierto) return null;

  return (
    <div style={styles.container} onClick={onClose}>
      <div style={styles.perfilCard} onClick={e => e.stopPropagation()}>
        {/* Avatar con inicial */}
        <div style={styles.avatarMarco}>
          <div style={styles.avatar}>
            {usuario?.nombre?.charAt(0)?.toUpperCase() || '?'}
          </div>
        </div>
        
        {/* SOLO nombre y email - SIN información detallada */}
        <h4 style={styles.nombre}>{usuario?.nombre || 'Invitado'}</h4>
        <p style={styles.email}>{usuario?.email || 'Sin sesión'}</p>
        
        {/* Botones de acción */}
        <button onClick={onEditar} style={styles.boton}>
          <span style={styles.iconoBoton}>⚙️</span> Editar perfil
        </button>
        
        <button onClick={onLogout} style={styles.boton}>
          <span style={styles.iconoBoton}>🚪</span> Cerrar sesión
        </button>
        
        {/* Línea decorativa */}
        <div style={styles.respiro} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    background: "rgba(0,0,0,0.3)",
    backdropFilter: "blur(2px)"
  },
  perfilCard: {
    position: "fixed",
    top: "70px",
    right: "15px",
    width: "260px",  // ← Reducido porque ya no necesita tanto espacio
    background: "rgba(20, 15, 15, 0.98)",
    backdropFilter: "blur(15px)",
    borderRadius: "30px 10px 30px 10px",
    padding: "1.5rem 1rem",
    border: "2px solid rgba(255, 215, 0, 0.4)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
    zIndex: 1001,
    textAlign: "center",
    animation: "deslizarPerfil 0.3s ease"
  },
  avatarMarco: {
    width: "80px",
    height: "80px",
    margin: "0 auto 10px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #FFD700, #FF4500)",
    padding: "3px",
    boxShadow: "0 0 15px rgba(255,215,0,0.5)"
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "#1a0a0a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    color: "#FFD700",
    fontWeight: "bold",
    border: "2px solid #8B0000"
  },
  nombre: {
    color: "#FFD700",
    margin: "0.5rem 0 0",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.3rem",
    fontWeight: "600",
    letterSpacing: "1px"
  },
  email: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "0.8rem",
    marginBottom: "1.5rem",
    fontStyle: "italic",
    borderBottom: "1px solid rgba(255,215,0,0.2)",
    paddingBottom: "0.8rem"
  },
  boton: {
    width: "100%",
    padding: "0.8rem",
    marginBottom: "0.5rem",
    background: "rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,215,0,0.3)",
    borderRadius: "15px",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s ease",
    fontSize: "0.9rem",
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: "500"
  },
  iconoBoton: {
    fontSize: "1.1rem",
    filter: "drop-shadow(0 0 3px #FFD700)"
  },
  respiro: {
    height: "5px",
    width: "50px",
    margin: "10px auto 0",
    background: "linear-gradient(90deg, transparent, #FFD700, transparent)",
    opacity: 0.3
  }
};