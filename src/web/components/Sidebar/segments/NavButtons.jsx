import styled from 'styled-components';

const NavButtons = styled.div`
  display: flex;
  flex-direction: column;

  & .nav-link {
    justify-self: start;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    padding-left: 12px;
    cursor: pointer;
  }
`;

export default NavButtons;
