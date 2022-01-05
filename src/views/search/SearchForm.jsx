import React, { useState } from "react";
import { Formik } from "formik";
import uniqid from "uniqid";
import {
  Box,
  Button,
  Collapse,
  Chip,
  InputAdornment,
  IconButton,
  Grid,
  TextField,
  makeStyles,
  SvgIcon,
  Paper,
  TableContainer,
  TablePagination,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import {
  XCircle as XCircleIcon,
  Search as SearchIcon,
  ChevronDown as FilterIcon,
  ChevronUp as ChevronUpIcon,
} from "react-feather";
import cuisineData from "../../data/cuisineType";
import dietData from "../../data/dietType";
import { searchRecipe } from "../../slices/searchResult";
import { reduxDispatch, reduxSelector } from "../../store";
import ErrorBar from "../errors/ErrorBar";
import Title from "../../components/Title";
import SearchResult from "./SearchResult";
import useErrorHook from "../../hooks/useErrorHook";
import SearchInstruction from "./SearchInstruction";
import chipStyle from "../../theme/chipStyle";

const useStyles = makeStyles((theme) => ({
  root: {},
  ...chipStyle(theme),
  adjustedBtn: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(0),
    },
  },
  adjustedIcon: {
    marginTop: theme.spacing(1.2),
    marginLeft: theme.spacing(0.5),
  },
  recordFound: {
    paddingLeft: theme.spacing(1),
  },
}));

