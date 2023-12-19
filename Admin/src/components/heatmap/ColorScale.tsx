import { Image } from "@chakra-ui/react";
import { SelectedParam } from "./RoomGrid";
import speed from "../../assets/speed.png";
import ping from "../../assets/ping.png";

const ColorScale = ({ selectedParam }: { selectedParam: SelectedParam }) => {
  if (selectedParam !== "ping") {
    return <Image src={speed} width={"250px"} mr={8} />;
  }
  return <Image src={ping} width={"250px"} mr={8} />;
};

export default ColorScale;
