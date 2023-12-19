import useRooms, { Room } from "../hooks/useRooms";
import {
  Box,
  Grid,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
} from "@chakra-ui/react";
import NetworkError from "./NetworkError";
import moment from "moment-timezone";
import { layout } from "../assets/layout";

export type SelectedParam = "download" | "upload" | "ping";

const RoomGrid = ({
  floor,
  selectedParam,
}: {
  floor: number;
  selectedParam: SelectedParam;
}) => {
  const { rooms, error, isLoading } = useRooms(floor);

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
  };

  const calculateRoomNumber = (floor: number, cell: string) => {
    return floor * 100 + parseInt(cell);
  };

  const getSpeedColor = (speed: number) => {
    if (speed <= 40) {
      // return maroon for speeds of 40 and below
      return "#800000";
    } else if (speed <= 80) {
      // interpolate between maroon and yellow
      const ratio = speed / 50;
      const r = Math.round(128 * (1 - ratio) + 255 * ratio);
      const g = Math.round(ratio * 255);
      return `rgb(${r}, ${g}, 0)`;
    } else if (speed <= 120) {
      // interpolate between yellow and green
      const ratio = (speed - 50) / 70;
      const r = Math.round(255 * (1 - ratio));
      const g = Math.round(255 * ratio + 128 * (1 - ratio));
      return `rgb(${r}, ${g}, 0)`;
    } else {
      // return green for speeds of 120 and above
      return "rgb(0, 128, 0)";
    }
  };

  const getPingColor = (ping: number) => {
    if (ping <= 40) {
      // return green for pings of 40 and below
      return "rgb(0, 128, 0)";
    } else if (ping <= 80) {
      // interpolate between green and yellow
      const ratio = (ping - 40) / 40;
      const r = Math.round(255 * ratio);
      const g = 128 + Math.round(127 * ratio);
      return `rgb(${r}, ${g}, 0)`;
    } else if (ping <= 100) {
      // interpolate between yellow and maroon
      const ratio = (ping - 80) / 40;
      const r = 255 - Math.round(127 * ratio);
      const g = 255 - Math.round(127 * ratio);
      return `rgb(${r}, ${g}, 0)`;
    } else {
      // return maroon for pings of 100 and above
      return "rgb(128, 0, 0)";
    }
  };

  const getRoomColor = (floor: number, cell: string) => {
    const paramValue = getParamValue(calculateRoomNumber(floor, cell));

    if (selectedParam !== "ping") return getSpeedColor(paramValue);
    return getPingColor(paramValue);
  };

  const formatDateToIST = (mongoDate: Date) => {
    const date = moment(mongoDate);
    const istDate = date.tz("Asia/Kolkata");
    return istDate.format("HH:mm DD/MM/YY");
  };

  const getDateHover = (floor: number, cell: string) => {
    const roomNumber = calculateRoomNumber(floor, cell);
    let returnDate = new Date();
    rooms.forEach((r: Room) => {
      if (r.room === roomNumber) {
        returnDate = r.lastSpeedTest;
      }
    });

    const ISTDate = formatDateToIST(returnDate);

    if (ISTDate) {
      return `Last tested at ${ISTDate}`;
    }
    return "";
  };

  const getSpeedHover = (floor: number, cell: string) => {
    const roomNumber = calculateRoomNumber(floor, cell);
    const paramValue = getParamValue(roomNumber);

    if (selectedParam !== "ping") return `${paramValue} Mbps`;
    return `${paramValue} ms`;
  };

  const shadedCSS =
    "repeating-linear-gradient(45deg, #4A5568, #4A5568 2px, #CBD5E0 2px, #CBD5E0 4px)";
  return (
    <>
      {isLoading && <Spinner size='xl' mt={220} ml={550} />}
      {!isLoading && error && <NetworkError>{error}</NetworkError>}
      {!isLoading &&
        !error &&
        layout.map((row, rowIndex) => (
          <Box
            border='2px'
            borderColor='gray.200'
            borderRadius='md'
            p={4}
            mb={rowIndex === 1 ? 24 : 6}
            mt={4}
            mr={8}
            ml={5}
            key={rowIndex}
          >
            <Grid templateColumns='repeat(21, 1fr)' gap={2}>
              {row.map((cell, cellIndex) =>
                cell !== "g" ? (
                  <Popover trigger='hover' key={cellIndex}>
                    <PopoverTrigger>
                      <Box
                        border='1px'
                        borderColor='gray.200'
                        borderRadius='md'
                        p={2}
                        bg={getRoomColor(floor, cell)}
                        key={cellIndex}
                      >
                        <Text>{calculateRoomNumber(floor, cell)}</Text>
                      </Box>
                    </PopoverTrigger>
                    <PopoverContent maxWidth={"200px"} bg={"black"}>
                      <PopoverArrow bg={"black"} />
                      <PopoverHeader>
                        <Text>
                          {"Room " + calculateRoomNumber(floor, cell)}
                        </Text>
                      </PopoverHeader>
                      <PopoverBody>
                        <Text>{getSpeedHover(floor, cell)}</Text>
                        <Text>{getDateHover(floor, cell)}</Text>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Box
                    border='1px'
                    borderColor='gray.200'
                    borderRadius='md'
                    p={2}
                    bg={shadedCSS}
                    key={cellIndex}
                  ></Box>
                )
              )}
            </Grid>
          </Box>
        ))}
    </>
  );
};

export default RoomGrid;
