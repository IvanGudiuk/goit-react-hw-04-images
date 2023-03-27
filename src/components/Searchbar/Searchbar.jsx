import { useLocalStorage } from 'hooks/useLocalStorage';
import PropTypes from 'prop-types';
import { ReactComponent as Icon } from '../../icons/search.svg';
import css from './Searchbar.module.css';

export function Searchbar({ query }) {
  const [value, setValue] = useLocalStorage('queryValue', ' ');

  const submitHandler = e => {
    e.preventDefault();
    query(value);
    setValue(' ');
  };

  const onChangeHandler = e => {
    setValue(e.target.value);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={submitHandler}>
        <button type="submit" className={css.button} disabled={value === ' '}>
          <Icon width={20} height={20} />
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeHandler}
          value={value}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  query: PropTypes.string,
};
