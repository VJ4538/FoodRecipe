import React from 'react'
import { 
    Box,
    List,
    ListItem,
    Container,
    Typography,
    LinearProgress,
    makeStyles,
    CardMedia,
    useTheme,
useMediaQuery,
} from '@material-ui/core'
import Title from '../../components/Title'

const useStyles= makeStyles({
    root:{
        
    },
    MuiCardMediaImg:{
        maxHeight:'400px',
        marginTop:'20px'
    }

})

export default function Result({loading, article}) {
    const classes = useStyles()  
    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    let subcontentList;
    let summaryContentList;
    if(article){
        subcontentList=article.subtitle1Content.split('-')
        summaryContentList=article.summaryContent.split('#')
    }
    return (
        <React.Fragment>
            {loading?
                <LinearProgress />
            :
                <Container>
                    <Box m={mobileDevice?2:5}>
                        <Title title={article.title} includeDivider={true} />  
                        <CardMedia
                            className={classes.MuiCardMediaImg}
                            component="img"
                            alt={`${article.link} image`}
                            image={article.src}
                        />
                    </Box>
                    <Box >
                        <Title 
                            title={article.subtitle1} 
                            includeDivider={mobileDevice?true:false} 
                            align={mobileDevice?'center':'left'}     
                            /> 

                        <List>
                            {subcontentList.map((each,idx)=>{
                                return(
                                    <ListItem alignItems="flex-start">
                                        <Typography color='textSecondary' variant='body2' >
                                            {`-${each}`}
                                        </Typography> 
                                    </ListItem>
                                )
                            })}
                        </List>

                        <Title 
                            title={article.summaryTitle} 
                            includeDivider={mobileDevice?true:false} 
                            align={mobileDevice?'center':'left'}  

                        /> 

                        <Typography color='textSecondary' variant='body2' gutterBottom={true}>
                            {article.summary}
                        </Typography> 

                        <List>
                            {summaryContentList.map((each,idx)=>{
                                return(
                                    <ListItem alignItems="flex-start">
                                        <Typography color='textSecondary' variant='body2' >
                                            {`-${each}`}
                                        </Typography> 
                                    </ListItem>
                                )
                            })}
                        </List>

                        <Typography variant='body2' align='right' gutterBottom={true}>
                            <a
                                target='_blank'
                                href={article.source}
                                rel='noreferrer'
                            >
                                Source Link
                            </a>
                        </Typography>

                    </Box>
                </Container>
            }

        </React.Fragment>
    )
}
