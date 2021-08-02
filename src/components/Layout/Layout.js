import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@chakra-ui/core';

import { accent, bgColor, breakpoint, BREAKPOINT_SM } from '../../theme';
import Sidebar from '../Sidebar';
import NotchedBox from '../NotchedBox';
import TypedChat from '../TypedChat';
import ChatRoll from '../ChatRoll';

const LayoutGrid = styled.div`
  height: 100%;
  margin: 0 auto;
  background-color: ${bgColor('primary')};
  display: grid;

  min-width: ${breakpoint(BREAKPOINT_SM)};
  min-height: 660px;

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

  z-index: 1;

  & > h1 {
    font-size: 1.5rem;
  }
`;

const Content = styled.section`
  grid-area: content;

  border-right: 5px solid ${accent('primary')};
`;

const Chat = styled.section`
  grid-area: chat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  background-color: ${bgColor('nav')};

  & > * {
    width: 100%;
  }
`;

function Layout() {
  const theme = useTheme();

  return (
    <LayoutGrid id="Layout" theme={theme}>
      <Title theme={theme}>
        <h1>Exalted VTT</h1>
      </Title>
      <Content theme={theme}>Content</Content>
      <Sidebar />
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
