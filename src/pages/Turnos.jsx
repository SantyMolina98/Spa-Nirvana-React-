import "../App.css";
import "../styles/turnosPages.css";
import { useState, useContext, useEffect, useMemo } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../context/UserContext";
import { getReservas, crearReserva } from "../helpers/ReservasApi";
import { getServicios } from "../helpers/ServicioApi";
import { getProfesionales } from "../helpers/UsuariosApi";

const toTimeDate = (hora, minutos = 0) => {
  const base = new Date();
  base.setHours(hora, minutos, 0, 0);
  return base;
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
  const [profesionalesDb, setProfesionalesDb] = useState([]);
  const [loadingProfesionales, setLoadingProfesionales] = useState(false);

  const normalizeText = (value) => {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  const obtenerNombreCategoria = (categoria) => {
    if (!categoria) return "";
    if (typeof categoria === "string") return categoria;
    return categoria?.nombre || "";
  };

  const obtenerNombreServicio = (servicio) => {
    return servicio?.nombre || servicio?.titulo || servicio?.nombreServicio || "";
  };

  const obtenerIdServicio = (servicio) => {
    return servicio?._id || servicio?.id || servicio?.uid || "";
  };

  const obtenerIdProfesional = (profesional) => {
    return profesional?._id || profesional?.id || profesional?.uid || "";
  };

  const obtenerNombreProfesional = (profesional) => {
    return profesional?.nombre || profesional?.name || "";
  };

  const obtenerEspecialidadProfesional = (profesional) => {
    return profesional?.especialidad || profesional?.especialidades || "";
  };

  const obtenerServiciosProfesional = (profesional) => {
    return (
      profesional?.servicios ||
      profesional?.serviciosId ||
      profesional?.serviciosIds ||
      profesional?.serviciosOfrecidos ||
      profesional?.serviciosProfesional ||
      profesional?.serviciosProfesionales ||
      profesional?.especialidadServicio ||
      []
    );
  };

  const obtenerAgendaProfesional = (profesional) => {
    return Array.isArray(profesional?.agenda) ? profesional.agenda : [];
  };

  const diasSemanaMap = {
    lunes: 1,
    martes: 2,
    miercoles: 3,
    jueves: 4,
    viernes: 5,
    sabado: 6,
    domingo: 0,
  };

  const parseDiasDisponibles = (value) => {
    const raw = Array.isArray(value) ? value : value ? [value] : [];
    const dias = raw
      .map((item) => {
        if (typeof item === "number") return item;
        const key = normalizeText(item);
        if (diasSemanaMap[key] !== undefined) return diasSemanaMap[key];
        const asNumber = Number(item);
        return Number.isNaN(asNumber) ? null : asNumber;
      })
      .filter((item) => Number.isInteger(item) && item >= 0 && item <= 6);

    return Array.from(new Set(dias));
  };

  const parseHorariosDisponibles = (value) => {
    const raw = Array.isArray(value) ? value : value ? [value] : [];
    return raw
      .map((item) => {
        if (item instanceof Date) return item;
        if (typeof item === "number") return toTimeDate(item, 0);
        if (typeof item === "string") {
          const match = item.match(/(\d{1,2}):(\d{2})/);
          if (match) {
            return toTimeDate(Number(match[1]), Number(match[2]));
          }
          const asNumber = Number(item);
          if (!Number.isNaN(asNumber)) return toTimeDate(asNumber, 0);
        }
        return null;
      })
      .filter(Boolean);
  };

  const profesionalActual = useMemo(() => {
    if (!profesionalSeleccionadoId) return null;
    return profesionalesDb.find(
      (p) => obtenerIdProfesional(p) === profesionalSeleccionadoId
    );
  }, [profesionalesDb, profesionalSeleccionadoId]);

  const categoriasDisponibles = useMemo(() => {
    const unique = new Map();
    serviciosDb.forEach((servicio) => {
      const nombreCategoria = obtenerNombreCategoria(servicio?.categoria);
      if (!nombreCategoria) return;
      const key = normalizeText(nombreCategoria);
      if (!unique.has(key)) unique.set(key, nombreCategoria);
    });
    return Array.from(unique.values());
  }, [serviciosDb]);

  const serviciosDeCategoria = useMemo(() => {
    if (!categoriaSeleccionada) return [];
    return serviciosDb.filter((servicio) => {
      const nombreCategoria = obtenerNombreCategoria(servicio?.categoria);
      return normalizeText(nombreCategoria) === normalizeText(categoriaSeleccionada);
    });
  }, [serviciosDb, categoriaSeleccionada]);

  const servicioActual = useMemo(() => {
    if (!servicioSeleccionado) return null;
    return (
      serviciosDb.find(
        (servicio) => obtenerIdServicio(servicio) === servicioSeleccionado
      ) || null
    );
  }, [serviciosDb, servicioSeleccionado]);

  const profesionalesDisponibles = useMemo(() => {
    if (!servicioActual) return [];
    const servicioId = obtenerIdServicio(servicioActual);
    const servicioNombre = normalizeText(obtenerNombreServicio(servicioActual));
    const servicioCategoria = normalizeText(
      obtenerNombreCategoria(servicioActual?.categoria)
    );

    return profesionalesDb.filter((profesional) => {
      const serviciosProfesional = obtenerServiciosProfesional(profesional);
      const serviciosList = Array.isArray(serviciosProfesional)
        ? serviciosProfesional
        : [serviciosProfesional];

      const matchServicio = serviciosList.some((item) => {
        if (!item) return false;
        if (typeof item === "string" || typeof item === "number") {
          const itemText = normalizeText(item);
          return (
            itemText === normalizeText(servicioId) ||
            itemText === servicioNombre ||
            itemText === servicioCategoria
          );
        }
        const itemId = normalizeText(obtenerIdServicio(item));
        const itemNombre = normalizeText(obtenerNombreServicio(item));
        return (
          itemId === normalizeText(servicioId) ||
          itemNombre === servicioNombre
        );
      });

      if (matchServicio) return true;

      const agenda = obtenerAgendaProfesional(profesional);
      const agendaMatch = agenda.some((item) => {
        const agendaServicio = item?.servicio;
        if (!agendaServicio) return false;
        if (typeof agendaServicio === "string" || typeof agendaServicio === "number") {
          return normalizeText(agendaServicio) === normalizeText(servicioId);
        }
        return normalizeText(obtenerIdServicio(agendaServicio)) === normalizeText(servicioId);
      });
      if (agendaMatch) return true;

      const especialidad = normalizeText(
        obtenerEspecialidadProfesional(profesional)
      );
      return (
        especialidad &&
        (especialidad === servicioCategoria || especialidad === servicioNombre)
      );
    });
  }, [profesionalesDb, servicioActual]);

  const diasPermitidos = useMemo(() => {
    const servicioId = obtenerIdServicio(servicioActual);
    const agenda = obtenerAgendaProfesional(profesionalActual);
    const agendaServicio = agenda.filter((item) => {
      const agendaServicioId =
        typeof item?.servicio === "string" || typeof item?.servicio === "number"
          ? item?.servicio
          : obtenerIdServicio(item?.servicio);
      return normalizeText(agendaServicioId) === normalizeText(servicioId);
    });

    if (agendaServicio.length) {
      const dias = agendaServicio.map((item) => item?.dia).filter(Boolean);
      return parseDiasDisponibles(dias);
    }

    const diasServicio =
      servicioActual?.diasDisponibles ||
      servicioActual?.dias ||
      servicioActual?.disponibilidad?.dias ||
      [];
    return parseDiasDisponibles(diasServicio);
  }, [profesionalActual, servicioActual]);

  const horariosPermitidos = useMemo(() => {
    const servicioId = obtenerIdServicio(servicioActual);
    const agenda = obtenerAgendaProfesional(profesionalActual);
    const agendaServicio = agenda.filter((item) => {
      const agendaServicioId =
        typeof item?.servicio === "string" || typeof item?.servicio === "number"
          ? item?.servicio
          : obtenerIdServicio(item?.servicio);
      return normalizeText(agendaServicioId) === normalizeText(servicioId);
    });

    if (agendaServicio.length) {
      const horarios = agendaServicio.flatMap((item) => item?.horarios || []);
      return parseHorariosDisponibles(horarios);
    }

    const horariosServicio =
      servicioActual?.horariosDisponibles ||
      servicioActual?.horarios ||
      servicioActual?.disponibilidad?.horarios ||
      [];
    return parseHorariosDisponibles(horariosServicio);
  }, [profesionalActual, servicioActual]);

  const profesionalNombre = profesionalActual
    ? obtenerNombreProfesional(profesionalActual)
    : "";
  const servicioNombre = servicioActual
    ? obtenerNombreServicio(servicioActual)
    : "";

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

  const reservasOcupadas = useMemo(() => {
    if (!profesionalSeleccionadoId || !fechaSeleccionada || !servicioSeleccionado) {
      return [];
    }
    const fechaKey = formatDateKey(fechaSeleccionada);
    const profesionalKeyNombre = normalizeText(profesionalNombre);
    const profesionalKeyId = normalizeText(profesionalSeleccionadoId);
    const servicioKeyId = normalizeText(servicioSeleccionado);
    const servicioKeyNombre = normalizeText(servicioNombre);

    const matchesProfesional = (registro) => {
      const key = normalizeText(
        registro?.profesional ||
          registro?.profesionalNombre ||
          registro?.profesionalId ||
          registro?.profesional?.nombre ||
          registro?.profesional?.id
      );
      if (!key) return true;
      return key === profesionalKeyNombre || key === profesionalKeyId;
    };

    const matchesServicio = (registro) => {
      const key = normalizeText(
        registro?.servicio ||
          registro?.servicioId ||
          registro?.servicioNombre ||
          registro?.servicio?.nombre ||
          registro?.servicio?.titulo ||
          registro?.servicio?._id ||
          registro?.servicio?.id
      );
      if (!key) return true;
      return key === servicioKeyId || key === servicioKeyNombre;
    };

    const ocupadasDb = reservasDb
      .filter(
        (r) =>
          formatDateKey(r.fechaReserva || r.fecha) === fechaKey &&
          matchesProfesional(r) &&
          matchesServicio(r)
      )
      .map((r) => formatTimeKey(r.horaReserva || r.hora));

    const ocupadasCarrito = turnos
      .filter(
        (t) =>
          formatDateKey(t.fechaReserva || t.fecha) === fechaKey &&
          matchesProfesional(t) &&
          matchesServicio(t)
      )
      .map((t) => formatTimeKey(t.horaReserva || t.hora));

    return Array.from(new Set([...ocupadasDb, ...ocupadasCarrito]));
  }, [
    fechaSeleccionada,
    profesionalNombre,
    profesionalSeleccionadoId,
    servicioSeleccionado,
    servicioNombre,
    reservasDb,
    turnos,
  ]);

  const horariosDisponiblesFiltrados = useMemo(() => {
    if (!horariosPermitidos.length) return [];
    if (!reservasOcupadas.length) return horariosPermitidos;
    return horariosPermitidos.filter((fechaHora) => {
      const horaTexto = formatTimeKey(fechaHora);
      return !reservasOcupadas.includes(horaTexto);
    });
  }, [horariosPermitidos, reservasOcupadas]);

  const filterDiasSemana = (date) =>
    !diasPermitidos.length || diasPermitidos.includes(date.getDay());

  const resetCamposDependientes = () => {
    setServicioSeleccionado("");
    setProfesionalSeleccionadoId("");
    setFechaSeleccionada(null);
    setHoraSeleccionada(null);
    setError("");
    setReservaExitosa(false);
  };

  const resetProfesionalYFecha = () => {
    setProfesionalSeleccionadoId("");
    setFechaSeleccionada(null);
    setHoraSeleccionada(null);
    setError("");
    setReservaExitosa(false);
  };

  const resetFechaYHora = () => {
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

  useEffect(() => {
    const cargarProfesionales = async () => {
      setLoadingProfesionales(true);
      try {
        const data = await getProfesionales();
        const list = Array.isArray(data) ? data : data?.usuarios || data?.data || [];
        setProfesionalesDb(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("[Turnos] error getProfesionales", err);
      } finally {
        setLoadingProfesionales(false);
      }
    };

    cargarProfesionales();
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

    if (loadingServicios || loadingProfesionales) {
      setError("Cargando servicios y profesionales, intenta nuevamente.");
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
    const profesionalKeyNombre = normalizeText(profesionalNombre);
    const profesionalKeyId = normalizeText(profesionalSeleccionadoId);
    const servicioKeyId = normalizeText(servicioSeleccionado);
    const servicioKeyNombre = normalizeText(servicioNombre);
    const matchesProfesional = (registro) => {
      const key = normalizeText(
        registro?.profesional ||
          registro?.profesionalNombre ||
          registro?.profesionalId ||
          registro?.profesional?.nombre ||
          registro?.profesional?.id
      );
      if (!key) return true;
      return key === profesionalKeyNombre || key === profesionalKeyId;
    };
    const matchesServicio = (registro) => {
      const key = normalizeText(
        registro?.servicio ||
          registro?.servicioId ||
          registro?.servicioNombre ||
          registro?.servicio?.nombre ||
          registro?.servicio?.titulo ||
          registro?.servicio?._id ||
          registro?.servicio?.id
      );
      if (!key) return true;
      return key === servicioKeyId || key === servicioKeyNombre;
    };
    const carritoDuplicado = turnos.some((t) => {
      return (
        formatDateKey(t.fechaReserva || t.fecha) === fechaKey &&
        formatTimeKey(t.horaReserva || t.hora) === horaKey &&
        matchesProfesional(t) &&
        matchesServicio(t)
      );
    });

    if (carritoDuplicado) {
      setError("Ya tenés ese turno en el carrito");
      return;
    }

    const reservaDuplicada = reservasActuales.some((t) => {
      return (
        formatDateKey(t.fechaReserva || t.fecha) === fechaKey &&
        formatTimeKey(t.horaReserva || t.hora) === horaKey &&
        matchesProfesional(t) &&
        matchesServicio(t)
      );
    });

    if (reservaDuplicada) {
      console.log("[Turnos] duplicado detectado", { fechaKey, horaKey, profesionalNombre });
      setError("Ya existe una reserva con ese servicio, profesional, dia y horario");
      return;
    }

    const servicioId = obtenerIdServicio(servicioActual);
    if (!servicioId) {
      setError("No se pudo identificar el servicio seleccionado.");
      return;
    }

    const servicioLabel = obtenerNombreServicio(servicioActual) || servicioNombre;

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
                  {categoriasDisponibles.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className="input-group mb-3">
                <Form.Label className="input-group-text">SERVICIO</Form.Label>
                <Form.Select
                  value={servicioSeleccionado}
                  onChange={(e) => {
                    setServicioSeleccionado(e.target.value);
                    resetProfesionalYFecha();
                  }}
                  disabled={!categoriaSeleccionada}
                >
                  <option value="">Seleccionar Servicio</option>
                  {serviciosDeCategoria.map((s) => {
                    const servicioId = obtenerIdServicio(s);
                    const servicioLabel = obtenerNombreServicio(s);
                    if (!servicioId) return null;
                    return (
                      <option key={servicioId} value={servicioId}>
                        {servicioLabel}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>

              <div className="input-group mb-3">
                <Form.Label className="input-group-text">
                  PROFESIONAL
                </Form.Label>
                <Form.Select
                  value={profesionalSeleccionadoId}
                  onChange={(e) => {
                    setProfesionalSeleccionadoId(e.target.value);
                    resetFechaYHora();
                  }}
                  disabled={!servicioSeleccionado}
                >
                  <option value="">Seleccionar Profesional</option>
                  {profesionalesDisponibles.map((p) => {
                    const profesionalId = obtenerIdProfesional(p);
                    const profesionalLabel = obtenerNombreProfesional(p);
                    const especialidad = obtenerEspecialidadProfesional(p);
                    if (!profesionalId) return null;
                    return (
                      <option key={profesionalId} value={profesionalId}>
                        {profesionalLabel}
                        {especialidad ? ` (${especialidad})` : ""}
                      </option>
                    );
                  })}
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
                    disabled={!profesionalSeleccionadoId}
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
                    dateFormat="HH:mm"
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
