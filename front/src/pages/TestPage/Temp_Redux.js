import styled from 'styled-components';
import { PageContainer } from 'containers';
import { Counter } from 'components/Counter/Counter';
import BasicModalTest from 'components/TestComponent/BasicModalTest';
import BasicSelectTest from 'components/TestComponent/BasicSelectTest';

const Btn = styled.button`
  background-color: ${({ theme }) => theme.colors.mainColor};
`;

const ReduxPage = () => {
  return (
    <PageContainer footer center>
      <Counter />
      <BasicModalTest />
      <Btn>click</Btn>
      <BasicSelectTest />
    </PageContainer>
  );
};

export default ReduxPage;
