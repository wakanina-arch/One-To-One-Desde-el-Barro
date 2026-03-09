import React from 'react';
import CodigoQR from './CodigoQR';

export default function TicketConfirmacion({ 
  datos = {}, 
  pedido = [], 
  onCerrar 
}) {
  
  const { total = 0, ordenId = "OTO-PENDIENTE", metodo = "tarjeta", frase = "" } = datos;

  // Selección de elemento según la frase (opcional - magia espiritual)
  const getElemento = () => {
    const fraseLower = frase.toLowerCase();
    if (fraseLower.includes('fuego') || fraseLower.includes('llama') || fraseLower.includes('brasas')) return '🔥';
    if (fraseLower.includes('agua') || fraseLower.includes('mar') || fraseLower.includes('río')) return '💧';
    if (fraseLower.includes('tierra') || fraseLower.includes('barro') || fraseLower.includes('monte')) return '⛰️';
    if (fraseLower.includes('viento') || fraseLower.includes('aire') || fraseLower.includes('humo')) return '🌬️';
    return '☯'; // Elemento espíritu por defecto
  };

  return (
    <div style={styles.container}>
      <div style={styles.ticketCard}>
        <div style={styles.header}>
          <h2 style={styles.brand}>ONE TO ONE</h2>
          <p style={styles.tagline}>— DESDE EL BARRO —</p>
        </div>
        
        {/* 🌟 FRASE ESPIRITUAL - El regalo */}
        {frase && (
          <div style={styles.fraseEspiritual}>
            <div style={styles.elementoIcono}>{getElemento()}</div>
            <p style={styles.fraseTexto}>"{frase}"</p>
          </div>
        )}
        
        <div style={styles.ordenBox}>
          <span style={styles.label}>NÚMERO DE ORDEN</span>
          <strong style={styles.idTexto}>{ordenId}</strong>
        </div>

        {/* QR CENTRADO */}
        <div style={styles.qrWrapper}>
          <CodigoQR valor={ordenId} tamaño={140} />
        </div>

        {/* RESUMEN DEL PEDIDO */}
        <div style={styles.resumenContainer}>
          <p style={styles.resumenTitulo}>DETALLE DEL BANQUETE</p>
          <div style={styles.listaItems}>
            {pedido.length > 0 ? (
              pedido.map((item, idx) => (
                <div key={idx} style={styles.itemRow}>
                  <span>{item.nombre} x{item.cantidad}</span>
                  <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p style={{fontSize: '0.7rem', textAlign: 'center'}}>Consulta tu orden en barra</p>
            )}
          </div>
          
          <div style={styles.divider}></div>
          
          <div style={styles.totalRow}>
            <span>TOTAL ({metodo.toUpperCase()})</span>
            <span>${Number(total).toFixed(2)}</span>
          </div>
        </div>

        <button onClick={onCerrar} style={styles.btnVolver}>
          FINALIZAR Y VOLVER 🔱
        </button>
        
        <p style={styles.footerNote}>Presenta este QR en el mostrador</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1a0a0a',
    padding: '10px'
  },
  ticketCard: { 
    padding: '20px', 
    width: '90%',
    maxWidth: '340px', 
    background: '#fff',
    borderRadius: '25px', 
    boxShadow: '0 15px 35px rgba(0,0,0,0.5)', 
    textAlign: 'center',
    fontFamily: "serif",
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  header: { marginBottom: '15px' },
  brand: { color: '#8B0000', margin: 0, fontSize: '1.6rem', letterSpacing: '2px' },
  tagline: { fontSize: '0.6rem', color: '#999', margin: 0 },
  
  // 🌟 NUEVO ESTILO PARA LA FRASE ESPIRITUAL
  fraseEspiritual: {
    background: 'linear-gradient(135deg, #fdf2e9, #fff5f5)',
    padding: '15px 10px',
    borderRadius: '20px',
    marginBottom: '15px',
    border: '1px solid #FFD700',
    position: 'relative',
    boxShadow: '0 4px 10px rgba(255,215,0,0.2)'
  },
  elementoIcono: {
    fontSize: '2rem',
    marginBottom: '5px'
  },
  fraseTexto: {
    color: '#8B0000',
    fontSize: '0.85rem',
    fontStyle: 'italic',
    margin: 0,
    lineHeight: '1.4',
    fontWeight: '500'
  },
  
  ordenBox: { 
    margin: '10px 0', 
    padding: '10px', 
    background: '#f9f9f9', 
    borderRadius: '12px', 
    border: '1px dashed #ccc' 
  },
  label: { fontSize: '0.65rem', color: '#888', display: 'block' },
  idTexto: { fontSize: '1.4rem', color: '#333' },
  qrWrapper: { 
    margin: '10px auto', 
    padding: '10px',
    background: '#fff',
    display: 'inline-block',
    border: '1px solid #eee',
    borderRadius: '10px'
  },
  resumenContainer: { 
    textAlign: 'left', 
    padding: '10px', 
    background: '#fafafa', 
    borderRadius: '12px',
    marginTop: '10px'
  },
  resumenTitulo: { fontSize: '0.7rem', fontWeight: 'bold', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '8px', color: '#666' },
  listaItems: { maxHeight: '100px', overflowY: 'auto' },
  itemRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px', color: '#444' },
  divider: { height: '1px', background: '#eee', margin: '8px 0' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.9rem', color: '#8B0000' },
  btnVolver: { 
    width: '100%', 
    marginTop: '15px', 
    padding: '12px', 
    background: '#1a0a0a', 
    color: '#FFD700', 
    border: 'none', 
    borderRadius: '15px', 
    fontWeight: 'bold', 
    cursor: 'pointer' 
  },
  footerNote: { fontSize: '0.6rem', color: '#bbb', marginTop: '10px' }
};