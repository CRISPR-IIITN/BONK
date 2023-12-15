import { Grid, GridItem, HStack, Select } from "@chakra-ui/react";
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
              onChange={(e) => setSelectedParam(e.target.value as SelectedParam)}
            >
              <option value="download">Download</option>
              <option value="upload">Upload</option>
              <option value="ping">Ping</option>
            </Select>
            <ColorScale selectedParam={selectedParam}/>
          </HStack>
          <RoomGrid floor={floorNumber} selectedParam={selectedParam} />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
