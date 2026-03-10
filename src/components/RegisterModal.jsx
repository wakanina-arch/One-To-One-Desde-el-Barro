import React, { useState, useEffect } from 'react';

export default function RegisterModal({ 
  open, onClose, onRegister, modo = 'registro', usuarioActual = null 
}) {
  const [formData, setFormData] = useState({
    nombre: '', email: '', password: '', confirmPassword: '',
    telefono: '', fechaNacimiento: '', fechaAdmision: '',
    // Logística desglosada en el mismo bloque
    calle: '', numero: '', bloque: '', escalera: '', piso: '', puerta: '', ciudad: '', cp: '', indicaciones: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      if (modo === 'editar' && usuarioActual) {
        setFormData({ ...usuarioActual, password: '', confirmPassword: '' });
      } else {
        setFormData(prev => ({ 
          ...prev, 
          fechaAdmision: new Date().toLocaleDateString(),
          nombre: '', email: '', telefono: '', password: '', confirmPassword: ''
        }));
      }
    }
  }, [open, modo, usuarioActual]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones de Identidad
    if (!formData.nombre || !formData.email || !formData.telefono) {
      return setError('Nombre, Email y Teléfono son imprescindibles');
    }
    if (modo === 'registro') {
      if (formData.password.length < 6) return setError('Contraseña muy corta (mín 6)');
      if (formData.password !== formData.confirmPassword) return setError('Las contraseñas no coinciden');
    }
    onRegister(formData);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        
        <div style={styles.headerComercial}>
          <span style={styles.iconoVip}>🔱</span>
          <div>
            <div style={styles.statusTexto}>{modo === 'registro' ? 'NUEVO REGISTRO' : 'MI AGENDA PERSONAL'}</div>
            <div style={styles.fechaIngreso}>Socio desde: {formData.fechaAdmision || 'Hoy'}</div>
          </div>
        </div>

        <h2 style={styles.titulo}>Ficha de Cliente VIP</h2>

        {error && <div style={styles.errorBanner}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.formularioScroll}>
          
          {/* SECCIÓN 1: IDENTIDAD */}
          <div style={styles.seccionLabel}>1. Identidad y Contacto</div>
          <Input label="Nombre y Apellidos" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Juan Pérez" />
          
          <div style={styles.row}>
            <div style={{flex: 1.5}}>
              <Input label="📞 Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="600 000 000" />
            </div>
            <div style={{flex: 1}}>
              <Input label="🎂 Cumpleaños" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />
            </div>
          </div>

          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          
          <div style={styles.row}>
            <Input label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} />
            <Input label="Confirmar" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
          </div>

          <div style={styles.separador} />

          {/* SECCIÓN 2: LOGÍSTICA (A continuación, sin pasos) */}
          <div style={styles.seccionLabel}>2. Dirección de Entrega (Opcional)</div>
          
          <Input label="Calle / Avenida" name="calle" value={formData.calle} onChange={handleChange} placeholder="Nombre de la vía" />
          
          <div style={styles.row}>
            <Input label="Nº" name="numero" value={formData.numero} onChange={handleChange} placeholder="14" />
            <Input label="Bloque" name="bloque" value={formData.bloque} onChange={handleChange} placeholder="B" />
            <Input label="Esc." name="escalera" value={formData.escalera} onChange={handleChange} placeholder="Izq" />
          </div>

          <div style={styles.row}>
            <Input label="Piso" name="piso" value={formData.piso} onChange={handleChange} placeholder="4º" />
            <Input label="Puerta" name="puerta" value={formData.puerta} onChange={handleChange} placeholder="C" />
            <Input label="CP" name="cp" value={formData.cp} onChange={handleChange} placeholder="28001" />
          </div>

          <Input label="Ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} placeholder="Madrid" />

          <div style={{ marginBottom: '1rem' }}>
            <label style={styles.label}>Notas para el Repartidor 🛵</label>
            <textarea 
              name="indicaciones" 
              value={formData.indicaciones} 
              onChange={handleChange} 
              placeholder="El telefonillo no funciona, llamar al móvil..."
              style={styles.textarea}
            />
          </div>

          <button type="submit" style={styles.btnPrincipal}>
            {modo === 'registro' ? '¡Unirse ahora!' : 'Actualizar mis datos'}
          </button>
        </form>
      </div>
    </div>
  );
}

const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: '1rem', flex: 1 }}>
    <label style={styles.label}>{label}</label>
    <input {...props} style={styles.input} />
  </div>
);

const styles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 },
  modal: { background: '#fff', borderRadius: '30px', padding: '1.5rem', width: '92%', maxWidth: '440px', border: '1.5px solid #FFD700', maxHeight: '90vh', display: 'flex', flexDirection: 'column' },
  formularioScroll: { overflowY: 'auto', paddingRight: '8px', paddingLeft: '2px' },
  headerComercial: { display: 'flex', alignItems: 'center', gap: '12px', background: '#1a0a0a', padding: '10px 15px', borderRadius: '15px', marginBottom: '12px', color: '#FFD700' },
  statusTexto: { fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1px' },
  fechaIngreso: { fontSize: '0.6rem', color: '#fff', opacity: 0.6 },
  titulo: { fontFamily: 'serif', color: '#3d0a0a', fontSize: '1.4rem', marginBottom: '1rem', textAlign: 'center' },
  seccionLabel: { fontSize: '0.8rem', fontWeight: 'bold', color: '#FF4500', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '5px', textTransform: 'uppercase' },
  label: { display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#8B0000', marginBottom: '3px' },
  input: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.9rem', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.9rem', height: '60px', resize: 'none', boxSizing: 'border-box' },
  row: { display: 'flex', gap: '8px' },
  separador: { height: '1.5rem' },
  btnPrincipal: { width: '100%', padding: '15px', background: 'linear-gradient(135deg, #1a0a0a, #3d0a0a)', color: '#FFD700', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginTop: '1rem', marginBottom: '1rem' },
  errorBanner: { background: '#ffebee', color: '#c62828', padding: '8px', borderRadius: '8px', fontSize: '0.75rem', marginBottom: '1rem', textAlign: 'center' }
};
