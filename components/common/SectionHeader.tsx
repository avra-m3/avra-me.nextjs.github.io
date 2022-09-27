import React, {FunctionComponent} from "react";
import {Grid, Typography} from "@mui/material";

interface SectionContainerProps {
  titleClassName?: string
  subtitleClassName?: string
  title?: string
  subTitle?: string
}

const SectionHeader: FunctionComponent<SectionContainerProps> = (
  {
    title,
    subTitle,
    titleClassName,
    subtitleClassName
  }) => {
  if (!title && !subTitle) {
    return null;
  }
  return <Grid xs={12} item pb={1} mb={2}>
    {title && <Typography component={"h1"} className={titleClassName} variant={"h3"} id={title}>{title}</Typography>}
    {subTitle && <Typography
        component={"p"}
        color={"text.secondary"}
        className={subtitleClassName}
        variant={"h5"}
        id={`subtitle-${subTitle}`}
    >
      {subTitle}
    </Typography>}
  </Grid>
}

export default SectionHeader;
