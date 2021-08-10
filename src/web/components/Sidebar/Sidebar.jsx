import React from 'react';
import PropTypes from 'prop-types';
import { Icon, useTheme } from '@chakra-ui/core';

import {
  ExpandableNav,
  ExpandArrow,
  Nav,
  NavButtons,
  NavLinkStyled,
  NavSettings,
} from './segments';

const ICON_SIZE = '36px';

const buttons = [
  {
    icon: 'players',
    text: 'Characters',
    link: '/characters',
  },
  {
    icon: 'charms',
    text: 'Charms',
    link: '/charms',
  },
  {
    icon: 'book',
    text: 'Qualities',
    link: '/qualities',
  },
  {
    icon: 'shield',
    text: 'Equipment',
    link: '/equipment',
  },
  {
    icon: 'fist',
    text: 'Combat Mode',
    link: '/combat',
  },
];

function Sidebar({ showDebug }) {
  const theme = useTheme();

  const navButtons = showDebug
    ? buttons.concat({
        icon: 'sun',
        text: 'Debug',
        link: '/debug',
      })
    : buttons;

  return (
    <Nav theme={theme} className="Sidebar">
      <ExpandArrow theme={theme} />
      <ExpandableNav theme={theme}>
        <NavButtons>
          {navButtons.map(button => (
            <NavLinkStyled
              theme={theme}
              key={button.text}
              activeClassName="active"
              to={button.link || '/'}
            >
              <Icon name={button.icon} size={ICON_SIZE} />
              <div className="nav-link">{button.text}</div>
            </NavLinkStyled>
          ))}
        </NavButtons>

        <NavSettings>
          <NavLinkStyled theme={theme} activeClassName="active" to="/settings">
            <Icon name="settings" size={ICON_SIZE} />
            <div className="nav-link">Settings</div>
          </NavLinkStyled>
        </NavSettings>
      </ExpandableNav>
    </Nav>
  );
}

Sidebar.propTypes = {
  showDebug: PropTypes.bool.isRequired,
};

Sidebar.defaultProps = {
  showDebug: false,
};

export default Sidebar;
