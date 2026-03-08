import React, { useState, useEffect } from "react";
import { CartProvider, useCart } from "./CartContext.jsx";
import WelcomeInicio from "./WelcomeInicio"; 
import CategoriaScreen2 from "./components/CategoriaScreen2";
import ResumenPedido from "./ResumenPedido"; 
import SeccionPago from "./components/SeccionPago";
import TicketConfirmacion from "./components/TicketConfirmacion"; 

const database = {
  // ... tus datos se mantienen igual
  primero: { titulo: 'COMPLEMENTOS', icono: '🍟', platos: [...] },
  segundo: { titulo: 'ENSALADAS', icono: '🥗', platos: [...] },
  postres: { titulo: 'BEBIDAS', icono: '🥤', platos: [...] },
  otras: { titulo: 'PIZZAS AL HORNO', icono: '🍕', platos: [...] }
};

function AppContent() {
  const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart, calculateTotal } = useCart();
  
  const [pantalla, setPantalla] = useState('welcome');
  const [categoriaActual, setCategoriaActual] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [fraseOraculo, setFraseOraculo] = useState(""); 
  const [datosFinales, setDatosFinales] = useState({ total: 0, metodo: '', ordenId: '' });

  useEffect(() => {
    const savedUser = localStorage.getItem('oneToOneUser');
    if (savedUser) setUsuario(JSON.parse(savedUser));
  }, []);

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
    /* CONTENEDOR PRINCIPAL: Fondo negro total */
    <div className="App" style={{ 
      width: '100vw', 
      minHeight: '100vh', 
      background: '#000000', 
      margin: 0, 
      padding: 0,
      display: 'flex',
      justifyContent: 'center'
    }}>
      
      {/* WRAPPER RESPONSIVE: Aquí ocurre la magia tipo App móvil */}
      <div style={{
        width: '100%',
        maxWidth: '500px', // Ancho máximo tipo teléfono profesional
        minHeight: '100vh',
        background: '#1a0a0a', // El color de tu app
        position: 'relative',
        overflowX: 'hidden'
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

// Exportación necesaria
export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
