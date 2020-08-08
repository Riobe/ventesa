import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Link, useParams } from 'react-router-dom';

import NavButton from '../NavButton';
import VerticalDivider from '../VerticalDivider';

const LayoutGrid = styled.div`
  margin: 0 auto;
  display: grid;

  min-width: 768px;
  max-width: 1024px;

  grid:
    min-content min-content auto /
    3fr 1fr;
  grid-template-areas:
    'main-nav  main-nav'
    'sub-nav   sub-nav'
    'main     related';
  gap: 10px 5px;

  & > * {
    border: 2px dashed cyan;
  }
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
const CharacterRoute = () => {
  const { name } = useParams();
  return <div>CharacterRoute for: {name}</div>;
};

function Layout() {
  return (
    <LayoutGrid id="Layout">
      <MainNav>
        <NavButton as={Link} to="/narrative">
          Narrative
        </NavButton>
        <NavButton as={Link} to="/battle">
          Battle
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
