import useData from "./useData";

export interface Room {
  room: number;
  upload: number;
  download: number;
  ping: number;
  lastSpeedTest: Date;
}

const useRooms = (floor: number) => {
  const floorString = floor.toString();
  return useData<Room>(`/rooms/${floorString}`);
}

export default useRooms;