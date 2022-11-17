export const GenterMatcherToKor = (enGenre) => {
  switch (enGenre) {
    case 'NOVEL':
      return '소설';
    case 'ESSAY':
      return '수필';
    case 'POEM':
      return '시';
    case 'HUMANITIES':
      return '인문학';
    case 'SOCIAL':
      return '사회과학';
    case 'NATURAL':
      return '자연과학';
    case 'COMICS':
      return '만화';
    case 'ETC':
      return '기타';
  }
  return '기타';
};

export const GenterMatcherToEng = (enGenre) => {
  switch (enGenre) {
    case '소설':
      return 'NOVEL';
    case '수필':
      return 'ESSAY';
    case '시':
      return 'POEM';
    case '인문학':
      return 'HUMANITIES';
    case '사회과학':
      return 'SOCIAL';
    case '자연과학':
      return 'NATURAL';
    case '만화':
      return 'COMICS';
    case '기타':
      return 'ETC';
  }
  return 'ETC';
};
