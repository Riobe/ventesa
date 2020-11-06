import React from 'react';

import styled from 'styled-components';
import { Icon, useTheme } from '@chakra-ui/core';
import { accent, bgColor } from '../../theme';

const Nav = styled.section`
  grid-area: nav;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0.75rem 0;

  color: white;

  background-color: ${bgColor('nav')};

  svg:hover {
    color: ${accent('primary')};

    cursor: pointer;
  }
  svg + .nav-link:hover {
    color: ${accent('primary')};
  }
`;

const NavButtons = styled.div`
  display: grid;
  grid: auto-flow 2.25rem / 55px auto;
  gap: 30px 0;
  justify-items: center;

  & .nav-link {
    align-self: end;
    justify-self: start;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-weight: bold;

    padding-left: 12px;

    cursor: pointer;
  }
`;

const NavSettings = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  width: 55px;
`;

const ExpandArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid ${bgColor('nav')};

  position: absolute;
  right: -15px;
  top: 50px;

  z-index: 10;
`;

const ExpandableNav = styled.div`
  height: 100%;
  overflow: hidden;
  max-width: 55px;
  width: 16rem;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 28px;
  padding-bottom: 15px;

  display: flex;
  flex-direction: column;

  z-index: 20;

  background-color: ${bgColor('nav')};

  transition: max-width 0.3s, right 0.3s;

  &:hover {
    max-width: calc(16rem + 55px);
  }
`;
const ICON_SIZE = '36px';

function Sidebar() {
  const theme = useTheme();

  return (
    <Nav theme={theme} className="Sidebar">
      <ExpandArrow theme={theme} />
      <ExpandableNav theme={theme}>
        <NavButtons>
          <Icon name="home" color="white" size={ICON_SIZE} />
          <div className="nav-link">Home</div>

          <Icon name="book" color="white" size={ICON_SIZE} />
          <div className="nav-link">Narrative Mode</div>

          <Icon name="shield" color="white" size={ICON_SIZE} />
          <div className="nav-link">Combat Mode</div>

          <Icon name="npcs" color="white" size={ICON_SIZE} />
          <div className="nav-link">NPCS</div>

          <Icon name="charms" color="white" size={ICON_SIZE} />
          <div className="nav-link">Charms</div>

          <Icon name="players" color="white" size={ICON_SIZE} />
          <div className="nav-link">Players</div>
        </NavButtons>

        <NavSettings>
          <Icon name="settings" color="white" size={ICON_SIZE} />
        </NavSettings>
      </ExpandableNav>
    </Nav>
  );
}

export default Sidebar;
