import React, { useState } from "react";
import { CartProvider, useCart } from "./CartContext.jsx";
import WelcomeInicio from "./WelcomeInicio"; 
import CategoriaScreen2 from "./components/CategoriaScreen2";
import ResumenPedido from "./ResumenPedido"; 
import SeccionPago from "./components/SeccionPago";
import TicketConfirmacion from "./components/TicketConfirmacion"; 

const database = {
  primero: { titulo: 'COMPLEMENTOS', icono: '🍟', platos: [] },
  segundo: { titulo: 'ENSALADAS', icono: '🥗', platos: [] },
  postres: { titulo: 'BEBIDAS', icono: '🥤', platos: [] },
  otras: { titulo: 'PIZZAS AL HORNO', icono: '🍕', platos: [] }
};

function AppContent() {
  const { clearCart, calculateTotal } = useCart();
  
  const [pantalla, setPantalla] = useState('welcome');
  const [categoriaActual, setCategoriaActual] = useState(null);
  const [fraseOraculo, setFraseOraculo] = useState(""); 
  const [datosFinales, setDatosFinales] = useState({ total: 0, metodo: '', ordenId: '' });

  // 1. CARGA INICIAL DEL USUARIO (Solución al error de ESLint y el bug de sintaxis)
  const [usuario] = useState(() => {
    const savedUser = localStorage.getItem('oneToOneUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const totalNeto = calculateTotal();

  const irACategoria = (id, fraseRecibida) => {
    if (fraseRecibida) setFraseOraculo(fraseRecibida); 
    setCategoriaActual(id); 
    setPantalla('categoria');
  };

  const finalizarCompra = (metodoElegido) => {
    const idGenerado = `QR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setDatosFinales({ total: totalNeto, metodo: metodoElegido, ordenId: idGenerado });
    setPantalla('ticket');
  };

  return (
    <div className="App" style={{ 
      width: '100vw', 
      height: '100dvh', 
      background: '#000000', 
      margin: 0, 
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden' 
    }}>
      
      <div style={{
        width: '88%', // Reducimos ancho para ver el tapiz lateral
        maxWidth: '430px', 
        height: '88vh', // Reducimos alto para ver el tapiz superior/inferior
        background: '#1a0a0a', 
        position: 'relative',
        overflow: 'hidden', 
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '35px', 
        border: '1px solid rgba(255,215,0,0.15)',
        boxShadow: '0 0 40px rgba(0,0,0,0.9)'
      }}>

        {pantalla === 'welcome' && (
          <WelcomeInicio usuario={usuario} onSelectCategory={irACategoria} />
        )}

        {pantalla === 'categoria' && categoriaActual && (
          <CategoriaScreen2
            usuario={usuario}
            categoria={database[categoriaActual]}
            onBack={() => setPantalla('welcome')}
            onVerCarrito={() => setPantalla('resumen')}
            frase={fraseOraculo}
          />
        )}

        {pantalla === 'resumen' && (
          <ResumenPedido 
            onBack={() => setPantalla('categoria')}
            onContinuar={() => setPantalla('pago')}
          />
        )}

        {pantalla === 'pago' && (
          <SeccionPago 
            total={totalNeto}
            onBack={() => setPantalla('resumen')}
            onFinalizar={finalizarCompra}
          />
        )}

        {pantalla === 'ticket' && (
          <TicketConfirmacion 
            datos={datosFinales}
            onCerrar={() => {
              clearCart();
              setPantalla('welcome');
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
