import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { CanceledError } from "axios";

export interface Room {
  room: number;
  upload: number;
  download: number;
  ping: number;
}

const useRooms = (floor: number) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const floorString = floor.toString();

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    apiClient.get<Room[]>("/" + floorString, { signal: controller.signal })
      .then(({data}) => {
        setRooms(data);
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
  }, [floor])

  return { rooms, error, isLoading };
}

export default useRooms;