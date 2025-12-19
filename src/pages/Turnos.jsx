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
    profesionales: [
        { id: 'pro_ana', nombre: 'Ana García', especialidad: 'Facial' },
        { id: 'pro_luis', nombre: 'Luis Torres', especialidad: 'Masajes' },
        { id: 'pro_maria', nombre: 'María Soto', especialidad: 'Rituales' },
        { id: 'pro_juan', nombre: 'Juan Pérez', especialidad: 'Corporal' },
    ],

    categorias: [
        { value: 'servicio-trat-facial', label: 'Tratamiento Faciales' },
        { value: 'servicio-rituales', label: 'Nuestros Rituales' },
        { value: 'servicio-masajes', label: 'Masajes' },
    ],

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

    const idsProfesionalesDisponibles = servicioActual ? servicioActual.profesionalesId : [];
    const profesionalesDisponibles = datosTurnos.profesionales.filter(pro =>
        idsProfesionalesDisponibles.includes(pro.id)
    );

    const filterDiasSemana = (date) => {
        const day = date.getDay(); 
        return diasPermitidos.includes(day);
    };

    const handleCategoriaChange = (e) => {
        setCategoriaSeleccionada(e.target.value);
        setServicioSeleccionado('');
        setProfesionalSeleccionadoId('');
        setFechaSeleccionada(null);
        setHoraSeleccionada(null);
        setError('');
        setReservaExitosa(false);
    };

    const handleServicioChange = (e) => {
        setServicioSeleccionado(e.target.value);
        setProfesionalSeleccionadoId('');
        setFechaSeleccionada(null);
        setHoraSeleccionada(null);
    }

    const handleProfesionalChange = (e) => {
        setProfesionalSeleccionadoId(e.target.value);
        setFechaSeleccionada(null);
        setHoraSeleccionada(null);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setReservaExitosa(false);

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

    const profesionalNombre = datosTurnos.profesionales.find(p => p.id === profesionalSeleccionadoId)?.nombre;
    const servicioNombre = servicioActual?.label;

    return (
        <div className='MainT'>
            <section className="sectioncombos">
                <h2 id="Texturno">Reserva tu turno </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {reservaExitosa && <Alert variant="success">✅¡Tu turno fue reservado con éxito! Reserva con {profesionalNombre} para {servicioNombre}. Te esperamos en Gral Paz 576, SMT.</Alert>}
                <Form id="formuselec" onSubmit={handleSubmit}>                  
                    <div className="input-group mb-3">
                        <Form.Label className="input-group-text">CATEGORÍA</Form.Label>
                        <Form.Select value={categoriaSeleccionada} onChange={handleCategoriaChange}>
                            <option value="">Seleccionar Categoría</option>
                            {datosTurnos.categorias.map((cat) => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="input-group mb-3">
                        <Form.Label className="input-group-text">SERVICIO</Form.Label>
                        <Form.Select
                            value={servicioSeleccionado}
                            onChange={handleServicioChange}
                            disabled={!categoriaSeleccionada}>
                            <option value="">Seleccionar Servicio</option>
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
                                <option value="">Nombre</option>
                                {profesionalesDisponibles.map((pro) => (
                                    <option key={pro.id} value={pro.id}>
                                        {pro.nombre} ({pro.especialidad})
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    )}

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

            <hr className='hrturnos' />

            <section>
                <article className="turnos-reservados">
                    <h3>Resumen del servicio</h3>
                    <p>Servicio: {servicioNombre || 'A definir'}</p>
                    <p>Profesional: {profesionalNombre || 'A definir'}</p>
                    <p>Fecha: {fechaSeleccionada ? fechaSeleccionada.toLocaleDateString() : 'A definir'}</p>
                    <p>Hora: {horaSeleccionada ? horaSeleccionada.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'A definir'}</p>
                </article>
            </section>
        </div>
    );
}

export default Turnos;