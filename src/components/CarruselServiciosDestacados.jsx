import "../styles/HomePage.css";
import { useState, useEffect } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function CarruselServiciosDestacados({ servicios }) {
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1); //1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2); //2 cards
      } else {
        setCardsPerSlide(3); //3 cards
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!servicios || servicios.length === 0) {
    return (
      <p className="text-center mt-5">
        No hay promociones destacadas en este momento.
      </p>
    );
  }

  const agruparServicios = (arr, tamaño) => {
    const grupos = [];
    for (let i = 0; i < arr.length; i += tamaño) {
      grupos.push(arr.slice(i, i + tamaño));
    }
    return grupos;
  };

  const gruposDeServicios = agruparServicios(servicios, cardsPerSlide);

  return (
    <Carousel className="carrusel-hp pb-5" interval={4000} controls indicators data-aos="fade-up" data-aos-delay="800" data-aos-duration="600" data-aos-easing="ease-in-out">
      {gruposDeServicios.map((grupo, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-center flex-row gap-4 px-3 py-3">
            {grupo.map((servicio) => {
              const imgUrl =
                servicio.img?.secure_url ||
                servicio.imagen?.secure_url ||
                servicio.img ||
                servicio.imagen ||
                "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3";
              return (
                <div
                  className="card card-promo-lujo"
                  key={servicio._id}
                  style={{
                    width:
                      cardsPerSlide === 1
                        ? "100%"
                        : cardsPerSlide === 2
                          ? "48%"
                          : "31%",
                    maxWidth: cardsPerSlide === 1 ? "450px" : "none",
                    margin: "0",
                  }}
                >
                  <div className="card-header text-center">
                    {servicio.categoria?.nombre || "PROMO"}
                  </div>
                  <img
                    src={imgUrl}
                    alt={servicio.nombre}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h4 className="card-title">{servicio.nombre}</h4>
                    <p className="card-text TextCardPromoHP">
                      {servicio.descripcion}
                    </p>

                    <Link
                      to={`/servicios/${servicio._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button className="btn w-100 btnCardPromo">
                        Ver detalles
                      </Button>
                    </Link>
                  </div>
                  <div className="card-footer text-center">
                    Precio: AR${servicio.precio}
                  </div>
                </div>
              );
            })}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
