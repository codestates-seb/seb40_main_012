import { PageContainer } from 'containers';
import { ContainedButton, TextButton, OutlinedButton } from 'components';

const ButtonTest = () => {
  return (
    <PageContainer footer center>
      <ContainedButton type="submit">로그인</ContainedButton>
      <ContainedButton type="submit" disabled>
        로그인
      </ContainedButton>
      <TextButton type="submit">로그인</TextButton>
      <TextButton type="submit" disabled>
        로그인
      </TextButton>
      <OutlinedButton type="submit">로그인</OutlinedButton>
      <OutlinedButton type="submit" disabled>
        로그인
      </OutlinedButton>
    </PageContainer>
  );
};

export default ButtonTest;
