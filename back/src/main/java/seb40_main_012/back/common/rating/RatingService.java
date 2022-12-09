package seb40_main_012.back.common.rating;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.BookDto;
import seb40_main_012.back.book.BookRepository;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.common.like.entity.Like;
import seb40_main_012.back.common.like.entity.LikeType;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

@Service
@Transactional
@RequiredArgsConstructor
public class RatingService {

    private final UserService userService;
    private final BookService bookService;
    private final BookRepository bookRepository;
    private final RatingRepository ratingRepository;

    public Book createBookRating(String isbn13, BookDto.Rating bookRatingDto) {

        User findUser = userService.getLoginUser();

        Book findBook = bookService.findVerifiedBook(isbn13);

        double bookRating = bookRatingDto.getRating(); // 유저가 현재 입력한 별점

        long userId = findUser.getUserId();

        Rating findRating = ratingRepository.findByBookAndUser(findBook, findUser); // 유저가 입력한 별점 내역

        if (findRating == null) { // 별점을 매긴 적이 없을 경우

            if (bookRating == 0) { // 별점을 0점을 매기면(즉, 아무 행동도 안 하면)

                return findBook; // 책 정보 그대로 리턴

            } else { // 별점을 매기면(즉, 0.5 ~ 5.0 사이의 별점을 매기면

                findRating = // 유저가 입력한 별점 정보 생성
                        Rating.builder()
                                .user(findUser)
                                .book(findBook)
                                .userBookRating(bookRating) // 입력한 별점
                                .build();

                ratingRepository.save(findRating);

                // 평균 별점 업데이트 되는 로직
                double averageRating = findBook.getAverageRating(); // 현재 평균 별점
                long ratingCount = findBook.getRatingCount(); // 현재 별점 개수

                double numerator = (averageRating * ratingCount) + bookRating; // 분자
                long denominator = ratingCount + 1; // 분모

                double newAverageRating = Math.round((numerator / denominator) * 100) / 100.0; // 업데이트된 별점 -> 소수점 둘째 자리까지 표시

                findBook.setAverageRating(newAverageRating); // 별점 업데이트

                findBook.setRatingCount(findBook.getRatingCount() + 1); // 별점 인원 + 1

                return bookRepository.save(findBook);
            }

    } else { // 별점을 매긴 적이 있는 경우

            double averageRating = findBook.getAverageRating(); // 현재 평균 별점
            long ratingCount = findBook.getRatingCount(); // 현재 별점 개수
            double numerator; // 분모
            long denominator; // 분자

            if (bookRating == 0) { // 별점을 0점으로 되돌릴 경우

                if (findRating.getUserBookRating() == 0) { // 기존에도 0점을 입력했을 경우

                    return findBook;

                } else { // 기존에 0이 아닌 점수를 입력했을 경우

                    numerator = (averageRating * ratingCount) - findRating.getUserBookRating();
                    denominator = ratingCount - 1;

                    double newAverageRating = Math.round((numerator / denominator) * 100) / 100.0; // 업데이트된 별점 -> 소수점 둘째 자리까지 표시

                    findBook.setAverageRating(newAverageRating); // 별점 업데이트

                    findRating.setUserBookRating(0); // 유저 별점 업데이트

                    findBook.setRatingCount(findBook.getRatingCount() - 1); // 별점 인원 - 1

                    return bookRepository.save(findBook);

                }

            } else { // 0이 아닌 점수로 수정할 경우

                if (findRating.getUserBookRating() == 0) { // 기존에 0점을 입력했을 경우

                    numerator = (averageRating * ratingCount) - findRating.getUserBookRating() + bookRating;
                    denominator = ratingCount + 1;

                    double newAverageRating = Math.round((numerator / denominator) * 100) / 100.0; // 업데이트된 별점 -> 소수점 둘째 자리까지 표시

                    findBook.setAverageRating(newAverageRating); // 별점 업데이트

                    findRating.setUserBookRating(bookRating); // 유저 별점 업데이트

                    findBook.setRatingCount(findBook.getRatingCount() + 1);

                    return bookRepository.save(findBook);

                } else {

                    numerator = (averageRating * ratingCount) - findRating.getUserBookRating() + bookRating;
                    denominator = ratingCount;

                    double newAverageRating = Math.round((numerator / denominator) * 100) / 100.0; // 업데이트된 별점 -> 소수점 둘째 자리까지 표시

                    findBook.setAverageRating(newAverageRating); // 별점 업데이트

                    findRating.setUserBookRating(bookRating); // 유저 별점 업데이트

                    return bookRepository.save(findBook);
                }
            }
        }
    }
}
