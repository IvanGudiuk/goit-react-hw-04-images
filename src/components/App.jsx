import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
// import { Modal } from './Modal/Modal';
export class App extends Component {
  state = {
    query: '',
    success: false,
    page: 1,
    loading: false,
  };

  onSubmit = data => {
    this.setState({ query: data, page: 1 });
  };

  onFetch = data => {
    if (data.length > 0) {
      this.setState({ success: true, loading: false });
    }
  };

  onBtnClick = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  onImageSelect = data => {
    this.setState({ selectedImage: data });
  };

  render() {
    const { query, success, page } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '20',
          // justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
          paddingBottom: 20,
        }}
      >
        {/* <Modal /> */}
        <Searchbar query={this.onSubmit} />
        <ImageGallery
          query={query}
          onFetchComplete={this.onFetch}
          currentPage={page}
        />
        {success && <Button clickHandler={this.onBtnClick} />}
      </div>
    );
  }
}
