import '../App.css';
import '../styles/turnosPages.css';
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const generarHorarioDate = (hora) => {

    return new Date().setHours(hora, 0, 0, 0);
}

const datosTurnos = {
    // Nombre Profesionales
    profesionales: [
        { id: 'pro_ana', nombre: 'Ana García', especialidad: 'Facial' },
        { id: 'pro_luis', nombre: 'Luis Torres', especialidad: 'Masajes' },
        { id: 'pro_maria', nombre: 'María Soto', especialidad: 'Rituales' },
        { id: 'pro_juan', nombre: 'Juan Pérez', especialidad: 'Corporal' },
    ],

    // Categorías servicios
    categorias: [
        { value: 'servicio-trat-facial', label: 'TRATAMIENTOS FACIALES' },
        { value: 'servicio-rituales', label: 'NUESTROS RITUALES' },
        { value: 'servicio-masajes', label: 'MASAJES' },
    ],

    // Disponibilidad servicios
    serviciosPorCategoria: {
        'servicio-trat-facial': [
            {
                value: 'essential-face-care',
                label: 'Essential Face Care',

                diasDisponibles: [1, 4],

                horariosDisponibles: [10, 15],
                profesionalesId: ['pro_ana'],
            },

            {
                value: 'glowing-vit-c',
                label: 'Glowing Vit C+',

                diasDisponibles: [2, 5],

                horariosDisponibles: [12, 17],
                profesionalesId: ['pro_ana', 'pro_maria'],
            },
        ],

        'servicio-rituales': [
            {
                value: 'ritual-nirvana-escape',
                label: 'Ritual Nirvana Escape',

                diasDisponibles: [6],

                horariosDisponibles: [11, 16],
                profesionalesId: ['pro_maria', 'pro_luis'],
            },
        ],

        'servicio-masajes': [
            {
                value: 'masaje-sueco',
                label: 'Masaje Sueco',
                diasDisponibles: [2, 5],

                horariosDisponibles: [14, 18],
                profesionalesId: ['pro_luis', 'pro_juan'],
            },

            {
                value: 'Masaje Hot Stones',
                label: 'Masaje Hot Stones',

                diasDisponibles: [2, 5],
                horariosDisponibles: [15, 19],
                profesionalesId: ['pro_luis', 'pro_juan'],
            },

            {
                value: 'Masaje Signature',
                label: 'Masaje Signature',

                diasDisponibles: [2, 5],
                horariosDisponibles: [17, 20],
                profesionalesId: ['pro_luis', 'pro_juan'],
            },

            {
                value: 'Masaje Deep Tissue',
                label: 'Masaje Deep Tissue',

                diasDisponibles: [2, 5],

                horariosDisponibles: [14, 18],
                profesionalesId: ['pro_luis', 'pro_juan'],
            },
        ],
    },
};


// COMPONENTE TURNO

