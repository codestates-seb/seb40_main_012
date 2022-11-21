// 유저
export const USERS_URL = '/api/users';
export const SIGN_IN_URL = '/api/login';
export const TOKEN_REFRESH_URL = '/api/token/refresh';
export const LOGOUT_URL = '/api/logout';
export const MY_PAGE_URL = '/api/mypage';
export const DUPLICATION_CHECK_NICKNAME_URL = `${MY_PAGE_URL}/verify/nickName`;
export const DUPLICATION_CHECK_EMAIL_URL = `${MY_PAGE_URL}/verify/email`;

// 책
export const BOOKS_URL = '/api/books';

// 페어링
export const PAIRING_URL = `${BOOKS_URL}/pairings`;
export const PAIRING_ALL_LIKE_URL = `${PAIRING_URL}/likes`;
export const PAIRING_ALL_NEWEST_URL = `${PAIRING_URL}/newest`;
export const PAIRING_FILM_LIKE_URL = `${PAIRING_URL}/film/likes`;
export const PAIRING_FILM_NEWEST_URL = `${PAIRING_URL}/film/newest`;
export const PAIRING_CUISINE_LIKE_URL = `${PAIRING_URL}/cuisine/likes`;
export const PAIRING_CUISINE_NEWEST_URL = `${PAIRING_URL}/cuisine/newest`;
export const PAIRING_MUSIC_LIKE_URL = `${PAIRING_URL}/music/likes`;
export const PAIRING_MUSIC_NEWEST_URL = `${PAIRING_URL}/music/newest`;
export const PAIRING_BOOK_LIKE_URL = `${PAIRING_URL}/book/likes`;
export const PAIRING_BOOK_NEWEST_URL = `${PAIRING_URL}/book/newest`;
export const PAIRING_ETC_LIKE_URL = `${PAIRING_URL}/etc/likes`;
export const PAIRING_ETC_NEWEST_URL = `${PAIRING_URL}/etc/newest`;
