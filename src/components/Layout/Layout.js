import React from 'react';
import styled from 'styled-components';
import { Icon, useTheme } from '@chakra-ui/core';

import { accent, bgColor, breakpoint, BREAKPOINT_SM } from '../../theme';

const LayoutGrid = styled.div`
  height: 100%;
  margin: 0 auto;
  background-color: ${bgColor('primary')};
  display: grid;

  min-width: ${breakpoint(BREAKPOINT_SM)};

  grid:
    4rem auto /
    55px auto 18.75rem;
  grid-template-areas:
    'title  title   title'
    'nav    content chat';
`;

const Title = styled.header`
  grid-area: title;

  color: white;

  background-color: ${bgColor('title')};

  & > h1 {
    font-size: 1.5rem;
  }
`;

const Nav = styled.section`
  grid-area: nav;
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0;

  color: white;

  background-color: ${bgColor('nav')};

  svg:hover {
    color: ${accent('primary')};
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-basis: min-content;
  gap: 1.5rem;
`;

const NavSettings = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const Content = styled.section`
  grid-area: content;

  border-right: 5px solid ${accent('primary')};
`;

const Chat = styled.section`
  grid-area: chat;
`;

const ICON_SIZE = '2.25rem';

function Layout() {
  const theme = useTheme();

  return (
    <LayoutGrid id="Layout" theme={theme}>
      <Title theme={theme}>
        <h1>Exalted VTT</h1>
      </Title>
      <Nav theme={theme}>
        <NavButtons>
          <Icon name="home" color="white" size={ICON_SIZE} />
          <Icon name="book" color="white" size={ICON_SIZE} />
          <Icon name="shield" color="white" size={ICON_SIZE} />
          <Icon name="shield" color="white" size={ICON_SIZE} />
          <Icon name="shield" color="white" size={ICON_SIZE} />
        </NavButtons>
        <NavSettings>
          <Icon name="shield" color="white" size={ICON_SIZE} />
        </NavSettings>
      </Nav>
      <Content theme={theme}>Content</Content>
      <Chat>Chat</Chat>
    </LayoutGrid>
  );
}

export default Layout;
