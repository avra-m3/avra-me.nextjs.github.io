import type {JumboHeaderSection as JumboHeaderSectionType} from "../../store/types/home";

import React, {Fragment, FunctionComponent} from "react";
import dynamic from "next/dynamic";
import {Grid, Hidden} from "@mui/material";
import {styled} from "@mui/system";

const WaveJumbotron = dynamic(() => import("../common/WaveJumbotronHeader"));
const SectionContentMarkdown = dynamic(() => import("../common/elements/SectionContentMarkdown"));

const FillImage = styled('img')({
  marginLeft: "auto",
  maxHeight: "400px",
  width: "100%",
  objectFit: "contain"
})

const ImageDiv = styled('div')({
  marginLeft: "auto",
})

const JumboHeader: FunctionComponent<JumboHeaderSectionType> = (props) => {
  const {disabled, content, image} = props;

  const jumboProps = {
    ...props,
  };

  if (disabled) {
    return <Fragment/>;
  }

  return <WaveJumbotron {...jumboProps}>
    <Grid item xs={12} sm={image ? 8 : 12} md={image ? 5 : 12} xl={image ? 4 : 12}>
      <SectionContentMarkdown className={'header'} content={content}/>
    </Grid>

    {image && <Hidden smDown>
      <Grid item md={1}/>

      <Grid item container xs={0} sm={4} md={6} xl={7}>
        <ImageDiv><FillImage src={image}/></ImageDiv>
      </Grid>
    </Hidden>}
  </WaveJumbotron>;
};


export default JumboHeader;
