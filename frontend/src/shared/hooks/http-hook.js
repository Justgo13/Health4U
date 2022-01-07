import { useState, useCallback } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      let res;
      try {
        switch (method) {
          case "GET":
            res = await axios.get(url, body);
            break;
          case "POST":
            res = await axios.post(url, body);
            break;

          default:
            break;
        }
        setIsLoading(false);
        return res;
      } catch (err) {
        setError(err.response.data.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
