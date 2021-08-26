import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { useTheme } from '@chakra-ui/core';

import {
  SettingsProvider,
  defaultValue as defaultSettings,
} from '../../context/settingsContext';

import Sidebar from '../Sidebar';
import CharactersRoute from '../routes/CharactersRoute';
import CombatRoute from '../routes/CombatRoute';
import DebugRoute from '../routes/DebugRoute';
import SettingsRoute from '../routes/SettingsRoute';

import { ContentArea, LayoutGrid, Title } from './segments';

const { ipc } = window;

function Layout() {
  const theme = useTheme();
  const [settings, setSettings] = useState(defaultSettings);

  async function updateSettings(settingsData) {
    await ipc.saveSettings(settingsData);

    setSettings({ data: settingsData, update: updateSettings });
  }

  useEffect(() => {
    async function getSettings() {
      const settingsData = await ipc.requestSettings();
      const newSettings = { data: settingsData, update: updateSettings };
      setSettings(newSettings);
    }

    getSettings();
  }, []);

  return (
    <LayoutGrid id="Layout" theme={theme}>
      <Title theme={theme}>
        <h1>Ventesa</h1>
      </Title>

      <SettingsProvider value={settings}>
        <Sidebar showDebug={!!settings.data.debug} />

        <ContentArea>
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

            {settings.data.debug && (
              <Route path="/debug">
                <DebugRoute />
              </Route>
            )}

            <Route path="/combat">
              <CombatRoute />
            </Route>

            <Route path="/settings">
              <SettingsRoute />
            </Route>
          </Switch>
        </ContentArea>
      </SettingsProvider>
    </LayoutGrid>
  );
}

export default Layout;
