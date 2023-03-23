import React, { Component } from 'react';
import { fetchApi } from 'Services/fetchApi';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    images: [],
    query: this.props.query,
    loading: false,
    isModalOpen: false,
    selectedImage: {},
  };
  componentDidMount() {
    window.addEventListener('keydown', this.modalToggle);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.query !== prevProps.query ||
      prevProps.currentPage !== this.props.currentPage
    ) {
      this.setState({ loading: true });
      fetchApi(this.props.query, this.props.currentPage)
        .then(data => {
          if (this.props.currentPage === 1) {
            this.setState({
              images: [...data.hits],
            });
          } else {
            this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
            }));
          }
          this.props.onFetchComplete(data.hits);
          this.setState({ loading: false });
        })
        .catch(error => {
          alert(`Error fetching API: ${error}`);
          this.setState({ loading: false });
        });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.modalToggle);
  }

  clickHandler = id => {
    const image = this.state.images.find(image => image.id === id);
    const imageInfo = { largeImageURL: image.largeImageURL, tags: image.tags };
    this.setState({ selectedImage: imageInfo, isModalOpen: true });
  };

  modalToggle = e => {
    if (e.currentTarget === e.target || e.code === 'Escape')
      this.setState(state => ({ isModalOpen: !state.isModalOpen }));
  };

  render() {
    const { loading, isModalOpen, selectedImage } = this.state;
    return (
      <ul className={css.gallery} onClick={this.windowClose}>
        {this.state.images.map(item => (
          <ImageGalleryItem
            image={item}
            key={item.id}
            onClick={() => this.clickHandler(item.id)}
          />
        ))}
        {loading && <Loader />}
        {isModalOpen && (
          <Modal image={selectedImage} onClick={this.modalToggle} />
        )}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string,
  onFetchComplete: PropTypes.func,
  currentPage: PropTypes.number,
};
