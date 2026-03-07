import React from 'react';

export default function PerfilDesplegable({ abierto, onClose, usuario, onEditar, onLogout }) {
  if (!abierto) return null;

  return (
    <div style={styles.container} onClick={onClose}>
      <div style={styles.perfil} onClick={e => e.stopPropagation()}>
        <div style={styles.avatar}>
          {usuario?.nombre?.charAt(0) || '👤'}
        </div>
        <h4 style={styles.nombre}>{usuario?.nombre || 'Invitado'}</h4>
        <p style={styles.email}>{usuario?.email || 'Sin sesión'}</p>
        <button onClick={onEditar} style={styles.boton}>⚙️ Editar perfil</button>
        <button onClick={onLogout} style={styles.boton}>🚪 Cerrar sesión</button>
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
    zIndex: 98
  },
  perfil: {
    position: "fixed",
    top: "60px",
    right: "10px",
    width: "250px",
    background: "rgba(30,30,30,0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "1rem",
    border: "3px solid #FFD700",
    zIndex: 99,
    textAlign: "center"
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#FF4500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    fontSize: "1.5rem",
    color: "#FFD700"
  },
  nombre: {
    color: "#FFD700",
    margin: "0.5rem 0 0",
    fontFamily: "'Cormorant Garamond', serif"
  },
  email: {
    color: "#ccc",
    fontSize: "0.8rem"
  },
  boton: {
    width: "100%",
    padding: "0.8rem",
    marginBottom: "0.5rem",
    background: "transparent",
    border: "1px solid #FFD700",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer"
  }
};