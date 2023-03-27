import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export function App() {
  const [query, setQuery] = useState('');
  const [success, setSuccess] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setQuery(data);
    setPage(1);
  };

  const onFetch = data => {
    if (data.length > 0) {
      setSuccess(true);
      setLoading(false);
    }
  };

  const onBtnClick = () => {
    setPage(s => s + 1);
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '20',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        paddingBottom: 20,
      }}
    >
      <Searchbar query={onSubmit} />
      <ImageGallery
        query={query}
        onFetchComplete={onFetch}
        currentPage={page}
      />
      {success && <Button clickHandler={onBtnClick} />}
    </div>
  );
}
