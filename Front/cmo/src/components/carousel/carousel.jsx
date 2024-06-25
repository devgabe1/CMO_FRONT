// src/components/carousel/carousel.jsx

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css';

// Exemplo de imagens (substitua pelos seus próprios caminhos)
import CarouselImage1 from '../../styles/images/logos/logo1.png';
import CarouselImage2 from '../../styles/images/logos/logo2.png';
import CarouselImage3 from '../../styles/images/logos/logo3.png';
import CarouselImage4 from '../../styles/images/logos/logo4.png';
import CarouselImage5 from '../../styles/images/logos/logo5.png';
import CarouselImage6 from '../../styles/images/logos/logo6.png';
import CarouselImage7 from '../../styles/images/logos/logo7.png';
import CarouselImage8 from '../../styles/images/logos/logo8.png';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: true
  };

  const images = [
    { id: 1, url: CarouselImage1, alt: 'Imagem 1' },
    { id: 2, url: CarouselImage2, alt: 'Imagem 2' },
    { id: 3, url: CarouselImage3, alt: 'Imagem 3' },
    { id: 4, url: CarouselImage4, alt: 'Imagem 4' },
    { id: 5, url: CarouselImage5, alt: 'Imagem 5' },
    { id: 6, url: CarouselImage6, alt: 'Imagem 6' },
    { id: 7, url: CarouselImage7, alt: 'Imagem 7' },
    { id: 8, url: CarouselImage8, alt: 'Imagem 8' },
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
