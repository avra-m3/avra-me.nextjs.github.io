import type {JumboHeaderSection as JumboHeaderSectionType} from "../../store/types/home";

import React, {Fragment, FunctionComponent} from "react";
import dynamic from "next/dynamic";
import {Box, GlobalStyles, Grid, Hidden} from "@mui/material";
import {styled, Theme} from "@mui/system";
import {css} from "@emotion/react";

const WaveJumbotron = dynamic(() => import("../common/WaveJumbotronHeader"));
const SectionContentMarkdown = dynamic(() => import("../common/elements/SectionContentMarkdown"));

const FillImage = styled('img')({
  marginLeft: "auto",
  width: "100%",
  objectFit: "contain"
})

const ImageDiv = styled('div')({
  position: "absolute",
  marginLeft: "auto",
  top: "-75px",
  right: "0",
  height: "150%",
  maxWidth: "60%",
  zIndex: -1
})

const headerStyles = (theme: Theme) => css`
  .secondary-emphasis {
    color: ${theme.palette.secondary.main}
  }

  .page-title {
    font-size: 3.75rem;
    color: ${theme.palette.text.primary}
  }

  .page-subheading {
    font-size: 2rem;
    color: ${theme.palette.text.secondary}
  }
`

const JumboHeader: FunctionComponent<JumboHeaderSectionType> = (props) => {
  const {disabled, content, image} = props;

  const jumboProps = {
    ...props,
  };

  if (disabled) {
    return <Fragment/>;
  }
  return <WaveJumbotron {...jumboProps}>
    <GlobalStyles styles={headerStyles}/>
    <Box  position={"relative"}>
      <Grid item xs={12} sm={12} md={image ? 7 : 12} xl={image ? 6 : 12}>
        <SectionContentMarkdown className={'header'} content={content}/>
      </Grid>

      {image && <Hidden mdDown>
          <Grid item xs={0} sm={0} md={5} xl={6}>
              <ImageDiv>
                  <FillImage width={"100%"} height={"100%"} src={image} alt={"This is a picture of me"}/>
              </ImageDiv>
          </Grid>
      </Hidden>}
    </Box>
  </WaveJumbotron>;
};


export default JumboHeader;
