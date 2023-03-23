import PropTypes from 'prop-types';
import css from './Modal.module.css';

export function Modal({ image, onClick }) {
  return (
    <div className={css.overlay} onClick={onClick}>
      <div className={css.modal}>
        <img src={image.largeImageURL} alt={image.tags} className={css.image} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  image: PropTypes.object,
  onClick: PropTypes.func,
};
