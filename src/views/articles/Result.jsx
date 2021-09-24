import React from 'react'
import HeaderDivider from '../../components/HeaderDivider'
import { 
    Box,
    List,
    ListItem,
    ListItemText,
    Container,
    Typography,
    LinearProgress,
    makeStyles,
    CardMedia,
    useTheme,
useMediaQuery,
} from '@material-ui/core'

const useStyles= makeStyles({
    root:{
        
    },
    MuiCardMediaImg:{
        maxHeight:'400px'
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
                        <Typography  align='center' gutterBottom={true}>
                            {mobileDevice? <h3>{article.title}</h3>:<h2>{article.title}</h2>}
                        </Typography>
                        <HeaderDivider/>
                        <CardMedia
                            className={classes.MuiCardMediaImg}
                            component="img"
                            alt={`${article.link} image`}
                            image={article.src}
                        />
                    </Box>
                    <Box >
                        <Typography variant='h3' gutterBottom={true}>
                            <h5>{article.subtitle1}</h5>
                        </Typography>

                        <List>
                            {subcontentList.map((each,idx)=>{
                                return(
                                    <ListItem alignItems="flex-start">
                                        <ListItemText
                                            key={idx}
                                            primary={`-${each}`}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>

                        <Typography variant='h3' gutterBottom={true}>
                            <h5>{article.summaryTitle}</h5>
                        </Typography>

                        <Typography variant='body1' gutterBottom={true}>
                            {article.summary}
                        </Typography>

                        
                        <List>
                            {summaryContentList.map((each,idx)=>{
                                return(
                                    <ListItem alignItems="flex-start">
                                        <ListItemText
                                            key={idx}
                                            primary={`-${each}`}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>

                        <Typography variant='body1' align='right' gutterBottom={true}>
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
