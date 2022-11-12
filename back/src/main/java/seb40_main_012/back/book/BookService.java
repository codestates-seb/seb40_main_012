package seb40_main_012.back.book;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.user.service.UserService;

import java.util.Optional;

@Service
@Transactional
public class BookService {

    private final BookRepository bookRepository;
    private final UserService userService;

    public BookService(BookRepository bookRepository, UserService userService) {
        this.bookRepository = bookRepository;
        this.userService = userService;
    }

    public Book createBook(Book book) {
        return null;
    }

    public Book updateBook(Book book) {
        return null;
    }

    public Book updateView(Book book, long bookId) {
        return null;
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
