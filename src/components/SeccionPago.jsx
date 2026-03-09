import React, { useState } from 'react';

export default function SeccionPago({ total, alConfirmar, alVolver }) {

  const [metodo, setMetodo] = useState('tarjeta');
  const [datosContacto, setDatosContacto] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });
  
  const [datosTarjeta, setDatosTarjeta] = useState({
    numero: '',
    expira: '',
    cvv: ''
  });

  const [errores, setErrores] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosContacto(prev => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores(prev => ({ ...prev, [name]: '' }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    if (name === 'numero' && value.length > 16) return;
    if (name === 'expira' && value.length > 5) return;
    if (name === 'cvv' && value.length > 3) return;
    
    setDatosTarjeta(prev => ({ ...prev, [name]: value }));
  };

  // ✅ NUEVA VALIDACIÓN (más flexible)
  const validarFormulario = () => {
    const nuevosErrores = {};
    
    // Validaciones más flexibles
    if (!datosContacto.nombre.trim()) nuevosErrores.nombre = 'Requerido';
    
    // Email solo valida si tiene contenido
    if (datosContacto.email && !/\S+@\S+\.\S+/.test(datosContacto.email)) {
      nuevosErrores.email = 'Email inválido';
    }
    
    // Teléfono solo valida si tiene contenido
    if (datosContacto.telefono && datosContacto.telefono.length < 5) {
      nuevosErrores.telefono = 'Teléfono muy corto';
    }
    
    // Validación de tarjeta SOLO si el método es tarjeta
    if (metodo === 'tarjeta') {
      if (datosTarjeta.numero && datosTarjeta.numero.length < 16) {
        nuevosErrores.numero = 'Incompleto';
      }
      if (datosTarjeta.expira && !datosTarjeta.expira.includes('/')) {
        nuevosErrores.expira = 'MM/AA';
      }
      if (datosTarjeta.cvv && datosTarjeta.cvv.length < 3) {
        nuevosErrores.cvv = 'CVV';
      }
    }

    setErrores(nuevosErrores);
    return true; // ✅ SIEMPRE retorna true para permitir el pago
  };

  // ✅ NUEVO HANDLE PAGAR (con validación no bloqueante)
  const handlePagar = () => {
    console.log('💰 Botón PAGAR clickeado');
    validarFormulario(); // Solo muestra errores, no bloquea
    
    if (alConfirmar) {
      console.log('📦 Enviando método:', metodo);
      alConfirmar(metodo);
    } else {
      console.error('❌ alConfirmar es undefined');
    }
  };

  const styles = {
    contenedor: {
      padding: '15px',
      maxWidth: '400px',
      margin: '0 auto',
      background: '#fff',
      borderRadius: '25px',
      fontFamily: "'Cormorant Garamond', serif",
      height: '100%',
      overflowY: 'auto'
    },
    titulo: { textAlign: 'center', color: '#8B0000', fontSize: '1.5rem', marginBottom: '10px' },
    seccion: { marginBottom: '12px', padding: '10px', background: '#fcfcfc', borderRadius: '15px', border: '1px solid #eee' },
    label: { display: 'block', marginBottom: '3px', color: '#444', fontWeight: 'bold', fontSize: '0.75rem' },
    input: { width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.85rem', boxSizing: 'border-box' },
    gridCard: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px', marginTop: '10px' },
    btnPago: {
      width: '100%', padding: '12px', background: '#8B0000', color: 'white', border: 'none', 
      borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px'
    },
    metodosTab: { display: 'flex', gap: '5px', marginBottom: '10px' },
    tab: (active) => ({
      flex: 1, padding: '8px 2px', fontSize: '0.7rem', borderRadius: '8px', border: active ? '2px solid #8B0000' : '1px solid #ddd',
      background: active ? '#fff5f5' : '#f9f9f9', cursor: 'pointer', fontWeight: active ? 'bold' : 'normal'
    }),
    error: { color: 'red', fontSize: '0.65rem', marginTop: '2px' }
  };

  return (
    <div style={styles.contenedor}>
      <h2 style={styles.titulo}>Confirmar Pago</h2>

      {/* 1. DATOS PERSONALES */}
      <div style={styles.seccion}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
          <div>
            <label style={styles.label}>Nombre</label>
            <input name="nombre" value={datosContacto.nombre} onChange={handleInputChange} style={styles.input} placeholder="Tu nombre" />
            {errores.nombre && <span style={styles.error}>{errores.nombre}</span>}
          </div>
          <div>
            <label style={styles.label}>Teléfono</label>
            <input name="telefono" value={datosContacto.telefono} onChange={handleInputChange} style={styles.input} placeholder="Opcional" />
            {errores.telefono && <span style={styles.error}>{errores.telefono}</span>}
          </div>
        </div>
        <label style={{...styles.label, marginTop: '8px'}}>Email</label>
        <input name="email" value={datosContacto.email} onChange={handleInputChange} style={styles.input} placeholder="Opcional" />
        {errores.email && <span style={styles.error}>{errores.email}</span>}
      </div>

      {/* 2. MÉTODOS Y DATOS DE TARJETA */}
      <div style={styles.seccion}>
        <div style={styles.metodosTab}>
          {['tarjeta', 'efectivo', 'deuna'].map(m => (
            <button key={m} onClick={() => setMetodo(m)} style={styles.tab(metodo === m)}>
              {m.toUpperCase()}
            </button>
          ))}
        </div>

        {metodo === 'tarjeta' && (
          <div style={{animation: 'fadeIn 0.3s'}}>
            <label style={styles.label}>Número de Tarjeta</label>
            <input name="numero" type="number" value={datosTarjeta.numero} onChange={handleCardChange} style={styles.input} placeholder="0000 0000 0000 0000" />
            {errores.numero && <span style={styles.error}>{errores.numero}</span>}
            
            <div style={styles.gridCard}>
              <div>
                <label style={styles.label}>Expira</label>
                <input name="expira" value={datosTarjeta.expira} onChange={handleCardChange} style={styles.input} placeholder="MM/AA" />
                {errores.expira && <span style={styles.error}>{errores.expira}</span>}
              </div>
              <div>
                <label style={styles.label}>CVV</label>
                <input name="cvv" type="number" value={datosTarjeta.cvv} onChange={handleCardChange} style={styles.input} placeholder="123" />
                {errores.cvv && <span style={styles.error}>{errores.cvv}</span>}
              </div>
            </div>
          </div>
        )}
        
        {metodo === 'efectivo' && <p style={{fontSize: '0.8rem', textAlign: 'center', color: '#666'}}>Pagará al recibir su pedido.</p>}
      </div>

      {/* 3. TOTAL Y ACCIÓN */}
      <div style={{textAlign: 'center', padding: '10px 0'}}>
        <span style={{fontSize: '0.9rem', color: '#666'}}>Total a pagar:</span>
        <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#8B0000'}}>${total.toFixed(2)}</div>
      </div>

      <button onClick={handlePagar} style={styles.btnPago}>PAGAR AHORA</button>
      <button onClick={alVolver} style={{width: '100%', background: 'none', border: 'none', color: '#888', marginTop: '10px', fontSize: '0.8rem'}}>← Volver al carrito</button>
    </div>
  );
}