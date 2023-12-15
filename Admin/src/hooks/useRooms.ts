import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

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
    apiClient.get<Room[]>("/" + floorString)
      .then(({data}) => {
        setRooms(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [floor])

  return { rooms, error, isLoading };
}

export default useRooms;