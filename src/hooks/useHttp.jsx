import { useCallback, useEffect, useState } from 'react';

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch.');
  }

  return data;
}

export const useHttp = (url, config, initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const clearData = () => setData(initialData);

  const sendRequest = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const resp = await sendHttpRequest(url, { ...config, body: data });
        setData(resp);
      } catch (e) {
        setError(e.message || 'Failed to send request');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { data, isLoading, error, sendRequest, clearData };
};
