import React from 'react';
import css from './Loader.module.css';
import { ImSpinner2 } from 'react-icons/im';

export function Loader() {
  return (
    <div className={css.spinner}>
      <ImSpinner2 color="tomato" />
    </div>
  );
}
