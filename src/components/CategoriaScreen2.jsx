import React, { useState, useEffect } from "react";
import BarraSuperior from "../layout/BarraSuperior"; 
import Nutricion from "./Nutricion"; 

export default function CategoriaScreen2({ 
  categoria, 
  onAddToCart, 
  onVerCarrito,
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
  }, [categoria?.titulo]); 

  const handleAddClick = () => {
    if (platoEnFoco && onAddToCart) {
      onAddToCart(platoEnFoco);
    }
  };

  const handleCarritoClick = () => {
    if (onVerCarrito) {
      onVerCarrito();
    }
  };

  return (
    <div style={styles.salonContainer}>
      <style dangerouslySetInnerHTML={{ __html: `
        .img-proyeccion { width: 100%; height: 100%; object-fit: cover; }
        .scroll-hidden::-webkit-scrollbar { display: none; }
      `}} />

      <div style={styles.wrapperEscalado}>
        <BarraSuperior 
          usuario={usuario} 
          onCarritoClick={handleCarritoClick}
          carritoCount={carritoCount} 
          onMenuClick={onBack} 
        />

        <div style={styles.contenido}>
          <p style={styles.frase}>{frase}</p>
          {/* 🔥 ELEMENTO FUEGO - La imagen (pasión, protagonismo) */}
          <div style={styles.visorCard}>
            <div style={styles.marcoImagen}>
              {platoEnFoco && (
                <img 
                  key={platoEnFoco.id} 
                  src={platoEnFoco.imagen.startsWith('/') ? platoEnFoco.imagen : `/${platoEnFoco.imagen}`} 
                  alt={platoEnFoco.nombre}
                  className="img-proyeccion"
                  onError={(e) => { 
                    e.target.src = "https://via.placeholder.com/300x200?text=Imagen+no+disponible"; 
                  }}
                />
              )}
            </div>
            <div style={styles.detallePlato}>
              <h3 style={styles.nombrePlato}>{platoEnFoco?.nombre?.toUpperCase() || "CARGANDO..."}</h3>
            </div>
          </div>

          {/* 🌱 ELEMENTO MADERA - Lista de opciones (crecimiento, elección) */}
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
                    <span style={styles.nombreOpcion}>{plato.nombre}</span>
                    <span style={styles.precioOpcion}>${plato.precio.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ⚖️ EQUILIBRIO YIN-YANG - Footer con acciones */}
          <div style={styles.footerAccion}>
            {/* 💧 ELEMENTO AGUA - Nutrición (fluidez, información sutil) */}
            <div style={styles.bloqueNutricion}>
              <Nutricion 
                calorias={platoEnFoco?.kcal || 0} 
                proteinas={platoEnFoco?.prot || 0} 
                carbohidratos={platoEnFoco?.carb || 0} 
              />
            </div>
            
            {/* 🔥 ELEMENTO FUEGO - Botón Añadir (acción, transformación) */}
            <button onClick={handleAddClick} style={styles.btnAgregar}>
              AÑADIR
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  salonContainer: { 
    height: "100%", 
    width: "100%", 
    background: "radial-gradient(circle at center, #3d0a0a 0%, #1a0a0a 100%)", 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    overflow: 'hidden' 
  },
  
  wrapperEscalado: {
    width: "88%", 
    height: "88%",
    borderRadius: "35px",
    display: 'flex', 
    flexDirection: 'column', 
    overflow: 'hidden',
  },
  
  contenido: { 
    flex: 1, 
    padding: "12px 12px", 
    display: 'flex', 
    flexDirection: 'column', 
    overflow: 'hidden',
    gap: "12px"  // ← Añadido espacio consistente
  },
  
  // 🖼️ VISOR DE IMAGEN (Protagonista pero no abrumador)
  visorCard: { 
    background: "#fff", 
    borderRadius: "24px", 
    overflow: "hidden", 
    flexShrink: 0,
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
  },
  
  marcoImagen: { 
    width: "100%", 
    height: "240px",  // ← Reducido de 240px para dar más espacio a la lista
    background: "#000", 
    position: 'relative' 
  },
  
  detallePlato: { 
    padding: "8px 5px", 
    textAlign: 'center', 
    background: '#fff' 
  },
  
  nombrePlato: { 
    color: "#1a0a0a", 
    fontSize: "0.9rem", 
    margin: "0", 
    fontWeight: '600',  // ← Reducido de 900 para más elegancia
    letterSpacing: "0.5px"
  },
  
  // 📋 LISTA DE OPCIONES (Madera - crecimiento natural)
  listaOpciones: { 
    flex: 1, 
    overflowY: "auto", 
  },
  
  scrollOpciones: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '8px',
    paddingRight: "4px"
  },
  
  platoOption: { 
    display: "flex", 
    alignItems: "center", 
    padding: "12px 14px",  // ← Aumentado ligeramente
    borderRadius: "16px",   // ← Aumentado para más suavidad
    border: "1px solid", 
    transition: "all 0.2s ease", 
    cursor: "pointer",
    backdropFilter: "blur(5px)"
  },
  
  textoPlato: { 
    flex: 1, 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: "center",
    fontSize: '0.9rem' 
  },
  
  nombreOpcion: {
    color: '#fff',
    fontWeight: '400',  // ← Menos peso que el botón
    fontSize: '0.9rem'
  },
  
  precioOpcion: {
    color: '#FFD700',
    fontWeight: '600',  // ← Menos que el botón
    fontSize: '0.9rem'
  },
  
  // ⚖️ FOOTER EQUILIBRADO
  footerAccion: { 
    display: "flex", 
    alignItems: "center",
    gap: "10px", 
    paddingTop: "1px",  // ← Reducido
    flexShrink: 0
  },
  
  // 💧 NUTRICIÓN (Agua - sutil, fluido)
  bloqueNutricion: { 
    flex: 1, 
    background: "rgba(255,255,255,0.05)",  // ← Más sutil
    borderRadius: "20px", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255,215,0,0.1)",  // ← Borde más sutil
    padding: "0 5px",
    minHeight: "40px"  // ← Altura fija para consistencia
  },
  
  // 🔥 BOTÓN AÑADIR (Fuego - acción, pero no abruma)
  btnAgregar: { 
    flex: 1, 
    padding: "0 5px", 
    background: "linear-gradient(135deg, #B22222, #8B0000)",  // ← Menos intenso
    color: "#FFFFFF",
    border: "none", 
    borderRadius: "20px", 
    fontWeight: "600",  // ← Reducido de 900
    fontSize: "0.9rem",  // ← Reducido de 1rem
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    boxShadow: "0 2px 8px rgba(139, 0, 0, 0.3)",  // ← Sombra más sutil
    cursor: "pointer",
    letterSpacing: "0.5px",
    minHeight: "40px",  // ← Misma altura que nutrición
    transition: "all 0.2s ease"
  }
};