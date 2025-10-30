import '../App.css';
import 'bootstrap';
import { Link } from 'react-router-dom';
import imagenMap from '../assets/imagenMap.js';

function ServiciosFacial() {
  return (
    <main>
      <section>
        <article>
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <div id="carrusel-servicio-facial" className="carousel slide">
                  <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src={imagenMap.STF1} className="d-block w-100"  />
                      <div className="carousel-caption d-none d-md-block">
                        <h5 >Essential Face Care</h5>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src={imagenMap.STF2} className="d-block w-100"  />
                      <div className="carousel-caption d-none d-md-block">
                      <h5 >Rebalancing Face Care</h5>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src={imagenMap.STF3} className="d-block w-100"  />
                    <div className="carousel-caption d-none d-md-block">
                      <h5 >Glowing Roses</h5>
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
                  <h5 className="card-title2">Essential Face Care</h5>
                    <p className="card-text">El full face es un procedimiento estético que aborda el rostro de
                      manera integral, tratando diferentes áreas en una misma sesión para lograr un
                      resultado armónico y natural. A diferencia de otros tratamientos localizados, su
                      enfoque global permite trabajar de manera personalizada cada zona, según las
                      necesidades específicas del paciente. Restaura el volumen, redefine los contornos y
                      suaviza arrugas, siempre respetando la expresión natural del rostro.
                      <br/>
                      Duracion: 60 minutos
                    </p>
                  <h5 className="card-title2">Rebalancing Face Care</h5>
                    <p className="card-text">El rebalancing es una técnica fundamental en el proceso de
                      selección de los mejores
                      productos de estética. Permite ajustar la proporción de ingredientes activos para
                      lograr un equilibrio
                      óptimo en cada fórmula. Además, rebalancing es el templo donde la piel y el pelo
                      recuperan su equilibrio.
                      Además, el rebalancing facial es el
                      arte y la ciencia de usar
                      tratamientos no quirúrgicos, como rellenos dérmicos y Botox, para restaurar la
                      simetría, proporción y
                      armonía en el rostro, destinados a mejorar la simetría y armonía del rostro.
                      Cada procedimiento se
                      enfoca en diferentes aspectos del rostro, lo que permite un enfoque completo en
                      mejorar la apariencia
                      general.
                      <br/>
                      Duracion: 60 minutos
                    </p>
                  <h5 className="card-title2">Glowing Roses</h5>
                    <p className="card-text"> El tratamiento facial Glowing Roses se realiza con perlas de
                      células madre de rosa
                      alpina
                      y ácido hialurónico. Este lujoso ingrediente actúa como reafirmante natural,
                      aportando luminosidad,
                      hidratación, suavidad y elasticidad. Es un tratamiento no invasivo, indoloro y sin
                      efectos secundarios,
                      perfecto para recuperar la piel tras el verano y mejorar las manchas.
                      El tratamiento se realiza con
                      perlas de células madre
                      de rosa alpina y ácido hialurónico, que previene la deshidratación a lo largo del
                      día.
                      Apto para todo tipo de
                      piel, incluso las más
                      sensibles.
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
            <div className="card border-dark mb-3" >
              <div className="card-header">
                <div className="Flexreseña">
                  <img src={imagenMap.RT1} alt="Spa"/>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title2">Laura M. (35 años)</h5>
                  <p className="Testimonio">"Desde que descubrí este spa, mi piel nunca ha estado mejor. Los tratamientos
                    faciales son personalizados y se nota que utilizan productos de altísima calidad. El ambiente es
                    relajante, elegante y cada detalle está cuidado. Mi favorito es el facial con oxigenoterapia,
                    salgo con la piel luminosa y rejuvenecida. ¡Una experiencia cinco estrellas"</p>
              </div>
            </div>
            <div className="card border-dark mb-3" >
              <div className="card-header">
                <div className="Flexreseña">
                  <img src={imagenMap.RT2} alt="Spa"  />
                   <i className="bi bi-star-fill"></i>

                    <i className="bi bi-star-fill"></i>

                   <i className="bi bi-star-fill"></i>

                   <i className="bi bi-star-fill"></i>

                   <i className="bi bi-star-fill"></i>
                  
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title2">Marcelina C.(42 años)</h5>
                  <p className="Testimonio">"Nunca pensé que disfrutaría tanto de un tratamiento facial, pero este spa
                    superó mis expectativas. La atención es impecable, te hacen sentir como en un hotel de lujo. Me
                    encantó el tratamiento antiedad que me recomendaron: no solo me vi mejor al instante, sino que
                    también me relajé como nunca. Lo recomiendo totalmente."</p>
              </div>
            </div>
            <div className="card border-dark mb-3" >
              <div className="card-header">
                <div className="Flexreseña">
                  <img src={imagenMap.RT3} alt="Spa"  />

                  <i className="bi bi-star-fill"></i>

                  <i className="bi bi-star-fill"></i>

                  <i className="bi bi-star-fill"></i>

                  <i className="bi bi-star-fill"></i>
                    
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title2">Juliana D. (68 años) </h5>
                  <p className="Testimonio">"Visitar este spa es mi momento favorito del mes. Los tratamientos faciales no
                    solo dejan mi piel radiante, sino que también me ayudan a desconectarme del estrés diario. El
                    personal es sumamente profesional y te asesoran según las necesidades de tu piel. El espacio es
                    precioso, con aromas suaves, música relajante y una atención que te hace sentir mimada de
                    principio a fin."</p>
              </div>
            </div>
          </div>
        </section>
    </main>
  )
}

export default ServiciosFacial;