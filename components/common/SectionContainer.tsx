import React, {FunctionComponent} from "react";
import {Grid, Paper} from "@mui/material";
import Container from "@mui/material/Container";
import {Box, styled, useTheme} from "@mui/system";
import WaveBorderCanvas from "./elements/WaveBorderCanvas";

type SectionContainerProps = {
  sectionId?: string,
  elevate?: boolean,
  children: React.ReactNode,
  header?: React.ReactNode
}

const MinHeightDiv = styled("div")({
  height: "100px"
})

const SectionContainer: FunctionComponent<SectionContainerProps> = (
  {
    sectionId,
    elevate = false,
    header,
    children
  }) => {
  const theme = useTheme()

  const component = <Container component={'section'}
                               id={sectionId} style={{marginBottom: 0}}>
    <Box p={4}>
      <Grid container spacing={3} justifyContent={"space-evenly"} alignItems={"stretch"}>
        {header}
        {children}
      </Grid>
    </Box>
  </Container>

  if (elevate) {
    return (
      <Box mb={4}>
        <MinHeightDiv>
          <WaveBorderCanvas background={theme.palette.background.paper} flip/>
        </MinHeightDiv>
        <Paper elevation={0}>
          {component}
        </Paper>
        <MinHeightDiv>
          <WaveBorderCanvas background={theme.palette.background.paper}/>
        </MinHeightDiv>
      </Box>

    );
  }
  return <Box mb={4}>
    {component}
  </Box>
}

export default SectionContainer;
