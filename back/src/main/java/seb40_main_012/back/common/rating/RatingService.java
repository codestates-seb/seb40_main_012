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

        double bookRating = bookRatingDto.getRating(); // 유저가 입력한 별점

        long userId = findUser.getUserId();

        Rating findRating = ratingRepository.findByBookAndUserId(findBook, userId); // 유저가 입력한 별점

        if (findRating == null) {

            if (bookRating == 0) {

                return findBook;

            } else {

                findRating =
                        Rating.builder()
                                .userId(userId)
                                .book(findBook)
                                .userBookRating(bookRating) // 유저가 입력한 별점
                                .build();

                ratingRepository.save(findRating);

                double averageRating = findBook.getAverageRating(); // 현재 평균 별점
                long ratingCount = findBook.getRatingCount(); // 현재 별점 개수

                double numerator = (averageRating * ratingCount) + bookRating; // 분자
                long denominator = ratingCount + 1; // 분모

                double newAverageRating = Math.round((numerator / denominator) * 100) / 100.0; // 업데이트된 별점 -> 소수점 둘째 자리까지 표시

                findBook.setAverageRating(newAverageRating); // 별점 업데이트

                return bookRepository.save(findBook);
            }

        } else {

            double averageRating = findBook.getAverageRating(); // 현재 평균 별점
            long ratingCount = findBook.getRatingCount(); // 현재 별점 개수
            double numerator; //분모
            long denominator; // 분자

            if (bookRating == 0) {

                if (findRating.getUserBookRating() == 0) {

                    return findBook;

                } else {

                    numerator = (averageRating * ratingCount) - findRating.getUserBookRating();
                    denominator = ratingCount - 1;

                    double newAverageRating = Math.round((numerator / denominator) * 100) / 100.0; // 업데이트된 별점 -> 소수점 둘째 자리까지 표시

                    findBook.setAverageRating(newAverageRating); // 별점 업데이트

                    findRating.setUserBookRating(0); // 유저 별점 업데이트

                }

            } else {

                numerator = (averageRating * ratingCount) - findRating.getUserBookRating() + bookRating;
                denominator = ratingCount;

                double newAverageRating = Math.round((numerator / denominator) * 100) / 100.0; // 업데이트된 별점 -> 소수점 둘째 자리까지 표시

                findBook.setAverageRating(newAverageRating); // 별점 업데이트

                findRating.setUserBookRating(bookRating); // 유저 별점 업데이트

            }
            return bookRepository.save(findBook);

        }

    }
}
