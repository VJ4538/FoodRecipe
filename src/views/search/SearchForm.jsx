import React, {useState} from 'react'
import { Formik } from 'formik'
import { Link } from 'react-router-dom';

import HeaderDivider from '../../components/HeaderDivider'

import {
    Box,
    Button,
    Collapse,
    Chip,
    InputAdornment,
    IconButton,
    Grid,
    TextField,
    Typography,
    LinearProgress,
    makeStyles,
    List,
    ListItem,
    ListItemText,
    Table,
    TableCell,
    TableContainer,
    TablePagination,
    TableBody,
    TableHead,
    TableRow,
    SvgIcon,
    Paper,
  } from '@material-ui/core'

import {
  XCircle as XCircleIcon,
  Search as SearchIcon,
  ChevronDown as FilterIcon,
  ChevronUp as ChevronUpIcon,
  ArrowRight as ArrowRightIcon,
} from 'react-feather'


import cuisineData from '../../data/cuisineType'
import dietData from '../../data/dietType'

import { searchRecipe } from '../../slices/searchResult'
import { reduxDispatch, reduxSelector } from '../../store'

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        width: '100%',
      },
      '& .MuiDialogActions-root': {
        paddingLeft:'16px',
        paddingRight:'16px'
      },
      '& .MuiChip-deleteIcon':{ 
        color:'#FFF !important'
      },
    },
    THeader:{
      fontWeight:'bold',
    },
    filterItem: {
      padding: 10,
    },
    chips:{
      margin:'0.2rem 0.3rem',
      padding:'2px 4px',
      backgroundColor:'#57CC99 ',
      color:'#fff'
    },

  }));

