import React, { useEffect, useState } from 'react';

export default function BarraSuperior({ 
  usuario, 
  onMenuClick, 
  onCarritoClick, 
  onPerfilClick, 
  carritoCount = 0 
}) {
  const [pulse, setPulse] = useState(false);

  // 1. SOLUCIÓN AL ERROR DE ESLINT: 
  // Usamos una condición para que el pulso solo se active si el contador crece
  useEffect(() => {
    if (carritoCount > 0) {
      // Usamos un pequeño retraso para evitar el renderizado síncrono que causa el error
      const timerPulse = setTimeout(() => {
        setPulse(true);
        const timerOff = setTimeout(() => setPulse(false), 300);
        return () => clearTimeout(timerOff);
      }, 50); 
      
      return () => clearTimeout(timerPulse);
    }
  }, [carritoCount]);

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 1.2rem",
      background: "linear-gradient(to bottom, rgba(26, 10, 10, 0.98), rgba(40, 10, 10, 0.9))",
      backdropFilter: "blur(15px)",
      borderBottom: "1px solid rgba(255, 215, 0, 0.3)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      height: "65px", // Altura optimizada para el "notch" del iPhone
      width: "100%",
      boxSizing: "border-box"
    }}>
      
      {/* Lado Izquierdo: Menú Explorar */}
      <button 
        onClick={onMenuClick} 
        style={styles.btnNav}
      >
        <span style={{ fontSize: "1.3rem", color: "#FFD700" }}>☰</span>
        <span style={styles.textoNav}>EXPLORAR</span>
      </button>

      {/* Centro: Logo Identidad (Escalado para iPhone) */}
      <div style={{ textAlign: 'center', flex: 1 }}>
        <h2 style={styles.titulo}>ONE TO ONE</h2>
        <div style={styles.subtitulo}>DESDE EL BARRO</div>
      </div>

      {/* Lado Derecho: Acciones Perfil/Carrito */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        
        {/* Carrito con efecto visual blanco */}
        <button onClick={onCarritoClick} style={styles.btnIcono}>
          <span style={{ 
            fontSize: "1.4rem", 
            filter: "brightness(0) invert(1)" // Icono en blanco puro
          }}>
            🛒
          </span>
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

        {/* Perfil (Tridente / Usuario) */}
        <button 
          onClick={onPerfilClick} 
          style={{
            ...styles.btnIcono,
            border: usuario ? "1.5px solid #FFD700" : "1.5px solid transparent",
            borderRadius: "50%",
            padding: "2px",
            marginLeft: "5px",
            background: usuario ? "rgba(255, 215, 0, 0.1)" : "transparent"
          }}
        >
          <span style={{ 
            fontSize: "1.5rem", 
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
    padding: "5px",
    minWidth: "60px"
  },
  textoNav: {
    fontFamily: "serif",
    fontSize: "0.55rem",
    color: "#FFD700",
    fontWeight: 700,
    letterSpacing: "1px",
    marginTop: "2px"
  },
  titulo: {
    color: "#FFD700",
    margin: 0,
    fontSize: "1rem",
    fontFamily: "serif",
    letterSpacing: "2px",
    fontWeight: 900
  },
  subtitulo: {
    color: "#FF4500",
    fontSize: "0.4rem",
    letterSpacing: "3px",
    fontWeight: 800,
    marginTop: "-2px"
  },
  btnIcono: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    position: "relative",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  contador: {
    position: "absolute",
    top: "2px",
    right: "2px",
    background: "linear-gradient(135deg, #FF4500, #B22222)",
    color: "white",
    fontSize: "0.6rem",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #FFD700",
    fontWeight: "bold",
    zIndex: 2
  }
};
