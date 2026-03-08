import React, { useState } from 'react';

export default function SeccionPago({ carrito, total, alConfirmar, alVolver }) {

  const [metodo, setMetodo] = useState('tarjeta');
  const [datosContacto, setDatosContacto] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });
  
  // Nuevos estados para la tarjeta
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
    // Limitamos caracteres para simular validación real
    if (name === 'numero' && value.length > 16) return;
    if (name === 'expira' && value.length > 5) return;
    if (name === 'cvv' && value.length > 3) return;
    
    setDatosTarjeta(prev => ({ ...prev, [name]: value }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!datosContacto.nombre.trim()) nuevosErrores.nombre = 'Requerido';
    if (!/\S+@\S+\.\S+/.test(datosContacto.email)) nuevosErrores.email = 'Email inválido';
    if (datosContacto.telefono.length < 9) nuevosErrores.telefono = 'Teléfono incompleto';
    
    if (metodo === 'tarjeta') {
      if (datosTarjeta.numero.length < 16) nuevosErrores.numero = 'Incompleto';
      if (!datosTarjeta.expira.includes('/')) nuevosErrores.expira = 'MM/AA';
      if (datosTarjeta.cvv.length < 3) nuevosErrores.cvv = 'CVV';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handlePagar = () => {
    if (validarFormulario()) {
      alConfirmar({
        metodo,
        contacto: datosContacto,
        tarjeta: metodo === 'tarjeta' ? '****' + datosTarjeta.numero.slice(-4) : null,
        total,
        items: carrito // Se envían al ticket para el resumen final
      });
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
            <input name="telefono" value={datosContacto.telefono} onChange={handleInputChange} style={styles.input} placeholder="09..." />
          </div>
        </div>
        <label style={{...styles.label, marginTop: '8px'}}>Email</label>
        <input name="email" value={datosContacto.email} onChange={handleInputChange} style={styles.input} placeholder="correo@app.com" />
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
            
            <div style={styles.gridCard}>
              <div>
                <label style={styles.label}>Expira</label>
                <input name="expira" value={datosTarjeta.expira} onChange={handleCardChange} style={styles.input} placeholder="MM/AA" />
              </div>
              <div>
                <label style={styles.label}>CVV</label>
                <input name="cvv" type="number" value={datosTarjeta.cvv} onChange={handleCardChange} style={styles.input} placeholder="123" />
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
