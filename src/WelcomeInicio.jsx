import React, { useState, useEffect } from 'react';
import RegisterModal from './components/RegisterModal';

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
  const [fraseDelDia, setFraseDelDia] = useState("");

  useEffect(() => {
    // Lógica de "Galleta de la Suerte": Una frase aleatoria cada vez que carga
    const randomIndex = Math.floor(Math.random() * FRASES_ORACULO.length);
    setFraseDelDia(FRASES_ORACULO[randomIndex]);
  }, []);

  return (
    <div style={styles.container}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com');
        
        @keyframes girarMoneda { 
          0% { transform: rotateY(0deg); } 
          100% { transform: rotateY(360deg); } 
        }
        
        .moneda-container { 
          width: 85px; height: 85px; cursor: pointer; 
          perspective: 1000px; margin: 0 auto 1.5rem;
          /* Quitamos flotarMoneda para eliminar el tembleque */
        }
        .moneda-giratoria { 
          width: 100%; height: 100%; position: relative; 
          transform-style: preserve-3d; 
          animation: girarMoneda 10s linear infinite; /* Giro constante y elegante */
        }
        .cara-moneda { 
          position: absolute; width: 100%; height: 100%; 
          border-radius: 50%; display: flex; align-items: center; 
          justify-content: center; backface-visibility: hidden; 
          border: 4px solid #FFD700; 
        }
        .cara-frontal { background: linear-gradient(145deg, #FF4500, #B22222); color: white; font-size: 2.5rem; }
        .cara-trasera { background: #FFD700; color: #8B0000; font-size: 2rem; font-weight: bold; transform: rotateY(180deg); }
      `}} />

      <div className="textura-barro" style={styles.card}>
        
        {/* Moneda: Solo giro, sin temblor */}
        <div className="moneda-container" onClick={() => setShowRegister(true)}>
          <div className="moneda-giratoria">
            <div className="cara-moneda cara-frontal">🔱</div>
            <div className="cara-moneda cara-trasera">{usuario ? usuario.nombre?.charAt(0).toUpperCase() : '?'}</div>
          </div>
        </div>

        <h1 style={styles.titulo}>ONE TO ONE</h1>
        
        {/* La Galleta de la Suerte (Frase Estática pero Aleatoria) */}
        <div style={styles.fraseContenedor}>
          <p style={styles.fraseTexto}>"{fraseDelDia}"</p>
        </div>

        <div style={styles.gridCategorias}>
          {[
            {id:'primero', l:'PRIMEROS', i:'🍖'}, {id:'segundo', l:'SEGUNDOS', i:'🥘'}, 
            {id:'postres', l:'POSTRES', i:'🍯'}, {id:'otras', l:'OTROS', i:'🔥'}
          ].map(cat => (
            <button key={cat.id} onClick={() => onSelectCategory(cat.id, fraseDelDia)} style={styles.btnCat}>
              <span style={{fontSize: "1.8rem"}}>{cat.i}</span>
              <span>{cat.l}</span>
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
          window.location.reload(); // Recargamos para que el "Ego" se actualice
        }} 
      />
    </div>
  );
}

const styles = {
  container: { height: "100dvh", background: "radial-gradient(circle at center, #3d0a0a 0%, #1a0a0a 100%)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  card: { padding: "2.5rem 1.5rem", borderRadius: "40px", maxWidth: "340px", width: "90%", textAlign: "center", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(15px)", border: "1px solid rgba(255,215,0,0.2)" },
  titulo: { color: "#fff", fontSize: "2.4rem", margin: "0 0 1rem 0", fontFamily: "'Cormorant Garamond', serif", letterSpacing: '2px' },
  fraseContenedor: { minHeight: "60px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" },
  fraseTexto: { fontFamily: "'Cormorant Garamond', serif", color: "#FFD700", fontSize: "1.1rem", letterSpacing: "0.5px", fontStyle: "italic", opacity: 0.9,lineHeight: "1.4",
  textShadow: "0 2px 4px rgba(0,0,0,0.3)" // Profundidad para el "Ego"
 },
  gridCategorias: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" },
  btnCat: { padding: "1rem 0.5rem", background: "rgba(0,0,0,0.3)", color: "white", border: "1px solid rgba(255,215,0,0.4)", borderRadius: "20px", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "0.85rem", display: "flex", flexDirection: "column", alignItems: "center" },
  footer: { marginTop: "2rem", fontSize: "0.8rem", color: "#FFD700", letterSpacing: "3px", opacity: 0.6 }
};
