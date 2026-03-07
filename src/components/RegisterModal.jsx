import React, { useState } from 'react';

export default function RegisterModal({ open, onClose, onRegister }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '', email: '', password: '', telefono: '',
    direccion: '', ciudad: '', cp: ''
  });
  const [error, setError] = useState('');

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.nombre.trim() || !formData.email.includes('@') || formData.password.length < 6) {
        return setError('Revisa tus credenciales de acceso');
      }
      setStep(2);
    } else {
      if (!formData.direccion.trim() || !formData.ciudad.trim() || !formData.cp.trim()) {
        return setError('La ubicación es clave para tu banquete');
      }
      // Inyectamos datos de la fase Beta para el futuro
      onRegister({
        ...formData,
        puntos_beta: 100, // Regalo de bienvenida
        fecha_registro: new Date().toISOString(),
        rol: 'BETA_TESTER'
      });
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(26, 10, 10, 0.9)', // Oscuro profundo
      backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 2000, padding: '1rem'
    }} onClick={onClose}>
      
      <div style={{
        background: '#fdfaf6', // Color hueso/barro claro
        borderRadius: '35px',
        padding: '2rem',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        border: '1px solid #FFD700',
        position: 'relative',
        overflow: 'hidden'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Indicador de Progreso Visual */}
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
          {step === 1 ? 'Únete a la Brasa' : 'Tu Territorio'}
        </h2>
        
        <p style={{
          textAlign: 'center', color: '#8B0000', fontSize: '0.9rem',
          marginBottom: '2rem', fontStyle: 'italic', opacity: 0.8
        }}>
          {step === 1 ? 'Forma parte de nuestra comunidad universitaria' : 'Dinos dónde encontrarte'}
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
                <Input label="Nombre de Guerrero/a" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Alex Noble" />
                <Input label="Email Universitario" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="estudiante@uni.edu" />
                <Input label="Contraseña Maestra" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••" />
              </>
            ) : (
              <>
                <Input label="Dirección o Facultad" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Calle, edificio, aula..." />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <Input label="Ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} placeholder="Ciudad" />
                  <Input label="C.P." name="cp" value={formData.cp} onChange={handleChange} placeholder="00000" />
                </div>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            {step === 2 && (
              <button type="button" onClick={() => setStep(1)} style={secondaryBtn}>Atrás</button>
            )}
            <button type="submit" style={primaryBtn}>
              {step === 1 ? 'Continuar' : 'Reclamar Recompensas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Sub-componente para limpieza visual
const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: '1.2rem' }}>
    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#3d0a0a', letterSpacing: '1px' }}>
      {label}
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
