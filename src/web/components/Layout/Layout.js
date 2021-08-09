import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import styled from 'styled-components';
import { useTheme } from '@chakra-ui/core';
import { bgColor, breakpoint, BREAKPOINT_SM } from '../../theme';

import Sidebar from '../Sidebar';
import CharactersRoute from '../CharactersRoute';
import CombatRoute from '../CombatRoute';

const { ipc } = window;

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

function Layout() {
  const theme = useTheme();
  const [settings, setSettings] = useState({});

  useEffect(() => {
    async function getSettings() {
      const settingsData = await ipc.requestSettings();
      setSettings(settingsData);
    }

    getSettings();
  }, []);

  return (
    <LayoutGrid id="Layout" theme={theme}>
      <Title theme={theme}>
        <h1>Exalted VTT</h1>
      </Title>

      <Sidebar />

      <Switch>
        <Redirect exact from="/" to="/characters" />

        <Route path="/characters">
          <CharactersRoute />
        </Route>

        <Route path="/charms">
          <h1>charms</h1>
        </Route>

        <Route path="/qualities">
          <h1>qualities</h1>
        </Route>

        <Route path="/equipment">
          <h1>equipment</h1>
        </Route>

        <Route path="/combat">
          <CombatRoute />
        </Route>
      </Switch>
    </LayoutGrid>
  );
}

export default Layout;
