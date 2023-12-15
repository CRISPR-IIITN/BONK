import useRooms, { Room } from "../hooks/useRooms";
import { Box, Grid, Spinner, Text } from "@chakra-ui/react";

export type SelectedParam = "download" | "upload" | "ping";

const RoomGrid = ({ floor, selectedParam }: { floor: number, selectedParam: SelectedParam }) => {
  const { rooms, error, isLoading } = useRooms(floor);
  const layout = [
    ["45", "46", "47", "48", "g", "49", "50", "51", "52", "g", "53", "54", "55", "56", "g", "g", "g", "g", "g", "g", "g"],
    ["44", "43", "42", "41", "g", "40", "39", "38", "37", "g", "36", "35", "34", "33", "g", "g", "g", "g", "g", "g", "g"],
    ["19", "20", "21", "22", "g", "23", "24", "25", "26", "g", "27", "28", "29", "30", "g", "31", "32", "g", "g", "g", "g"],
    ["18", "17", "16", "15", "g", "14", "13", "12", "11", "g", "10", "09", "08", "07", "g", "06", "05", "04", "03", "02", "01"]
  ];

  const getParamValue = (room: number) => {
    let returnValue = 0;
    rooms.forEach((r: Room) => {
      if (r.room === room) {
        if (selectedParam === "download") {
          returnValue = r.download;
        } else if (selectedParam === "upload") {
          returnValue = r.upload;
        } else if (selectedParam === "ping") {
          returnValue = r.ping;
        }
      }
    });

    return returnValue;
  }

  const calculateRoomNumber = (floor: number, cell: string) => {
    return (floor * 100) + parseInt(cell);
  };

  const getSpeedColor = (speed: number) => {
    if (speed <= 40){
      return "#800000"
    } else if (speed <= 80) {
      // interpolate between maroon (hex #800000) and yellow (hex #FFFF00)
      const ratio = speed / 50;
      const r = Math.round(128 * (1 - ratio) + 255 * ratio);
      const g = Math.round(ratio * 255);
      return `rgb(${r}, ${g}, 0)`;
    } else if (speed <= 120) {
      // interpolate between yellow (hex #FFFF00) and green (hex #008000)
      const ratio = (speed - 50) / 70;
      const r = Math.round(255 * (1 - ratio));
      const g = Math.round(255 * ratio + 128 * (1 - ratio));
      return `rgb(${r}, ${g}, 0)`;
    } else {
      // return green for speeds of 120 and above
      return 'rgb(0, 128, 0)';
    }
  }

  const getPingColor = (ping: number) => {
    if (ping <= 40) {
      // return green for pings of 40 and below
      return 'rgb(0, 128, 0)';
    } else if (ping <= 80) {
      // interpolate between green and yellow
      const ratio = (ping - 40) / 40;
      const r = Math.round(255 * ratio);
      const g = 128 + Math.round(127 * ratio);
      return `rgb(${r}, ${g}, 0)`;
    } else if (ping <= 120) {
      // interpolate between yellow and maroon 
      const ratio = (ping - 80) / 40;
      const r = 255 - Math.round(127 * ratio);
      const g = 255 - Math.round(127 * ratio);
      return `rgb(${r}, ${g}, 0)`;
    } else {
      // return maroon for pings of 120 and above
      return 'rgb(128, 0, 0)';
    }
  }

  const getRoomColor = (floor: number, cell: string) => {
    const paramValue = getParamValue(calculateRoomNumber(floor, cell));

    if (selectedParam !== "ping") 
      return getSpeedColor(paramValue);
    return getPingColor(paramValue);
  }

  return (
    <>
      {isLoading && <Spinner size='xl' mt={220} ml={550}/>}
      {error && <Text color="red">{error}</Text>}
      {!isLoading && layout.map((row, rowIndex) => (
        <Box  border="2px" borderColor="gray.200"
         borderRadius="md"
         p={4}
         mb={rowIndex === 1 ? 24 : 6} mt={4} mr={8} ml={5} key={rowIndex}
        >
          <Grid templateColumns="repeat(21, 1fr)" 
          gap={2}
          >
            {row.map((cell, cellIndex) => (
              <Box
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p={2}
                bg={cell === "g" ? "gray.500" : getRoomColor(floor, cell)}
                key={cellIndex}
              >
                <Text >{cell !== "g" ?  calculateRoomNumber(floor, cell) : ""}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
      ))}
    </>
  );
};

export default RoomGrid;