function Turnos() {

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [servicioSeleccionado, setServicioSeleccionado] = useState('');
    const [profesionalSeleccionadoId, setProfesionalSeleccionadoId] = useState('');
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [horaSeleccionada, setHoraSeleccionada] = useState(null);

    const [error, setError] = useState('');
    const [reservaExitosa, setReservaExitosa] = useState(false);


    const serviciosDeCategoria = datosTurnos.serviciosPorCategoria[categoriaSeleccionada] || [];
    const servicioActual = serviciosDeCategoria.find((s) => s.value === servicioSeleccionado);

    //Disponibilidad de Días y Horas
    const diasPermitidos = servicioActual ? servicioActual.diasDisponibles : [];
    const horariosPermitidos = servicioActual
        ? servicioActual.horariosDisponibles.map(generarHorarioDate)
        : [];

    // Disponibilidad de Profesionales
    const idsProfesionalesDisponibles = servicioActual ? servicioActual.profesionalesId : [];
    const profesionalesDisponibles = datosTurnos.profesionales.filter(pro =>
        idsProfesionalesDisponibles.includes(pro.id)
    );

    // Función de filtro de días para react-datepicker
    const filterDiasSemana = (date) => {
        const day = date.getDay(); 
        return diasPermitidos.includes(day);
    };

    const handleCategoriaChange = (e) => {
        // Resetea todos los campos subsiguientes
        setCategoriaSeleccionada(e.target.value);
        setServicioSeleccionado('');
        setProfesionalSeleccionadoId('');
        setFechaSeleccionada(null);
        setHoraSeleccionada(null);
        setError('');
        setReservaExitosa(false);
    };

    const handleServicioChange = (e) => {
        // Resetea Profesional, Fecha y Hora
        setServicioSeleccionado(e.target.value);
        setProfesionalSeleccionadoId('');
        setFechaSeleccionada(null);
        setHoraSeleccionada(null);
    }

    const handleProfesionalChange = (e) => {
        // Resetea Fecha y Hora (ya que la disponibilidad podría depender del profesional)
        setProfesionalSeleccionadoId(e.target.value);
        setFechaSeleccionada(null);
        setHoraSeleccionada(null);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setReservaExitosa(false);

        // Validación Final
        if (!categoriaSeleccionada || !servicioSeleccionado || !profesionalSeleccionadoId || !fechaSeleccionada || !horaSeleccionada) {
            setError('Por favor, selecciona una opción para todos los campos.');
            return;
        }

        const profesionalNombre = datosTurnos.profesionales.find(p => p.id === profesionalSeleccionadoId)?.nombre;

        console.log('--- TURNO CONFIRMADO ---');
        console.log('Servicio:', servicioActual.label);
        console.log('Profesional:', profesionalNombre);
        console.log('Fecha:', fechaSeleccionada.toLocaleDateString());
        console.log('Hora:', horaSeleccionada.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        console.log('------------------------');

        setReservaExitosa(true);
    };

    // Encuentra los nombres para el resumen final
    const profesionalNombre = datosTurnos.profesionales.find(p => p.id === profesionalSeleccionadoId)?.nombre;
    const servicioNombre = servicioActual?.label;

    return (
        <div className='MainT'>
            <section className="sectioncombos">
                <h2 id="Texturno">Reserva tu turno </h2>

                {error && <Alert variant="danger">{error}</Alert>}
                {reservaExitosa && <Alert variant="success">✅ ¡Turno reservado con *{profesionalNombre}* para el *{servicioNombre}*!</Alert>}

                <Form id="formuselec" onSubmit={handleSubmit}>

                    
                    <div className="input-group mb-3">
                        <Form.Label className="input-group-text">CATEGORÍA</Form.Label>
                        <Form.Select value={categoriaSeleccionada} onChange={handleCategoriaChange}>
                            <option value="">SELECCIONAR CATEGORÍA</option>
                            {datosTurnos.categorias.map((cat) => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </Form.Select>
                    </div>

                    {/* SECCIÓN TIPO DE SERVICIO (Habilitado si hay Categoría) */}
                    <div className="input-group mb-3">
                        <Form.Label className="input-group-text">TIPO DE SERVICIO</Form.Label>
                        <Form.Select
                            value={servicioSeleccionado}
                            onChange={handleServicioChange}
                            disabled={!categoriaSeleccionada}
                        >
                            <option value="">SELECCIONAR SERVICIO</option>
                            {serviciosDeCategoria.map((servicio) => (
                                <option key={servicio.value} value={servicio.value}>
                                    {servicio.label}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    {/* SECCIÓN PROFESIONAL (Habilitado si hay Servicio y Profesionales disponibles) */}
                    {profesionalesDisponibles.length > 0 && (
                        <div className="input-group mb-3">
                            <Form.Label className="input-group-text">PROFESIONAL</Form.Label>
                            <Form.Select
                                value={profesionalSeleccionadoId}
                                onChange={handleProfesionalChange}
                                disabled={!servicioSeleccionado}
                            >
                                <option value="">NOMBRE</option>
                                {profesionalesDisponibles.map((pro) => (
                                    <option key={pro.id} value={pro.id}>
                                        {pro.nombre} ({pro.especialidad})
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    )}

                    {/* SECCIÓN FECHA (Habilitado si hay Servicio) */}
                    <div className="input-group mb-3">
                        <Form.Label className="input-group-text">FECHA</Form.Label>
                        <div className="form-control p-0 custom-datepicker-container">
                            <DatePicker
                                selected={fechaSeleccionada}
                                onChange={(date) => setFechaSeleccionada(date)}
                                filterDate={filterDiasSemana} 
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Seleccionar Fecha"
                                className="form-control custom-date-picker"
                                minDate={new Date()}
                                disabled={!servicioSeleccionado}
                            />
                        </div>
                    </div>

                    {/* SECCIÓN HORARIO (Habilitado si hay Fecha y Servicio) */}
                    <div className="input-group mb-3">
                        <Form.Label className="input-group-text">HORARIO</Form.Label>
                        <div className="form-control p-0 custom-datepicker-container">
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
                                includeTimes={horariosPermitidos} 
                                disabled={!servicioSeleccionado || !fechaSeleccionada}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="btnTurnos">
                        Confirmar Turno
                    </Button>

                </Form>
            </section>

            <hr className='hrturnos mt-4' />

            <section>
                <article className="turnos-reservados">
                    <h3 id='Texturno'>Resumen del servicio</h3>
                    <p>Profesional: {profesionalNombre || 'A definir'}</p>
                    <p>Servicio: {servicioNombre || 'A definir'}</p>
                    <p>Fecha: {fechaSeleccionada ? fechaSeleccionada.toLocaleDateString() : 'A definir'}</p>
                    <p>Hora: {horaSeleccionada ? horaSeleccionada.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'A definir'}</p>
                    <hr className='hrturnos' />
                </article>
            </section>
        </div>
    );
}

export default Turnos;