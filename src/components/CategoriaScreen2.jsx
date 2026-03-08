import React, { useState } from "react";
import BarraSuperior from "../layout/BarraSuperior"; 
import Nutricion from "./Nutricion"; 

export default function CategoriaScreen2({ categoria, onAgregar, onCarritoClick, carritoCount, onBack, usuario }) {
  const platos = categoria?.platos || [];
  const [platoEnFoco, setPlatoEnFoco] = useState(platos[0] || null);

  return (
    <div style={styles.salonContainer}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes proyeccionEntrante {
          from { opacity: 0; filter: brightness(0) blur(10px); transform: scale(1.05); }
          to { opacity: 1; filter: brightness(1) blur(0); transform: scale(1); }
        }
        .img-proyeccion { width: 100%; height: 100%; object-fit: cover; animation: proyeccionEntrante 0.5s ease-out; }
        /* Scrollbar invisible para look de App */
        .scroll-hidden::-webkit-scrollbar { display: none; }
      `}} />

      <BarraSuperior usuario={usuario} onCarritoClick={onCarritoClick} carritoCount={carritoCount} onMenuClick={onBack} />

      <div style={styles.contenido}>
        
        {/* 1. VISOR ÓPTICO (Reducido para iPhone 16) */}
        <div style={styles.visorCard}>
          <div style={styles.marcoImagen}>
            {platoEnFoco && (
              <img 
                key={platoEnFoco.id} 
                src={platoEnFoco.imagen} // Asegúrate que en database las rutas empiecen con /img/...
                alt={platoEnFoco.nombre}
                className="img-proyeccion"
                onError={(e) => { e.target.src = "https://via.placeholder.com..."; }}
              />
            )}
          </div>

          <div style={styles.detallePlato}>
            <h3 style={styles.nombrePlato}>{platoEnFoco?.nombre?.toUpperCase()}</h3>
            <div style={styles.nutricionSlim}>
              <Nutricion 
                calorias={platoEnFoco?.kcal || 0} 
                proteinas={platoEnFoco?.prot || 0} 
                carbohidratos={platoEnFoco?.carb || 0} 
              />
            </div>
          </div>
        </div>

        {/* 2. LISTA DE PLATOS (Compacta para evitar scroll total) */}
        <div style={styles.listaOpciones}>
          <div className="scroll-hidden" style={styles.scrollOpciones}>
            {platos.map((plato) => (
              <div 
                key={plato.id} 
                onClick={() => setPlatoEnFoco(plato)}
                style={{ 
                  ...styles.platoOption,
                  borderColor: platoEnFoco?.id === plato.id ? "#FFD700" : "rgba(255,255,255,0.1)",
                  background: platoEnFoco?.id === plato.id ? "rgba(255, 215, 0, 0.15)" : "rgba(255,255,255,0.05)"
                }}
              >
                <div style={styles.textoPlato}>
                  <span style={{fontWeight: platoEnFoco?.id === plato.id ? '700' : '400'}}>{plato.nombre}</span>
                  <span style={{color: '#FFD700'}}>${plato.precio.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. ACCIÓN FINAL */}
        <div style={styles.footerAccion}>
          <button 
            onClick={() => onAgregar(platoEnFoco)} 
            style={styles.btnAgregar}
          >
            AÑADIR • ${platoEnFoco?.precio.toFixed(2)}
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  salonContainer: { 
    height: "100%", 
    background: "#1a0a0a", 
    color: "white", 
    fontFamily: "serif",
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden' 
  },
  contenido: { 
    flex: 1,
    padding: "15px", 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  visorCard: { 
    background: "#fff", 
    borderRadius: "20px", 
    overflow: "hidden", 
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    flexShrink: 0 
  },
  marcoImagen: { width: "100%", height: "180px", background: "#000", position: 'relative' },
  detallePlato: { padding: "10px", textAlign: 'center' },
  nombrePlato: { color: "#3d0a0a", fontSize: "1.1rem", margin: "0 0 5px 0", fontWeight: '800' },
  nutricionSlim: { transform: 'scale(0.8)', margin: '-5px 0' },
  
  listaOpciones: { flex: 1, marginTop: "15px", overflow: 'hidden' },
  scrollOpciones: { 
    height: "100%", 
    overflowY: "auto", 
    paddingRight: "5px",
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  platoOption: { 
    display: "flex", 
    alignItems: "center", 
    padding: "12px", 
    borderRadius: "15px", 
    border: "1px solid", 
    transition: "0.2s",
    cursor: 'pointer'
  },
  textoPlato: { flex: 1, display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' },
  
  footerAccion: { padding: "10px 0", flexShrink: 0 },
  btnAgregar: { 
    width: "100%", 
    padding: "14px", 
    background: "linear-gradient(135deg, #FF4500, #B22222)", 
    color: "white", 
    border: "none", 
    borderRadius: "16px", 
    fontWeight: "800", 
    fontSize: '1rem',
    boxShadow: '0 4px 15px rgba(255, 69, 0, 0.3)'
  }
};
