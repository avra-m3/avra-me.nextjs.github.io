import {Button, ButtonGroup} from "@mui/material";
import Link from 'next/link'
import React, {FunctionComponent} from "react";
import {HorizontalCardSection as IHorizontalCardSection, InteractionItem} from "../../../store/types/home";
import SectionContainer from "../SectionContainer";
import {slice} from "lodash-es";
import SectionContentMarkdown from "../elements/SectionContentMarkdown";
import HorizontalCard from "../HorizontalCard";
import {styled} from "@mui/material/styles";


const HorizontalIconCard = styled(HorizontalCard)({
  height: "100%",
  display: "flex",
  flexDirection: "column"
})

type HorizontalCardSectionProps = IHorizontalCardSection
const HorizontalCardList: FunctionComponent<HorizontalCardSectionProps> = ({items, title, subTitle}) => {
  const makeButtons = (button: InteractionItem) => {
    return <Link key={button.link} href={button.link} passHref={true}><Button>{button.title}</Button></Link>
  }

  return <SectionContainer title={title} subTitle={subTitle}>
    {items && items.map((card, i) => {
      return <HorizontalIconCard
        key={`${card.order}_${card.image}`}
        image={card.image}
        flip={i % 2 === 0}
        buttons={
          <ButtonGroup variant="text">
            {card?.buttons?.map && slice(card.buttons.map(makeButtons), 0, 3)}
          </ButtonGroup>
        }
        title={card.title}
      >
        <SectionContentMarkdown content={card.content}/>
      </HorizontalIconCard>;
    })}
  </SectionContainer>;
};

export default HorizontalCardList