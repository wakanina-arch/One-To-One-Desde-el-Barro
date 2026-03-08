import React, { useState } from 'react';
import { useCart } from './CartContext.jsx';
import ResumenPedido from './ResumenPedido';
import SeccionPago from './SeccionPago';
import CodigoQrPedido from './components/CodigoQrPedido'; // Importamos para el final

export default function FlujoPago({ onVolverAlMenu, usuario }) {
  const { cartItems, clearCart, addOrder, calculateTotal } = useCart();
  const [paso, setPaso] = useState('resumen'); // resumen | pago | exito
  const [ordenFinal, setOrdenFinal] = useState(null);
  const [procesando, setProcesando] = useState(false);

  // 1. ESTADO: CARRITO VACÍO (Con estética "Desde el Barro")
  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={styles.contenedorVacio}>
        <div style={{ fontSize: "4rem" }}>🏺</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#FFD700" }}>Tu vasija está vacía</h2>
        <p style={{ color: "rgba(255,255,255,0.7)" }}>El fuego espera por tu elección...</p>
        <button onClick={onVolverAlMenu} style={styles.btnPrimario}>VOLVER AL MENÚ</button>
      </div>
    );
  }

  // 2. ACCIÓN: CONFIRMAR PAGO
  const handleConfirmarPago = async (metodo) => {
    setProcesando(true);
    
    // Simulamos un tiempo de "cocción" del pago (Seguridad percibida)
    setTimeout(() => {
      const nuevaOrden = {
        items: [...cartItems],
        total: calculateTotal(),
        metodoPago: metodo,
        usuarioId: usuario?.email || 'invitado',
        puntosGanados: Math.floor(calculateTotal() * 10), // Recompensa Beta
      };

      const ordenRegistrada = addOrder(nuevaOrden);
      setOrdenFinal(ordenRegistrada);
      setProcesando(false);
      setPaso('exito');
      clearCart();
    }, 2000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: "radial-gradient(circle at center, #3d0a0a 0%, #1a0a0a 100%)",
      padding: '20px' 
    }}>
      
      {/* HEADER DINÁMICO SEGÚN EL PASO */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={styles.tituloSeccion}>
          {paso === 'resumen' && 'REVISIÓN DE BANQUETE'}
          {paso === 'pago' && 'OFRENDA DE PAGO'}
          {paso === 'exito' && '¡ORDEN EN FUEGO!'}
        </h1>
      </div>

      {procesando ? (
        <div style={styles.contenedorVacio}>
          <div className="spinner-brasa">🔥</div>
          <p style={{ color: '#FFD700', letterSpacing: '2px' }}>PROCESANDO TU ORDEN...</p>
        </div>
      ) : (
        <>
          {paso === 'resumen' && (
            <ResumenPedido 
              alConfirmar={() => setPaso('pago')}
              alVolver={onVolverAlMenu}
            />
          )}

          {paso === 'pago' && (
            <SeccionPago 
              carrito={cartItems}
              alConfirmar={handleConfirmarPago}
              alVolver={() => setPaso('resumen')}
            />
          )}

          {paso === 'exito' && (
            <div style={styles.cardExito}>
              <div style={styles.checkIcon}>✓</div>
              <h2 style={{ color: '#3d0a0a', margin: '10px 0' }}>¡Listo para recoger!</h2>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Presenta este código en la barra</p>
              
              <div style={styles.contenedorQR}>
                <CodigoQrPedido orden={ordenFinal} />
              </div>

              <div style={styles.puntosBeta}>
                ✨ Has ganado <strong>{ordenFinal?.puntosGanados}</strong> créditos Beta
              </div>

              <button onClick={onVolverAlMenu} style={styles.btnPrimario}>
                NUEVO PEDIDO
              </button>
            </div>
          )}
        </>
      )}

      {/* CSS para el Spinner y animaciones */}
      <style>{`
        @keyframes flama { 0% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 0.8; } }
        .spinner-brasa { font-size: 3rem; animation: flama 1s infinite ease-in-out; margin-bottom: 20px; }
      `}</style>
    </div>
  );
}

const styles = {
  contenedorVacio: {
    height: '70vh', display: 'flex', flexDirection: 'column', 
    alignItems: 'center', justifyContent: 'center', textAlign: 'center'
  },
  tituloSeccion: {
    fontFamily: "'Cormorant Garamond', serif", color: "#FFD700",
    fontSize: "1.5rem", letterSpacing: "3px", textTransform: "uppercase"
  },
  btnPrimario: {
    padding: '16px 40px', background: 'linear-gradient(135deg, #FF4500, #B22222)',
    color: 'white', border: '1px solid #FFD700', borderRadius: '20px',
    fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '25px'
  },
  cardExito: {
    background: '#fdfaf6', padding: '30px', borderRadius: '30px',
    textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    maxWidth: '400px', margin: 'auto'
  },
  checkIcon: {
    width: '60px', height: '60px', background: '#27ae60', color: 'white',
    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '2rem', margin: '0 auto 20px'
  },
  contenedorQR: {
    background: 'white', padding: '15px', borderRadius: '15px',
    border: '2px dashed #3d0a0a', margin: '20px 0'
  },
  puntosBeta: {
    background: '#fff5e6', color: '#8B0000', padding: '10px',
    borderRadius: '12px', fontSize: '0.85rem', marginBottom: '20px',
    border: '1px solid #FFD700'
  }
};
