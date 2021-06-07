import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitRequest = useCallback(async (httpConfig, transferApply) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(httpConfig.url, {
        method: httpConfig.method ? httpConfig.method : "GET",
        headers: httpConfig.headers ? httpConfig.headers : {},
        body: httpConfig.body ? JSON.stringify(httpConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      transferApply(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return { isLoading, error, submitRequest };
};

export default useHttp;
