import React, { useState, useEffect } from "react";
import BarraSuperior from "../layout/BarraSuperior"; 
import Nutricion from "./Nutricion"; 

export default function CategoriaScreen2({ categoria, onAgregar, onCarritoClick, carritoCount, onBack, usuario }) {
  
  // 1. Definimos los platos de la categoría actual
  const platos = categoria?.platos || [];
  
  // 2. Estado para el plato que se muestra en el visor
  const [platoEnFoco, setPlatoEnFoco] = useState(platos[0] || null);

  // 3. Efecto para resetear el plato al cambiar de categoría (ej: de Entrantes a Postres)
  useEffect(() => {
    if (platos.length > 0) {
      // Usamos una función de actualización para evitar el error de "cascading renders"
      setPlatoEnFoco(() => platos[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoria?.titulo]); 

  return (
    <div style={styles.salonContainer}>
      <style dangerouslySetInnerHTML={{ __html: `
        .img-proyeccion { width: 100%; height: 100%; object-fit: cover; }
        .scroll-hidden::-webkit-scrollbar { display: none; }
      `}} />

      <BarraSuperior 
        usuario={usuario} 
        onCarritoClick={onCarritoClick} 
        carritoCount={carritoCount} 
        onMenuClick={onBack} 
      />

      <div style={styles.contenido}>
        
        {/* VISOR DE IMAGEN: El cuadro principal */}
        <div style={styles.visorCard}>
          <div style={styles.marcoImagen}>
            {platoEnFoco && (
              <img 
                key={platoEnFoco.id} 
                src={platoEnFoco.imagen.startsWith('/') ? platoEnFoco.imagen : `/${platoEnFoco.imagen}`} 
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

        {/* LISTA DE OPCIONES: Scroll de platos */}
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
                  <span style={{color: '#FFD700'}}>${plato.precio.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTÓN AGREGAR: El cierre de la pantalla */}
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
    width: "100%", 
    background: "#1a0a0a", 
    color: "white", 
    fontFamily: "serif", 
    display: 'flex', 
    flexDirection: 'column', 
    overflow: 'hidden' 
  },
  contenido: { 
    flex: 1, 
    padding: "12px", 
    display: 'flex', 
    flexDirection: 'column', 
    overflow: 'hidden' 
  },
  visorCard: { 
    background: "#fff", 
    borderRadius: "20px", 
    overflow: "hidden", 
    boxShadow: "0 8px 25px rgba(0,0,0,0.5)", 
    marginBottom: "12px" 
  },
  marcoImagen: { 
    width: "100%", 
    height: "160px", // <--- Toca aquí para cambiar el alto de la foto
    background: "#000", 
    position: 'relative' 
  },
  detallePlato: { 
    padding: "8px 12px", 
    textAlign: 'center' 
  },
  nombrePlato: { 
    color: "#3d0a0a", 
    fontSize: "1rem", 
    margin: "0", 
    fontWeight: '800' 
  },
  nutricionSlim: { 
    transform: 'scale(0.75)', 
    margin: '-8px 0' 
  },
  listaOpciones: { 
    flex: 1, 
    overflowY: "auto", 
    marginBottom: "10px" 
  },
  scrollOpciones: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '8px', 
    paddingBottom: '10px' 
  },
  platoOption: { 
    display: "flex", 
    alignItems: "center", 
    padding: "12px", 
    borderRadius: "15px", 
    border: "1px solid", 
    transition: "0.2s" 
  },
  textoPlato: { 
    flex: 1, 
    display: 'flex', 
    justifyContent: 'space-between', 
    fontSize: '0.85rem' 
  },
  footerAccion: { 
    paddingBottom: "10px" 
  },
  btnAgregar: { 
    width: "100%", 
    padding: "14px", 
    background: "linear-gradient(135deg, #FF4500, #B22222)", 
    color: "white", 
    border: "none", 
    borderRadius: "16px", 
    fontWeight: "800", 
    fontSize: '0.95rem' 
  }
};
