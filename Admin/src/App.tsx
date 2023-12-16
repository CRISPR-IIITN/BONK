import { Box, Grid, GridItem, HStack, Select, Text } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import FloorList from "./components/FloorList";
import RoomGrid, { SelectedParam } from "./components/RoomGrid";
import { useState } from "react";
import ColorScale from "./components/ColorScale";

function App() {
  const [floorNumber, setFloor] = useState<number>(1);
  const [selectedParam, setSelectedParam] = useState<SelectedParam>("download");
  const changeFloor = (floor: number) => {
    setFloor(floor);
  };
  const shadedCSS =
    "repeating-linear-gradient(45deg, #4A5568, #4A5568 2px, #CBD5E0 2px, #CBD5E0 4px)";
  return (
    <>
      <Grid
        templateAreas={`"nav nav" "aside main"`}
        templateColumns={{
          lg: "20fr 80fr",
        }}
      >
        <GridItem area="nav" bgColor="#0d111a">
          <NavBar />
        </GridItem>
        <GridItem area="aside">
          <FloorList changeFloor={changeFloor} />
        </GridItem>
        <GridItem area="main" mt={3}>
          <HStack justifyContent={"space-between"}>
            <Select
              placeholder="Select option"
              maxW="200px"
              defaultValue="download"
              ml={5}
              onChange={(e) =>
                setSelectedParam(e.target.value as SelectedParam)
              }
            >
              <option value="download">Download</option>
              <option value="upload">Upload</option>
              <option value="ping">Ping</option>
            </Select>
            <HStack spacing={8}>
              <HStack>
                <Box
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={2}
                  bg={shadedCSS}
                ></Box>
                <Text>gray zone</Text>
              </HStack>
              <ColorScale selectedParam={selectedParam} />
            </HStack>
          </HStack>
          <RoomGrid floor={floorNumber} selectedParam={selectedParam} />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
