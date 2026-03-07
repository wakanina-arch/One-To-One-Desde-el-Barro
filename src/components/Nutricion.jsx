import React from 'react';

export default function Nutricion({ calorias = 0, proteinas = 0, carbohidratos = 0 }) {
  return (
    <div style={styles.contenedor}>
      {/* Ítem de Energía (Calorías) */}
      <div style={styles.item}>
        <div style={styles.icono}>🔥</div>
        <div style={styles.datos}>
          <span style={styles.valor}>{calorias}</span>
          <span style={styles.unidad}>KCAL</span>
        </div>
      </div>

      {/* Separador artesanal */}
      <div style={styles.separador} />

      {/* Ítem de Construcción (Proteína) */}
      <div style={styles.item}>
        <div style={styles.icono}>💪</div>
        <div style={styles.datos}>
          <span style={styles.valor}>{proteinas}g</span>
          <span style={styles.unidad}>PROT</span>
        </div>
      </div>

      <div style={styles.separador} />

      {/* Ítem de Combustible (Carbohidratos) */}
      <div style={styles.item}>
        <div style={styles.icono}>🌾</div>
        <div style={styles.datos}>
          <span style={styles.valor}>{carbohidratos}g</span>
          <span style={styles.unidad}>CARB</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  contenedor: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fdfaf6', // Tono hueso/barro claro
    padding: '6px 1px',
    borderRadius: '20px',
    border: '1px solid rgba(178, 34, 34, 0.2)', // Rojo brasa suave
    margin: '15px 0',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
    fontFamily: "'Cormorant Garamond', serif"
  },
  item: {
    textAlign: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px'
  },
  icono: {
    fontSize: '1.1rem',
    filter: 'grayscale(0.2)'
  },
  datos: {
    display: 'flex',
    flexDirection: 'column'
  },
  valor: {
    fontWeight: '800',
    color: '#01400e', // Verde esmeralda (Conciencia/Salud)
    fontSize: '1rem',
    lineHeight: '1'
  },
  unidad: {
    color: '#8B0000', // Rojo brasa (Identidad)
    fontSize: '0.6rem',
    fontWeight: '700',
    letterSpacing: '1px'
  },
  separador: {
    width: '1px',
    height: '30px',
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
};
