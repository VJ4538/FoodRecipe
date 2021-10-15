import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { 
    Button, 
    Box,
    useTheme,
    useMediaQuery,
    CardMedia,
    Typography,
} from '@material-ui/core'

import { Link } from 'react-router-dom';

import data from '../../data/articles'
import Title from '../Title';

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

function Item(props)
{
    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box m={2}>
            <Box align='left'>
                <Title title={props.item.title} includeDivider={false} align='left'/>
                <Typography style={{textIndent:'30px'}} color="textSecondary" variant='body2' >
                    {props.item.description}
                </Typography>
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
                    to={`/articles/${props.item.link}`}
                    color='secondary'
                    variant="outlined" 
                    size={mobileDevice?"small":"medium"}
                >
                Learn More
                </Button>
            </Box>

        </Box>
        
    )
}