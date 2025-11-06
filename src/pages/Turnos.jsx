import '../App.css';
import '../styles/turnosPages.css';
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSearchParams } from 'react-router-dom';

// Datos centralizados para Categorías y Servicios
const datosTurnos = {
  categorias: [
    { value: 'servicio-trat-facial', label: 'TRATAMIENTOS FACIALES' },
    { value: 'servicio-rituales', label: 'NUESTROS RITUALES' },
    { value: 'servicio-corporales', label: 'TRATAMIENTOS CORPORALES' },
    { value: 'servicio-masajes', label: 'MASAJES' },
    { value: 'servicio-aroma', label: 'MASAJES CON AROMATERAPIA' },
  ],
  serviciosPorCategoria: {
    'servicio-trat-facial': [
      { value: 'essential-face-care', label: 'Essential Face Care' },
      { value: 'glowing-vit-c', label: 'Glowing Vit C+' },
      { value: 'rebalancing-face-care', label: 'Rebalancing Face Care' },
      { value: 'glowing-roses', label: 'Glowing Roses' },
    ],
    'servicio-rituales': [
      { value: 'ritual-nirvana-escape', label: 'Ritual Nirvana Escape' },
      { value: 'ritual-mind-soul', label: 'Ritual Mind & Soul' },
      { value: 'ritual-afflora', label: 'Ritual Afflora' },
      { value: 'ritual-mulfem', label: 'Ritual Mülfem' },
      { value: 'ritual-unad', label: 'Ritual Üñad' },
      { value: 'ritual-urkutun', label: 'Ritual Ürkutun' },
    ],
    'servicio-corporales': [
      { value: 'ceremonia-liwen', label: 'Ceremonia Liwen' },
      { value: 'ceremonia-ragiantu', label: 'Ceremonia Ragiantu' },
    ],
    'servicio-masajes': [
      { value: 'masaje-sueco', label: 'Masaje Sueco' },
      { value: 'masaje-hot-stones', label: 'Masaje Hot Stones' },
      { value: 'masaje-deep-tissue', label: 'Masaje Deep Tissue' },
      { value: 'masaje-signature', label: 'Masaje Signature' },
    ],
    'servicio-aroma': [
      { value: 'purificante', label: 'Purificante' },
      { value: 'relajante', label: 'Relajante' },
      { value: 'estimulante', label: 'Estimulante' },
    ],
  },
};

// Lógica simple para simular horarios disponibles (10:00, 15:00, 18:00)
// Nota: 'new Date()' se usa aquí para establecer la hora de hoy.
const horariosDisponibles = [
  new Date().setHours(10, 0, 0, 0),
  new Date().setHours(15, 0, 0, 0),
  new Date().setHours(18, 0, 0, 0),
];

// Función para filtrar días (solo Lunes, Jueves, Sábados)
const filterDiasSemana = (date) => {
  const day = date.getDay();
  // 1 = Lunes, 4 = Jueves, 6 = Sábado.
  return day === 1 || day === 4 || day === 6;
};


