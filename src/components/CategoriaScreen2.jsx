import React, { useState, useEffect } from "react";
import BarraSuperior from "../layout/BarraSuperior"; 
import Nutricion from "./Nutricion"; 

export default function CategoriaScreen2({ categoria, onAgregar, onCarritoClick, carritoCount, onBack, usuario }) {
  const platos = categoria?.platos || [];
  const [platoEnFoco, setPlatoEnFoco] = useState(null);

  useEffect(() => {
    if (platos.length > 0) {
      setPlatoEnFoco(platos[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoria?.titulo]); 

  return (
    <div style={styles.salonContainer}>
      <style dangerouslySetInnerHTML={{ __html: `
        .img-proyeccion { width: 100%; height: 100%; object-fit: cover; }
        .scroll-hidden::-webkit-scrollbar { display: none; }
        .cintillo-tv { 
          position: absolute; bottom: 0; left: 0; width: 100%;
          background: linear-gradient(to right, rgba(139,0,0,0.9), rgba(0,0,0,0.6));
          backdrop-filter: blur(5px); padding: 5px 15px;
          display: flex; align-items: center; justify-content: space-around;
          border-top: 1px solid rgba(255,215,0,0.3); z-index: 10;
        }
      `}} />

      <BarraSuperior usuario={usuario} onCarritoClick={onCarritoClick} carritoCount={carritoCount} onMenuClick={onBack} />

      <div style={styles.contenido}>
        
        {/* VISOR CINEMATOGRÁFICO */}
        <div style={styles.visorCard}>
          <div style={styles.marcoImagen}>
            {platoEnFoco && (
              <img 
                key={platoEnFoco.id} 
                src={platoEnFoco.imagen.startsWith('/') ? platoEnFoco.imagen : `/${platoEnFoco.imagen}`} 
                alt={platoEnFoco.nombre}
                className="img-proyeccion"
                onError={(e) => { e.target.src = "https://via.placeholder.com"; }}
              />
            )}
            
            {/* CINTILLO TIPO TITULAR DE TV (FLOAT OVER IMAGE) */}
            <div className="cintillo-tv">
              <Nutricion 
                calorias={platoEnFoco?.kcal || 0} 
                proteinas={platoEnFoco?.prot || 0} 
                carbohidratos={platoEnFoco?.carb || 0} 
                estilo="slim" // Asumiendo que tu componente Nutricion acepta estilos compactos
              />
            </div>
          </div>

          <div style={styles.detallePlato}>
            <h3 style={styles.nombrePlato}>{platoEnFoco?.nombre?.toUpperCase() || "CARGANDO..."}</h3>
          </div>
        </div>

        {/* LISTA DE PLATOS */}
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
                  <span>{plato.nombre}</span>
                  <span style={{color: '#FFD700', fontWeight: 'bold'}}>${plato.precio.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.footerAccion}>
          <button onClick={() => onAgregar(platoEnFoco)} style={styles.btnAgregar}>
            AÑADIR • ${platoEnFoco?.precio.toFixed(2)}
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  salonContainer: { height: "100%", width: "100%", background: "#000", color: "white", fontFamily: "serif", display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  contenido: { flex: 1, padding: "12px", display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  visorCard: { background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.7)", marginBottom: "10px" },
  marcoImagen: { width: "100%", height: "280px", background: "#000", position: 'relative' },
  detallePlato: { padding: "10px 5px", textAlign: 'center', background: '#fff' },
  nombrePlato: { color: "#1a0a0a", fontSize: "1.1rem", margin: "0", fontWeight: '900', letterSpacing: '1px' },
  listaOpciones: { flex: 1, overflowY: "auto" },
  scrollOpciones: { display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '10px' },
  platoOption: { display: "flex", alignItems: "center", padding: "12px", borderRadius: "15px", border: "1px solid", transition: "0.2s" },
  textoPlato: { flex: 1, display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' },
  footerAccion: { paddingBottom: "10px" },
  btnAgregar: { width: "100%", padding: "16px", background: "linear-gradient(135deg, #FF4500, #B22222)", color: "white", border: "none", borderRadius: "18px", fontWeight: "900", fontSize: '1rem' }
};
