import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { 
    Paper, 
    Button, 
    Box,
    useTheme,
    useMediaQuery,
    CardMedia,
} from '@material-ui/core'

import { Link } from 'react-router-dom';

import data from '../../data/articles'

export default function SlideShow(props) {
    const {articles} =data
    return (
        <Carousel
            animation={'slide'}
            navButtonsAlwaysVisible={true}
            navButtonsProps={{      
                style: {
                    backgroundColor: 'transparent',
                    color:'black',
                }
            }} 
            navButtonsWrapperProps={{  
                style: {
                    height:'80%'
                }
            }} 
            cycleNavigation={true}
            autoPlay={false}
        >
            {
                articles.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}
// Article about Healthy eating habits
// Article about gain losing weight

function Item(props)
{
    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Paper 
        style={{
            padding:mobileDevice?'0.25rem 0.7rem':'1rem 2rem'
        }}
        >
            <Box align='left'>
                {mobileDevice?<h3>{props.item.title}</h3>:<h2>{props.item.title}</h2>}
                <p style={{textIndent:'30px'}}>{props.item.description}</p>
            </Box>

           <Box align='center' m={2}>
                <CardMedia
                    component="img"
                    alt="Article img"
                    image={props.item.src}
                    style={{
                            minHeight:'350px',
                            maxHeight:'350px',
                        }}
                />
            </Box> 

            <Box align='right'>
                <Button 
                    component={Link}
                    to={`/article/${props.item.link}`}
                    color='secondary'
                    // variant="contained" 
                    size={mobileDevice?"small":"large"}>
                Learn More
                </Button>
            </Box>

        </Paper>
        
    )
}