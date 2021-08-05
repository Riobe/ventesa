import React, { useState, useEffect } from 'react';
import { BrowserRouter as Route, Switch } from 'react-router-dom';

import styled from 'styled-components';
import { useTheme } from '@chakra-ui/core';
import { bgColor, breakpoint, BREAKPOINT_SM } from '../../theme';
import events from '../../../shared/events';

import Sidebar from '../Sidebar';
import CharactersRoute from '../CharactersRoute';
import CombatRoute from '../CombatRoute';

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

  color: white;
`;

function Layout() {
  const theme = useTheme();
  const [settings, setSettings] = useState({});

  useEffect(() => {
    // eslint-disable-next-line
    ipc.send(events.settingsRequested);

    const settingsHandler = (event, settings) => {
      setSettings(settings);
    };

    // eslint-disable-next-line
    ipc.on(events.settingsAcquired, settingsHandler);

    return () => {
      // eslint-disable-next-line
      ipc.removeListener(events.settingsAcquired, settingsHandler);
    };
  }, []);

  return (
    <LayoutGrid id="Layout" theme={theme}>
      <Title theme={theme}>
        <h1>Exalted VTT</h1>
      </Title>

      <Sidebar />

      <Switch>
        <Route exact path="/">
          <Content theme={theme}>
            <pre>Settings: {JSON.stringify(settings, null, 2)}</pre>
            <div>Debug Mode: {(!!settings.debug).toString()}</div>
          </Content>
        </Route>

        <Route exact path="/characters">
          <CharactersRoute />
        </Route>

        <Route exact path="/combat">
          <CombatRoute />
        </Route>
      </Switch>
    </LayoutGrid>
  );
}

export default Layout;
