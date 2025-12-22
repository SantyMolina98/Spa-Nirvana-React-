import '../App.css';
import '../styles/turnosPages.css';
import { useState, useContext, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { UserContext } from '../context/UserContext';

const generarHorarioDate = (hora) => {
    return new Date().setHours(hora, 0, 0, 0);
}

const datosTurnos = {
    profesionales: [
        { id: 'pro_ana', nombre: 'Ana García', especialidad: 'Facial' },
        { id: 'pro_luis', nombre: 'Luis Torres', especialidad: 'Masajes' },
        { id: 'pro_sofia', nombre: 'Sofia Ramirez', especialidad: 'Masajes' },
        { id: 'pro_maria', nombre: 'María Soto', especialidad: 'Rituales' },
        { id: 'pro_juan', nombre: 'Juan Pérez', especialidad: 'Corporal' },
        { id: 'pro_Lucia', nombre: 'Lucia Fernandez', especialidad: 'Corporal' },
    ],
    categorias: [
        { value: 'servicio-trat-facial', label: 'Tratamiento Faciales' },
        { value: 'servicio-rituales', label: 'Nuestros Rituales' },
        { value: 'servicio-masajes', label: 'Masajes' },
    ],
    serviciosPorCategoria: {
        'servicio-trat-facial': [
            { value: 'essential-face-care', label: 'Essential Face Care', diasDisponibles: [1, 4], horariosDisponibles: [10, 15, 18, 20], profesionalesId: ['pro_ana'] },
            { value: 'glowing-vit-c', label: 'Glowing Vit C+', diasDisponibles: [2, 5], horariosDisponibles: [10, 12, 17, 19], profesionalesId: ['pro_ana', 'pro_maria'] },
        ],
        'servicio-rituales': [
            { value: 'ritual-nirvana-escape', label: 'Ritual Nirvana Escape', diasDisponibles: [6], horariosDisponibles: [11, 16, 18, 20], profesionalesId: ['pro_maria', 'pro_luis'] },
        ],
        'servicio-masajes': [
            { value: 'masaje-sueco', label: 'Masaje Sueco', diasDisponibles: [2, 5], horariosDisponibles: [9, 11, 14, 18, 20], profesionalesId: ['pro_luis', 'pro_sofia'] },
            { value: 'Masaje Hot Stones', label: 'Masaje Hot Stones', diasDisponibles: [2, 5], horariosDisponibles: [15, 19, 21], profesionalesId: ['pro_juan', 'pro_sofia'] },
            { value: 'Masaje Signature', label: 'Masaje Signature', diasDisponibles: [2, 5], horariosDisponibles: [10, 1, 17, 20], profesionalesId: ['pro_luis', 'pro_juan', 'pro_sofia'] },
            { value: 'Masaje Deep Tissue', label: 'Masaje Deep Tissue', diasDisponibles: [2, 5], horariosDisponibles: [14, 18], profesionalesId: ['pro_luis', 'pro_juan', 'pro_sofia', 'pro_lucia'] },
        ],
    },
};

function Turnos() {
    
    const context = useContext(UserContext);
    const { turnos = [], addTurno, removeTurno, isAuthenticated } = context || {};

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [servicioSeleccionado, setServicioSeleccionado] = useState('');
    const [profesionalSeleccionadoId, setProfesionalSeleccionadoId] = useState('');
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [horaSeleccionada, setHoraSeleccionada] = useState(null);
    const [error, setError] = useState('');
    const [reservaExitosa, setReservaExitosa] = useState(false);

    // Filtro de servicios elegidos
    const serviciosDeCategoria = datosTurnos.serviciosPorCategoria[categoriaSeleccionada] || [];
    const servicioActual = serviciosDeCategoria.find((s) => s.value === servicioSeleccionado);
    const diasPermitidos = servicioActual ? servicioActual.diasDisponibles : [];
    const horariosPermitidos = servicioActual ? servicioActual.horariosDisponibles.map(generarHorarioDate) : [];
    const profesionalesDisponibles = datosTurnos.profesionales.filter(pro => 
        servicioActual?.profesionalesId.includes(pro.id)
    );

    const profesionalNombre = datosTurnos.profesionales.find(p => p.id === profesionalSeleccionadoId)?.nombre;
    const servicioNombre = servicioActual?.label;

    const filterDiasSemana = (date) => diasPermitidos.includes(date.getDay());

    const resetCamposDependientes = () => {
        setServicioSeleccionado('');
        setProfesionalSeleccionadoId('');
        setFechaSeleccionada(null);
        setHoraSeleccionada(null);
        setError('');
        setReservaExitosa(false);
    };

    // Limpiar el mensaje de "Añadido al carrito"
    useEffect(() => {
        if (reservaExitosa) {
            const timer = setTimeout(() => setReservaExitosa(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [reservaExitosa]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isAuthenticated) {
            setError('Hola! Primero debes estar registrado para reservar');
            return;
        }

        if (!categoriaSeleccionada || !servicioSeleccionado || !profesionalSeleccionadoId || !fechaSeleccionada || !horaSeleccionada) {
            setError('Por favor, selecciona una opción para todos los campos.');
            return;
        }

        const nuevoTurno = {
            servicio: servicioNombre,
            profesional: profesionalNombre,
            fecha: fechaSeleccionada.toLocaleDateString(),
            hora: horaSeleccionada.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        addTurno(nuevoTurno);
        setReservaExitosa(true);
        setError('');
        
        // Restauramos los campos para permitir una nueva selección
        setServicioSeleccionado('');
        setFechaSeleccionada(null);
        setHoraSeleccionada(null);
    };

    const handleFinalizarReservaTotal = () => {
        const resumen = turnos.map(t => `- ${t.servicio} con ${t.profesional} (${t.fecha} - ${t.hora})`).join('\n');
        
        alert(
            `¡RESERVA CONFIRMADA!\n\n` +
            `Servicios Reservados:\n${resumen}\n\n` +
            `Te esperamos en nuestro local en Gral Paz 576, SMT.\n` +
            `¡Muchas gracias!`
        );
        

    };

    return (
        <div className='MainT'>
            <section className="sectioncombos">
                <h2 id="Texturno">Reserva tu turno</h2>

                {!isAuthenticated ? (
                    <Card className="text-center p-4 shadow-sm">
                        <Card.Body>
                            <Card.Title>Contenido Exclusivo</Card.Title>
                            <Card.Text>Inicia sesión para poder gestionar tus reservas.</Card.Text>
                            <Button variant="primary" href="/login">Ir al Login</Button>
                        </Card.Body>
                    </Card>
                ) : (
                    <>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {reservaExitosa && (
                            <Alert variant="success" className="animate__animated animate__fadeIn">
                                ✅ ¡Turno añadido al carrito! Puedes elegir otro o finalizar abajo.
                            </Alert>
                        )}

                        <Form id="formuselec" onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <Form.Label className="input-group-text">CATEGORÍA</Form.Label>
                                <Form.Select value={categoriaSeleccionada} onChange={(e) => { setCategoriaSeleccionada(e.target.value); resetCamposDependientes(); }}>
                                    <option value="">Seleccionar Categoría</option>
                                    {datosTurnos.categorias.map((cat) => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </Form.Select>
                            </div>

                            <div className="input-group mb-3">
                                <Form.Label className="input-group-text">SERVICIO</Form.Label>
                                <Form.Select value={servicioSeleccionado} onChange={(e) => setServicioSeleccionado(e.target.value)} disabled={!categoriaSeleccionada}>
                                    <option value="">Seleccionar Servicio</option>
                                    {serviciosDeCategoria.map((s) => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </Form.Select>
                            </div>

                            <div className="input-group mb-3">
                                <Form.Label className="input-group-text">PROFESIONAL</Form.Label>
                                <Form.Select value={profesionalSeleccionadoId} onChange={(e) => setProfesionalSeleccionadoId(e.target.value)} disabled={!servicioSeleccionado}>
                                    <option value="">Seleccionar Profesional</option>
                                    {profesionalesDisponibles.map((p) => (
                                        <option key={p.id} value={p.id}>{p.nombre} ({p.especialidad})</option>
                                    ))}
                                </Form.Select>
                            </div>

                            <div className="input-group mb-3">
                                <Form.Label className="input-group-text">FECHA</Form.Label>
                                <div className="form-control p-0 custom-datepicker-container">
                                    <DatePicker
                                        selected={fechaSeleccionada}
                                        onChange={(date) => setFechaSeleccionada(date)}
                                        filterDate={filterDiasSemana}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}
                                        placeholderText="Seleccionar Fecha"
                                        className="form-control"
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
                                        dateFormat="h:mm aa"
                                        includeTimes={horariosPermitidos}
                                        placeholderText="Seleccionar Horario"
                                        className="form-control"
                                        disabled={!fechaSeleccionada}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="btnTurnos w-100">
                                Añadir al Carrito
                            </Button>
                        </Form>
                    </>
                )}
            </section>

            <hr className='hrturnos' />

            {isAuthenticated && (
                <>
                    <section className="resumen-actual mb-4">
                        <Card className="text-center bg-light shadow-sm">
                            <Card.Body>
                                <h3 className="h5 text-muted">Resumen selección actual</h3>
                                <p className="mb-1"><strong>Servicio:</strong> {servicioNombre || 'A definir'}</p>
                                <p className="mb-0"><strong>Profesional:</strong> {profesionalNombre || 'A definir'}</p>
                            </Card.Body>
                        </Card>
                    </section>

                    <section className="carrito-turnos mt-5 p-4 rounded border shadow-sm bg-white">
                        <h3 className="mb-4 text-center">🛒 Mi Carrito de Turnos</h3>
                        
                        {turnos.length === 0 ? (
                            <Alert variant="info" className="text-center">Tu carrito está vacío.</Alert>
                        ) : (
                            <>
                                <div className="row">
                                    {turnos.map((item) => (
                                        <div className="col-md-6 mb-3" key={item.id}>
                                            <Card className="h-100 border-primary shadow-sm">
                                                <Card.Body className="d-flex flex-column justify-content-between">
                                                    <div>
                                                        <Card.Title className="text-primary h6">{item.servicio}</Card.Title>
                                                        <Card.Text className="small">
                                                            <strong>Profesional:</strong> {item.profesional}<br />
                                                            <strong>Fecha:</strong> {item.fecha} - {item.hora}
                                                        </Card.Text>
                                                    </div>
                                                    <Button 
                                                        variant="outline-danger" 
                                                        size="sm" 
                                                        className="mt-2 align-self-start"
                                                        onClick={() => removeTurno(item.id)}
                                                    >
                                                        🗑️ Eliminar
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center mt-4">
                                    <Button 
                                        variant="success" 
                                        size="lg" 
                                        className="px-5 shadow"
                                        onClick={handleFinalizarReservaTotal}
                                    >
                                        Finalizar Reserva Total
                                    </Button>
                                </div>
                            </>
                        )}
                    </section>
                </>
            )}
        </div> 
    ); 
} 

export default Turnos;