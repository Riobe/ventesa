import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@chakra-ui/core';
import { Switch, Route, Link, useParams } from 'react-router-dom';

import NavButton from '../NavButton';
import SecondEditionCombat from '../SecondEditionCombat';
import VerticalDivider from '../VerticalDivider';
import { bgColor, breakpoint, BREAKPOINT_SM } from '../../theme';

const LayoutGrid = styled.div`
  height: 100%;
  margin: 0 auto;
  background-color: ${bgColor('primary')};
  display: grid;

  min-width: ${breakpoint(BREAKPOINT_SM)};

  grid:
    1rem auto /
    100px auto 18.75rem;
  grid-template-areas:
    'title  title   title'
    'nav    content chat';
`;

const MainNav = styled.header`
  grid-area: main-nav;

  height: 2rem;

  display: grid;
  grid: min-content / auto-flow min-content;
  gap: 0px 1rem;
  margin-bottom: 0.5rem;
`;

const SubNav = styled.header`
  grid-area: sub-nav;
  display: flex;
`;

const MainContent = styled.main`
  grid-area: main;
`;

const RelatedInformation = styled.aside`
  grid-area: related;
`;

const NarrativeRoute = () => <div>NarrativeRoute</div>;
const CombatRoute = () => <div>CombatRoute</div>;
const ReferenceRoute = () => <div>ReferenceRoute</div>;
const CharacterRoute = () => {
  const { name } = useParams();
  return <div>CharacterRoute for: {name}</div>;
};

function Layout() {
  const theme = useTheme();

  return (
    <LayoutGrid id="Layout" theme={theme}>
      <MainNav>
        <NavButton as={Link} to="/narrative">
          Narrative
        </NavButton>
        <NavButton as={Link} to="/battle">
          Battle
        </NavButton>
        <NavButton as={Link} to="/reference">
          Reference
        </NavButton>
        <NavButton as={Link} to="/2e">
          2E
        </NavButton>
        <VerticalDivider />
        <NavButton as={Link} to="/character/keldan">
          Keldan
        </NavButton>
        <NavButton as={Link} to="/character/kallista">
          Kallista
        </NavButton>
      </MainNav>
      <SubNav>
        <NavButton>Search</NavButton>
        <NavButton>Players 0.</NavButton>
        <NavButton>Quick Characters 0.</NavButton>
      </SubNav>
      <MainContent>
        <Switch>
          <Route path="/battle">
            <CombatRoute />
          </Route>
          <Route path="/character/:name">
            <CharacterRoute />
          </Route>
          <Route path="/reference">
            <ReferenceRoute />
          </Route>
          <Route path="/2e">
            <SecondEditionCombat />
          </Route>
          <Route path="*">
            <NarrativeRoute />
          </Route>
        </Switch>
      </MainContent>
      <RelatedInformation>Related Information</RelatedInformation>
    </LayoutGrid>
  );
}

export default Layout;
