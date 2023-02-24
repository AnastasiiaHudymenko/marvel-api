import { useState, useCallback } from 'react';
import axios from 'axios';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, body = null) => {
    setLoading(true);
    try {
      const res = await axios.get(url, { body });
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { loading, error, request, clearError };
};
