import React, { useState, useEffect } from 'react';
import RegisterModal from './components/RegisterModal';

export default function WelcomeInicio({ onSelectCategory, usuario }) {
  const [showRegister, setShowRegister] = useState(false);
  const [fraseDelDia, setFraseDelDia] = useState("");

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

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * FRASES_ORACULO.length);
    setFraseDelDia(FRASES_ORACULO[randomIndex]);
  }, []);

  return (
    <div style={styles.container}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes girarMoneda { 
          0% { transform: rotateY(0deg); } 
          100% { transform: rotateY(360deg); } 
        }
        .moneda-container { 
          width: 70px; height: 70px; cursor: pointer; 
          perspective: 1000px; margin: 0 auto 1rem;
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
        .cara-frontal { background: linear-gradient(145deg, #FF4500, #B22222); color: white; font-size: 2rem; }
        .cara-trasera { background: #FFD700; color: #8B0000; font-size: 1.8rem; font-weight: bold; transform: rotateY(180deg); }
      `}} />

      <div style={styles.card}>
        <div className="moneda-container" onClick={() => setShowRegister(true)}>
          <div className="moneda-giratoria">
            <div className="cara-moneda cara-frontal">🔱</div>
            <div className="cara-moneda cara-trasera">{usuario ? usuario.nombre?.charAt(0).toUpperCase() : '?'}</div>
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
    height: "100dvh", // Altura dinámica real de la pantalla del iPhone
    width: "100vw",
    background: "radial-gradient(circle at center, #3d0a0a 0%, #1a0a0a 100%)", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    overflow: "hidden", // Prohíbe el scroll por completo
    position: "fixed",  // Fija la pantalla para que no se mueva al tocar
    top: 0,
    left: 0
  },
  card: { 
    padding: "1.2rem", 
    borderRadius: "28px", 
    width: "85%",      // Deja un 15% de espacio para ver el "tapiz" (fondo)
    maxWidth: "360px", // Ancho máximo tipo iPhone
    height: "auto",
    maxHeight: "85vh", // Asegura que la tarjeta nunca sea más alta que la pantalla
    textAlign: "center", 
    background: "rgba(255,255,255,0.04)", 
    backdropFilter: "blur(15px)", 
    border: "1px solid rgba(255,215,0,0.15)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between" // Distribuye el contenido internamente
  },
  titulo: { 
    color: "#fff", 
    fontSize: "1.6rem", 
    margin: "0.5rem 0", 
    fontFamily: "serif", 
    letterSpacing: '3px',
    textTransform: "uppercase"
  },
  fraseContenedor: { 
    flex: 1, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    margin: "0.5rem 0",
    padding: "0 10px"
  },
  fraseTexto: { 
    color: "#FFD700", 
    fontSize: "0.85rem", 
    fontStyle: "italic", 
    lineHeight: "1.4",
    margin: 0
  },
  gridCategorias: { 
    display: "grid", 
    gridTemplateColumns: "repeat(2, 1fr)", 
    gap: "0.7rem",
    marginTop: "0.5rem"
  },
  btnCat: { 
    padding: "0.7rem 0.2rem", 
    background: "rgba(0,0,0,0.5)", 
    color: "white", 
    border: "1px solid rgba(255,215,0,0.25)", 
    borderRadius: "18px", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center",
    gap: "4px"
  },
  footer: { 
    marginTop: "1rem", 
    fontSize: "0.65rem", 
    color: "#FFD700", 
    letterSpacing: "4px", 
    opacity: 0.4 
  }
};

