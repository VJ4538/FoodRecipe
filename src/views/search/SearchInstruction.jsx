import React from "react";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";
import searchInstructions from "../../data/SearchInstructions";
import Title from "../../components/Title";
const SearchInstruction = () => {
  return (
    <>
      <Title title='Instructions:' includeDivider={true} />
      <Box p={1}>
        <List>
          {searchInstructions.searchInstructions &&
            searchInstructions.searchInstructions.map((each, idx) => {
              return (
                <ListItem key={`instruction-${idx}`} disablePadding>
                  <ListItemText
                    secondary={`${idx + 1}:  ${each.step ? each.step : "N/A"}`}
                  />
                </ListItem>
              );
            })}
        </List>
      </Box>
    </>
  );
};

export default React.memo(SearchInstruction);
