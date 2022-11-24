// 유저
export const USERS_URL = '/api/users';
export const SIGN_IN_URL = '/api/login';
export const TOKEN_REFRESH_URL = '/api/token/refresh';
export const LOGOUT_URL = '/api/logout';
export const MY_PAGE_URL = '/api/mypage';
export const DUPLICATION_CHECK_NICKNAME_URL = `${MY_PAGE_URL}/verify/nickName`;
export const DUPLICATION_CHECK_EMAIL_URL = `${MY_PAGE_URL}/verify/email`;
export const COMMENT_URL = `${MY_PAGE_URL}/userComment`;
export const MY_PAIRING_URL = `${MY_PAGE_URL}/userPairing`;
export const MY_COLLECTION_URL = `${MY_PAGE_URL}/userCollection`;
export const MY_PICK_BOOK = `${MY_PAGE_URL}/bookmark/book`;
export const MY_PICK_PAIRING = `${MY_PAGE_URL}/bookmark/pairing`;
export const MY_PICK_COLLECTION = `${MY_PAGE_URL}/bookmark/collection`;
export const FIRST_LOGIN_URL = `${USERS_URL}/firstLogin`;

// 마이페이지
// export const COMMENT_URL = `${MY_PAGE_URL}/userComment`;
export const USER_INFO_URL = `${MY_PAGE_URL}/userInfo`;
export const CURRENT_PASSWORD_CHECK_URL = `${MY_PAGE_URL}/password/current`;

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