export default function SearchForm({ className }) {
    const classes =useStyles()
    const dispatch =reduxDispatch()
    const searchResult=reduxSelector(store=>store.searchResult.searchResult)

    const searchInstructions=[
      {
        step:'To search by name you can type in a keyword (Example:chicken) and click search'
      },
      {
        step:'The search function does not required all the field to be filled out to work, you can filled the field you needed.'
      },
      {
        step:'To include ingredients in your search make sure to type in the ingredient you want and press add before clicking search.'
      },
      {
        step:'Enable nutrients based search by clicking on the title and fill the fields you need'
      },
    ]
    //Search Props
    const [searchProps, setSearchProps] = useState({
      open: false,
      searchStr:'',
      cuisineType:'none',
      dietType:'none',
      includeIngredient:'',
      includeIngredients:[],
      searchProp:'true'
    })

    const [pagination, setPagination] = useState({
      page: 0,
      pageSize: 10,
      totalElements: 0,
    })
    
    const [isloading, setIsLoading] =useState(false)

    const searchRecipes = async (pageInfo)=>{
      setIsLoading(true)
      const { page, pageSize } = pageInfo;
      const pageQuery = `&offset=${page*pageSize}&number=${pageSize}`
       //Basic Query
       let query=searchProps.searchStr&&`query=${searchProps.searchStr}`;

       if(searchProps.cuisineType!=='none'){
         query+=`&cuisine=${searchProps.cuisineType}`
       }
       if(searchProps.dietType!=='none'){
         query+=`&diet=${searchProps.dietType}`
       }
       if(searchProps.includeIngredients.length>0){
         let ingredients=''
         searchProps.includeIngredients.forEach((each)=>{
           ingredients+=`${each},`
         })
         let finalIngredients=ingredients.slice(0, ingredients.length-1)
         query+=`&includeIngredients=${finalIngredients}`
       }
     
       //Nutrients Query
       if(searchProps.open){

         if(searchProps.maxProtein){
           query+=`&maxProtein=${searchProps.maxProtein}`
         }
         if(searchProps.minProtein){
           query+=`&minProtein=${searchProps.minProtein}`
         }

         if(searchProps.maxCalories){
           query+=`&maxCalories=${searchProps.maxCalories}`
         }
         if(searchProps.minCalories){
           query+=`&minCalories=${searchProps.minCalories}`
         }

         if(searchProps.maxFat){
           query+=`&maxFat=${searchProps.maxFat}`
         }
         if(searchProps.minFat){
           query+=`&minFat=${searchProps.minFat}`
         }

         if(searchProps.maxCarbs){
           query+=`&maxCarbs=${searchProps.maxCarbs}`
         }
         if(searchProps.minCarbs){
           query+=`&minCarbs=${searchProps.minCarbs}`
         }
       }
       console.log(query+pageQuery)
       const result = await dispatch(searchRecipe(query+pageQuery))
       console.log('result', result)

      setPagination({
        ...pageInfo,
        totalElements: result.totalResults,
      })
      setIsLoading(false)
    }

    return (
      <>
      <Box m={2} component={Paper}>

        <Typography color='textPrimary' variant='h3' align='center'>
          Instruction for search:
        </Typography> 
        <HeaderDivider />

        <List>
        {searchInstructions.map((each,idx) => {
            return (
            <ListItem
                key={`instruction-${each.idx}`}
                disablePadding
            >
              <ListItemText primary={`${idx+1}:  ${each.step?each.step:'N/A'}`} />
            </ListItem>
            );
        })}
        </List>


      {/*Search Filter*/}
      <Formik
          validateOnChange={true}
          validateOnBlur={false}
          initialValues={{ 
            searchStr:'',
            cuisineType:'none',
            dietType:'none',
            includeIngredient:'',
            includeIngredients:[],
          }}
          // validationSchema={Yup.object().shape({
          // searchStr: Yup.string()
          //   .required('Please enter a search keyword')
          // })}
          onSubmit={async (values, {resetForm}) => {

          try {

            searchRecipes(pagination)

          } catch (err) {
            console.error(err)
          }
          }}
      >
      {/* End of Formik opening tag */}
      {/* Render */}
      {({
        handleSubmit,
        handleChange,
        setFieldValue,
        submitForm,
        values,
        errors,
        touched,
      }) => {
        return (
          <>
            <Grid container spacing={3}>
              <Grid item md={12} xl={12} xs={12}>
                  <form onSubmit={handleSubmit}>
                     
                    <Box className={`${classes.filterItem}`} display='flex'>
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

                              endAdornment: values.searchStr &&
                                values.searchStr.length > 0 && (
                                  <InputAdornment position='end'>
                                    <Button
                                      aria-label='Clear Search Bar'
                                      onClick={() => {
                                  
                                        //Clear textfield input
                                        setFieldValue(`searchStr`, '', false)
                                        setSearchProps({
                                          ...searchProps,
                                          searchStr:''
                                        })
                                      }}
                                    >
                                      {<XCircleIcon />}
                                    </Button>
                                  </InputAdornment>
                                ),
                            }}
                            placeholder='Search by name'
                            //Keep track of filterProp String
                            name='searchStr'
                            value={values.searchStr}
                            onChange={(e)=>{
                              handleChange(e)
                              setSearchProps(
                                {
                                  ...searchProps,
                                  searchStr:e.target.value
                          
                                }
                              )
                            }}
                            error={Boolean(
                              touched.searchStr && errors.searchStr
                            )}
                            helperText={touched.searchStr && errors.searchStr}
                            variant='outlined'
                          />
                          
                          <Button
                            color='secondary'
                            type='submit'
                            size='large'
                            variant="outlined" 
                          >
                            Search
                          </Button>
                        </Box>

                    <Box className={`${classes.filterItem}`}>
                      <Grid container spacing={2}>
                        <Grid item lg={6} xs={12} md={6}>
                          <TextField
                            error={Boolean(touched.cuisineType && errors.cuisineType)}
                            helperText={touched.cuisineType && errors.cuisineType}
                            select
                            SelectProps={{ native: true }}
                            InputLabelProps={{ shrink: true }}
                            label="Cuisine type"
                            name="cuisineType"
                            value={values.cuisineType}
                            onChange={(e)=>{
                              handleChange(e)
                              setSearchProps(
                                {
                                  ...searchProps,
                                  cuisineType:e.target.value
                          
                                }
                              )
                            }}
                            variant="outlined"
                            fullWidth
                          >
                            <option key={'none'} value={'none'} >
                              None
                            </option>

                            {cuisineData.cuisineType.map((each)=>{
                              return(
                                <option key={each.id} value={each.value} >
                                  {each.value}
                                </option>
                              )
                            })
                            }

                          </TextField>
                        </Grid>

                        <Grid item lg={6} xs={12} md={6}>
                          <TextField
                            error={Boolean(touched.dietType && errors.dietType)}
                            helperText={touched.dietType && errors.dietType}
                            select
                            SelectProps={{ native: true }}
                            InputLabelProps={{ shrink: true }}
                            label="Diet type"
                            name="dietType"
                            value={values.dietType}
                            onChange={(e)=>{
                              handleChange(e)
                              setSearchProps(
                                {
                                  ...searchProps,
                                  dietType:e.target.value
                          
                                }
                              )
                            }}
                            variant="outlined"
                            fullWidth
                          >
                            <option key={'none'} value={'none'} >
                              None
                            </option>

                            {dietData.dietType.map((each)=>{
                              return(
                                <option key={each.id} value={each.value} >
                                  {each.value}
                                </option>
                              )
                            })
                            }

                          </TextField>
                        </Grid>

                        <Grid item lg={6} xs={12} md={12}>
                          <Box display='flex'>
                            <TextField
                              error={Boolean(touched.includeIngredient && errors.includeIngredient)}
                              helperText={touched.includeIngredient && errors.includeIngredient}
                              label="Add Include Ingredients"
                              name="includeIngredient"
                              value={values.includeIngredient}
                              onChange={handleChange}
                              variant="outlined"
                              fullWidth
                            >
                            </TextField>

                            <Button
                              variant="outlined"
                              color='secondary'
                              onClick={()=>{
                              console.log('test',values.includeIngredient)

                              if(values.includeIngredient!==''){
                                  setFieldValue(`includeIngredients`, [...values.includeIngredients,
                                    values.includeIngredient], false)

                                  setSearchProps({
                                    ...searchProps,
                                    includeIngredients:[...values.includeIngredients,
                                    values.includeIngredient]
                                  })

                                  setFieldValue(`includeIngredient`,'',false)
                              }
                            }}>
                                Add
                            </Button>
                          </Box>
                        </Grid>

                        <Grid item lg={6} xs={12} md={12}>
                         {values.includeIngredients.length>0&&
                          <Typography>
                            Include Ingredients:
                          </Typography>
                         }
                          <Box display='flex'>
                            {values.includeIngredients.map((each)=>{
                              return(
                                <Chip
                                  label={each}
                                  className={`${classes.chips} ${classes.root}`}
                                  onDelete={()=>{
                                    const filteredList= values.includeIngredients.filter((eachItem)=>{
                                      return eachItem!==each
                                    })
                                    setFieldValue(`includeIngredients`, filteredList, false)
                                    setSearchProps({
                                    ...searchProps,
                                    includeIngredients:[...filteredList]
                                  })

                                  }}
                                  deleteIcon={<XCircleIcon/>}
                                />
                              )
                            })}
                          </Box>
                        </Grid>
                          
                        <Grid item lg={12} xs={12} md={12} align="center">
                            <IconButton
                              onClick={() => {
                                if (searchProps.open) {
                                  setSearchProps({
                                    ...searchProps,
                                    open: !searchProps.open,
                                  })
                                } else {
                                  setSearchProps({
                                    ...searchProps,

                                    open: !searchProps.open,
                                  })
                                }
                              }}
                            >
                              
                              <Typography color='textPrimary' variant='h3'>
                                Nutrients Based Search:
                              </Typography> 
                              {searchProps.open ? (
                                <ChevronUpIcon />
                              ) : (
                                <FilterIcon />
                              )}                           
                            </IconButton>
                            <HeaderDivider />
                       </Grid>
                      
                       <Grid item lg={12} xs={12} md={12}>
                        <Collapse
                        in={searchProps.open}
                        timeout='auto'
                        unmountOnExit
                        >
                          <Grid container spacing={2}>
                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(touched.minCalories && errors.minCalories)}
                                helperText={touched.minCalories && errors.minCalories}
                                label="Min Calories Amount:"
                                name="minCalories"
                                value={values.minCalories}
                                onChange={(e)=>{
                                  handleChange(e)
                                  setSearchProps(
                                    {
                                      ...searchProps,
                                      minCalories:e.target.value
                              
                                    }
                                  )
                                }}
                                variant="outlined"
                                fullWidth
                              >
                              </TextField>
                            </Grid>

                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(touched.maxCalories && errors.maxCalories)}
                                helperText={touched.maxCalories && errors.maxCalories}
                                label="Max Calories Amount:"
                                name="maxCalories"
                                value={values.maxCalories}
                                onChange={(e)=>{
                                  handleChange(e)
                                  setSearchProps(
                                    {
                                      ...searchProps,
                                      maxCalories:e.target.value
                              
                                    }
                                  )
                                }}
                                variant="outlined"
                                fullWidth
                              >
                              </TextField>
                            </Grid>

                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(touched.maxProtein  && errors.maxProtein )}
                                helperText={touched.maxProtein  && errors.maxProtein}
                                label="Max Protein Amount:"
                                name="maxProtein"
                                value={values.maxProtein }
                                onChange={(e)=>{
                                  handleChange(e)
                                  setSearchProps(
                                    {
                                      ...searchProps,
                                      maxProtein:e.target.value
                              
                                    }
                                  )
                                }}
                                variant="outlined"
                                fullWidth
                              >
                              </TextField>
                            </Grid>

                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(touched.minProtein  && errors.minProtein )}
                                helperText={touched.minProtein  && errors.minProtein}
                                label="Min Protein Amount:"
                                name="minProtein"
                                value={values.minProtein }
                                onChange={(e)=>{
                                  handleChange(e)
                                  setSearchProps(
                                    {
                                      ...searchProps,
                                      minProtein:e.target.value
                              
                                    }
                                  )
                                }}
                                variant="outlined"
                                fullWidth
                              >
                              </TextField>
                            </Grid>

                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(touched.maxFat  && errors.maxFat )}
                                helperText={touched.maxFat  && errors.maxFat}
                                label="Max Fat Amount:"
                                name="maxFat"
                                value={values.maxFat }
                                onChange={(e)=>{
                                  handleChange(e)
                                  setSearchProps(
                                    {
                                      ...searchProps,
                                      maxFat:e.target.value
                              
                                    }
                                  )
                                }}
                                variant="outlined"
                                fullWidth
                              >
                              </TextField>
                            </Grid>

                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(touched.minFat  && errors.minFat )}
                                helperText={touched.minFat  && errors.minFat}
                                label="Min Fat Amount:"
                                name="minFat"
                                value={values.minFat }
                                onChange={(e)=>{
                                  handleChange(e)
                                  setSearchProps(
                                    {
                                      ...searchProps,
                                      minFat:e.target.value
                              
                                    }
                                  )
                                }}
                                variant="outlined"
                                fullWidth
                              >
                              </TextField>
                            </Grid>

                            <Grid item lg={3} xs={12}md={6}>
                              <TextField
                                type='number'
                                error={Boolean(touched.maxCarbs  && errors.maxCarbs )}
                                helperText={touched.maxCarbs  && errors.maxCarbs}
                                label="Max Carbs Amount:"
                                name="maxCarbs"
                                value={values.maxCarbs}
                                onChange={(e)=>{
                                  handleChange(e)
                                  setSearchProps(
                                    {
                                      ...searchProps,
                                      maxCarbs:e.target.value
                              
                                    }
                                  )
                                }}
                                variant="outlined"
                                fullWidth
                              >
                              </TextField>
                            </Grid>

                            <Grid item lg={3} xs={12} md={6}>
                              <TextField
                                type='number'
                                error={Boolean(touched.minCarbs  && errors.minCarbs )}
                                helperText={touched.minCarbs  && errors.minCarbs}
                                label="Min Carbs Amount:"
                                name="minCarbs"
                                value={values.minCarbs }
                                onChange={(e)=>{
                                  handleChange(e)
                                  setSearchProps(
                                    {
                                      ...searchProps,
                                      minCarbs:e.target.value
                              
                                    }
                                  )
                                }}
                                variant="outlined"
                                fullWidth
                              >
                              </TextField>
                            </Grid>

                          </Grid>
                        </Collapse>
                        </Grid>

                      </Grid>
                    </Box>
                      {/* <pre className={classes.pre}>{JSON.stringify(values, null, 4)}</pre>
                      <pre className={classes.pre}>{JSON.stringify(searchProps, null, 4)}</pre> */}
                  </form>
              </Grid>
            </Grid>
          </>
        )
      }}
      {/* End of Rendering */}
    </Formik>
   
      <TableContainer>
        <Typography color='textPrimary' gutterBottom variant='h3' align='center'>
          {'Search Result:'}
        </Typography>
        <HeaderDivider />

        <Typography color='textSecondary' gutterBottom variant='body2'>
          {pagination.totalElements} Records found. Page {pagination.page + 1}{' '}
          of {Math.ceil(pagination.totalElements / pagination.pageSize)}
        </Typography>

        <Table >
          <TableHead className={classes.THeader}>
              {['#','Name', 'Preparation Time', 
              'Serving size', 'Calories','Action'].map((each)=>{
              return(
                  <TableCell>{each}</TableCell>
              )
              })}
          </TableHead>
        
              {isloading?
                <TableCell colSpan={6}>
                <LinearProgress />
                </TableCell>
               
              :(
                <TableBody>
                  {searchResult.results&&searchResult.results.map((each,idx)=>{
                  return(
                      <TableRow key={`searchResult${idx}`} hover={true}>
                        <TableCell>{idx+1}</TableCell>
                        <TableCell>{each.title&&each.title}</TableCell>
                        <TableCell>{each.readyInMinutes&&each.readyInMinutes}</TableCell>
                        <TableCell>{each.servings&&each.servings}</TableCell>
                        <TableCell>{each.nutrition.nutrients[0].amount&&each.nutrition.nutrients[0].amount+" "+each.nutrition.nutrients[0].unit}</TableCell>
                        <TableCell align='right'>
                            <Button
                                component={Link}
                                fontSize='small'
                                to={`/recipe/${each.id}`}
                            >
                                <SvgIcon fontSize='small'>
                                  <ArrowRightIcon />
                                </SvgIcon>
                            </Button>

                        </TableCell>
                      </TableRow>
                  )
                  })}
              </TableBody>
              )}
        </Table>

        <TablePagination
          // disabled={isSubmitting}
          // SelectProps={{ disabled: isSubmitting }}
          // nextIconButtonProps={{
          //   disabled:
          //      inventoryRecord.length != pagination.pageSize,
          // }}
          backIconButtonProps={{ disabled: pagination.page === 0 }}
          component='div'
          count={pagination.totalElements}
          onChangePage={(event, page) => {
            const newPagination = {
              ...pagination,
              page: page === -1 ? 0 : page,
            }
            searchRecipes(newPagination)

          }}

          onChangeRowsPerPage={(event) => {
            const newPagination = {
              ...pagination,
              pageSize: +event.target.value,
              page: 0,
            }
            searchRecipes(newPagination)
          }}

          page={pagination.page}
          rowsPerPage={pagination.pageSize}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </TableContainer>
      </Box>
    </>
    )
}