import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import PageContainer from '../components/PageContainer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgContainer = styled.div`
  width: 450px;
  img {
    width: 450px;
    object-fit: cover;
  }
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40px;
  margin-top: 0;
  .notfound {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    margin-bottom: 30px;
  }
  .info {
    color: ${({ theme }) => theme.colors.gray};
    text-align: center;
    font-size: 16;
    font-weight: bold;
  }
`;

const PoemContainer = styled.div`
  margin-top: 10px;
  padding: 20px;
  width: 80vw;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.dark};
  max-width: 820px;
  background-color: ${({ theme }) => theme.colors.purple_3};
  border-radius: 5px;
  line-height: 30px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  .author {
    font-weight: 700;
  }
`;

const poems = [
  {
    poem: (
      <p>
        그때, 나는 그 책을 왜 껴안고 있었을까. 그런 방식으로 시간이 쪼개졌다.
        아름다운 괴물도 그렇게 지나갔다.
      </p>
    ),
    author: <p>- 어떤 사랑도 기록하지 말기를 中 / 이영주</p>,
  },
  {
    poem: (
      <p>
        영원이라는 말을 쓴다 겨울의 도끼라는 말처럼 우연히 여기라고 쓴다
        공원이라고 쓴다 누군가를 지나친 기분이 들었으므로
      </p>
    ),
    author: <p>- 공원의 전개 中 / 윤은성</p>,
  },
  {
    poem: (
      <p>
        처음 만났던 날에 대해 너는 매일매일 이야기를 들려주었다. 우리가 어떤
        용기를 내어 서로 손을 잡았는지 손을 꼭 잡고 혹한의 공원에 앉아 밤을
        지샜는지. 나는 다소곳이 그 이야기를 들었다. 우리가 우리가 우리를 우리를
        되뇌고 되뇌며 그때의 표정이 되어서.
      </p>
    ),
    author: <p>- 다른 이야기 中 / 김소연</p>,
  },
  {
    poem: (
      <p>
        무언가 잘 안 되어 생이 다른 쪽으로 돌아갔다면
        <br />
        모쪼록
        <br />
        이것도 역설의 방식이라 하면 안 될까
        <br />
        나도 내가 아닌 곳으로 흐른 때가 많았으니
        <br />
        너무 오래되었다면 그리 두어라
        <br />긴 밤이여 솟구쳐 흘러라
      </p>
    ),
    author: <p>- 역류성 식도염 中 / 이규리</p>,
  },
  {
    poem: (
      <p>
        죽은 나무 속에 사는 방(房)과 죽은 새 속에 사는 골목 사이에 바람의 인연이
        있다 내가 당신을 만나 놓친 고요라고 하겠다 거리를 저녁의 냄새로 물들이는
        바람과 사람을 시간의 기면으로 물들이는 서러움 여기서 바람은
        고아(孤兒)라는 말을 쓰겠다
      </p>
    ),
    author: <p>- 기미(幾微) -리안에게 中/ 김경주</p>,
  },
  {
    poem: (
      <p>
        어려운 일은 아니다. 이제는 기다리면 되니까. 하차한 바로 그 자리에서
        만나기로 했으니까. 사람들은 지나간다. 마주할 일이 있다고 하면 겁을
        먹기도 하면서. 더 많은 노력을 한 사람이 누구인지 견주면서. 거대한 밤과
        통로.
        <br />
        폭죽을 터뜨리고 싶다.
      </p>
    ),
    author: <p>- 주소를 쥐고 中 / 윤은성</p>,
  },
];

const randomPoem = () => {
  return poems[Math.floor(Math.random() * poems.length)];
};

const NoMatch = () => {
  const poem = randomPoem();

  return (
    <ThemeProvider theme={theme}>
      <PageContainer footer>
        <Wrapper>
          <ContentsBox>
            <ImgContainer>
              <img
                src={process.env.PUBLIC_URL + '/images/404_image.png'}
                alt="404 error"
              />
            </ImgContainer>
            <div className="notfound">페이지를 찾을 수 없습니다.</div>
            <div className="info">
              예상치 못한 곳에 도달한 당신을 위해 시 한 구절을 준비했어요.
            </div>
            <PoemContainer>
              <div>{poem.poem}</div>
              <br />
              <div className="author">{poem.author}</div>
            </PoemContainer>
          </ContentsBox>
        </Wrapper>
      </PageContainer>
    </ThemeProvider>
  );
};

export default NoMatch;
