import React, {FunctionComponent} from "react";
import {Grid, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import {Box} from "@mui/system";

type SectionContainerProps = {
  children: React.ReactNode,
  titleClassName?: string
  subtitleClassName?: string
  title?: string
  subTitle?: string
}

const SectionContainer: FunctionComponent<SectionContainerProps> = (
  {
    children,
    title,
    subTitle,
    titleClassName,
    subtitleClassName
  }) => {
  return (
    <Container component={'section'} id={title ? `section-${title}` : undefined}>
      <Box>
        <Grid container spacing={3} justifyContent={"space-evenly"} alignItems={"stretch"}>
          {title || subTitle && <Grid xs={12} item>
            {title &&
            <Typography component={"h1"} className={titleClassName} variant={"h4"} id={title}>{title}</Typography>}
            {subTitle && <Typography component={"h2"} className={subtitleClassName} variant={"subtitle2"}
                                     id={`subtitle-${subTitle}`}>{subTitle}</Typography>}
          </Grid>}
          {children}
        </Grid>
      </Box>
    </Container>
  );
}

export default SectionContainer;
