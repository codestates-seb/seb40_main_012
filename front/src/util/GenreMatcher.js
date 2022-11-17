export const GenterMatcher = (enGenre) => {
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
