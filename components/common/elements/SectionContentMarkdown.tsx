import React, {FunctionComponent, useRef} from 'react';
import clsx from "clsx";
import {styled} from "@mui/material/styles";
import {css} from "@emotion/react";
import {CSSInterpolation} from "@emotion/serialize";

interface SectionContentMarkdownProps {
  content: string,
  className?: string,
}

const baseMarkdownStyling = css`
  h1, h2, h3, h4, h5, h6 {
    &:first-of-type {
      margin-top: .5em;
    }
  }

  em {
    margin: .5em 0;
    display: block;
    font-size: 60%;
    opacity: 0.75;
    line-height: 1.75;

  }

  .material-icons {
    font-size: 1.5em;
    vertical-align: bottom;
  }
`

const MarkdownContainer = styled("div")(({theme}) => css([
    baseMarkdownStyling,
    {
      label: 'markdown',
      p: theme.typography.body2,
      li: theme.typography.body2,
      color: theme.palette.text.primary,
      h1: theme.typography.h1,
      h2: theme.typography.h5,
      h3: theme.typography.h6,
      h4: theme.typography.h6,
      h5: theme.typography.h6,
      h6: theme.typography.h6,
    } as unknown as CSSInterpolation
  ])
)

const SectionContentMarkdown: FunctionComponent<SectionContentMarkdownProps> = ({content, className}) => {
  const markdownRef = useRef(null);
  return <MarkdownContainer ref={markdownRef} className={clsx("markdown", className)}
                           dangerouslySetInnerHTML={{__html: content}}/>;
}

export default SectionContentMarkdown;