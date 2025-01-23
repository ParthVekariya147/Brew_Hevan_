import React from 'react';
import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Gallery.css';

const Gallery = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  return (
    <div className="app__gallery flex__center">
      <div className="app__gallery-content">
        <SubHeading title="Instagram" />
        <h1 className="headtext__cormorant">Photo Gallery</h1>
        <p className="p__opensans" style={{ color: '#AAAAAA', marginTop: '2rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat mattis ipsum turpis elit elit scelerisque egestas mu.
        </p>
      </div>

      <div className="app__gallery-images">
        <div className="app__gallery-images_container" ref={scrollRef}>
          {[
            images.gallery03, images.wine, images.Wine1, images.wine2, images.coctali, 
            images.coffe, images.coffe1, images.ice_coffee, images.caramel_Frappuccino, 
            images.pizza1, images.pizza2, images.burger, images.burger2, images.sandwich1, 
            images.sandwich2, images.french_fries, images.french_fries1, images.noodels, 
            images.meggi, images.cake1, images.cake2, images.ice_cream, images.ice_cream2,
          ].map((image, index) => (
            <div 
              className="app__gallery-images_card flex__center" 
              key={`gallery_image-${index + 1}`}
            >
              <img src={image} alt={`gallery_image_${index + 1}`} />
              <BsInstagram className="gallery__image-icon" />
            </div>
          ))}
        </div>

        <div className="app__gallery-images_arrows">
          <BsArrowLeftShort 
            className="gallery__arrow-icon" 
            onClick={() => scroll('left')}
          />
          <BsArrowRightShort 
            className="gallery__arrow-icon" 
            onClick={() => scroll('right')}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
