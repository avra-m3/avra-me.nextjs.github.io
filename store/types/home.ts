export type MarkdownString = string;

interface SectionProps {
  title?: string;
  subTitle?: string;
  elevate?: boolean;
}

interface BasicItem {
  order: number,
  disabled?: boolean
  visible?: boolean
  content: MarkdownString
}

export interface BasicSection extends BasicItem {
  type: unknown,
  section?: SectionProps
}

export interface JumboHeaderSection extends BasicSection {
  type: 'JumboHeader'
  image?: string
}

export interface IconCardSection extends BasicSection {
  type: 'IconCardSection',
  items: IconCardItem[]
}

export interface WaveCardSection extends BasicSection {
  type: 'WaveCardSection',
  items: WaveCardItem[]
}

export interface HorizontalCardSection extends BasicSection {
  type: 'HorizontalCardSection',
  items: HorizontalCardItem[]
}

export interface DynamicForm extends BasicSection {
  type: 'DynamicForm',
  name: string,
  fields: (IFormField | ISubmitOverride)[]
}


export interface IconCardItem extends BasicItem {
  title: string
  icon: string,
  color: string,
  buttons: InteractionItem[]
}

export interface WaveCardItem extends BasicItem {
  buttons: InteractionItem[]
}

export interface HorizontalCardItem extends BasicItem {
  title: string
  image: string,
  buttons: InteractionItem[]
}

export interface InteractionItem {
  title: string
  link: string
  tooltip?: string
  icon?: string
}

export interface IFormField {
  type: 'email' | 'phone' | 'multiline' | 'text';
  title: string;
  name: string;
  required: boolean;
  placeholder?: string;
  icon?: string;
}

interface ISubmitOverride {
  type: 'submit';
  title: string;
}


export interface GenericItem extends Omit<BasicItem, 'order'> {
  type: 'GenericItem';
  header: MarkdownString;
  title: string;
  subTitle?: string;
  startDate: string;
  endDate: string;
  link: string;
  date: string;
  short: MarkdownString;
  featured: boolean;
  image: string;
  showYearOnly: boolean;
  tages: string[];
}


export type AllSections = JumboHeaderSection | IconCardSection | HorizontalCardSection | WaveCardSection | DynamicForm

export interface HomeState {
  items: (AllSections)[]
  item?: GenericItem
}

export const initialHomeState = {
  items: [],
}
