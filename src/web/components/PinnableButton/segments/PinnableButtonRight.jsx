import styled from 'styled-components';

import { bgColor, accent, text } from '../../../theme/helpers';

const PinnableButtonRight = styled.button.attrs({
  className: 'PinnableButtonRoute',
})`
  height: 1.5rem;
  width: 0.75rem;

  width: min-content;
  max-width: 6rem;
  min-width: 2rem;

  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  padding: 0.25rem 0.2rem;
  margin: 0;

  color: ${text('normal')};
  text-shadow: black 0.05rem 0.05rem 0.05rem;
  background-color: ${bgColor('button')};
  border-radius: 0 4rem 4rem 0;
  border: none;

  background-size: 200% 100%;
  background-image: linear-gradient(
    to left,
    ${bgColor('primary')} 50%,
    ${bgColor('title')} 50%
  );

  transition: background-position 0.2s;

  &:focus {
    outline: 0;
  }

  .PinnableButton:hover > & {
    background-position: -100% 0;
  }

  .pinned > & {
    box-shadow: 0.03rem -0.12rem 0 0 ${accent('primary')},
      0.03rem 0.12rem 0 0 ${accent('primary')},
      0.07rem 0 0 0.07rem ${accent('primary')};
  }

  .active > & {
    color: ${accent('primary')};
    text-decoration: underline;
    font-weight: bold;
  }
`;

export default PinnableButtonRight;
