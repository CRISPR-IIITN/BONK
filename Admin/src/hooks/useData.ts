import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { CanceledError } from "axios";

const useData = <T>(endpoint: string, deps?: any[]) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    apiClient.get<T[]>(endpoint, { signal: controller.signal })
      .then(({data}) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    }
  }, deps ? [...deps] : [])

  return { data, error, isLoading };
}

export default useData;