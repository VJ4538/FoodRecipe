import React from "react";
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
} from "@material-ui/core";
import Title from "../../components/Title";

const useStyles = makeStyles((theme) => ({
  root: {},
  MuiCardMediaImg: {
    maxHeight: "400px",
    marginTop: theme.spacing(2),
  },
}));

export default function Result({ loading, article }) {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <Container>
          <Box m={mobileDevice ? 2 : 5}>
            <Title title={article.title} includeDivider={true} />
            <CardMedia
              className={classes.MuiCardMediaImg}
              component='img'
              alt={`${article.link} image`}
              image={article.src}
            />
          </Box>
          <Box>
            <Title
              title={article.subtitle1}
              includeDivider={mobileDevice ? true : false}
              align={mobileDevice ? "center" : "left"}
            />

            <List>
              {(article && article.subtitle1Content).map((each) => {
                return (
                  <ListItem alignItems='flex-start' key={each.id}>
                    <Typography color='textSecondary' variant='body2'>
                      {`- ${each.text}`}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>

            <Title
              title={article.summaryTitle}
              includeDivider={mobileDevice ? true : false}
              align={mobileDevice ? "center" : "left"}
            />

            <Typography
              color='textSecondary'
              variant='body2'
              gutterBottom={true}>
              {article.summary}
            </Typography>

            <List>
              {(article && article.summaryContent).map((each) => {
                return (
                  <ListItem alignItems='flex-start' key={each.id}>
                    <Typography color='textSecondary' variant='body2'>
                      {`- ${each.text}`}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>

            <Typography variant='body2' align='right' gutterBottom={true}>
              <a target='_blank' href={article.source} rel='noreferrer'>
                Source Link
              </a>
            </Typography>
          </Box>
        </Container>
      )}
    </>
  );
}
