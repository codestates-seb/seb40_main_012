package seb40_main_012.back.book;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollection.service.BookCollectionService;
import seb40_main_012.back.bookCollectionBook.BookCollectionBook;
import seb40_main_012.back.user.service.UserService;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final UserService userService;


    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    // 다대 다 매핑 준비
    private final BookCollectionService bookCollectionService;

    public Book createBook(Book book) {

        List<BookCollectionBook> bookCollectionBooks = book.getBookCollectionBooks();

        book.setBookCollectionBooks(bookCollectionBooks);

        for(BookCollectionBook bookCollectionBook : bookCollectionBooks) {
            bookCollectionBook.setBook(book);
            long collectionBookId = bookCollectionBook.getBookCollection().getCollectionId();
//            bookCollectionService.findBookCollection(collectionBookId); // 컬렉션 비즈니스 로직 구현 후 추가
        }

        return bookRepository.save(book);
    }
    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------

//    public Book createBook(Book book) {
//        return null;
//    }

    public Book updateBook(Book book) {
        return null;
    }

    public Book updateView(long bookId) {

        Book findBook = findVerifiedBook(bookId);

        findBook.setView(findBook.getView() + 1); // View +1

        return bookRepository.save(findBook);
    }

    public Book updateRating(BookDto.Rating ratingBook) {

        long bookId = ratingBook.getBookId();
        long userId = ratingBook.getUserId(); // 임시 유저 번호
        long rating = ratingBook.getRating(); // 입력받은 별점

        Optional<Book> optionalBook = bookRepository.findById(bookId);

        Book findBook = optionalBook.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOOK_NOT_FOUND));

        long ratingCount = findBook.getRatingCount(); // 현재 별점 개수
        long averageRating = findBook.getAverageRating(); // 현재 평균 별점

        long numerator = (averageRating * ratingCount) + rating; // 분자
        long denominator = ratingCount + 1; // 분모

        long newAverageRating = numerator / denominator; // 업데이트된 별점

        findBook.setAverageRating(newAverageRating); // 별점 업데이트

        return bookRepository.save(findBook);
    }

    public Book findBook(long bookId) {
        return findVerifiedBook(bookId);
    }

    public Page<Book> findBooks(int page, int size) {
        return null;
    }

    public void deleteBook(long bookId) {
    }

    public void verifyBook(long userId, Book book) {
    }

    public Book findVerifiedBook(long bookId) {
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        return optionalBook.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOOK_NOT_FOUND));
    }
}
