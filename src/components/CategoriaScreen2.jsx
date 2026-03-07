import React, { useState } from "react";
import BarraSuperior from "../layout/BarraSuperior"; 
import Nutricion from "./Nutricion"; 

export default function CategoriaScreen2({ categoria, onAgregar, onCarritoClick, carritoCount, onBack, usuario }) {
  const platos = categoria?.platos || [];
  
  // ESTADO: El Plato en foco (único estado necesario aquí)
  const [platoEnFoco, setPlatoEnFoco] = useState(platos[0] || null);

  return (
    <div style={styles.salonContainer}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes proyeccionEntrante {
          from { opacity: 0; filter: brightness(0) blur(15px); transform: scale(1.1); }
          to { opacity: 1; filter: brightness(1) blur(0); transform: scale(1); }
        }
        .img-proyeccion { animation: proyeccionEntrante 0.7s cubic-bezier(0.2, 1, 0.3, 1); width: 100%; height: 100%; object-fit: cover; }
      `}} />

      <BarraSuperior usuario={usuario} onCarritoClick={onCarritoClick} carritoCount={carritoCount} onMenuClick={onBack} />

      <div style={styles.contenido}>
        
        {/* 1. VISOR ÓPTICO (El Trono) */}
        <div style={styles.visorCard}>
          <div style={styles.marcoImagen}>
            <div style={styles.hazDeLuz} />
            <img 
              key={platoEnFoco?.id} 
              src={platoEnFoco?.imagen} 
              alt={platoEnFoco?.nombre}
              className="img-proyeccion"
              onError={(e) => { e.target.src = "https://via.placeholder.com..."; }}
            />
            <div style={styles.overlayImagen} />
          </div>

          <div style={styles.detallePlato}>
            <h3 style={styles.nombrePlato}>{platoEnFoco?.nombre?.toUpperCase()}</h3>
            <p style={styles.fraseMistica}>"el fuego sagrado en cada bocado"</p>
            
            <div style={styles.nutricionSlim}>
              <Nutricion 
                calorias={platoEnFoco?.kcal || 0} 
                proteinas={platoEnFoco?.prot || 0} 
                carbohidratos={platoEnFoco?.carb || 0} 
              />
            </div>
          </div>
        </div>

        {/* 2. LISTA DE PLATOS (El Inventario) */}
        <div style={styles.listaOpciones}>
          <div style={styles.scrollOpciones}>
            {platos.map((plato) => (
              <label key={plato.id} style={{ 
                ...styles.platoOption,
                borderColor: platoEnFoco?.id === plato.id ? "#FFD700" : "rgba(255,255,255,0.05)",
                background: platoEnFoco?.id === plato.id ? "rgba(255, 215, 0, 0.1)" : "rgba(0,0,0,0.2)"
              }}>
                <input 
                  type="radio" 
                  name="seleccion-plato" 
                  checked={platoEnFoco?.id === plato.id} 
                  onChange={() => setPlatoEnFoco(plato)} 
                  style={styles.radioInput} 
                />
                <div style={styles.textoPlato}>
                  <span>{plato.nombre}</span>
                  <span style={{color: '#FFD700'}}>${plato.precio.toFixed(2)}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 3. ACCIÓN FINAL: PRECIO Y BOTÓN */}
        <div style={styles.footerAccion}>
          <div style={styles.contenedorBotonYPrecio}>
            
            <div style={styles.precioAcumulado}>
              <small style={{fontSize: '0.5rem', display: 'block', opacity: 0.7, letterSpacing: '1px'}}>PRECIO</small>
              ${platoEnFoco?.precio.toFixed(2)}
            </div>

            <button 
              onClick={() => onAgregar(platoEnFoco)} 
              style={styles.btnAgregar}
            >
              AÑADIR AL RESGUARDO 🔱
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  salonContainer: { minHeight: "100vh", background: "#1a0a0a", color: "white", fontFamily: "'Cormorant Garamond', serif" },
  contenido: { padding: "10px", maxWidth: "450px", margin: "auto", paddingBottom: "20px" },
  visorCard: { background: "#fdfaf6", borderRadius: "20px", overflow: "hidden", boxShadow: "0 15px 40px rgba(0,0,0,0.6)" },
  marcoImagen: { width: "100%", height: "300px", position: "relative", background: "#000" },
  hazDeLuz: { position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(255,215,0,0.1) 0%, transparent 80%)', zIndex: 2 },
  overlayImagen: { position: 'absolute', bottom: 0, width: '100%', height: '30%', background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)', zIndex: 1 },
  detallePlato: { padding: "12px 15px", textAlign: 'center' },
  nombrePlato: { color: "#3d0a0a", fontSize: "1.3rem", margin: "0", letterSpacing: '1px', fontWeight: '800' },
  fraseMistica: { fontStyle: 'italic', color: '#B22222', fontSize: '0.8rem', margin: '2px 0 8px 0', opacity: 0.7 },
  nutricionCompacta: { transform: 'scale(0.85)', margin: '-10px 0' }, 
  listaOpciones: { marginTop: "10px" },
  scrollOpciones: { maxHeight: "180px", overflowY: "auto" },
  platoOption: { display: "flex", alignItems: "center", padding: "10px 15px", borderRadius: "12px", cursor: "pointer", marginBottom: "8px", border: "1px solid", transition: "0.2s" },
  radioInput: { accentColor: "#FFD700", marginRight: "12px", transform: "scale(1.2)" },
  textoPlato: { flex: 1, display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' },
  footerAccion: { marginTop: "15px", padding: "15px 0", borderTop: "1px solid rgba(255,215,0,0.1)" },
  contenedorBotonYPrecio: { display: 'flex', alignItems: 'center', gap: '10px' },
  precioAcumulado: { background: '#FFD700', color: '#3d0a0a', padding: '8px 12px', borderRadius: '12px', fontWeight: '900', fontSize: '1.1rem', minWidth: '85px', textAlign: 'center' },
  btnAgregar: { flex: 1, padding: "16px", background: "linear-gradient(135deg, #FF4500, #B22222)", color: "white", border: "none", borderRadius: "15px", fontWeight: "800", cursor: "pointer", fontSize: '0.9rem', letterSpacing: '1px' }
};

