import React, { useState, useEffect } from 'react';

export default function RegisterModal({ 
  open, 
  onClose, 
  onRegister,
  modo = 'registro',      // 'registro' o 'editar'
  usuarioActual = null    // para modo editar
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    telefono: '',
    fechaNacimiento: '',          // ← NUEVO CAMPO
    fechaAdmision: '',             // ← NUEVO CAMPO (informativo)
    historialPedidos: 0,           // ← NUEVO CAMPO (para futuras promociones)
    direccion: '', 
    ciudad: '', 
    cp: ''
  });
  const [error, setError] = useState('');

  // Cargar datos del usuario cuando se abre en modo editar
  useEffect(() => {
    if (open && modo === 'editar' && usuarioActual) {
      setFormData({
        nombre: usuarioActual.nombre || '',
        email: usuarioActual.email || '',
        password: '', 
        confirmPassword: '',
        telefono: usuarioActual.telefono || '',
        fechaNacimiento: usuarioActual.fechaNacimiento || '',    // ← Cargar
        fechaAdmision: usuarioActual.fechaAdmision || '',         // ← Cargar
        historialPedidos: usuarioActual.historialPedidos || 0,    // ← Cargar
        direccion: usuarioActual.direccion || '',
        ciudad: usuarioActual.ciudad || '',
        cp: usuarioActual.cp || ''
      });
      setStep(2);
    } else if (open && modo === 'registro') {
      // Resetear formulario para nuevo registro
      const hoy = new Date().toISOString().split('T')[0]; // Fecha actual YYYY-MM-DD
      setFormData({
        nombre: '', email: '', password: '', confirmPassword: '', telefono: '',
        fechaNacimiento: '',           // Vacío para que el usuario ingrese
        fechaAdmision: hoy,             // ← Auto asignar fecha actual
        historialPedidos: 0,             // ← Inicia en 0
        direccion: '', ciudad: '', cp: ''
      });
      setStep(1);
    }
  }, [open, modo, usuarioActual]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 1) {
      // VALIDACIÓN MODO REGISTRO
      if (modo === 'registro') {
        if (!formData.nombre.trim()) {
          return setError('El nombre es obligatorio');
        }
        if (!formData.email.includes('@')) {
          return setError('Email inválido');
        }
        if (formData.password.length < 6) {
          return setError('La contraseña debe tener al menos 6 caracteres');
        }
        if (formData.password !== formData.confirmPassword) {
          return setError('Las contraseñas no coinciden');
        }
        if (!formData.telefono.trim() || formData.telefono.length < 9) {
          return setError('Teléfono es obligatorio (mínimo 9 dígitos)');
        }
        if (!formData.fechaNacimiento) {   // ← NUEVA VALIDACIÓN
          return setError('Fecha de nacimiento es obligatoria');
        }
      }
      setStep(2);
      
    } else {
      // VALIDACIÓN DATOS DE ENTREGA (aplica para ambos modos)
      if (!formData.direccion.trim()) {
        return setError('La dirección es obligatoria');
      }
      if (!formData.ciudad.trim()) {
        return setError('La ciudad es obligatoria');
      }
      if (!formData.cp.trim() || formData.cp.length < 5) {
        return setError('Código postal obligatorio (5 dígitos)');
      }
      
      // Preparar datos según el modo
      let datosUsuario;
      
      if (modo === 'registro') {
        datosUsuario = {
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          telefono: formData.telefono,
          fechaNacimiento: formData.fechaNacimiento,     // ← Incluido
          fechaAdmision: formData.fechaAdmision,          // ← Incluido
          historialPedidos: 0,                             // ← Inicia en 0
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          cp: formData.cp,
          puntos_beta: 100,
          fecha_registro: new Date().toISOString(),
          rol: 'BETA_TESTER'
        };
      } else {
        // En modo editar, conservamos el historial de pedidos existente
        datosUsuario = {
          ...usuarioActual,
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          fechaNacimiento: formData.fechaNacimiento,      // ← Actualizable
          // fechaAdmision NO se actualiza en edición
          historialPedidos: usuarioActual.historialPedidos || 0, // Conservar
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          cp: formData.cp
        };
        
        if (formData.password && formData.password.length >= 6) {
          if (formData.password !== formData.confirmPassword) {
            return setError('Las contraseñas no coinciden');
          }
          datosUsuario.password = formData.password;
        }
      }
      
      onRegister(datosUsuario);
    }
  };

  const handleVolver = () => {
    setStep(1);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(26, 10, 10, 0.9)',
      backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 2000, padding: '1rem'
    }} onClick={onClose}>
      
      <div style={{
        background: '#fdfaf6',
        borderRadius: '35px',
        padding: '2rem',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        border: '1px solid #FFD700',
        position: 'relative',
        overflow: 'hidden'
      }} onClick={e => e.stopPropagation()}>
        
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '6px',
          width: step === 1 ? '50%' : '100%',
          background: 'linear-gradient(90deg, #FF4500, #FFD700)',
          transition: 'width 0.5s ease'
        }} />

        <h2 style={{
          color: '#3d0a0a',
          fontSize: '1.8rem',
          fontFamily: "'Cormorant Garamond', serif",
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}>
          {modo === 'registro' 
            ? (step === 1 ? 'Únete a la Brasa' : 'Tu Territorio')
            : (step === 1 ? 'Editar Perfil' : 'Actualizar Dirección')}
        </h2>
        
        <p style={{
          textAlign: 'center', color: '#8B0000', fontSize: '0.9rem',
          marginBottom: '2rem', fontStyle: 'italic', opacity: 0.8
        }}>
          {modo === 'registro' 
            ? (step === 1 ? 'Forma parte de nuestra comunidad' : 'Dinos dónde encontrarte')
            : (step === 1 ? 'Modifica tus datos' : 'Actualiza tu ubicación')}
        </p>

        {error && (
          <div style={{ 
            color: '#fff', background: '#B22222', padding: '0.8rem', 
            borderRadius: '12px', fontSize: '0.8rem', marginBottom: '1rem', textAlign: 'center' 
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '5px' }}>
            {step === 1 ? (
              <>
                <Input 
                  label="Nombre Completo"        // ← Cambiado
                  name="nombre" 
                  value={formData.nombre} 
                  onChange={handleChange} 
                  placeholder="Ej: Juan Pérez" 
                  required
                />
                
                <Input 
                  label="Email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="estudiante@uni.edu" 
                  required
                />
                
                <Input 
                  label="Teléfono" 
                  name="telefono" 
                  value={formData.telefono} 
                  onChange={handleChange} 
                  placeholder="09..." 
                  required
                />
                
                {/* NUEVO CAMPO: Fecha de Nacimiento */}
                <Input 
                  label="Fecha de Nacimiento" 
                  name="fechaNacimiento" 
                  type="date" 
                  value={formData.fechaNacimiento} 
                  onChange={handleChange} 
                  required
                />
                
                {/* MODO REGISTRO: Campo informativo de Fecha de Admisión */}
                {modo === 'registro' && (
                  <div style={{ marginBottom: '1.2rem', opacity: 0.8 }}>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#3d0a0a' }}>
                      Fecha de Admisión <span style={{color: '#B22222'}}>*</span>
                    </label>
                    <input 
                      type="date" 
                      name="fechaAdmision"
                      value={formData.fechaAdmision} 
                      disabled
                      style={{
                        width: '100%', padding: '0.9rem', border: '1px solid #ddd', borderRadius: '15px',
                        fontSize: '1rem', background: '#f0f0f0', color: '#666', cursor: 'not-allowed'
                      }} 
                    />
                    <p style={{ fontSize: '0.7rem', color: '#8B0000', marginTop: '4px' }}>
                      📅 Fecha de ingreso al sistema (asignada automáticamente)
                    </p>
                  </div>
                )}
                
                {/* MODO EDITAR: Mostrar Fecha de Admisión como informativa */}
                {modo === 'editar' && (
                  <div style={{ marginBottom: '1.2rem', opacity: 0.8 }}>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#3d0a0a' }}>
                      Fecha de Admisión
                    </label>
                    <input 
                      type="date" 
                      value={formData.fechaAdmision} 
                      disabled
                      style={{
                        width: '100%', padding: '0.9rem', border: '1px solid #ddd', borderRadius: '15px',
                        fontSize: '1rem', background: '#f0f0f0', color: '#666', cursor: 'not-allowed'
                      }} 
                    />
                  </div>
                )}
                
                {/* MODO EDITAR: Mostrar Historial de Pedidos */}
                {modo === 'editar' && (
                  <div style={{ marginBottom: '1.2rem', background: '#f9f0e6', padding: '1rem', borderRadius: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#3d0a0a' }}>
                      📊 Historial de Pedidos
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#8B0000' }}>
                        {formData.historialPedidos} pedidos
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#666' }}>
                        {formData.historialPedidos > 0 ? '🔥 Cliente recurrente' : '🌟 Primeros pasos'}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.7rem', color: '#B8860B', marginTop: '8px' }}>
                      Acumula pedidos para desbloquear promociones especiales
                    </p>
                  </div>
                )}
                
                {(modo === 'registro' || (modo === 'editar' && formData.password)) && (
                  <>
                    <Input 
                      label="Contraseña Maestra" 
                      name="password" 
                      type="password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      placeholder="••••••" 
                      required={modo === 'registro'}
                    />
                    <Input 
                      label="Confirmar Contraseña" 
                      name="confirmPassword" 
                      type="password" 
                      value={formData.confirmPassword} 
                      onChange={handleChange} 
                      placeholder="••••••" 
                      required={modo === 'registro'}
                    />
                  </>
                )}
                
                {modo === 'editar' && !formData.password && (
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, password: ' '})} 
                    style={{
                      background: 'transparent',
                      border: '1px dashed #B22222',
                      borderRadius: '15px',
                      padding: '0.8rem',
                      width: '100%',
                      marginBottom: '1rem',
                      color: '#B22222',
                      cursor: 'pointer'
                    }}
                  >
                    + Cambiar contraseña
                  </button>
                )}
              </>
            ) : (
              <>
                <Input 
                  label="Dirección"              // ← Eliminado "o Facultad"
                  name="direccion" 
                  value={formData.direccion} 
                  onChange={handleChange} 
                  placeholder="Calle, número, edificio..." 
                  required
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <Input 
                    label="Ciudad" 
                    name="ciudad" 
                    value={formData.ciudad} 
                    onChange={handleChange} 
                    placeholder="Ciudad" 
                    required
                  />
                  <Input 
                    label="C.P." 
                    name="cp" 
                    value={formData.cp} 
                    onChange={handleChange} 
                    placeholder="00000" 
                    required
                  />
                </div>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            {step === 2 && (
              <button type="button" onClick={handleVolver} style={secondaryBtn}>
                Atrás
              </button>
            )}
            <button type="submit" style={primaryBtn}>
              {step === 1 
                ? 'Continuar' 
                : (modo === 'registro' ? 'Reclamar Recompensas' : 'Guardar Cambios')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Sub-componente Input con asterisco para requeridos
const Input = ({ label, required, ...props }) => (
  <div style={{ marginBottom: '1.2rem' }}>
    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#3d0a0a', letterSpacing: '1px' }}>
      {label} {required && <span style={{color: '#B22222'}}>*</span>}
    </label>
    <input {...props} style={{
      width: '100%', padding: '0.9rem', border: '1px solid #ddd', borderRadius: '15px',
      fontSize: '1rem', background: '#fff', outline: 'none', transition: '0.3s'
    }} />
  </div>
);

// Estilos de botones
const primaryBtn = {
  flex: 1, padding: '1rem', background: 'linear-gradient(135deg, #FF4500, #B22222)',
  color: 'white', border: 'none', borderRadius: '18px', fontWeight: 700,
  cursor: 'pointer', boxShadow: '0 10px 20px rgba(178, 34, 34, 0.3)'
};

const secondaryBtn = {
  padding: '1rem', background: 'transparent', color: '#B22222',
  border: '2px solid #B22222', borderRadius: '18px', fontWeight: 700, cursor: 'pointer'
};