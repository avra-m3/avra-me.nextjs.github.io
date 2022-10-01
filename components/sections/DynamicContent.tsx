import type {AppState} from "../../store";
import React, {FunctionComponent, ReactNode} from 'react';
import {connect, ConnectedProps} from "react-redux";

import JumboHeader from './JumboHeader';
import IconCardSection from './IconCardSection';
import HorizontalCardSection from './HorizontalCardSection';
import WaveCardSection from './WaveCardSection';
import DynamicFormSection from "./DynamicFormSection";
import SectionContainer from "../common/SectionContainer";
import {AllSections} from "../../store/types/home";
import SectionHeader from "../common/SectionHeader";

type ValidSources = 'home' | 'experience' | 'education'

const connector = connect((state: AppState, props: { source: ValidSources }) => {
  if (props.source in state) {
    return {items: state[props.source].items}
  }
  return {items: []}
})

interface DynamicContentProps extends ConnectedProps<typeof connector> {
  source: ValidSources
}


const getItemComponent = (item: AllSections): ReactNode => {
  const key = `${item.order}_${item.type}`;
  switch (item.type) {
    case 'JumboHeader':
      return <JumboHeader key={key} {...item}/>
    case 'IconCardSection':
      return <IconCardSection key={key} {...item}/>
    case 'HorizontalCardSection':
      return <HorizontalCardSection key={key} {...item}/>
    case 'WaveCardSection':
      return <WaveCardSection key={key} {...item}/>
    case 'DynamicForm':
      return <DynamicFormSection key={key} {...item}/>
  }
}

const DynamicContent: FunctionComponent<DynamicContentProps> = ({items}) => {
  const content = items.map(item => {
    const component = getItemComponent(item)
    if (item.section) {
      const {elevate, ...headerProps} = item.section;
      return <SectionContainer key={item.section.title} elevate={elevate} header={<SectionHeader {...headerProps}/>}>
        {component}
      </SectionContainer>
    }
    return component
  })

  return <>
    {content}
  </>
};


export default connector(DynamicContent);