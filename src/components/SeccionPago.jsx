// src/components/SeccionPago.jsx
import React, { useState } from 'react';

export default function SeccionPago({ carrito, total, alConfirmar, alVolver, estilos = {} }) {
  const [metodo, setMetodo] = useState('tarjeta');
  const [datosContacto, setDatosContacto] = useState({
    nombre: '',
    email: '',
    telefono: '',
    notas: ''
  });

  const [errores, setErrores] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosContacto(prev => ({
      ...prev,
      [name]: value
    }));
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!datosContacto.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }
    
    if (!datosContacto.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(datosContacto.email)) {
      nuevosErrores.email = 'Email inválido';
    }
    
    if (!datosContacto.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es obligatorio';
    } else if (!/^\d{10}$/.test(datosContacto.telefono.replace(/\s/g, ''))) {
      nuevosErrores.telefono = '10 dígitos';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handlePagar = () => {
    if (validarFormulario()) {
      alConfirmar({
        metodo,
        contacto: datosContacto,
        total,
        items: carrito
      });
    }
  };

  // Estilos ESCALADOS (zoom reducido)
  const styles = {
    contenedor: {
      padding: '10px',
      maxWidth: '500px',
      margin: '15px auto',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      fontFamily: "'Cormorant Garamond', serif",
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    titulo: {
      textAlign: 'center',
      color: '#8B0000',
      fontSize: '1.8rem',
      marginBottom: '8px',
      borderBottom: '2px solid #FFD700',
      paddingBottom: '8px'
    },
    subtitulo: {
      color: '#666',
      fontSize: '0.9rem',
      textAlign: 'center',
      marginBottom: '15px'
    },
    seccion: {
      marginBottom: '15px',
      padding: '6px',
      background: '#f9f9f9',
      borderRadius: '12px',
      border: '1px solid #eee'
    },
    seccionTitulo: {
      color: '#8B0000',
      fontSize: '1.1rem',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    grid2: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '8px',
      marginBottom: '5px'
    },
    campo: {
      marginBottom: '10px'
    },
    label: {
      display: 'block',
      marginBottom: '4px',
      color: '#555',
      fontWeight: 'bold',
      fontSize: '0.8rem'
    },
    input: {
      width: '95%',
      padding: '6px 6px',
      border: `2px solid ${errores.nombre ? '#ff4444' : '#ddd'}`,
      borderRadius: '8px',
      fontSize: '0.9rem',
      transition: 'border 0.3s',
      outline: 'none'
    },
    errorText: {
      color: '#ff4444',
      fontSize: '0.7rem',
      marginTop: '2px',
      marginLeft: '5px'
    },
    // MÉTODOS DE PAGO - AHORA MÁS COMPACTOS
    metodosPago: {
      display: 'flex',
      gap: '6px',
      marginBottom: '6px',
      flexWrap: 'wrap'
    },
    metodoBtn: {
      flex: '1 1 auto',
      minWidth: '70px',
      padding: '8px 5px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      background: 'white',
      fontSize: '0.8rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: '#333',
      textAlign: 'center'
    },
    metodoActivo: {
      border: '2px solid #8B0000',
      background: '#fff0f0',
      transform: 'scale(0.98)'
    },
    // Detalles método - texto pequeño
    metodoDetalle: {
      fontSize: '0.75rem',
      color: '#666',
      margin: '5px 0 8px 0',
      padding: '3px 5px',
      background: '#f5f5f5',
      borderRadius: '6px'
    },
    // Resumen pedido - más compacto
    resumen: {
      background: '#f0f0f0',
      padding: '3px',
      borderRadius: '8px',
      marginBottom: '12px',
      maxHeight: '70px',
      overflowY: 'auto'
    },
    itemResumen: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.8rem',
      padding: '3px 0',
      borderBottom: '1px dashed #ccc'
    },
    total: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#8B0000',
      padding: '2px 0 0 0',
      marginTop: '4px',
      borderTop: '2px solid #8B0000'
    },
    notas: {
      width: '95%',
      padding: '2px 2px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      fontSize: '0.85rem',
      minHeight: '10px',
      resize: 'vertical'
    },
    botonPagar: {
      width: '100%',
      padding: '6px',
      background: '#8B0000',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginBottom: '8px',
      boxShadow: '0 4px 10px rgba(139, 0, 0, 0.3)'
    },
    botonVolver: {
      width: '100%',
      padding: '6px',
      background: 'none',
      border: '2px solid #ddd',
      borderRadius: '8px',
      color: '#666',
      fontSize: '0.9rem',
      cursor: 'pointer'
    }
  };

  return (
    <div style={{ ...styles.contenedor, ...estilos.contenedor }}>
      <h2 style={styles.titulo}>🍽️ Finalizar Compra</h2>
      <p style={styles.subtitulo}>Completa tus datos</p>

      {/* DATOS CONTACTO - Grid 2 columnas */}
      <div style={styles.seccion}>
        <h3 style={styles.seccionTitulo}>📞 Datos de Contacto</h3>
        
        <div style={styles.grid2}>
          <div style={styles.campo}>
            <label style={styles.label}>Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={datosContacto.nombre}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Nombre"
            />
            {errores.nombre && <div style={styles.errorText}>{errores.nombre}</div>}
          </div>

          <div style={styles.campo}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              name="email"
              value={datosContacto.email}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="email@ej.com"
            />
            {errores.email && <div style={styles.errorText}>{errores.email}</div>}
          </div>

          <div style={styles.campo}>
            <label style={styles.label}>Teléfono *</label>
            <input
              type="tel"
              name="telefono"
              value={datosContacto.telefono}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="0999999999"
            />
            {errores.telefono && <div style={styles.errorText}>{errores.telefono}</div>}
          </div>
        </div>
      </div>

      {/* MÉTODOS DE PAGO - COMPACTOS */}
      <div style={styles.seccion}>
        <h3 style={styles.seccionTitulo}>💳 Método de Pago</h3>

        <div style={styles.metodosPago}>
          {[
            { id: 'tarjeta', label: '💳 Tarjeta' },
            { id: 'efectivo', label: '💵 Efectivo' },
            { id: 'deuna', label: '📱 Deuna' },
            { id: 'paypal', label: '🅿️ PayPal' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMetodo(m.id)}
              style={{
                ...styles.metodoBtn,
                ...(metodo === m.id ? styles.metodoActivo : {})
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Detalles del método - texto pequeño */}
        {metodo === 'tarjeta' && (
          <div style={styles.metodoDetalle}>
            <span>Aceptamos Visa, Mastercard, Diners</span>
          </div>
        )}
        {metodo === 'deuna' && (
          <div style={styles.metodoDetalle}>
            <span>Escanea QR en app Deuna</span>
          </div>
        )}
        {metodo === 'paypal' && (
          <div style={styles.metodoDetalle}>
            <span>Redirigimos a PayPal seguro</span>
          </div>
        )}
        {metodo === 'efectivo' && (
          <div style={{ ...styles.metodoDetalle, color: '#27ae60' }}>
            <span>✅ Pagas al recibir</span>
          </div>
        )}
      </div>

      {/* NOTAS - Opcional */}
      <div style={styles.seccion}>
        <h3 style={styles.seccionTitulo}>📝 Notas (opcional)</h3>
        <textarea
          name="notas"
          value={datosContacto.notas}
          onChange={handleInputChange}
          placeholder="¿Alguna instrucción?"
          style={styles.notas}
        />
      </div>

      {/* RESUMEN DEL PEDIDO - COMPACTO */}
      <div style={styles.seccion}>
        <h3 style={styles.seccionTitulo}>🛒 Resumen</h3>
        <div style={styles.resumen}>
          {carrito.map((item, idx) => (
            <div key={idx} style={styles.itemResumen}>
              <span>{item.nombre} x{item.cantidad}</span>
              <span>${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>
          ))}
          <div style={styles.total}>
            <span>TOTAL</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      {/* BOTONES */}
      <button onClick={handlePagar} style={styles.botonPagar}>
        💳 PAGAR ${total}
      </button>

      <button onClick={alVolver} style={styles.botonVolver}>
        ← VOLVER
      </button>
    </div>
  );
}