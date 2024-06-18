// src/components/Carousel/Carousel.jsx

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Exemplo de imagens (substitua pelos seus próprios caminhos)
import CarouselImage1 from './carrosel1.png';
import CarouselImage2 from './carrosel2.png';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: true
  };

  const images = [
    { id: 1, url: CarouselImage1, alt: 'Imagem 1' },
    { id: 2, url: CarouselImage2, alt: 'Imagem 2' },
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map(image => (
          <div key={image.id}>
            <img
              src={image.url}
              alt={image.alt}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
