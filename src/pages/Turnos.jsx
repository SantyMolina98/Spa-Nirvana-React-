import "../App.css";
import "../styles/turnosPages.css";
import { useState, useContext, useEffect, useMemo } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../context/UserContext";
import { getReservas, crearReserva } from "../helpers/ReservasApi";
import { getServicios } from "../helpers/ServicioApi";

const generarHorarioDate = (hora) => {
  return new Date().setHours(hora, 0, 0, 0);
};

const datosTurnos = {
  profesionales: [
    { id: "pro_ana", nombre: "Ana García", especialidad: "Facial" },
    { id: "pro_luis", nombre: "Luis Torres", especialidad: "Masajes" },
    { id: "pro_sofia", nombre: "Sofia Ramirez", especialidad: "Masajes" },
    { id: "pro_maria", nombre: "María Soto", especialidad: "Rituales" },
    { id: "pro_juan", nombre: "Juan Pérez", especialidad: "Corporal" },
    { id: "pro_lucia", nombre: "Lucia Fernandez", especialidad: "Corporal" },
  ],
  categorias: [
    { value: "servicio-trat-facial", label: "Tratamientos Faciales" },
    { value: "servicio-rituales", label: "Nuestros Rituales" },
    { value: "servicio-corporal", label: "Tratamientos Corporales" },
    { value: "servicio-aromaterapia", label: "Masajes con Aromaterapia" },
    { value: "servicio-masajes", label: "Masajes" },
  ],
  serviciosPorCategoria: {
    "servicio-trat-facial": [
      {
        value: "essential-face-care",
        label: "Essential Face Care",
        diasDisponibles: [1, 3, 5],
        horariosDisponibles: [10, 15, 18, 20],
        profesionalesId: ["pro_ana"],
      },
      {
        value: "glowing-vit-c",
        label: "Glowing Vit C+",
        diasDisponibles: [2, 4, 6],
        horariosDisponibles: [10, 12, 17, 19],
        profesionalesId: ["pro_ana", "pro_maria"],
      },
      {
        value: "rebalancing-face-care",
        label: "Rebalancing Face Care",
        diasDisponibles: [1, 4],
        horariosDisponibles: [9, 13, 16, 19],
        profesionalesId: ["pro_ana", "pro_maria"],
      },
      {
        value: "glowing-roses",
        label: "Glowing Roses",
        diasDisponibles: [3, 5],
        horariosDisponibles: [11, 14, 18],
        profesionalesId: ["pro_ana"],
      },
    ],
    "servicio-rituales": [
      {
        value: "ritual-nirvana-escape",
        label: "Ritual Nirvana Escape",
        diasDisponibles: [6],
        horariosDisponibles: [11, 16, 18, 20],
        profesionalesId: ["pro_maria", "pro_luis"],
      },
      {
        value: "ritual-mind-soul",
        label: "Ritual Mind & Soul",
        diasDisponibles: [2, 6],
        horariosDisponibles: [10, 13, 17],
        profesionalesId: ["pro_maria"],
      },
      {
        value: "ritual-afflora",
        label: "Ritual Afflora",
        diasDisponibles: [4, 6],
        horariosDisponibles: [12, 16, 19],
        profesionalesId: ["pro_maria", "pro_luis"],
      },
      {
        value: "ritual-mulfem",
        label: "Ritual Mülfem",
        diasDisponibles: [5, 6],
        horariosDisponibles: [10, 15, 18],
        profesionalesId: ["pro_maria"],
      },
      {
        value: "ritual-unad",
        label: "Ritual Üñad",
        diasDisponibles: [6],
        horariosDisponibles: [11, 16, 19],
        profesionalesId: ["pro_maria", "pro_luis"],
      },
      {
        value: "ritual-urkutun",
        label: "Ritual Ürkutun",
        diasDisponibles: [6],
        horariosDisponibles: [12, 17, 20],
        profesionalesId: ["pro_maria", "pro_luis"],
      },
    ],
    "servicio-corporal": [
      {
        value: "ceremonia-liwen",
        label: "Ceremonia Liwen",
        diasDisponibles: [2, 5],
        horariosDisponibles: [9, 12, 16, 19],
        profesionalesId: ["pro_juan", "pro_lucia"],
      },
      {
        value: "ceremonia-ragiantu",
        label: "Ceremonia Ragiantu",
        diasDisponibles: [3, 6],
        horariosDisponibles: [10, 14, 18],
        profesionalesId: ["pro_juan", "pro_lucia"],
      },
    ],
    "servicio-aromaterapia": [
      {
        value: "aromaterapia-purificante",
        label: "Aromaterapia Purificante",
        diasDisponibles: [2, 4, 6],
        horariosDisponibles: [10, 13, 16, 19],
        profesionalesId: ["pro_luis", "pro_sofia"],
      },
      {
        value: "aromaterapia-relajante",
        label: "Aromaterapia Relajante",
        diasDisponibles: [1, 3, 5],
        horariosDisponibles: [11, 15, 18, 20],
        profesionalesId: ["pro_luis", "pro_sofia"],
      },
      {
        value: "aromaterapia-estimulante",
        label: "Aromaterapia Estimulante",
        diasDisponibles: [2, 5],
        horariosDisponibles: [9, 12, 17],
        profesionalesId: ["pro_luis", "pro_sofia"],
      },
    ],
    "servicio-masajes": [
      {
        value: "masaje-sueco",
        label: "Masaje Sueco",
        diasDisponibles: [2, 5],
        horariosDisponibles: [9, 11, 14, 18, 20],
        profesionalesId: ["pro_luis", "pro_sofia"],
      },
      {
        value: "masaje-hot-stones",
        label: "Masaje Hot Stones",
        diasDisponibles: [2, 5],
        horariosDisponibles: [15, 19, 21],
        profesionalesId: ["pro_juan", "pro_sofia"],
      },
      {
        value: "masaje-signature",
        label: "Masaje Signature",
        diasDisponibles: [2, 5],
        horariosDisponibles: [10, 13, 17, 20],
        profesionalesId: ["pro_luis", "pro_juan", "pro_sofia"],
      },
      {
        value: "masaje-deep-tissue",
        label: "Masaje Deep Tissue",
        diasDisponibles: [2, 5],
        horariosDisponibles: [14, 18],
        profesionalesId: ["pro_luis", "pro_juan", "pro_sofia", "pro_lucia"],
      },
    ],
  },
};

