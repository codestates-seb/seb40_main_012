package seb40_main_012.back.book;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.book.entity.Book;

@Service
@Transactional
public class BookService {

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
        return null;
    }

    public Page<Book> findBooks(int page, int size) {
        return null;
    }

    public void deleteBook(long bookId) {
    }

    public void verifyBook(long userId, Book book) {
    }

    public void findVerifiedBook(long bookId) {
    }
}
