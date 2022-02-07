import React from 'react';

function useLocalStorage(key, initialValue) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(key);
        let parsedItem = initialValue;

        if (!localStorageItem) {
          localStorage.setItem(key, JSON.stringify(initialValue));
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error, loading);
      }
    }, 500);
  }, []);

  const setLocalStorageItem = (newItem) => {
    try {
      localStorage.setItem(key, JSON.stringify(newItem));
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  }

  return {item, setLocalStorageItem, loading, error};
}

export { useLocalStorage };
