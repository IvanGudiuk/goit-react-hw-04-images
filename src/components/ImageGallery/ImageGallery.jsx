import { useState, useEffect } from 'react';
import { fetchApi } from 'Services/fetchApi';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export function ImageGallery({ query, currentPage, onFetchComplete }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  const modalToggle = e => {
    if (e.currentTarget === e.target || e.code === 'Escape')
      setIsModalOpen(s => !s);
  };
  const clickHandler = id => {
    setLoading(true);
    const image = images.find(image => image.id === id);
    const imageInfo = {
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    };
    setSelectedImage(imageInfo);
    setIsModalOpen(true);
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', modalToggle);

    return () => window.removeEventListener('keydown', modalToggle);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }
    setLoading(true);
    fetchApi(query, currentPage)
      .then(data => {
        if (currentPage === 1) {
          setImages([...data.hits]);
        } else {
          setImages(s => [...s, ...data.hits]);
        }
        onFetchComplete(data.hits);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [query, currentPage, onFetchComplete]);

  useEffect(() => {
    if (currentPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [currentPage, images]);

  return (
    <ul className={css.gallery}>
      {images.map(item => (
        <ImageGalleryItem
          image={item}
          key={item.id}
          onClick={() => clickHandler(item.id)}
        />
      ))}
      {loading && <Loader />}
      {isModalOpen && <Modal image={selectedImage} onClick={modalToggle} />}
    </ul>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string,
  onFetchComplete: PropTypes.func,
  currentPage: PropTypes.number,
};
