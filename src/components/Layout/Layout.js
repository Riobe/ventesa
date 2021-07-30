import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@chakra-ui/core';

import { accent, bgColor, breakpoint, BREAKPOINT_SM } from '../../theme';
import Sidebar from '../Sidebar';
import NotchedBox from '../NotchedBox';
import TypedChat from '../TypedChat';
import ChatRoll from '../ChatRoll';
import CharactersRoute from '../CharactersRoute';
import CombatRoute from '../CombatRoute';

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

const Content = styled.section`
  grid-area: content;
`;

const Chat = styled.section`
  grid-area: chat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  background-color: ${bgColor('nav')};
  border-left: 5px solid ${accent('primary')};

  & > * {
    width: 100%;
  }
`;

const Temp = () => {
  return <h1>Fuck you jeremy</h1>;
};

function Layout() {
  const theme = useTheme();

  return (
    <LayoutGrid id="Layout" theme={theme}>
      <Title theme={theme}>
        <h1>Exalted VTT</h1>
      </Title>
      <Sidebar />
      <Route exact path="/">
        <Content theme={theme}>Content</Content>
      </Route>
      <Route exact path="/characters">
        <CharactersRoute />
      </Route>
      <Route path="/characters/:id">
        <Temp />
      </Route>
      <Route exact path="/combat">
        <CombatRoute />
      </Route>
      <Chat theme={theme}>
        <ChatRoll />
        <ChatRoll />
        <ChatRoll />
        <TypedChat />
      </Chat>
    </LayoutGrid>
  );
}

export default Layout;
