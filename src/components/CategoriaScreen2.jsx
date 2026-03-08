import React, { useState, useEffect } from "react";
import BarraSuperior from "../layout/BarraSuperior"; 
import Nutricion from "./Nutricion"; 

// CORREGIDO: Cambiamos 'onCarritoClick' por 'onVerCarrito' para que coincida con App.jsx
export default function CategoriaScreen2({ 
  categoria, 
  onAddToCart, 
  onVerCarrito,  // <--- CAMBIADO de onCarritoClick a onVerCarrito
  carritoCount, 
  onBack, 
  usuario,
  frase 
}) {
  const platos = categoria?.platos || [];
  const [platoEnFoco, setPlatoEnFoco] = useState(null);

  useEffect(() => {
    if (platos.length > 0) {
      setPlatoEnFoco(platos[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoria?.titulo]); 

  // Función para manejar el clic en AÑADIR
  const handleAddClick = () => {
    console.log('➕ handleAddClick - platoEnFoco:', platoEnFoco); // LOG
    if (platoEnFoco && onAddToCart) {
      onAddToCart(platoEnFoco);
    }
  };

  // Función para manejar el clic en el carrito
  const handleCarritoClick = () => {
    console.log('🛒 handleCarritoClick - carritoCount:', carritoCount); // LOG
    if (onVerCarrito) {
      onVerCarrito();
    } else {
      console.error('❌ onVerCarrito es undefined');
    }
  };

  return (
    <div style={styles.salonContainer}>
      <style dangerouslySetInnerHTML={{ __html: `
        .img-proyeccion { width: 100%; height: 100%; object-fit: cover; }
        .scroll-hidden::-webkit-scrollbar { display: none; }
      `}} />

      <div style={styles.wrapperEscalado}>
        {/* CORREGIDO: Pasamos handleCarritoClick en lugar de onCarritoClick */}
        <BarraSuperior 
          usuario={usuario} 
          onCarritoClick={handleCarritoClick}  // <--- AHORA USA LA FUNCIÓN CORRECTA
          carritoCount={carritoCount} 
          onMenuClick={onBack} 
        />

        <div style={styles.contenido}>
          
          <div style={styles.visorCard}>
            <div style={styles.marcoImagen}>
              {platoEnFoco && (
                <img 
                  key={platoEnFoco.id} 
                  src={platoEnFoco.imagen.startsWith('/') ? platoEnFoco.imagen : `/${platoEnFoco.imagen}`} 
                  alt={platoEnFoco.nombre}
                  className="img-proyeccion"
                  onError={(e) => { 
                    console.log('Error cargando imagen:', platoEnFoco.imagen);
                    e.target.src = "https://via.placeholder.com/300x200?text=Imagen+no+disponible"; 
                  }}
                />
              )}
            </div>
            <div style={styles.detallePlato}>
              <h3 style={styles.nombrePlato}>{platoEnFoco?.nombre?.toUpperCase() || "CARGANDO..."}</h3>
            </div>
          </div>

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
                    <span style={{color: 'white'}}>{plato.nombre}</span>
                    <span style={{color: '#FFD700', fontWeight: 'bold'}}>${plato.precio.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.footerAccion}>
            <div style={styles.bloqueNutricion}>
              <Nutricion 
                calorias={platoEnFoco?.kcal || 0} 
                proteinas={platoEnFoco?.prot || 0} 
                carbohidratos={platoEnFoco?.carb || 0} 
              />
            </div>
            <button onClick={handleAddClick} style={styles.btnAgregar}>
              AÑADIR <span style={{ filter: 'brightness(0) invert(1)', marginLeft: '8px' }}>🛒</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  salonContainer: { 
    height: "100%", width: "100%", 
    background: "radial-gradient(circle at center, #3d0a0a 0%, #000 100%)", 
    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' 
  },
  wrapperEscalado: {
    width: "88%", height: "88%", background: "#1a0a0a", borderRadius: "35px",
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
    border: '1px solid rgba(255,215,0,0.15)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
  },
  contenido: { flex: 1, padding: "12px", display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  visorCard: { background: "#fff", borderRadius: "20px", overflow: "hidden", marginBottom: "8px", flexShrink: 0 },
  marcoImagen: { width: "100%", height: "180px", background: "#000", position: 'relative' },
  detallePlato: { padding: "8px 5px", textAlign: 'center', background: '#fff' },
  nombrePlato: { color: "#1a0a0a", fontSize: "0.85rem", margin: "0", fontWeight: '900' },
  listaOpciones: { flex: 1, overflowY: "auto", margin: "8px 0" },
  scrollOpciones: { display: 'flex', flexDirection: 'column', gap: '6px' },
  platoOption: { display: "flex", alignItems: "center", padding: "10px", borderRadius: "12px", border: "1px solid", transition: "0.2s", cursor: "pointer" },
  textoPlato: { flex: 1, display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' },
  footerAccion: { 
    display: "flex", 
    alignItems: "stretch",
    gap: "10px", 
    padding: "10px 0"
  },
  bloqueNutricion: { 
    flex: 1, 
    background: "rgba(255,255,255,0.08)", 
    borderRadius: "15px", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255,255,255,0.15)"
  },
  btnAgregar: { 
    flex: 1, 
    padding: "14px 5px", 
    background: "linear-gradient(135deg, #FF4500, #B22222)", 
    color: "#FFFFFF",
    border: "none", 
    borderRadius: "15px", 
    fontWeight: "900", 
    fontSize: "1rem", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 4px 15px rgba(255, 69, 0, 0.3)",
    cursor: "pointer",
    textShadow: "0 1px 2px rgba(0,0,0,0.2)"
  }
};
