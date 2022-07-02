import styled from 'styled-components';
import PrimaryButton from './PrimaryButton';

const SecondaryButton = styled(PrimaryButton)`
  background-color: inherit;
  border-color: #C81A78;
  color: #C81A78;
  padding: 10px 0;

  &:hover {
    background-color: #C81A78;
    border-color: #C81A78;
    color: white;
  }
`;

export default SecondaryButton;
