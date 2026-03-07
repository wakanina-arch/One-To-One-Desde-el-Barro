import React, { useState, useEffect } from "react";
import { CartProvider, useCart } from "./CartContext.jsx";
import WelcomeInicio from "./WelcomeInicio"; 
import CategoriaScreen2 from "./components/CategoriaScreen2";
import ResumenPedido from "./ResumenPedido"; 
import SeccionPago from "./components/SeccionPago";
import TicketConfirmacion from "./components/TicketConfirmacion"; 

const database = {
  primero: { 
    titulo: 'COMPLEMENTOS', icono: '🍟',
    platos: [
      { id: 101, nombre: 'Alitas BBQ 1', precio: 8.50, imagen: '/img/primero/Alitas1.png', kcal: 450, prot: 25, carb: 5 },
      { id: 102, nombre: 'Alitas BBQ 2', precio: 9.00, imagen: '/img/primero/Alitas2.png', kcal: 480, prot: 27, carb: 5 },
      { id: 103, nombre: 'Bistec Combinado', precio: 12.50, imagen: '/img/primero/Bistec convinado.png', kcal: 650, prot: 40, carb: 10 },
      { id: 104, nombre: 'Bowl Patatas Fritas', precio: 5.50, imagen: '/img/primero/Bowl Patatas fritas.png', kcal: 400, prot: 4, carb: 55 },
      { id: 105, nombre: 'Combos Especiales', precio: 15.00, imagen: '/img/primero/Combos.png', kcal: 800, prot: 35, carb: 60 },
      { id: 106, nombre: 'Nachos con Queso', precio: 7.50, imagen: '/img/primero/Nachos con queso.png', kcal: 500, prot: 10, carb: 45 },
      { id: 107, nombre: 'Palomitas de Maíz', precio: 3.50, imagen: '/img/primero/Palomitas de maíz.png', kcal: 250, prot: 3, carb: 30 },
      { id: 108, nombre: 'Pincho de Verduras', precio: 6.50, imagen: '/img/primero/Pincho de verduras.png', kcal: 180, prot: 5, carb: 12 },
      { id: 109, nombre: 'Pinchos Morunos', precio: 9.50, imagen: '/img/primero/Pinchos morunos.png', kcal: 420, prot: 35, carb: 2 },
      { id: 110, nombre: 'Pollo Broster', precio: 11.00, imagen: '/img/primero/Pollo broster.png', kcal: 600, prot: 30, carb: 20 },
      { id: 111, nombre: 'Tabla Flamenca', precio: 18.00, imagen: '/img/primero/Tabla flamenca.png', kcal: 750, prot: 45, carb: 10 }
    ]
  },
  segundo: { 
    titulo: 'ENSALADAS', icono: '🥗',
    platos: [
      { id: 201, nombre: 'Ensalada Alemana', precio: 9.50, imagen: '/img/segundo/Ensalada Alemana de Patata.jpg', kcal: 350, prot: 6, carb: 40 },
      { id: 202, nombre: 'Ensalada Caprese', precio: 10.00, imagen: '/img/segundo/Ensalada Caprese.jpg', kcal: 280, prot: 12, carb: 5 },
      { id: 203, nombre: 'Ensalada César', precio: 11.50, imagen: '/img/segundo/Ensalada César.jpg', kcal: 520, prot: 25, carb: 15 },
      { id: 204, nombre: 'Ensalada Coleslaw', precio: 8.00, imagen: '/img/segundo/Ensalada Coleslaw.jpg', kcal: 220, prot: 2, carb: 18 },
      { id: 205, nombre: 'Ensalada Griega', precio: 10.50, imagen: '/img/segundo/Ensalada Griega.jpg', kcal: 310, prot: 8, carb: 10 },
      { id: 206, nombre: 'Ensalada Mimosa', precio: 9.00, imagen: '/img/segundo/Ensalada Mimosa.jpg', kcal: 340, prot: 15, carb: 8 },
      { id: 207, nombre: 'Ensalada Nizarda', precio: 11.00, imagen: '/img/segundo/Ensalada Nizarda.jpg', kcal: 400, prot: 20, carb: 12 },
      { id: 208, nombre: 'Ensalada Tabulé', precio: 8.50, imagen: '/img/segundo/Ensalada Tabulé.jpg', kcal: 260, prot: 6, carb: 35 },
      { id: 209, nombre: 'Ensalada Waldorf', precio: 10.50, imagen: '/img/segundo/Ensalada Waldorf.jpg', kcal: 380, prot: 5, carb: 25 },
      { id: 210, nombre: 'Ensaladilla Rusa', precio: 9.00, imagen: '/img/segundo/Ensaladilla Rusa.jpg', kcal: 450, prot: 8, carb: 30 }
    ]
  },
  postres: { 
    titulo: 'BEBIDAS', icono: '🥤',
    platos: [
      { id: 301, nombre: 'Agua Mineral', precio: 1.50, imagen: '/img/postres/AguaMineral.jpg', kcal: 0, prot: 0, carb: 0 },
      { id: 302, nombre: 'Cerveza Club', precio: 3.50, imagen: '/img/postres/CervezaClub.jpg', kcal: 150, prot: 1, carb: 12 },
      { id: 303, nombre: 'Cerveza Guinness', precio: 4.50, imagen: '/img/postres/CervezaGuinness.jpg', kcal: 210, prot: 2, carb: 18 },
      { id: 304, nombre: 'Cerveza Heineken', precio: 3.50, imagen: '/img/postres/CervezaHeineken.jpg', kcal: 140, prot: 1, carb: 11 },
      { id: 305, nombre: 'Coca Cola', precio: 2.50, imagen: '/img/postres/CocaCola.jpg', kcal: 140, prot: 0, carb: 35 },
      { id: 306, nombre: 'Fanta', precio: 2.50, imagen: '/img/postres/Fanta.jpg', kcal: 150, prot: 0, carb: 38 },
      { id: 307, nombre: 'Guaraná', precio: 2.50, imagen: '/img/postres/Guarana.jpg', kcal: 120, prot: 0, carb: 30 },
      { id: 308, nombre: 'Pepsi', precio: 2.50, imagen: '/img/postres/Pepsi.jpg', kcal: 140, prot: 0, carb: 36 },
      { id: 309, nombre: 'Zumo de Frutas', precio: 3.00, imagen: '/img/postres/ZumoDeFrutas.jpg', kcal: 110, prot: 1, carb: 25 },
      { id: 310, nombre: 'Zumos Verdes', precio: 4.00, imagen: '/img/postres/ZumosVerdes.jpg', kcal: 90, prot: 2, carb: 18 }
    ]
  },
  otras: { 
    titulo: 'PIZZAS AL HORNO', icono: '🍕',
    platos: [
      { id: 401, nombre: 'Pizza Carbonara', precio: 13.50, imagen: '/img/otras/Carbonara.jpg', kcal: 900, prot: 35, carb: 80 },
      { id: 402, nombre: 'Pizza Champiñones', precio: 12.00, imagen: '/img/otras/Champiñones.jpg', kcal: 750, prot: 25, carb: 85 },
      { id: 403, nombre: 'Pizza Cuatro Quesos', precio: 14.00, imagen: '/img/otras/Cuatro Quesos.jpg', kcal: 1100, prot: 45, carb: 75 },
      { id: 404, nombre: 'Pizza Hawaiana', precio: 12.50, imagen: '/img/otras/Hawaiana.jpg', kcal: 850, prot: 28, carb: 90 },
      { id: 405, nombre: 'Pizza Margherita', precio: 11.00, imagen: '/img/otras/Margherita.jpg', kcal: 700, prot: 22, carb: 80 },
      { id: 406, nombre: 'Pizza Marinera', precio: 13.00, imagen: '/img/otras/Marinera.jpg', kcal: 650, prot: 30, carb: 75 },
      { id: 407, nombre: 'Pizza Napolitana', precio: 12.50, imagen: '/img/otras/Napolitana.jpg', kcal: 780, prot: 26, carb: 82 },
      { id: 408, nombre: 'Pizza Pepperoni', precio: 13.50, imagen: '/img/otras/Pepperoni.jpg', kcal: 950, prot: 32, carb: 85 },
      { id: 409, nombre: 'Pizza Rústica', precio: 14.50, imagen: '/img/otras/Rústica.jpg', kcal: 880, prot: 30, carb: 80 }
    ] 
  }
};



