import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Icon } from '../../icons/search.svg';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('searchValue'));
    if (storage) this.setState({ value: storage.value });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value && this.state.value !== '')
      localStorage.setItem('searchValue', JSON.stringify(this.state));
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.query(this.state.value);
    localStorage.removeItem('searchValue');
    this.setState({ value: '' });
  };

  onChangeHandler = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.submitHandler}>
          <button
            type="submit"
            className={css.button}
            disabled={this.state.value === ''}
          >
            <Icon width={20} height={20} />
          </button>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeHandler}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  query: PropTypes.string,
};
