import styled from 'styled-components';

const VerticalDividerElement = styled.div`
  margin: auto 1rem;

  height: 80%;
  width: 0.1rem;

  background-color: ${({ theme }) => theme.colors.gray[900]};
  border-radius: 3px;
`;

export default VerticalDividerElement;
