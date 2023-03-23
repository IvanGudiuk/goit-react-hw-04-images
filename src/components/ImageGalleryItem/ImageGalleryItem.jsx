import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ image, onClick }) {
  return (
    <li className={css.item} onClick={onClick}>
      <img className={css.picture} src={image.webformatURL} alt={image.tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  onClick: PropTypes.func,
};
