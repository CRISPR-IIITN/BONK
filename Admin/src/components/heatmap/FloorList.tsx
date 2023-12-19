import { Box, List, ListItem, Button, Divider } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  changeFloor: (floor: number) => void;
}

const FloorList = ({ changeFloor }: Props) => {
  const [floor, setFloor] = useState(1);
  return (
    <Box borderRadius="lg" overflow="hidden" p={3}>
      <List border="2px" borderColor="gray" borderRadius="10px">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <Box key={i + 1}>
              <ListItem height="50px">
                <Button
                  width="100%"
                  height="50px"
                  borderTopRadius={(i + 1 == 1) ? "8px" : "0px"}
                  borderBottomRadius={(i + 1 == 10) ? "8px" : "0px"}
                  backgroundColor={floor === i + 1 ? "blue.600" : ""}
                  _hover={{ bg: "blue.600" }}
                  onClick={() => {
                      setFloor(i + 1);
                      changeFloor(i + 1);
                  }}
                >
                  Floor {i + 1}
                </Button>
              </ListItem>
              {i < 9 && <Divider />}
            </Box>
          ))}
      </List>
    </Box>
  );
};

export default FloorList;
