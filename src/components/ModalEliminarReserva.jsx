import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { eliminarReserva } from '../helpers/ReservasApi';

export function ModalEliminarReserva({ show, onHide, reserva, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirmDelete = async () => {
    setLoading(true);
    setError('');

    try {
      await eliminarReserva(reserva._id);

      onDelete(reserva);

    } catch (err) {
      console.error('Error al eliminar la reserva:', err);
      setError('Error al eliminar la reserva: ' + err.message);
      setLoading(false);
    }
  };

  // Formatear la fecha de reserva
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <p className="mb-3">
          <strong>Confirma la eliminación de la reserva N° {reserva?._id}</strong>
        </p>
        <div className="reserva-info">
          <p><strong>Servicio:</strong> {reserva?.servicio?.nombre || reserva?.servicio}</p>
          <p><strong>Fecha de reserva:</strong> {reserva?.fechaReserva && formatearFecha(reserva.fechaReserva)}</p>
          <p><strong>Profesional:</strong> {reserva?.profesional?._id || reserva?.profesional?.uid || reserva?.profesional || 'No disponible'}</p>
          <p><strong>Usuario:</strong> {reserva?.usuario?.nombre || 'No disponible'}</p>
        </div>
        <p className="text-muted mt-3">Esta acción no se puede deshacer.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          variant="danger" 
          onClick={handleConfirmDelete}
          disabled={loading}
        >
          {loading ? 'Eliminando...' : 'Confirmar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
