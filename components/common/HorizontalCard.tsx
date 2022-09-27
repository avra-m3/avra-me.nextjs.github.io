import Grid from "@mui/material/Grid";
import React, {FunctionComponent} from "react";
import {Card, CardProps, Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AppearOnScroll from "./elements/AppearOnScroll";
import {styled} from "@mui/system";


const CardRoot = styled(Card)(({theme}) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
  "& :last-child": {
    marginBottom: 0,
  },
  '.MuiCardActionArea-root': {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)"
    }
  }
}))

const FillImage = styled('img')({
  width: "100%",
  height: "100%",
  margin: "auto",
  maxHeight: "15em"
})


interface HorizontalCardProps extends CardProps {
  image: string;
  title: string;
  titleVariant?: React.ElementType;
  flip: boolean
  link?: string
  buttons?: (string | React.ReactElement)
}

const HorizontalCard: FunctionComponent<HorizontalCardProps> = (
  {
    children,
    title,
    image,
    buttons,
    flip,
    titleVariant = "h3"
  }) => {
  return (

    <CardRoot>

      <Grid
        container
        spacing={4}
        direction={flip ? "row" : "row-reverse"}
        justifyContent={"center"}
      >

        <Grid item container justifyContent={"center"} direction={"column"} xs={12} md={4}>
          <AppearOnScroll
            delay={300}
            offScreenProperties={{opacity: 0}}
            onScreenProperties={{opacity: [0, 1], translateX: [`${30 * (flip ? -1 : 1)}em`, "0em"]}}
          >
            <FillImage src={image} alt={image} width={400} height={300} loading="lazy"/>
          </AppearOnScroll>
        </Grid>
        <Grid item xs>
          <CardContent>
            <Typography
              gutterBottom={false}
              component={titleVariant}
              variant={"h4"}
              color={"secondary"}
            >
              {title}
            </Typography>
            {children}
          </CardContent>
          <CardActions>
            {buttons}
          </CardActions>
        </Grid>
      </Grid>
    </CardRoot>
  );
};


export default HorizontalCard;