function Turnos() {
  const context = useContext(UserContext);
  const { turnos = [], addTurno, removeTurno, isAuthenticated, user } = context || {};

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [profesionalSeleccionadoId, setProfesionalSeleccionadoId] =
    useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [error, setError] = useState("");
  const [reservaExitosa, setReservaExitosa] = useState(false);
  const [reservasDb, setReservasDb] = useState([]);
  const [loadingReservas, setLoadingReservas] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serviciosDb, setServiciosDb] = useState([]);
  const [loadingServicios, setLoadingServicios] = useState(false);

  // Filtro de servicios elegidos
  const serviciosDeCategoria =
    datosTurnos.serviciosPorCategoria[categoriaSeleccionada] || [];
  const servicioActual = serviciosDeCategoria.find(
    (s) => s.value === servicioSeleccionado
  );
  const diasPermitidos = servicioActual ? servicioActual.diasDisponibles : [];
  const horariosPermitidos = servicioActual
    ? servicioActual.horariosDisponibles.map(generarHorarioDate)
    : [];
  const profesionalesDisponibles = datosTurnos.profesionales.filter((pro) =>
    servicioActual?.profesionalesId.includes(pro.id)
  );

  const profesionalNombre = datosTurnos.profesionales.find(
    (p) => p.id === profesionalSeleccionadoId
  )?.nombre;
  const servicioNombre = servicioActual?.label;

  const formatDateKey = (value) => {
    if (!value) return "";
    if (value instanceof Date) {
      const y = value.getFullYear();
      const m = String(value.getMonth() + 1).padStart(2, "0");
      const d = String(value.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      const y = parsed.getFullYear();
      const m = String(parsed.getMonth() + 1).padStart(2, "0");
      const d = String(parsed.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
    if (typeof value === "string") {
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
      const parts = value.split("/");
      if (parts.length === 3) {
        const [d, m, y] = parts;
        if (y && m && d) return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
      }
    }
    return String(value);
  };

  const formatTimeKey = (value) => {
    if (!value) return "";
    if (value instanceof Date) {
      const h = String(value.getHours()).padStart(2, "0");
      const m = String(value.getMinutes()).padStart(2, "0");
      return `${h}:${m}`;
    }
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      const h = String(parsed.getHours()).padStart(2, "0");
      const m = String(parsed.getMinutes()).padStart(2, "0");
      return `${h}:${m}`;
    }
    if (typeof value === "string") {
      const match = value.match(/(\d{1,2}):(\d{2})/);
      if (match) {
        const h = String(match[1]).padStart(2, "0");
        const m = String(match[2]).padStart(2, "0");
        return `${h}:${m}`;
      }
    }
    return String(value);
  };

  const normalizeText = (value) => {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  const reservasOcupadas = useMemo(() => {
    if (!profesionalNombre || !fechaSeleccionada) return [];
    const fechaKey = formatDateKey(fechaSeleccionada);
    const ocupadasDb = reservasDb
      .filter(
        (r) =>
          formatDateKey(r.fechaReserva || r.fecha) === fechaKey
      )
      .map((r) => formatTimeKey(r.horaReserva || r.hora));

    const ocupadasCarrito = turnos
      .filter(
        (t) =>
          formatDateKey(t.fechaReserva || t.fecha) === fechaKey
      )
      .map((t) => formatTimeKey(t.horaReserva || t.hora));

    return Array.from(new Set([...ocupadasDb, ...ocupadasCarrito]));
  }, [fechaSeleccionada, profesionalNombre, reservasDb, turnos]);

  const horariosDisponiblesFiltrados = useMemo(() => {
    if (!horariosPermitidos.length) return [];
    if (!reservasOcupadas.length) return horariosPermitidos;
    return horariosPermitidos.filter((fechaHora) => {
      const horaTexto = formatTimeKey(fechaHora);
      return !reservasOcupadas.includes(horaTexto);
    });
  }, [horariosPermitidos, reservasOcupadas]);

  const filterDiasSemana = (date) => diasPermitidos.includes(date.getDay());

  const resetCamposDependientes = () => {
    setServicioSeleccionado("");
    setProfesionalSeleccionadoId("");
    setFechaSeleccionada(null);
    setHoraSeleccionada(null);
    setError("");
    setReservaExitosa(false);
  };

  useEffect(() => {
    if (reservaExitosa) {
      const timer = setTimeout(() => setReservaExitosa(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [reservaExitosa]);

  const cargarReservas = async () => {
    if (!isAuthenticated) return [];
    setLoadingReservas(true);
    try {
      const data = await getReservas();
      const reservasList = data?.reservas || data?.data || data || [];
      const list = Array.isArray(reservasList) ? reservasList : [];
      setReservasDb(list);
      return list;
    } catch (err) {
      console.error(err);
      return reservasDb;
    } finally {
      setLoadingReservas(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, [isAuthenticated, profesionalSeleccionadoId, fechaSeleccionada]);

  useEffect(() => {
    const cargarServicios = async () => {
      setLoadingServicios(true);
      try {
        const data = await getServicios();
        const serviciosList = data?.servicios || data?.data || data || [];
        setServiciosDb(Array.isArray(serviciosList) ? serviciosList : []);
      } catch (err) {
        console.error("[Turnos] error getServicios", err);
      } finally {
        setLoadingServicios(false);
      }
    };

    cargarServicios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("Hola! Primero debes estar registrado para reservar");
      return;
    }

    if (
      !categoriaSeleccionada ||
      !servicioSeleccionado ||
      !profesionalSeleccionadoId ||
      !fechaSeleccionada ||
      !horaSeleccionada
    ) {
      setError("Por favor, selecciona una opción para todos los campos.");
      return;
    }

    if (loadingServicios) {
      setError("Cargando servicios, intenta nuevamente.");
      return;
    }
    if (loadingReservas || submitting) return;

    const fechaKey = formatDateKey(fechaSeleccionada);
    const horaKey = formatTimeKey(horaSeleccionada);

    console.log("[Turnos] intento reserva", {
      servicio: servicioNombre,
      profesional: profesionalNombre,
      fecha: fechaKey,
      hora: horaKey,
    });

    const reservasActuales = await cargarReservas();
    const turnoDuplicado = [...reservasActuales, ...turnos].some((t) => {
      return (
        formatDateKey(t.fechaReserva || t.fecha) === fechaKey &&
        formatTimeKey(t.horaReserva || t.hora) === horaKey
      );
    });

    if (turnoDuplicado) {
      console.log("[Turnos] duplicado detectado", { fechaKey, horaKey, profesionalNombre });
      setError("este turno ya está reservado");
      return;
    }

    const servicioMatch = serviciosDb.find((s) => {
      const nombre = s?.nombre || s?.titulo || "";
      return normalizeText(nombre) === normalizeText(servicioNombre);
    });

    if (!servicioMatch?._id && !servicioMatch?.id) {
      setError("No se pudo identificar el servicio seleccionado.");
      return;
    }

    const servicioId = servicioMatch?._id || servicioMatch?.id;
    const servicioLabel = servicioMatch?.nombre || servicioMatch?.titulo || servicioNombre;

    const payload = {
      servicio: servicioId,
      fechaReserva: fechaKey,
      horaReserva: horaKey,
      rol: user?.rol || "Usuario",
      profesional: profesionalNombre,
    };
    console.log("[Turnos] payload", payload);

    try {
      setSubmitting(true);
      const respuesta = await crearReserva(payload);
      const reservaCreada = respuesta?.reserva || respuesta;

      if (respuesta?.ok === false || respuesta?.statusCode === 409) {
        setError("este turno ya está reservado");
        return;
      }

      const nuevoTurno = {
        ...payload,
        servicioId,
        servicioNombre: servicioLabel,
        fecha: payload.fechaReserva,
        hora: payload.horaReserva,
        id: reservaCreada?._id || reservaCreada?.id || Date.now(),
      };

      addTurno(nuevoTurno);
      setReservasDb((prev) => [...prev, nuevoTurno]);
      setReservaExitosa(true);
      setError("");

      // Restauramos los campos para permitir una nueva selección
      setServicioSeleccionado("");
      setFechaSeleccionada(null);
      setHoraSeleccionada(null);
    } catch (err) {
      console.error("[Turnos] error crearReserva", err);
      const message = err?.message?.toLowerCase?.() || "";
      const status = err?.status || err?.response?.status;
      if (status === 401 || message.includes("token")) {
        setError("Tu sesión expiró. Iniciá sesión nuevamente para reservar.");
      } else if (message.includes("duplic") || status === 409 || message.includes("reserv")) {
        setError("este turno ya está reservado");
      } else {
        setError(err?.message || "No se pudo crear la reserva. Intenta nuevamente.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinalizarReservaTotal = () => {
    const resumen = turnos
      .map(
        (t) =>
          `- ${t.servicioNombre || t.servicio} con ${t.profesional} (${t.fecha} - ${t.hora})`
      )
      .join("\n");

    alert(
      `¡RESERVA CONFIRMADA!\n\n` +
      `Servicios Reservados:\n${resumen}\n\n` +
      `Te esperamos en nuestro local en Gral Paz 576, SMT.\n` +
      `¡Muchas gracias!`
    );

    // Las reservas ya se guardan al crear cada turno.
  };

  return (
    <div className="MainT">
      <section className="sectioncombos">
        <h2 id="Texturno">Reserva tu turno</h2>

        {!isAuthenticated ? (
          <Card className="text-center p-4 shadow-sm">
            <Card.Body>
              <Card.Title>Contenido Exclusivo</Card.Title>
              <Card.Text>
                Inicia sesión para poder gestionar tus reservas.
              </Card.Text>
              <Button variant="primary" href="/login">
                Ir al Login
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <>
            {error && <Alert variant="danger">{error}</Alert>}
            {reservaExitosa && (
              <Alert
                variant="success"
                className="animate__animated animate__fadeIn"
              >
                ✅ ¡Turno añadido al carrito! Puedes elegir otro o finalizar
                abajo.
              </Alert>
            )}

            <Form id="formuselec" onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <Form.Label className="input-group-text">CATEGORÍA</Form.Label>
                <Form.Select
                  value={categoriaSeleccionada}
                  onChange={(e) => {
                    setCategoriaSeleccionada(e.target.value);
                    resetCamposDependientes();
                  }}
                >
                  <option value="">Seleccionar Categoría</option>
                  {datosTurnos.categorias.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className="input-group mb-3">
                <Form.Label className="input-group-text">SERVICIO</Form.Label>
                <Form.Select
                  value={servicioSeleccionado}
                  onChange={(e) => setServicioSeleccionado(e.target.value)}
                  disabled={!categoriaSeleccionada}
                >
                  <option value="">Seleccionar Servicio</option>
                  {serviciosDeCategoria.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className="input-group mb-3">
                <Form.Label className="input-group-text">
                  PROFESIONAL
                </Form.Label>
                <Form.Select
                  value={profesionalSeleccionadoId}
                  onChange={(e) => setProfesionalSeleccionadoId(e.target.value)}
                  disabled={!servicioSeleccionado}
                >
                  <option value="">Seleccionar Profesional</option>
                  {profesionalesDisponibles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} ({p.especialidad})
                    </option>
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
                    includeTimes={horariosDisponiblesFiltrados}
                    placeholderText="Seleccionar Horario"
                    className="form-control"
                    disabled={!fechaSeleccionada || loadingReservas}
                  />
                </div>
              </div>

                <Button
                  type="submit"
                  className="btnTurnos w-100"
                  disabled={submitting || loadingServicios}
                >
                  {submitting ? "Reservando..." : "Añadir al Carrito"}
              </Button>
            </Form>
          </>
        )}
      </section>

      <hr className="hrturnos" />

      {isAuthenticated && (
        <>
          <section className="resumen-actual mb-4">
            <Card className="text-center bg-light shadow-sm">
              <Card.Body>
                <h3 className="h5 text-muted">Resumen selección actual</h3>
                <p className="mb-1">
                  <strong>Servicio:</strong> {servicioNombre || "A definir"}
                </p>
                <p className="mb-0">
                  <strong>Profesional:</strong>{" "}
                  {profesionalNombre || "A definir"}
                </p>
              </Card.Body>
            </Card>
          </section>

          <section className="carrito-turnos mt-5 p-4 rounded border shadow-sm bg-white">
            <h3 className="mb-4 text-center">🛒 Mi Carrito de Turnos</h3>

            {turnos.length === 0 ? (
              <Alert variant="info" className="text-center">
                Tu carrito está vacío.
              </Alert>
            ) : (
              <>
                <div className="row">
                  {turnos.map((item) => (
                    <div className="col-md-6 mb-3" key={item.id}>
                      <Card className="h-100 border-primary shadow-sm">
                        <Card.Body className="d-flex flex-column justify-content-between">
                          <div>
                            <Card.Title className="text-primary h6">
                              USTED RESERVÓ : {item.servicioNombre || item.servicio}
                            </Card.Title>
                            <Card.Text className="small">
                              <strong>Profesional:</strong> {item.profesional}
                              <br />
                              <strong>Fecha:</strong> {item.fecha} - {item.hora}
                              <br />
                              <strong>Usuario:</strong> {user?.nombre || "N/A"}
                              <br />
                              <p>¡MUCHAS GRACIAS!</p>
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
