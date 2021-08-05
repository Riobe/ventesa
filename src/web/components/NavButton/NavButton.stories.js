import React from 'react';
import styled from 'styled-components';

import NavButton from './NavButton';
import VerticalDivider from '../VerticalDivider';

export default {
  title: 'Components/NavButton',
  component: NavButton,
  parameters: {
    componentSubtitle:
      'Button that handles navigation in the header and sub nav.',
  },
};

// Stories
export const Example = () => <NavButton>Button</NavButton>;

export const Really_Long_Text = () => (
  <NavButton>
    This button has a lot of text in it so that you can see how large it will
    grow and how it will handle zooming and stuff like that. Also how it will
    handle it if the viewport is shrunk.
  </NavButton>
);

const HorizontalDiv = styled.div`
  display: grid;
  grid: 1fr / auto-flow min-content;
  gap: 1rem;

  height: min-content;
`;

export const Navigation_Buttons = () => (
  <HorizontalDiv>
    <NavButton className="active">Characters</NavButton>
    <NavButton data-hovr={true}>Battle</NavButton>
    <VerticalDivider />
    <NavButton>Keldan</NavButton>
    <NavButton>Kallista</NavButton>
  </HorizontalDiv>
);
