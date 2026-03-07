import React, { useEffect, useState } from 'react';

export default function BarraSuperior({ 
  usuario, 
  onMenuClick, 
  onCarritoClick, 
  onPerfilClick, 
  carritoCount = 0 
}) {
  const [pulse, setPulse] = useState(false);

  // Efecto de pulso cuando cambia el carrito (Dinamismo inconsciente)
  useEffect(() => {
    if (carritoCount > 0) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 300);
      return () => clearTimeout(timer);
    }
  }, [carritoCount]);

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.5rem 1.2rem",
      background: "linear-gradient(to bottom, rgba(26, 10, 10, 0.95), rgba(61, 10, 10, 0.8))",
      backdropFilter: "blur(15px)",
      borderBottom: "1px solid rgba(255, 215, 0, 0.4)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      height: "60px"
    }}>
      {/* Lado Izquierdo: Menú */}
      <button 
        onClick={onMenuClick} 
        style={styles.btnNav}
      >
        <span style={{ fontSize: "1.4rem", color: "#FFD700" }}>☰</span>
        <span style={styles.textoNav}>EXPLORAR</span>
      </button>

      {/* Centro: Logo Identidad */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={styles.titulo}>ONE TO ONE</h2>
        <div style={styles.subtitulo}>DESDE EL BARRO</div>
      </div>

      {/* Lado Derecho: Acciones Perfil/Carrito */}
      <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
        
        {/* Carrito con contador dinámico */}
        <button onClick={onCarritoClick} style={styles.btnIcono}>
          <span style={{ fontSize: "1.5rem" }}>🛒</span>
          {carritoCount > 0 && (
            <span style={{
              ...styles.contador,
              transform: pulse ? "scale(1.3)" : "scale(1)",
              transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}>
              {carritoCount}
            </span>
          )}
        </button>

        {/* El Tridente: Representación del Usuario/Ego */}
        <button 
          onClick={onPerfilClick} 
          style={{
            ...styles.btnIcono,
            border: usuario ? "1.5px solid #FFD700" : "1.5px solid transparent",
            borderRadius: "50%",
            padding: "4px",
            background: usuario ? "rgba(255, 215, 0, 0.1)" : "transparent"
          }}
        >
          <span style={{ 
            fontSize: "1.6rem", 
            filter: usuario ? "drop-shadow(0 0 5px #FFD700)" : "none" 
          }}>
            {usuario ? '🔱' : '⚜️'}
          </span>
        </button>
      </div>
    </nav>
  );
}

const styles = {
  btnNav: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
    padding: "5px"
  },
  textoNav: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "0.6rem",
    color: "#FFD700",
    fontWeight: 700,
    letterSpacing: "1px"
  },
  titulo: {
    color: "#FFD700",
    margin: 0,
    fontSize: "1.1rem",
    fontFamily: "'Cormorant Garamond', serif",
    letterSpacing: "2px",
    fontWeight: 800
  },
  subtitulo: {
    color: "#FF4500",
    fontSize: "0.45rem",
    letterSpacing: "2px",
    fontWeight: 700
  },
  btnIcono: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    position: "relative",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  contador: {
    position: "absolute",
    top: "0px",
    right: "0px",
    background: "linear-gradient(135deg, #FF4500, #B22222)",
    color: "white",
    fontSize: "0.65rem",
    minWidth: "18px",
    height: "18px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #FFD700",
    fontWeight: "bold"
  }
};
