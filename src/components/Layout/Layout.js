import React from 'react';
import styled from 'styled-components';

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

  & > * {
    border: 1px dashed cyan;
  }
`;

const MainNav = styled.header`
  grid-area: main-nav;

  height: 2rem;

  display: flex;
`;

const SubNav = styled.header`
  grid-area: sub-nav;
`;

const MainContent = styled.main`
  grid-area: main;
`;

const RelatedInformation = styled.aside`
  grid-area: related;
`;

function Layout() {
  return (
    <LayoutGrid id="Layout">
      <MainNav>
        <NavButton>Characters</NavButton>
        <NavButton>Battle</NavButton>
        <VerticalDivider />
        <NavButton>Viewed Characters</NavButton>
      </MainNav>
      <SubNav>Secondary Nav</SubNav>
      <MainContent>Main Content</MainContent>
      <RelatedInformation>Related Information</RelatedInformation>
    </LayoutGrid>
  );
}

export default Layout;