function AppContent() {
  // 1. CONSUMO DEL CONTEXTO
  const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart, calculateTotal } = useCart();
  
  // 2. ESTADOS DE NAVEGACIÓN, USUARIO Y ORÁCULO
  const [pantalla, setPantalla] = useState('welcome');
  const [categoriaActual, setCategoriaActual] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [fraseOraculo, setFraseOraculo] = useState(""); // <-- La frase mística viaja aquí
  const [datosFinales, setDatosFinales] = useState({ total: 0, metodo: '', ordenId: '' });

  // Cargar usuario al arrancar
  useEffect(() => {
    const savedUser = localStorage.getItem('oneToOneUser');
    if (savedUser) setUsuario(JSON.parse(savedUser));
  }, []);

  // 3. CÁLCULOS DINÁMICOS
  const totalItems = cartItems.reduce((acc, i) => acc + (i.cantidad || 1), 0);
  const totalNeto = calculateTotal();

  // 4. ORQUESTACIÓN DE NAVEGACIÓN
  const irACategoria = (id, fraseRecibida) => {
    if (fraseRecibida) setFraseOraculo(fraseRecibida); // Sella la frase
    setCategoriaActual(id); 
    setPantalla('categoria');
  };

  const finalizarCompra = (metodoElegido) => {
    const idGenerado = `QR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setDatosFinales({ 
      total: totalNeto, 
      metodo: metodoElegido,
      ordenId: idGenerado
    });
    setPantalla('ticket');
  };

  return (
    <div className="App" style={{ 
      width: '100vw', minHeight: '100vh', 
      background: '#1a0a0a', margin: 0, padding: 0,
      overflowX: 'hidden' 
    }}>
      
      {/* PANTALLA 1: BIENVENIDA */}
      {pantalla === 'welcome' && (
        <WelcomeInicio 
          usuario={usuario}
          onSelectCategory={irACategoria} 
        />
      )}

      {/* PANTALLA 2: SELECCIÓN */}
      {pantalla === 'categoria' && categoriaActual && (
        <CategoriaScreen2
          usuario={usuario}
          categoria={database[categoriaActual]}
          onAgregar={addToCart}
          onCarritoClick={() => setPantalla('resumen')}
          carritoCount={totalItems}
          onBack={() => setPantalla('welcome')}
        />
      )}

      {/* PANTALLA 3: RESUMEN */}
      {pantalla === 'resumen' && (
        <ResumenPedido 
          usuario={usuario}
          carrito={cartItems}
          total={totalNeto}
          alConfirmar={() => setPantalla('pago')} 
          alVolver={() => setPantalla('categoria')}
          modificarCantidad={updateQuantity}
          eliminarDelCarrito={removeFromCart}
        />
      )}

      {/* PANTALLA 4: PAGO */}
      {pantalla === 'pago' && (
        <SeccionPago 
          usuario={usuario}
          carrito={cartItems}
          total={totalNeto} 
          alConfirmar={finalizarCompra}
          alVolver={() => setPantalla('resumen')} 
        />
      )}

      {/* PANTALLA 5: TICKET (Aquí se imprime la profecía) */}
      {pantalla === 'ticket' && (
        <TicketConfirmacion 
          usuario={usuario}
          pedido={cartItems}
          total={datosFinales.total}
          metodo={datosFinales.metodo}
          ordenId={datosFinales.ordenId}
          fraseMistica={fraseOraculo} // <-- Inyectamos la frase guardada
          alFinalizar={() => {
            clearCart();
            setPantalla('welcome');
          }}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
