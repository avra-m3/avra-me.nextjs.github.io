import {Button, CardActions, CardContent, Icon, Tooltip} from "@mui/material";
import React, {FunctionComponent} from "react";
import {InteractionItem, WaveCardSection as WaveCardSectionType} from "../../../store/types/home";
import WaveCard from "../WaveCard";
import {slice} from "lodash-es";
import SectionContentMarkdown from "../elements/SectionContentMarkdown";
import {styled} from "@mui/material/styles";


const StyledWaveCard = styled(WaveCard)({
  height: "100%",
  display: "flex",
  flexDirection: "column"
})


const WaveCardList: FunctionComponent<WaveCardSectionType> = ({items}) => {
  const makeButtons = (chip: InteractionItem) => {
    const {link, title, tooltip, icon} = chip;
    const button = <Button key={link} href={link} size={"small"} variant={"outlined"}>
      {icon && <Icon color={"action"} sx={{mr: 1}}>{icon}</Icon>}{title}
    </Button>
    if (tooltip) {
      return <Tooltip key={link} title={tooltip}>{button}</Tooltip>
    }
    return button
  };

  return <>
    {items && items.map((card, i) => {
      return <StyledWaveCard
        key={`${card.order}_${card.content}`}
        inverse={i % 2 === 0}
      >
        <CardContent style={{flexGrow: 1}}>
          <SectionContentMarkdown content={card.content}/>
        </CardContent>
        <CardActions>
          {card?.buttons?.map && slice(card.buttons.map(makeButtons), 0, 3)}
        </CardActions>
      </StyledWaveCard>;
    })}
  </>;
};

export default WaveCardList