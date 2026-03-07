import React, { useState, useEffect } from 'react';
import KitchenStats from './KitchenStats';

export default function KitchenKanban({ 
  open, onClose, pendingOrders = [], setPendingOrders, finishedOrders = [], setFinishedOrders, addLog 
}) {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [timer, setTimer] = useState({});

  const COLUMNAS = [
    { id: 'nuevo', label: '🔥 ENTRANTE', color: '#FF4500' },
    { id: 'produccion', label: '👨‍🍳 BRASA', color: '#f39c12' },
    { id: 'entrega', label: '🥡 LISTO', color: '#27ae60' }
  ];

  // Lógica de cronómetro optimizada para dinamismo
  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const newTimers = {};
      pendingOrders.forEach(order => {
        const inicio = order.inicioProduccion ? new Date(order.inicioProduccion).getTime() : new Date(order.fecha).getTime();
        const elapsed = Math.floor((now - inicio) / 60000);
        const estimado = order.tiempoEstimado || 15;
        newTimers[order.id] = {
          elapsed,
          estimado,
          isOverdue: elapsed > estimado,
          percent: Math.min(100, (elapsed / estimado) * 100)
        };
      });
      setTimer(newTimers);
    }, 15000); // Actualización cada 15 segundos para más fluidez
    return () => clearInterval(interval);
  }, [open, pendingOrders]);

  const avanzarEstado = (order) => {
    const estados = ['nuevo', 'produccion', 'entrega', 'completado'];
    const nextState = estados[estados.indexOf(order.estado) + 1];
    
    let updatedOrder = { ...order, estado: nextState };
    if (nextState === 'produccion') updatedOrder.inicioProduccion = new Date().toISOString();
    if (nextState === 'entrega') updatedOrder.horaListo = new Date().toLocaleTimeString();

    if (nextState === 'completado') {
      setFinishedOrders(prev => [...prev, updatedOrder]);
      setPendingOrders(prev => prev.filter(o => o.id !== order.id));
      addLog?.({ tipo: 'ENTREGA', pedido: order.id, detalle: `Pedido entregado con éxito` });
    } else {
      setPendingOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
    }
  };

  if (!open) return null;

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.drawer} onClick={e => e.stopPropagation()}>
        
        <header style={styles.header}>
          <div>
            <h2 style={styles.titulo}>CONTROL DE BRASA 🔱</h2>
            <span style={styles.subtitulo}>Sincronización en tiempo real</span>
          </div>
          <button onClick={onClose} style={styles.btnClose}>FINALIZAR TURNO</button>
        </header>

        <div style={styles.board}>
          {COLUMNAS.map(col => (
            <div key={col.id} style={styles.column}>
              <div style={{...styles.colHeader, borderBottom: `4px solid ${col.color}`}}>
                <span>{col.label}</span>
                <span style={styles.countBadge}>{pendingOrders.filter(o => o.estado === col.id).length}</span>
              </div>

              <div style={styles.scrollArea}>
                {pendingOrders.filter(o => o.estado === col.id).map(order => (
                  <div 
                    key={order.id} 
                    style={{
                      ...styles.card,
                      borderLeft: `5px solid ${timer[order.id]?.isOverdue ? '#ff0000' : col.color}`,
                      animation: timer[order.id]?.isOverdue ? 'pulse-alert 2s infinite' : 'none'
                    }}
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div style={styles.cardInfo}>
                      <strong>#{order.id.slice(-4)}</strong>
                      <span style={styles.timeTag}>{timer[order.id]?.elapsed || 0} min</span>
                    </div>
                    
                    <div style={styles.itemsResumen}>
                      {order.items?.map(i => i.nombre).join(', ')}
                    </div>

                    {expandedOrder === order.id && (
                      <div style={styles.detalles}>
                        {order.items?.map((item, idx) => (
                          <div key={idx} style={styles.itemRow}>
                            <span>{item.cantidad}x <strong>{item.nombre}</strong></span>
                            <small>{item.opcionesSeleccionadas?.join(', ')}</small>
                          </div>
                        ))}
                        <button 
                          onClick={(e) => { e.stopPropagation(); avanzarEstado(order); }}
                          style={{...styles.btnNext, background: col.color}}
                        >
                          AVANZAR ESTADO ➔
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes pulse-alert { 0% { background: #fff; } 50% { background: #ffe6e6; } 100% { background: #fff; } }
      `}</style>
    </div>
  );
}

const styles = {
  backdrop: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  drawer: { width: '98vw', height: '95vh', background: '#1a0a0a', borderRadius: '20px', padding: '20px', overflow: 'hidden', border: '1px solid #3d0a0a' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #3d0a0a', paddingBottom: '15px' },
  titulo: { color: '#FFD700', margin: 0, fontFamily: "'Cormorant Garamond', serif" },
  subtitulo: { color: '#888', fontSize: '0.7rem', letterSpacing: '2px' },
  btnClose: { background: '#B22222', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' },
  board: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', height: '80%' },
  column: { background: 'rgba(255,255,255,0.03)', borderRadius: '15px', display: 'flex', flexDirection: 'column' },
  colHeader: { padding: '15px', display: 'flex', justifyContent: 'space-between', color: 'white', fontWeight: 'bold' },
  countBadge: { background: '#3d0a0a', padding: '2px 10px', borderRadius: '10px', color: '#FFD700' },
  scrollArea: { padding: '10px', overflowY: 'auto', flex: 1 },
  card: { background: 'white', padding: '15px', borderRadius: '12px', marginBottom: '10px', cursor: 'pointer', transition: '0.2s' },
  cardInfo: { display: 'flex', justifyContent: 'space-between', color: '#333', marginBottom: '5px' },
  timeTag: { fontSize: '0.7rem', background: '#eee', padding: '2px 6px', borderRadius: '5px' },
  itemsResumen: { fontSize: '0.85rem', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  detalles: { marginTop: '10px', borderTop: '1px dashed #ddd', paddingTop: '10px' },
  itemRow: { display: 'flex', flexDirection: 'column', marginBottom: '8px', color: '#1a0a0a' },
  btnNext: { width: '100%', padding: '12px', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }
};
