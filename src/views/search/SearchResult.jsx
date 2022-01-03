import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  LinearProgress,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  SvgIcon,
  makeStyles,
} from "@material-ui/core";
import { ArrowRight as ArrowRightIcon } from "react-feather";
import { reduxSelector } from "../../store";
import tableStyle from "../../theme/tableStyle";

const useStyles = makeStyles((theme) => ({
  root: {},
  ...tableStyle(theme),
}));

const SearchResult = ({ isLoading }) => {
  const classes = useStyles();
  const searchResult = reduxSelector(
    (store) => store.searchResult.searchResult,
  );
  return (
    <>
      <Table>
        <TableHead>
          {[
            "#",
            "Name",
            "Preparation Time",
            "Serving size",
            "Calories",
            "Action",
          ].map((each) => {
            return (
              <TableCell key={each} className={classes.THeader}>
                {each}
              </TableCell>
            );
          })}
        </TableHead>

        {isLoading ? (
          <TableCell colSpan={6}>
            <LinearProgress />
          </TableCell>
        ) : (
          <TableBody>
            {searchResult.results &&
              searchResult.results.map((each, idx) => {
                return (
                  <TableRow key={`searchResult-${idx}`} hover={true}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{each.title && each.title}</TableCell>
                    <TableCell>
                      {each.readyInMinutes && each.readyInMinutes}
                    </TableCell>
                    <TableCell>{each.servings && each.servings}</TableCell>
                    <TableCell>
                      {each.nutrition.nutrients[0].amount &&
                        each.nutrition.nutrients[0].amount +
                          " " +
                          each.nutrition.nutrients[0].unit}
                    </TableCell>
                    <TableCell align='right'>
                      <Button
                        component={Link}
                        fontSize='small'
                        to={`/recipes/${each.id}`}>
                        <SvgIcon fontSize='small'>
                          <ArrowRightIcon />
                        </SvgIcon>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}

            {searchResult.results && searchResult.results.length === 0 && (
              <TableRow>
                <Typography color='textSecondary' variant='body2'>
                  No results found please try again.
                </Typography>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </>
  );
};

export default React.memo(SearchResult);
