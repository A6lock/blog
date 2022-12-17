/*eslint-disable */

import { useState, useCallback } from 'react';

export default function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = 'GET',
      body = null,
      headers = { 'Content-Type': 'application/' }
    ) => {
      setLoading(() => true);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        if (!response.ok) {
          throw new Error('Ошибка запроса');
        }

        const data = await response.json();

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
}