export default function SearchForm() {
  const classes = useStyles();
  const dispatch = reduxDispatch();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
  const searchResult = reduxSelector(
    (store) => store.searchResult.searchResult,
  );
  const { errorState, handleClose, handleErrorMsg } = useErrorHook();
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
    totalElements: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    open: false,
    searchStr: "",
    cuisineType: "none",
    dietType: "none",
    includeIngredients: [],
  });

  const [includeIngredient, setIncludeIngredient] = useState("");
  const totalElements = searchResult.totalResults
    ? searchResult.totalResults
    : pagination.totalElements;

  const searchRecipes = async (formData, pageInfo) => {
    setIsLoading(true);
    const { page, pageSize } = pageInfo;
    const pageQuery = `&offset=${page * pageSize}&number=${pageSize}`;

    //Basic Query
    let query = formData.searchStr && `query=${formData.searchStr}`;

    if (formData.cuisineType !== "none")
      query += `&cuisine=${formData.cuisineType}`;
    if (formData.dietType !== "none") query += `&diet=${formData.dietType}`;

    if (formData.includeIngredients.length > 0) {
      let ingredients = "";
      formData.includeIngredients.forEach((each) => {
        ingredients += `${each},`;
      });
      let finalIngredients = ingredients.slice(0, ingredients.length - 1);
      query += `&includeIngredients=${finalIngredients}`;
    }

    //Nutrients Query
    if (formData.open) {
      query += formData.maxProtein ? `&maxProtein=${formData.maxProtein}` : "";
      query += formData.minProtein ? `&minProtein=${formData.minProtein}` : "";
      query += formData.maxCalories
        ? `&maxCalories=${formData.maxCalories}`
        : "";
      query += formData.minCalories
        ? `&minCalories=${formData.minCalories}`
        : "";
      query += formData.maxFat ? `&maxFat=${formData.maxFat}` : "";
      query += formData.minFat ? `&minFat=${formData.minFat}` : "";
      query += formData.maxCarbs ? `&maxCarbs=${formData.maxCarbs}` : "";
      query += formData.minCarbs ? `&minCarbs=${formData.minCarbs}` : "";
    }

    try {
      const result = await dispatch(searchRecipe(query + pageQuery));
      if (result.error) {
        handleErrorMsg(result.error.message);
      }
      setPagination({
        ...pageInfo,
        totalElements: result.payload.totalResults,
      });
      setIsLoading(false);
    } catch (e) {
      // console.error(e)
    }
  };

  return (
    <>
      {errorState.open && (
        <ErrorBar errorState={errorState} handleClose={handleClose} />
      )}

      <Box m={3} component={Paper}>
        <SearchInstruction />

        <Formik
          validateOnChange={true}
          validateOnBlur={false}
          initialValues={{}}
          onSubmit={async () => {
            try {
              searchRecipes(formData, pagination);
            } catch (err) {
              console.error(err);
            }
          }}>
          {/* Render */}
          {({ handleSubmit, errors, touched }) => {
            return (
              <>
                <Box p={3} pt={1}>
                  <form onSubmit={handleSubmit}>
                    <Box
                      pb={2}
                      display='flex'
                      flexDirection={mobileDevice ? "column" : "row"}>
                      <TextField
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <SvgIcon fontSize='small' color='action'>
                                <SearchIcon />
                              </SvgIcon>
                            </InputAdornment>
                          ),

                          endAdornment: formData.searchStr &&
                            formData.searchStr.length > 0 && (
                              <InputAdornment position='end'>
                                <Button
                                  aria-label='Clear Search Bar'
                                  onClick={() => {
                                    setFormData((prev) => {
                                      return {
                                        ...prev,
                                        searchStr: "",
                                      };
                                    });
                                  }}>
                                  {<XCircleIcon />}
                                </Button>
                              </InputAdornment>
                            ),
                        }}
                        placeholder='Search by name'
                        name='searchStr'
                        value={formData.searchStr}
                        onChange={(e) => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              searchStr: e.target.value,
                            };
                          });
                        }}
                        error={Boolean(touched.searchStr && errors.searchStr)}
                        helperText={touched.searchStr && errors.searchStr}
                        variant='outlined'
                      />
                      <Button
                        className={classes.adjustedBtn}
                        width='100%'
                        color='secondary'
                        type='submit'
                        size='large'
                        variant='outlined'>
                        Search
                      </Button>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item lg={6} xs={12} md={6}>
                        <TextField
                          error={Boolean(
                            touched.cuisineType && errors.cuisineType,
                          )}
                          helperText={touched.cuisineType && errors.cuisineType}
                          select
                          SelectProps={{ native: true }}
                          InputLabelProps={{ shrink: true }}
                          label='Cuisine type'
                          name='cuisineType'
                          value={formData.cuisineType}
                          onChange={(e) => {
                            setFormData((prev) => {
                              return {
                                ...prev,
                                cuisineType: e.target.value,
                              };
                            });
                          }}
                          variant='outlined'
                          fullWidth>
                          <option key={"none"} value={"none"}>
                            None
                          </option>

                          {cuisineData.cuisineType.map((each) => {
                            return (
                              <option key={each.id} value={each.value}>
                                {each.value}
                              </option>
                            );
                          })}
                        </TextField>
                      </Grid>

                      <Grid item lg={6} xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.dietType && errors.dietType)}
                          helperText={touched.dietType && errors.dietType}
                          select
                          SelectProps={{ native: true }}
                          InputLabelProps={{ shrink: true }}
                          label='Diet type'
                          name='dietType'
                          value={formData.dietType}
                          onChange={(e) => {
                            setFormData((prev) => {
                              return {
                                ...prev,
                                dietType: e.target.value,
                              };
                            });
                          }}
                          variant='outlined'
                          fullWidth>
                          <option key={"none"} value={"none"}>
                            None
                          </option>

                          {dietData.dietType.map((each) => {
                            return (
                              <option key={each.id} value={each.value}>
                                {each.value}
                              </option>
                            );
                          })}
                        </TextField>
                      </Grid>

                      <Grid item lg={6} xs={12} md={12}>
                        <Box
                          display='flex'
                          flexDirection={mobileDevice ? "column" : "row"}>
                          <TextField
                            error={Boolean(
                              touched.includeIngredient &&
                                errors.includeIngredient,
                            )}
                            helperText={
                              touched.includeIngredient &&
                              errors.includeIngredient
                            }
                            label={
                              mobileDevice
                                ? "Include Ingredients"
                                : "Add Include Ingredients"
                            }
                            name='includeIngredient'
                            value={includeIngredient}
                            onChange={(e) => {
                              setIncludeIngredient(e.target.value);
                            }}
                            variant='outlined'
                            fullWidth></TextField>

                          <Button
                            className={classes.adjustedBtn}
                            variant='outlined'
                            color='secondary'
                            size='large'
                            onClick={() => {
                              if (includeIngredient !== "") {
                                setFormData((prev) => {
                                  return {
                                    ...prev,
                                    includeIngredients: [
                                      ...prev.includeIngredients,
                                      {
                                        id: uniqid("chip-"),
                                        value: includeIngredient,
                                      },
                                    ],
                                  };
                                });

                                setIncludeIngredient("");
                              }
                            }}>
                            Add
                          </Button>
                        </Box>
                      </Grid>

                      <Grid item lg={6} xs={12} md={12}>
                        {formData.includeIngredients.length > 0 && (
                          <Title
                            title='Include Ingredients:'
                            includeDivider={false}
                          />
                        )}
                        <Box display='flex'>
                          {formData.includeIngredients &&
                            formData.includeIngredients.map((each) => {
                              return (
                                <Chip
                                  key={each.id}
                                  label={each.value}
                                  className={classes.Chips}
                                  onDelete={() => {
                                    const filteredList =
                                      formData.includeIngredients.filter(
                                        (eachItem) => eachItem.id !== each.id,
                                      );

                                    setFormData((prev) => {
                                      return {
                                        ...prev,
                                        includeIngredients: filteredList,
                                      };
                                    });
                                  }}
                                  deleteIcon={<XCircleIcon />}
                                />
                              );
                            })}
                        </Box>
                      </Grid>

                      <Grid item lg={12} xs={12} md={12} align='center'>
                        <IconButton
                          onClick={() => {
                            setFormData((prev) => {
                              return {
                                ...prev,
                                open: !prev.open,
                              };
                            });
                          }}>
                          <Title
                            title='Complex Search:'
                            includeDivider={true}
                          />

                          {formData.open ? (
                            <ChevronUpIcon className={classes.adjustedIcon} />
                          ) : (
                            <FilterIcon className={classes.adjustedIcon} />
                          )}
                        </IconButton>
                      </Grid>

                      <Grid item lg={12} xs={12} md={12}>
                        <Collapse
                          in={formData.open}
                          timeout='auto'
                          unmountOnExit>
                          <Grid container spacing={2}>
                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(
                                  touched.minCalories && errors.minCalories,
                                )}
                                helperText={
                                  touched.minCalories && errors.minCalories
                                }
                                label='Min Calories Amount:'
                                name='minCalories'
                                value={formData.minCalories}
                                onChange={(e) => {
                                  setFormData((prev) => {
                                    return {
                                      ...prev,
                                      minCalories: e.target.value,
                                    };
                                  });
                                }}
                                variant='outlined'
                                fullWidth></TextField>
                            </Grid>

                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(
                                  touched.maxCalories && errors.maxCalories,
                                )}
                                helperText={
                                  touched.maxCalories && errors.maxCalories
                                }
                                label='Max Calories Amount:'
                                name='maxCalories'
                                value={formData.maxCalories}
                                onChange={(e) => {
                                  setFormData((prev) => {
                                    return {
                                      ...prev,
                                      maxCalories: e.target.value,
                                    };
                                  });
                                }}
                                variant='outlined'
                                fullWidth></TextField>
                            </Grid>

                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(
                                  touched.maxProtein && errors.maxProtein,
                                )}
                                helperText={
                                  touched.maxProtein && errors.maxProtein
                                }
                                label='Max Protein Amount:'
                                name='maxProtein'
                                value={formData.maxProtein}
                                onChange={(e) => {
                                  setFormData((prev) => {
                                    return {
                                      ...prev,
                                      maxProtein: e.target.value,
                                    };
                                  });
                                }}
                                variant='outlined'
                                fullWidth></TextField>
                            </Grid>

                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(
                                  touched.minProtein && errors.minProtein,
                                )}
                                helperText={
                                  touched.minProtein && errors.minProtein
                                }
                                label='Min Protein Amount:'
                                name='minProtein'
                                value={formData.minProtein}
                                onChange={(e) => {
                                  setFormData((prev) => {
                                    return {
                                      ...prev,
                                      minProtein: e.target.value,
                                    };
                                  });
                                }}
                                variant='outlined'
                                fullWidth></TextField>
                            </Grid>

                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(touched.maxFat && errors.maxFat)}
                                helperText={touched.maxFat && errors.maxFat}
                                label='Max Fat Amount:'
                                name='maxFat'
                                value={formData.maxFat}
                                onChange={(e) => {
                                  setFormData((prev) => {
                                    return {
                                      ...prev,
                                      maxFat: e.target.value,
                                    };
                                  });
                                }}
                                variant='outlined'
                                fullWidth></TextField>
                            </Grid>

                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(touched.minFat && errors.minFat)}
                                helperText={touched.minFat && errors.minFat}
                                label='Min Fat Amount:'
                                name='minFat'
                                value={formData.minFat}
                                onChange={(e) => {
                                  setFormData((prev) => {
                                    return {
                                      ...prev,
                                      minFat: e.target.value,
                                    };
                                  });
                                }}
                                variant='outlined'
                                fullWidth></TextField>
                            </Grid>

                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(
                                  touched.maxCarbs && errors.maxCarbs,
                                )}
                                helperText={touched.maxCarbs && errors.maxCarbs}
                                label='Max Carbs Amount:'
                                name='maxCarbs'
                                value={formData.maxCarbs}
                                onChange={(e) => {
                                  setFormData((prev) => {
                                    return {
                                      ...prev,
                                      maxCarbs: e.target.value,
                                    };
                                  });
                                }}
                                variant='outlined'
                                fullWidth></TextField>
                            </Grid>

                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(
                                  touched.minCarbs && errors.minCarbs,
                                )}
                                helperText={touched.minCarbs && errors.minCarbs}
                                label='Min Carbs Amount:'
                                name='minCarbs'
                                value={formData.minCarbs}
                                onChange={(e) => {
                                  setFormData((prev) => {
                                    return {
                                      ...prev,
                                      minCarbs: e.target.value,
                                    };
                                  });
                                }}
                                variant='outlined'
                                fullWidth></TextField>
                            </Grid>
                          </Grid>
                        </Collapse>
                      </Grid>
                    </Grid>
                    {/* <pre className={classes.pre}>
                      {JSON.stringify(formData, null, 4)}
                    </pre> */}
                  </form>
                </Box>
              </>
            );
          }}
          {/* End of Rendering */}
        </Formik>
      </Box>
      <Box mt={5} m={3} component={Paper}>
        <TableContainer>
          <Title title='Search Result:' includeDivider={true} />

          <Typography
            className={classes.recordFound}
            color='textSecondary'
            variant='body2'>
            {totalElements} Records found. Page {pagination.page + 1} of{" "}
            {Math.ceil(totalElements / pagination.pageSize)}
          </Typography>

          <SearchResult isLoading={isLoading} />
          <TablePagination
            backIconButtonProps={{ disabled: pagination.page === 0 }}
            component='div'
            count={totalElements}
            onChangePage={(event, page) => {
              const newPagination = {
                ...pagination,
                page: page === -1 ? 0 : page,
              };
              searchRecipes(formData, newPagination);
            }}
            onRowsPerPageChange={(event) => {
              const newPagination = {
                ...pagination,
                pageSize: +event.target.value,
                page: 0,
              };
              searchRecipes(formData, newPagination);
            }}
            page={pagination.page}
            rowsPerPage={pagination.pageSize}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </TableContainer>
      </Box>
    </>
  );
}