function Turnos() {
  //Localización desde página de servicio
   const [searchParams] = useSearchParams(); 

  // Estados para el formulario
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  // Estado para la validación y mensajes
  const [error, setError] = useState('');
  const [reservaExitosa, setReservaExitosa] = useState(false);

  // Obtener los servicios basados en la categoría actual
  // leer params al montar y preseleccionar si son válidos
  useEffect(() => {
    const categoriaParam = searchParams.get('categoria');
    const servicioParam = searchParams.get('servicio');

    if (categoriaParam && datosTurnos.categorias.some(c => c.value === categoriaParam)) {
      setCategoriaSeleccionada(categoriaParam);
      const serviciosDispon = datosTurnos.serviciosPorCategoria[categoriaParam] || [];
      if (servicioParam && serviciosDispon.some(s => s.value === servicioParam)) {
        setServicioSeleccionado(servicioParam);
      }
    }
  }, [searchParams]);

  // Obtener los servicios basados en la categoría actual
  const serviciosDisponibles = datosTurnos.serviciosPorCategoria[categoriaSeleccionada] || [];

  const handleCategoriaChange = (e) => {
    // Al cambiar la categoría, reseteamos el servicio
    setCategoriaSeleccionada(e.target.value);
    setServicioSeleccionado('');
    // Limpiamos mensajes de error
    setError('');
    setReservaExitosa(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto de recargar la página

    setError(''); // Limpiamos errores previos
    setReservaExitosa(false); // Limpiamos éxito previo

    // Validación de campos
    if (!categoriaSeleccionada || !servicioSeleccionado || !fechaSeleccionada || !horaSeleccionada) {
      setError('Por favor, selecciona una opción para todos los campos.');
      return;
    }

    // Si la validación es exitosa, se simula el envío a un servidor:
    console.log('Turno a reservar:', {
      categoria: categoriaSeleccionada,
      servicio: servicioSeleccionado,
      fecha: fechaSeleccionada.toLocaleDateString(),
      hora: horaSeleccionada.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    // Simulación de éxito
    setReservaExitosa(true);

    // Opcion: Resetear el formulario después de la reserva
    //setCategoriaSeleccionada('');
    //setServicioSeleccionado('');
    //setFechaSeleccionada(null);
    //setHoraSeleccionada(null);
  };
  

  return (
    <div className='MainT'>
      <section className="sectioncombos">
        <h2 id="Texturno">Reserva tu turno </h2>


        {error && <Alert variant="danger">{error}</Alert>}


        {reservaExitosa && <Alert variant="success">✅ ¡Turno reservado con éxito!</Alert>}

        <Form id="formuselec" onSubmit={handleSubmit}>


          <div className="input-group mb-3">
            <Form.Label className="input-group-text" htmlFor="categoriaturno">CATEGORÍA</Form.Label>
            <Form.Select
              className="form-select"
              id="categoriaturno"
              value={categoriaSeleccionada}
              onChange={handleCategoriaChange}
            >
              <option value="">SELECCIONAR CATEGORÍA</option>
              {datosTurnos.categorias.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="input-group mb-3">
            <Form.Label className="input-group-text" htmlFor="servicio-tipo">TIPO DE SERVICIO</Form.Label>
            {categoriaSeleccionada ? (
              <Form.Select
                value={servicioSeleccionado}
                onChange={(e) => setServicioSeleccionado(e.target.value)}
              >
                <option value="">SELECCIONAR SERVICIO</option>
                {serviciosDisponibles.map((servicio) => (
                  <option key={servicio.value} value={servicio.value}>
                    {servicio.label}
                  </option>
                ))}
              </Form.Select>
            ) : (
              <p className="form-text mt-2 text-muted">Selecciona una **Categoría** para ver los servicios disponibles.</p>
            )}
          </div>
          <div className="input-group mb-3">
            <Form.Label className="input-group-text" htmlFor="dia">FECHA</Form.Label>
            <div className="form-control p-0" style={{ border: 'none' }}>
              <DatePicker
                selected={fechaSeleccionada}
                onChange={(date) => setFechaSeleccionada(date)}
                filterDate={filterDiasSemana}
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccionar Fecha"
                className="form-control custom-date-picker" // Clase personalizada para ajuste
                minDate={new Date()}
              />
            </div>
          </div>


          <div className="input-group mb-3">
            <Form.Label className="input-group-text" htmlFor="horario">HORARIO</Form.Label>
            <div className="form-control p-0" style={{ border: 'none' }}>
              <DatePicker
                selected={horaSeleccionada}
                onChange={(date) => setHoraSeleccionada(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Hora"
                dateFormat="h:mm aa"
                placeholderText="Seleccionar Horario"
                className="form-control custom-date-picker"
                includeTimes={horariosDisponibles}
                disabled={!fechaSeleccionada}
              />
            </div>
          </div>


          <Button type="submit" variant="primary" className="confirTurno btnturno">
            Confirmar Turno
          </Button>

        </Form>
      </section>

      <hr className='hrturnos mt-4' />

      <section>
        <article className="turnos-reservados">
          <h3>Resumen de la Selección </h3>
          <p>Categoría: **{datosTurnos.categorias.find(c => c.value === categoriaSeleccionada)?.label || 'Pendiente'}**</p>
          <p>Servicio: **{serviciosDisponibles.find(s => s.value === servicioSeleccionado)?.label || 'Pendiente'}**</p>
          <p>Fecha: **{fechaSeleccionada ? fechaSeleccionada.toLocaleDateString() : 'Pendiente'}**</p>
          <p>Hora: **{horaSeleccionada ? horaSeleccionada.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Pendiente'}**</p>
          <hr className='hrturnos' />
        </article>
      </section>
    </div>
  );
}

export default Turnos;