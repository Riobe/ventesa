import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { useTheme } from '@chakra-ui/core';

import Sidebar from '../Sidebar';
import CharactersRoute from '../routes/CharactersRoute';
import CombatRoute from '../routes/CombatRoute';

import { LayoutGrid, Title } from './segements';

const { ipc } = window;

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
        <h1>Vetesa</h1>
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
