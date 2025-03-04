import React, { useEffect, useState } from 'react';
import { BsCartPlus, BsInstagram } from 'react-icons/bs';
import { SubHeading } from '../../components';
import axios from 'axios';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/photos');
        setImages(shuffleArray(response.data.data));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Function to shuffle images randomly
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="app__gallery flex__center">
      <div className="app__gallery-content">
        <h2>
          <SubHeading title="Instagram" />
        </h2>
        <h1 className="headtext__cormorant">Photo Gallery</h1>
        <p className="p__opensans" style={{ color: '#AAAAAA', marginTop: '2rem' }}>
          Explore our collection of delightful dishes and drinks. Each photo captures the essence of our culinary experience.
        </p>
      </div>

      <div className="app__gallery-images">
        <div className="app__gallery-images_container">
          {images.map((image, index) => (
         <div 
         className="app__gallery-images_card flex__center" 
         key={`gallery_image-${index + 1}`}
       >
         <img src={image.url} alt={`gallery_image_${index + 1}`} />
         <BsInstagram className="gallery__image-icon" />
         
         <div className="image-title">{image.title}</div>
       

       </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;

