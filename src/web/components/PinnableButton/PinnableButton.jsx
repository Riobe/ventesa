import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@chakra-ui/core';
import { useTheme } from '@chakra-ui/core';

import {
  CloseButton,
  PinnableButtonContainer,
  PinnableButtonLeft,
  PinnableButtonRight,
} from './segments';

/**
 * PinnableButton can be used to allow the ST or player to get to
 * recently used routes, and even pin those navigation links for quick access.
 *
 * ## States
 * * Normal, Inactive - This is the default state of a PinnableButton when created.
 *
 * * Normal, Inactive Hovered - When the button is hovered, but the route is
 *  not selected. This is where you would want to make the button removeable.
 *
 * * Normal, Active - This is where the button is not pinned, but the route it
 *  represents is being viewed.
 *
 * * Normal, Active Hovered - Same as the last state, but when the player is actively
 *  hovering over it.
 *
 * * Pinned, Inactive - This is a pinned route, but not one being actively viewed at
 *  the moment. This is always closeable.
 *
 * * Pinned, Inactive Hovered - When a pinned and inactive route is being hovered over.
 *
 * * Pinned, Active - When the pinned route is actively being viewed.
 *
 * * Pinned, Active Hovered - When the pinned route is actively being viewed *and* hovered over.
 */
function PinnableButton({
  pinned,
  active,
  className,
  children,
  onPinToggle,
  onRouteClicked,
  onClose,
  ...props
}) {
  const theme = useTheme();

  const classes = ['PinnableButton'];
  if (className) {
    classes.push(className);
  }
  if (pinned) {
    classes.push('pinned');
  }
  if (active) {
    classes.push('active');
  }

  return (
    <PinnableButtonContainer className={classes.join(' ')} {...props}>
      <PinnableButtonLeft theme={theme} onClick={() => onPinToggle(!pinned)}>
        <Icon name="pin" color="white" size="0.6rem" />
      </PinnableButtonLeft>

      <PinnableButtonRight theme={theme} onClick={() => onRouteClicked()}>
        {children}
      </PinnableButtonRight>

      <CloseButton theme={theme} onClick={onClose}>
        <Icon name="cancel" color="white" size="0.35rem" />
      </CloseButton>
    </PinnableButtonContainer>
  );
}

PinnableButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  pinned: PropTypes.bool,
  active: PropTypes.bool,
  onPinToggle: PropTypes.func.isRequired,
  onRouteClicked: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

PinnableButton.defaultProps = {
  pinned: false,
  active: false,
};

export default PinnableButton;
