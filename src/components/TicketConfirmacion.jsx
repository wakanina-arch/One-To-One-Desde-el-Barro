import React from 'react';
import CodigoQr from './CodigoQr'; 

export default function TicketConfirmacion({ 
  pedido = [], 
  total, 
  metodo = "tarjeta", 
  alFinalizar, 
  fraseMistica, // ← Aquí estaba el error, faltaba la coma
  ordenId 
}) {
  
  // Usamos el ID que viene de la App
  const idFinal = ordenId || `OTO-PENDIENTE`;

  return (
    <div style={styles.ticketCard}>
      <h2 style={{ color: '#8B0000', marginBottom: '5px' }}>¡PEDIDO CONFIRMADO!</h2>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>Gracias por elegir el Palacio del Sabor</p>
      
      <div style={styles.ordenBox}>
        <span style={{ fontSize: '0.8rem', color: '#999', display: 'block' }}>NÚMERO DE ORDEN</span>
        <strong style={{ fontSize: '1.8rem', color: '#333', letterSpacing: '2px' }}>{idFinal}</strong>
      </div>

      <div style={styles.qrContainer}>
        <CodigoQr valor={idFinal} tamaño={160} />
      </div>

      <div style={styles.cajaOraculo}>
        <p style={styles.fraseFinal}>
          "{fraseMistica || "que tu alimento sea medicina y tu encuentro una alegría..."}"
        </p>
      </div>

      <div style={styles.resumenContainer}>
        <p style={{ fontWeight: 'bold', borderBottom: '1px solid #eee', marginBottom: '10px', fontSize: '0.7rem' }}>
          RESGUARDO DEL BANQUETE:
        </p>
        {Array.isArray(pedido) && pedido.length > 0 ? (
          pedido.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.85rem' }}>
              <span>{item.nombre} (x{item.cantidad || 1})</span>
              <span>${((item.precio || 0) * (item.cantidad || 1)).toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p>Cargando detalle...</p>
        )}
      </div>

      <div style={styles.footer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>TOTAL PAGADO:</span>
          <span style={{ color: '#8B0000' }}>${total}</span>
        </div>
      </div>

      <button onClick={alFinalizar} style={styles.btnVolver}>
        VOLVER AL PORTAL 🔱
      </button>
    </div>
  );
}

const styles = {
  ticketCard: { padding: '30px', maxWidth: '380px', margin: '20px auto', background: '#fdfaf6', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', textAlign: 'center', border: '2px solid #FFD700', fontFamily: "'Cormorant Garamond', serif" },
  ordenBox: { margin: '15px 0', padding: '15px', background: '#fff', borderRadius: '15px', border: '1px dashed #FFD700' },
  qrContainer: { margin: '20px auto', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '15px' },
  cajaOraculo: { margin: '15px 0', padding: '12px 8px', borderTop: '1px solid #FFD700', borderBottom: '1px solid #FFD700', background: 'rgba(255, 215, 0, 0.03)' },
  fraseFinal: { fontStyle: 'italic', color: '#8B0000', fontSize: '1rem', lineHeight: '1.3', margin: 0 },
  resumenContainer: { textAlign: 'left', padding: '12px', background: 'rgba(0,0,0,0.02)', borderRadius: '15px' },
  footer: { borderTop: '1px solid #eee', marginTop: '10px', paddingTop: '15px', textAlign: 'left' },
  btnVolver: { width: '100%', marginTop: '20px', padding: '16px', background: 'linear-gradient(135deg, #FF4500, #B22222)', color: 'white', border: 'none', borderRadius: '18px', fontWeight: '800', cursor: 'pointer' }
};

