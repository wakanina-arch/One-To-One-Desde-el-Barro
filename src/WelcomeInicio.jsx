import React, { useState } from 'react';
import RegisterModal from './components/RegisterModal';

// 1. Constante fuera del componente para evitar recrearla en cada render y errores de dependencia
const FRASES_ORACULO = [
  "El fuego no solo cocina, también transforma el alma.",
  "Mira el humo ascender y suelta lo que ya no te pertenece.",
  "La paciencia es el ingrediente que el tiempo no puede comprar.",
  "Como el barro en el torno, tu destino se moldea con tus manos.",
  "Busca el silencio en el caos, y el sabor en lo sencillo.",
  "La energía que das es el banquete que recibirás.",
  "Eres una chispa divina en un mundo de brasas.",
  "El hambre del cuerpo se sacia, el hambre del espíritu se cultiva.",
  "Nada es permanente, excepto el cambio y el aroma del recuerdo.",
  "Escucha el crujir de la leña; es el universo susurrándote."
];

export default function WelcomeInicio({ onSelectCategory, usuario }) {
  const [showRegister, setShowRegister] = useState(false);
  
  // 2. Estado inicial con función: Se ejecuta UNA SOLA VEZ al montar. 
  // Esto elimina el error "react-hooks/set-state-in-effect"
  const [fraseDelDia] = useState(() => {
    const randomIndex = Math.floor(Math.random() * FRASES_ORACULO.length);
    return FRASES_ORACULO[randomIndex];
  });

  return (
    <div style={styles.container}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes girarMoneda { 
          0% { transform: rotateY(0deg); } 
          100% { transform: rotateY(360deg); } 
        }
        .moneda-container { 
          width: 70px; height: 70px; cursor: pointer; 
          perspective: 1000px; margin: 0 auto 0.5rem;
        }
        .moneda-giratoria { 
          width: 100%; height: 100%; position: relative; 
          transform-style: preserve-3d; 
          animation: girarMoneda 8s linear infinite;
        }
        .cara-moneda { 
          position: absolute; width: 100%; height: 100%; 
          border-radius: 50%; display: flex; align-items: center; 
          justify-content: center; backface-visibility: hidden; 
          border: 3px solid #FFD700; 
        }
        .cara-frontal { background: linear-gradient(145deg, #FF4500, #B22222); color: white; font-size: 1.8rem; }
        .cara-trasera { background: #FFD700; color: #8B0000; font-size: 1.6rem; font-weight: bold; transform: rotateY(180deg); }
      `}} />

      <div style={styles.card}>
        <div className="moneda-container" onClick={() => setShowRegister(true)}>
          <div className="moneda-giratoria">
            <div className="cara-moneda cara-frontal">🔱</div>
            <div className="cara-moneda cara-trasera">
              {usuario ? usuario.nombre?.charAt(0).toUpperCase() : '?'}
            </div>
          </div>
        </div>

        <h1 style={styles.titulo}>ONE TO ONE</h1>
        
        <div style={styles.fraseContenedor}>
          <p style={styles.fraseTexto}>"{fraseDelDia}"</p>
        </div>

        <div style={styles.gridCategorias}>
          {[
            {id:'primero', l:'PRIMEROS', i:'🍖'}, {id:'segundo', l:'SEGUNDOS', i:'🥘'}, 
            {id:'postres', l:'POSTRES', i:'🍯'}, {id:'otras', l:'OTROS', i:'🔥'}
          ].map(cat => (
            <button key={cat.id} onClick={() => onSelectCategory(cat.id, fraseDelDia)} style={styles.btnCat}>
              <span style={{fontSize: "1.4rem"}}>{cat.i}</span>
              <span style={{fontSize: "0.75rem", marginTop: "4px"}}>{cat.l}</span>
            </button>
          ))}
        </div>

        <p style={styles.footer}>— DESDE EL BARRO —</p>
      </div>

      <RegisterModal 
        open={showRegister} 
        onClose={() => setShowRegister(false)} 
        onRegister={(u) => { 
          localStorage.setItem('oneToOneUser', JSON.stringify(u)); 
          window.location.reload(); 
        }} 
      />
    </div>
  );
}

const styles = {
  container: { 
    height: "100dvh",
    width: "100vw",
    background: "radial-gradient(circle at center, #3d0a0a 0%, #1a0a0a 100%)", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    overflow: "hidden",
    position: "fixed",
    top: 0,
    left: 0
  },
  card: { 
    padding: "1rem", 
    borderRadius: "28px", 
    width: "82%",
    maxWidth: "340px",
    height: "auto",
    maxHeight: "82vh", // Un poco más pequeña para asegurar que se vea el "tapiz"
    textAlign: "center", 
    background: "rgba(255,255,255,0.04)", 
    backdropFilter: "blur(15px)", 
    border: "1px solid rgba(255,215,0,0.15)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  titulo: { 
    color: "#fff", 
    fontSize: "1.5rem", 
    margin: "0.3rem 0", 
    fontFamily: "serif", 
    letterSpacing: '3px',
    textTransform: "uppercase"
  },
  fraseContenedor: { 
    flex: 1, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    margin: "0.4rem 0",
    padding: "0 10px",
    minHeight: "60px"
  },
  fraseTexto: { 
    color: "#FFD700", 
    fontSize: "0.8rem", 
    fontStyle: "italic", 
    lineHeight: "1.4",
    margin: 0
  },
  gridCategorias: { 
    display: "grid", 
    gridTemplateColumns: "repeat(2, 1fr)", 
    gap: "0.6rem",
    marginTop: "0.4rem"
  },
  btnCat: { 
    padding: "0.6rem 0.2rem", 
    background: "rgba(0,0,0,0.5)", 
    color: "white", 
    border: "1px solid rgba(255,215,0,0.25)", 
    borderRadius: "18px", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center",
    gap: "2px"
  },
  footer: { 
    marginTop: "0.8rem", 
    fontSize: "0.6rem", 
    color: "#FFD700", 
    letterSpacing: "4px", 
    opacity: 0.4 
  }
};
