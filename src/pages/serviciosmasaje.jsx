import '../App.css';

import { Link } from 'react-router-dom';
import imagenMap from '../assets/imagenMap.js';

function ServiciosMasajes  () {
  return (
  <main>
    <section>
      <article>
         <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <div id="carouselExampleCaptions" className="carousel slide">
                  <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src={imagenMap.SM1} className="d-block w-100" alt="STF1"  />
                        <div className="carousel-caption d-none d-md-block">
                          <h5 >Masaje Sueco</h5>
                        </div>
                    </div>
                    <div className="carousel-item">
                      <img src={imagenMap.SM2} className="d-block w-100" alt="STF2"  />
                      <div className="carousel-caption d-none d-md-block">
                         <h5 >Masaje Hot Stones</h5>
                      </div>
                    </div>
                    <div className="carousel-item">
                       <img src={imagenMap.SM3} className="d-block w-100" alt="stf3" />
                       <div className="carousel-caption d-none d-md-block">
                         <h5 >Masaje Signature</h5>
                       </div>
                    </div>
                  </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title2">Masaje Sueco</h5>
                    <p className="card-text">Este es el tipo de masaje en el que mover las manos relajar los
                      músculos siempre coincidiendo en la dirección del masaje: siempre al corazón. Con
                      eso, lo que obtienes es alivia todos los músculos relaja las articulaciones después
                      de un día ajetreado y equilibra el cuerpo para descansar bien después del atardecer.

                      Con masaje sueco la relajación se extiende por todo el cuerpo que además cubre la
                      mente, eliminando toxinas, tonificando, activando la circulación sanguínea y
                      transmitiendo todo lo que necesitamos para estar sanos.
                    <br/>
                      Duracion: 60 minutos
                    </p>
                  <h5 className="card-title2">Masaje Hot Stones</h5>
                    <p className="card-text">Es una técnica de relajación y bienestar utilizada desde tiempos
                      ancestrales. Se basa en la aplicación de piedras previamente calentadas sobre
                      diferentes áreas del cuerpo. Estas piedras, generalmente de origen volcánico, son
                      seleccionadas por su capacidad de retener el calor de manera prolongada.

                      El objetivo principal del masaje con piedras calientes es proporcionar alivio y
                      relajación a través del calor y el contacto directo con las piedras. Existen
                      beneficios de masaje con piedras calientes, este considera una terapia física y
                      emocional, ya que actúa sobre distintos aspectos del ser humano, tanto a nivel
                      corporal como energético.
                    <br/>
                      Duracion: 60 minutos
                    </p>
                  <h5 className="card-title2">Masaje Signature</h5>
                    <p className="card-text"> El masaje signature es un tipo de masaje que se caracteriza por ser de presión firme y eficaz, diseñado para eliminar dolores, tensiones del estrés y contracturas. Este masaje se personaliza según las necesidades del cliente y puede incluir el uso de aceite tibio fundido de velas naturales, lo que proporciona una hidratación profunda y una sensación de bienestar. Además, se enfoca en aliviar los músculos tensos y rígidos, utilizando técnicas que pueden incluir codos y nudillos para liberar la tensión muscular. 
                    <br/>
                      Duracion: 60 minutos
                    </p>
                    <p className="card-text"> Valor de cada servicio: $ 95.000 arg.</p>
                      <Link to="/turnos" className="btnservicio">Reserva tu turno</Link>
                </div>
              </div>
            </div>
         </div>
      </article>
    </section>
    <section>
      <h2 className="Titulotesti">~ CONOCE LAS OPINIONES DE NUESTROS CLIENTES ~</h2>
      <div className="Cajaflexible reseñasflex">
        <div className="card border-dark mb-3" style="max-width: 18rem;">
          <div className="card-header">
            <div className="Flexreseña">
              <img src={imagenMap.RT1} alt="Spa" width="50vw" height="50vh" />
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title2">Camila T. (38 años)</h5>
              <p className="Testimonio">Cada visita a este spa es un verdadero escape. El masaje relajante con aceites esenciales es mi favorito: salgo como nueva, sin tensiones y completamente renovada. El ambiente es sereno y elegante, y el personal tiene manos mágicas. Un lujo que vale cada centavo."</p>
          </div>
        </div>
        <div className="card border-dark mb-3" >
          <div className="card-header">
            <div className="Flexreseña">
              <img src={imagenMap.RT2} alt="Spa"  />
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title2">Martín L. (45 años)</h5>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <p className="Testimonio">"Trabajo muchas horas frente a la computadora y los masajes descontracturantes de este spa me han cambiado la vida. El lugar es impecable, con atención de primer nivel y terapeutas que realmente saben lo que hacen. Me ayudaron con dolores de espalda crónicos en pocas sesiones."</p>
          </div>
        </div>
        <div className="card border-dark mb-3">
          <div className="card-header">
            < div className="Flexreseña">
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title2">Martín L. (45 años)</h5>
              <p className="Testimonio">"Trabajo muchas horas frente a la computadora y los masajes descontracturantes de este spa me han cambiado la vida. El lugar es impecable, con atención de primer nivel y terapeutas que realmente saben lo que hacen. Me ayudaron con dolores de espalda crónicos en pocas sesiones."</p>
          </div>
        </div>
        <div className="card border-dark mb-3">
          <div className="card-header">
            <div className="Flexreseña">
              <img src={imagenMap.RT3} alt="Spa" />
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title2">Elena V. (50 años)</h5>
                <p className="Testimonio"> "Este spa es mi refugio. El masaje con piedras calientes fue una experiencia única: profundo, relajante y sumamente reconfortante. Desde que empecé a venir, duermo mejor y me siento con más energía. Todo está pensado para que te sientas especial."</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ServiciosMasajes;